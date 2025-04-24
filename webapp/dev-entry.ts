import { bootstrap } from './index'

// Wait for CodeMirror to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore - CodeMirror is loaded via script tag
  const CodeMirror = window.CodeMirror
  
  if (CodeMirror) {
    bootstrap(CodeMirror)
  } else {
    console.error('CodeMirror not found. Make sure it is loaded before this script.')
  }
}) 