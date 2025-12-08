import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://leomoura.org',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'monokai',
    },
  },
});
