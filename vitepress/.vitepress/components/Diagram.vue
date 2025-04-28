<script setup>
import { ref, onMounted, onUnmounted, useSlots, defineProps } from 'vue'
import { renderSvg } from '@nomnoml/nomnoml'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'

const container = ref(null)
const editorContainer = ref(null)
const slots = useSlots()
let editor = null

const props = defineProps({
    direction: {
        type: String,
        default: undefined,
        validator: (val) => !val || val === 'down' || val === 'right',
    },
    size: {
        type: String,
        default: 'medium',
    },
})

function injectDirection(content, direction) {
    if (!direction) return content
    // Only inject if not already present
    if (/^#direction:/m.test(content)) return content
    return `#direction: ${direction}\n${content}`
}

const renderDiagram = (content) => {
    if (container.value) {
        const processed = injectDirection(content, props.direction)
        const svg = renderSvg(processed)
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
        <div class="diagram-container" :class="`size-${props.size}`">
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
}

.diagram-container.size-small :deep(svg) {
    max-height: 200px;
}
.diagram-container.size-medium :deep(svg) {
    max-height: 400px;
}
.diagram-container.size-large :deep(svg) {
    max-height: 600px;
}

</style>