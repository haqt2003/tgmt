import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAF-_pj4jZgrhGyt5TXreAAWMJ7nqasF2k",
  authDomain: "the-best-records.firebaseapp.com",
  projectId: "the-best-records",
  storageBucket: "the-best-records.appspot.com",
  messagingSenderId: "183642075882",
  appId: "1:183642075882:web:36cade320249dee7cddd93",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app, "gs://the-best-records.appspot.com");

export { auth, ref, storage, getDownloadURL, uploadBytes };
