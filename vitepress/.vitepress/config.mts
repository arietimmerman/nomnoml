import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Architext",
  description: "Archimate from Text",
  appearance: false,
  head: [
    ['meta', { property: 'og:title', content: 'Architext - Text to Archimate diagrams in seconds' }],
    ['meta', { property: 'og:description', content: 'An easy to use language for enterprise architects (and LLMs alike) that renders instant ArchiMate diagrams' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: '/architext-ogimage.png' }],
  ],
  vite: {
    resolve: {
      alias: {
        '@nomnoml': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  vue: {
    template: {
      compilerOptions: {
        whitespace: 'preserve'
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Playground', link: '/playground' },
      { text: 'Guide', link: '/guide/' }
    ],

    sidebar: {
      // Sidebar for guide pages
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' }, // Added intro link
            { text: 'Relationships', link: '/guide/relationships' },
            { text: 'Elements', link: '/guide/elements' }
          ]
        }
      ]
    }

    
  }
})
