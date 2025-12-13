// Types
import type { UnwrapRef } from 'vue'

// Utilities
import { ref } from 'vue'
import { ref as firebaseRef, onValue } from 'firebase/database'

// https://firebase.google.com/docs/database/web/read-and-write#write_data
export const useFirebaseValueFromPath = <T>(
    path: string,
    defaultValue: T
) => {
    const { $firebase } = useNuxtApp()
    const query = firebaseRef($firebase, path)

    // TODO can be cached
    const value = ref<T>(defaultValue)

    // Getting updates from firebase
    onValue(query, (snapshot) => {
        value.value = snapshot.val() as UnwrapRef<T>
    })

    // Without write access this code will only throw errors and send useless requests to firebase
    // // Sending updates to firebase
    // watch(value, () => {
    //     set(query, value.value)
    // })

    return value
}
