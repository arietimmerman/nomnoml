---
layout: page
---

<script setup>
import Diagram from './.vitepress/components/Diagram.vue'
</script>

<Diagram size="large" :fullPage="true">
<!--[<business:role> Customer]
[<business:actor> Sales Rep]
[<business:process> Order Processing]
[<business:function> Customer Support]
[<business:event> Order Received]
[<business:object> Order]
[<business:service> Customer Service]
[<application:component> CRM System]
[<application:function> Order Entry]
[<application:service> CRM API]
[<application:interface> Web Portal]
[<application:data> Customer Record]
[<technology:node> Web Server]
[<technology:device> Mobile Device]
[<technology:system_software> OS]
[<technology:communication_network> Internet]
[<technology:artifact> Deployment Package]
[<technology:service> Hosting]
[<technology:communication_network> VPN]
[<technology:application> Monitoring Tool]
[Customer] -|> [Order Received]
[Order Received] -|> [Order Processing]
[Order Processing] -> [Customer]
[Order Processing] -|> [Customer Support]
[Order Processing] -> [Order]
[Order] -> [CRM System]
[CRM System] --:> [Order Entry]
[Order Entry] -> [CRM API]
[CRM API] --:> [Web Portal]
[Web Portal] -> [Customer Record]
[Sales Rep] .--. [Web Portal]
[Customer Support] .--. [CRM System]
[CRM System] .--. [Web Server]
[Web Server] .--. [OS]
[Web Server] o-> [Internet]
[Mobile Device] .--. [Web Portal]
[Deployment Package] +- [Web Server]
[Hosting] .--. [Web Server]
[VPN] .--. [CRM System]
[Monitoring Tool] .--. [Web Server]-->
</Diagram>