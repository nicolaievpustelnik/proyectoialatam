
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAtReLSAagsbkdDWFK7WyY1TKV6xEhE1WE",
  authDomain: "proyectoai-2025.firebaseapp.com",
  projectId: "proyectoai-2025",
  storageBucket: "proyectoai-2025.firebasestorage.app",
  messagingSenderId: "679340258197",
  appId: "1:679340258197:web:91847aa12a4d2a995f7c9c",
  measurementId: "G-FW33K54Z49"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
