---
layout: page
---

<script setup>
import Diagram from './.vitepress/components/Diagram.vue'
</script>

<Diagram size="large" :fullPage="true">
<!--[<application:component> Directory] --|> [<application:component> Access Management]
[Access Management]-:>[<application:function> Authentication]
[Access Management]-:>[<application:function> Federation]
[Access Management] --|> JWT Token [<application:component>Client]-->
</Diagram>