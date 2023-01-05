import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

export default defineNuxtPlugin((nuxtApp) => {

    const firebaseConfig = {
		apiKey: "AIzaSyC0hQGMZ2Y8PGTvKFNzy9aIKkkPUSWdVpE",
		authDomain: "civ-vi-a3b50.firebaseapp.com",
		databaseURL: "https://civ-vi-a3b50-default-rtdb.europe-west1.firebasedatabase.app",
		projectId: "civ-vi-a3b50",
		storageBucket: "civ-vi-a3b50.appspot.com",
		messagingSenderId: "388579783887",
		appId: "1:388579783887:web:902f07dc74ebdad10c33ba",
		measurementId: "G-Z0XYY9Z76Y"
	};

    // TODO getApp можно еще использовать, но данный плагин все равно вызываться должен лишь единожды
    const firebaseApp = initializeApp(firebaseConfig)
    const db = getDatabase(firebaseApp)
    
    return {
        provide : {
            firebase: db
        }
    }
})
