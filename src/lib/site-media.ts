import background from "@/assets/site/background.png.asset.json";
import druk from "@/assets/site/Druk-Bold.otf.asset.json";
import drukWide from "@/assets/site/DrukWide-Bold.otf.asset.json";
import monoglyphic from "@/assets/site/Monoglyphic-VF.ttf.asset.json";

export const siteBackground = background;
export const siteFonts = [
  { name: "DRUK BOLD", family: "Druk", asset: druk, path: "DRUK/Druk-Bold.otf", role: "TÍTULOS PRINCIPAIS E LONGOS", className: "font-display" },
  { name: "DRUK WIDE BOLD", family: "Druk Wide", asset: drukWide, path: "DRUK/DrukWide-Bold.otf", role: "TÍTULOS SECUNDÁRIOS CURTOS", className: "font-display-wide" },
  { name: "MONOGLYPHIC", family: "Monoglyphic", asset: monoglyphic, path: "MONOGLYPHIC/Monoglyphic-VF.ttf", role: "TEXTO CORRIDO E INTERFACE", className: "font-sans" },
] as const;