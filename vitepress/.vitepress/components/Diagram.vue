<script setup>
import { ref, onMounted, onUnmounted, useSlots } from 'vue'
import { renderSvg } from '@nomnoml/nomnoml'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'

const container = ref(null)
const editorContainer = ref(null)
const slots = useSlots()
let editor = null

const renderDiagram = (content) => {
    if (container.value) {
        const svg = renderSvg(content)
        container.value.innerHTML = svg
    }
}

onMounted(() => {
    // Get the slot content directly from the default slot
    const slotContent = slots.default?.();   
    const diagramContent = slotContent?.[0]?.children || ''    

    editor = new EditorView({
        state: EditorState.create({
            doc: diagramContent,
            extensions: [
                basicSetup,
                EditorView.updateListener.of(update => {
                    if (update.docChanged) {
                        renderDiagram(update.state.doc.toString())
                    }
                })
            ]
        }),
        parent: editorContainer.value
    })

    renderDiagram(diagramContent)
})

onUnmounted(() => {
    editor?.destroy()
})
</script>

<template>
    <div class="diagram-wrapper">
        <div ref="editorContainer" class="editor"></div>
        <div class="diagram-container">
            <div ref="container"></div>
        </div>
    </div>
</template>

<style scoped>
.diagram-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.editor :deep(.cm-editor) {
    min-height: calc(1em * 1.5);
    /* 2 lines */
    max-height: calc(10em * 1.5);
    /* 10 lines */
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: auto;
}

.diagram-container {
    background-color: #f5f5f5;
    border-radius: 8px;
    margin: 0 0 16px 0;
}

.diagram-container :deep(svg) {
    width: 100%;
    height: auto;
    max-height: 500px;
}
</style>