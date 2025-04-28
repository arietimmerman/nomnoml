import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Architext",
  description: "Archimate from Text",
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
      { text: 'Examples', link: '/markdown-examples' }
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
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
