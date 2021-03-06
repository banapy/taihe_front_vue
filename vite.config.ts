import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from "path";
import Pages from "vite-plugin-pages";
import * as path from 'path';
import { viteExternalsPlugin } from 'vite-plugin-externals'
const resolve = (dir: string) => path.join(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Pages({
    dirs: [
      { dir: "src/views", baseRoute: "" },
      { dir: "src/examples", baseRoute: "map" },
    ]
  }), 
  viteExternalsPlugin({
    harp: "harp",
  })],
  resolve: {
    alias: {
      "@": resolve("src"),
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
})
