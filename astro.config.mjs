// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkCodeTitles from 'remark-code-titles';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkCodeTitles],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});