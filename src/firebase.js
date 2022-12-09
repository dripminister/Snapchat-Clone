import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyCd2dpglkbqBlGwEuLPP4wKr2RGN_YFo6I",
	authDomain: "snapchat-clone-ed0c3.firebaseapp.com",
	projectId: "snapchat-clone-ed0c3",
	storageBucket: "snapchat-clone-ed0c3.appspot.com",
	messagingSenderId: "335046183964",
	appId: "1:335046183964:web:206fa0b5332fda35efe3d9",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider()