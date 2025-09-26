// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://jake-meyers.com",
  integrations: [tailwind(), sitemap(), icon(), partytown()],
});
