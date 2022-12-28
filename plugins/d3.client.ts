import * as d3 from "d3";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('d3', d3)
  // nuxtApp.vueApp.use(d3 as any)
})