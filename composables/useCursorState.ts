export enum CursorState {
    passive,
    active // under any clickable element
}

export const useCursorState = () => {
    const cursor = ref<CursorState>(CursorState.passive)

    onMounted(() => {
        document.addEventListener('mouseover', (e) => {
            const target = e.target as HTMLElement
            // TODO specify all cases
            if (['A', 'BUTTON', 'INPUT'].includes(target.nodeName) ||
                target.role == 'button'
            ) {
                cursor.value = CursorState.active
            } else {
                cursor.value = CursorState.passive
            }
        });
    })

    return cursor
}
