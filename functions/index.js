const functions = require("firebase-functions")
const { google } = require("googleapis")
const cors = require("cors")({ origin: true })

const calendar = google.calendar("v3")

const admin = require("firebase-admin")
admin.initializeApp()

exports.getCalendars = functions
    .region("europe-west1")
    .runWith({ secrets: ["GOOGLE_API_KEY"] })
    .https.onRequest((req, res) => {
      cors(req, res, async () => {
        try {
          const url = new URL(req.url, `http://${req.headers.host}`)
          const calendarIds = url.searchParams.getAll("calendarId")
          const searchParams = Array.from(url.searchParams.entries()).filter(
              ([key]) => key !== "calendarId",
          )
          const paramsString = searchParams
              .map(([key, value]) => `&${key}=${value}`)
              .join("")

          const calendars = calendarIds.map((calendarId) => {
            const params = new URLSearchParams(paramsString)
            params.set("key", process.env.GOOGLE_API_KEY)
            return calendar.eventcs
                .list({
                  calendarId,
                  ...Object.fromEntries(params.entries()),
                })
                .then((response) => [calendarId, response.data])
          })

          const data = Object.fromEntries(await Promise.all(calendars))
          res.status(200).json(data)
        } catch (error) {
          console.error(error)
          res.status(500).json({ error: "Internal server error" })
        }
      })
    })

exports.getGazebo = functions
    .region("europe-west1")
    .runWith({ secrets: ["GOOGLE_API_KEY"] })
    .https.onRequest((req, res) => {
      cors(req, res, async () => {
        try {
          const url = new URL(req.url, `http://${req.headers.host}`)
          const gazeboId = url.searchParams.get("gazeboId")

          const gazeboRef = await admin
              .firestore()
              .collection("gazebos")
              .doc(gazeboId).get()

          if (gazeboRef.exists) {
            const gazebo = await gazeboRef.data()

            const params = {
              timeMin: new Date().toISOString(),
            }

            const paramsString = Object.entries(params)
                .map(([key, value]) => `&${key}=${value}`).join("")

            const calendars = gazebo.calendarIds.map((calendarId) => {
              const params = new URLSearchParams(paramsString)
              params.set("key", process.env.GOOGLE_API_KEY)
              return calendar.events
                  .list({
                    calendarId,
                    ...Object.fromEntries(params.entries()),
                  })
                  .then((response) => [calendarId, response.data])
            })

            const data = Object.fromEntries(await Promise.all(calendars))

            res.status(200).json(data)
          } else {
            console.error("Gazebo not found:", gazeboId)
            res.status(404).json({ error: "Gazebo not found" })
          }
        } catch (error) {
          console.error(error)
          res.status(500).json({ error: "Internal server error" })
        }
      })
    })

// following function runs automatically each time a user modifies a calendar
// it updates a root collection using the same id and the same data

exports.updateCalendar = functions
    .region("europe-west1")
    .firestore.document("users/{userId}/calendars/{calendarId}")
    .onWrite((change, context) => {
      const newValue = change.after.data()
      admin
          .firestore()
          .collection("gazebos")
          .doc(context.params.calendarId)
          .set(newValue)
    })
