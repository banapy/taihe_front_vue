import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from "path";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Pages({ dirs: "src/views" })],
  resolve: {
    alias: {
      "@": "./src",
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
})
