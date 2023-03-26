import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
import { defineNuxtPlugin } from '#imports'
import { useUserStore } from '~/stores/user.store'

const config = {
  apiKey: 'AIzaSyBeCq2hCK2QaRgL5Ip2AQXtcL00NWo2FNc',
  authDomain: 'gazebo-81481.firebaseapp.com',
  projectId: 'gazebo-81481',
  storageBucket: 'gazebo-81481.appspot.com',
  messagingSenderId: '1056062064150',
  appId: '1:1056062064150:web:94e282256a1b11dac71737'
}

export default defineNuxtPlugin(({ $pinia, ...other }) => {
  const app = initializeApp(config)
  initializeFirestore(app, { ignoreUndefinedProperties: true })

  const auth = getAuth(app)
  const firestore = getFirestore(app)

  const userStore = useUserStore($pinia)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.setUser(user)
      userStore.fetchCalendars();
    } else if (userStore.user) {
      userStore.setUser(null)
      window.location.reload(true)
    }
  })

  const provider = new GoogleAuthProvider()
  return {
    provide: {
      signIn: () => signInWithRedirect(auth, provider),
      signOut: () => auth.signOut(),
      firestore
    }
  }
})
