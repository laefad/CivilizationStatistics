export enum CursorState {
    passive,
    active // under any clickable element
}

export const useCursorState = () => {
    const cursor = ref<CursorState>(CursorState.passive)

    const isClickable = (element: HTMLElement): boolean => {
        // TODO specify all cases
        if (['A', 'BUTTON', 'INPUT'].includes(element.nodeName)) {
            return true
        } else if (element.parentElement) {
            return isClickable(element.parentElement)
        } else {
            return false
        }
    }

    onMounted(() => {
        document.addEventListener('mouseover', (e) => {
            const target = e.target as HTMLElement
            cursor.value = isClickable(target) ? CursorState.active : CursorState.passive
        })
    })

    return cursor
}
