const functions = require("firebase-functions")
const { google } = require("googleapis")
const cors = require("cors")({ origin: true })

const calendar = google.calendar("v3")

exports.getCalendars = functions
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
            return calendar.events
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
