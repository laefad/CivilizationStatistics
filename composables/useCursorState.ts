export enum CursorState {
    auto = 'auto',
    none = 'none',
    pointer = 'pointer'
    // todo add more states from https://developer.mozilla.org/ru/docs/Web/CSS/cursor
}

export const useCursorState = () => {
    const cursor = ref<CursorState>(CursorState.auto)

    onMounted(() => {
        document.addEventListener('mouseover', (e) => {
            cursor.value = getComputedStyle(e.target as Element).cursor as unknown as CursorState
        });
    })

    return cursor
}
