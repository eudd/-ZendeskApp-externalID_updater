import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
  mode:'production',   //'production'|'development'
  root: 'src',
  base:'./',
  resolve:{
    extensions:['.js','.ts']
  },
  build : {
    outDir : resolve(__dirname, '../dist/assets'),
    assetsDir:'./',
    sourcemap:false,  //boolean | 'inline' | 'hidden'
    minify:true,    //boolean | 'terser' | 'esbuild'
    polyfillModulePreload:false,
    emptyOutDir:false,
    copyPublicDir:true,
    rollupOptions : {
      input:{
        usb: 'src/usb.html'
      },
      output:{
        compact:true,
        entryFileNames:'[name].bundle-[hash].js',
        assetFileNames:'[name].bundle-[hash][extname]'
      }
    }
  }
})