import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const config = {
  apiKey: "AIzaSyBeCq2hCK2QaRgL5Ip2AQXtcL00NWo2FNc",
  authDomain: "gazebo-81481.firebaseapp.com",
  projectId: "gazebo-81481",
  storageBucket: "gazebo-81481.appspot.com",
  messagingSenderId: "1056062064150",
  appId: "1:1056062064150:web:94e282256a1b11dac71737",
};

export default defineNuxtPlugin((/* nuxtApp */) => {
  const app = initializeApp(config);
  const auth = getAuth(app);

  let userData = useState("userData", () => null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userData.value = user;
    } else {
      userData.value = null;
    }
  });

  const provider = new GoogleAuthProvider();
  return {
    provide: {
      signIn: () => signInWithPopup(auth, provider),
    },
  };
});
