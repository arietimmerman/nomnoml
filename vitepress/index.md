---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Architext"
  text: "Text to Archimate diagrams in seconds."
  tagline: An easy to use language for enterprise architects (and LLMs alike) that renders instant ArchiMate diagrams
  image:
    src: /architext.svg
    alt: Architext
  actions:
    - theme: brand
      text: Playground
      link: /playground
    - theme: alt
      text: Guide
      link: /guide

---

<script setup>
import Diagram from './.vitepress/components/Diagram.vue'
</script>
::: tip Curious how Architext works?
Jump right in and experiment with the Playground: type your own text and instantly see it transformed into ArchiMate diagrams.  
No setup required. Perfect for exploring features, learning the syntax, or prototyping ideas in real time.
:::

<Diagram>[&lt;application:component&gt; Application Component]&#10;[Application Component]  --&gt; [&lt;application:data&gt; Data Object]&#10;[&lt;business:actor&gt; Business Actor]  .-|&gt; assignment [&lt;business:role&gt; Customer]&#10;[Customer]  &lt;- [&lt;business:service&gt; Business Service A]&#10;[Business Service A]  &lt;:-- [&lt;business:process&gt; Business Process A]&#10;[Business Process A]  --&gt; [&lt;business:data&gt; Business Object]&#10;[&lt;application:data&gt; Data Object]  --:&gt; [Business Object]&#10;[&lt;technology:service&gt; Technology Service A]  -&gt; [Application Component]&#10;[&lt;technology:node&gt; Platform A]  --:&gt; [Technology Service A]&#10;[Platform A]  --&gt; [&lt;technology:artifact&gt; Artifact]&#10;[Artifact]  --:&gt; [Data Object]&#10;[Application Component]  -&gt;  [Business Service A]&#10;[&lt;application:service&gt; Application Service A]  &lt;-  [Business Process A]&#10;[&lt;business:actor&gt; Business Actor 2]  .--|&gt; [Business Process A]</Diagram>