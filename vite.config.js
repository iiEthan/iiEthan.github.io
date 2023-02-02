import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: 'src/main/index.html',
        OpenCams: 'src/OpenCams/index.html',
        VisualizingAmerica: 'src/Visualizing-America/index.html',
      },
    },
  },
})
