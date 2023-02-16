// Utilities
import { watch, ref } from 'vue'
import { ref as firebaseRef, onValue, set } from 'firebase/database'

// https://firebase.google.com/docs/database/web/read-and-write#write_data
// https://v3.nuxtjs.org/guide/directory-structure/composables
export const useFirebaseValueFromPath = <T>(
    path: string,
    defaultValue: T
) => {
    const { $firebase } = useNuxtApp()
    const query = firebaseRef($firebase, path)

    // Я так и не понял, оно кеширует или нет, если нет, то можно прям тут кешировать для первичного получения данных
    const value = ref<T>(defaultValue)

    // Получаем обновления данных из firebase
    onValue(query, (snapshot) => {
        const data: T = snapshot.val()
        value.value = data
    })

    // Ключ все равно только на чтение, но может когда-нибудь можно будет использовать для админки
    // // Отправляем обновления данных в firebase
    // watch(value, () => {
    //     set(query, value.value)
    // })

    return value
}
