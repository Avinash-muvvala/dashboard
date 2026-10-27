// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDESde3w9vUCzNn1M1A1oBpaRW-M5a8LpA",
  authDomain: "webapp-46384.firebaseapp.com",
  projectId: "webapp-46384",
  storageBucket: "webapp-46384.firebasestorage.app",
  messagingSenderId: "773292695930",
  appId: "1:773292695930:web:94f11f9c3a2ae7296776c3",
  measurementId: "G-MLQMTGGQ9J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appCheckSiteKey =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LdUF-QtAAAAAJGiCBRsVcP2usXV7TktMAH_lT1j";

if (import.meta.env.DEV) {
  Object.assign(self, { FIREBASE_APPCHECK_DEBUG_TOKEN: true });
}

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
  isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
