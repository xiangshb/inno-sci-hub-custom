// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static",
  base: "/inno-sci-hub-custom",
  integrations: [
    tailwind(),
    react(),
  ],
  vite: {
    plugins: [],
    build: {
      rollupOptions: {
        external: [
          "@/components/Head",
          "@/styles/global.css",
          "@wix/seo/components",
          "@wix/seo/services",
          "@wix/image-kit",
          "@wix/wix-vibe-plugins/plugins-vars.css",
          "@wix/wix-vibe-plugins/plugins-theme.css",
          "@/components/StaticRouter",
          "@/components/Router",
          "@/components",
          "@/lib/scroll-to-top",
          "@/components/pages/HomePage",
          "@/components/pages/InsightsPage",
          "@/components/pages/ResearchPlansPage",
          "@/components/pages/AgentsPage",
          "@/components/pages/ToolsPage",
          "@/components/pages/KnowledgePage",
          "@/components/pages/VisualizationsPage",
          "@/services/mockDataService",
          "@/lib/utils",
          "@/hooks/use-size",
          "@/components/ui/button",
          "@/components/ui/card",
          "@/components/ui/input",
          "@/components/ui/badge",
          "@/components/ui/progress",
          "@/components/ui/select",
          "@/components/ui/textarea",
          "@/components/ui/tabs",
          "@/components/ui/accordion",
          "@/components/ui/alert",
          "@/components/ui/alert-dialog",
          "@/components/ui/avatar",
          "@/components/ui/calendar",
          "@/components/ui/checkbox",
          "@/components/ui/collapsible",
          "@/components/ui/command",
          "@/components/ui/context-menu",
          "@/components/ui/dialog",
          "@/components/ui/dropdown-menu",
          "@/components/ui/form",
          "@/components/ui/hover-card",
          "@/components/ui/image",
          "@/components/ui/label",
          "@/components/ui/loading-spinner",
          "@/components/ui/menubar",
          "@/components/ui/navigation-menu",
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react-router-dom",
          "framer-motion",
          "lucide-react",
          "@/components/ui/popover",
          "@/components/ui/progress",
          "@/components/ui/radio-group",
          "@/components/ui/scroll-area",
          "@/components/ui/separator",
          "@/components/ui/sheet",
          "@/components/ui/skeleton",
          "@/components/ui/slider",
          "@/components/ui/switch",
          "@/components/ui/table",
          "@/components/ui/toast",
          "@/components/ui/toaster",
          "@/components/ui/toggle-group",
          "@/components/ui/toggle",
          "@/components/ui/tooltip"
        ]
      }
    }
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    domains: ["static.wixstatic.com"],
  },
  server: {
    allowedHosts: true,
    host: true,
  },
});
