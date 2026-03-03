// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://bugracdnc.github.io',
  base: '/neslihanogretmenim', // This must match your GitHub repository name exactly

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [vue()]
});