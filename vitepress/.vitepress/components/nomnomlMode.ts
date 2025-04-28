import { StreamLanguage, StringStream } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { StateField, StateEffect, RangeSetBuilder } from '@codemirror/state'
import { EditorView, Decoration, DecorationSet } from '@codemirror/view'

// Define the nomnoml mode
const nomnomlMode = StreamLanguage.define({
  token(stream: StringStream) {
    if (stream.sol()) {
      stream.eatSpace()
      if (stream.peek() === '#') {
        stream.skipToEnd()
        return 'meta'
      }
      if (stream.match('//')) {
        stream.skipToEnd()
        return 'comment'
      }
    }

    const delimiters = '[]|;'.split('')
    const operator = '<>()+-:'.split('')
    const all = [...delimiters, ...operator]

    if (stream.peek() === '<') {
      stream.eat('<')
      if (stream.skipTo('>')) {
        stream.eat('>')
        return 'keyword'
      }
      return null
    }

    if (delimiters.some((c) => stream.eat(c))) return 'bracket'
    if (operator.some((c) => stream.eat(c))) return 'operator'
    stream.eatWhile((c: string) => all.indexOf(c) === -1)
    return null
  }
})

// Define the highlighting style
const nomnomlHighlightStyle = HighlightStyle.define([
  { tag: tags.meta, class: 'cm-meta' },
  { tag: tags.comment, class: 'cm-comment' },
  { tag: tags.keyword, class: 'cm-keyword' },
  { tag: tags.bracket, class: 'cm-bracket' },
  { tag: tags.operator, class: 'cm-operator' }
])

// Export the mode with highlighting
export const nomnoml = [
  nomnomlMode,
  syntaxHighlighting(nomnomlHighlightStyle)
]

// Effect to add and remove errors
export const addErrorEffect = StateEffect.define<{ line: number, column: number } | null>()

// Define a state field to store the error decorations
export const errorField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none
  },
  update(errors, tr) {
    // Clear errors when the document changes
    if (tr.docChanged) {
      return Decoration.none
    }
    
    // Update errors when the effect is dispatched
    for (const e of tr.effects) {
      if (e.is(addErrorEffect)) {
        if (e.value === null) {
          return Decoration.none
        }
        
        const { line, column } = e.value
        const doc = tr.state.doc
        const lineStart = doc.line(line).from
        const errorPos = lineStart + column - 1
        
        // Create decorations
        const builder = new RangeSetBuilder<Decoration>()
        
        // Add line decoration
        builder.add(lineStart, lineStart, Decoration.line({
          class: 'cm-error-line'
        }))
        
        // Add character decoration
        builder.add(errorPos, errorPos + 1, Decoration.mark({
          class: 'cm-error'
        }))
        
        return builder.finish()
      }
    }
    
    return errors
  },
  provide: f => EditorView.decorations.from(f)
})
