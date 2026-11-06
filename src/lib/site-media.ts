import background from "@/assets/site/background.png.asset.json";
import bgShapeStairs from "@/assets/site/bg-shape-stairs.svg.asset.json";
import bgShapeWide from "@/assets/site/bg-shape-wide.svg.asset.json";
import bgShapeLong from "@/assets/site/bg-shape-long.svg.asset.json";
import druk from "@/assets/site/Druk-Bold.otf.asset.json";
import drukWide from "@/assets/site/DrukWide-Bold.otf.asset.json";
import monoglyphic from "@/assets/site/Monoglyphic-VF.ttf.asset.json";
import logoBlack from "@/assets/site/cazetv-logo-black.svg.asset.json";
import logoWhite from "@/assets/site/cazetv-logo-white.svg.asset.json";
import logoMainBlack from "@/assets/site/cazetv-logo-main-black.svg.asset.json";
import logoMainWhite from "@/assets/site/cazetv-logo-main-white.svg.asset.json";
import symbolBlack from "@/assets/site/cazetv-symbol-black.svg.asset.json";
import symbolWhite from "@/assets/site/cazetv-symbol-white.svg.asset.json";
import backgroundHorizontal from "@/assets/site/brand-background-horizontal.png.asset.json";
import backgroundVertical from "@/assets/site/brand-background-vertical.png.asset.json";

export const siteBackground = background;
/** Official background shapes (vector), animated individually by AnimatedBackground. */
export const siteBackgroundShapes = {
  stairs: bgShapeStairs.url,
  wide: bgShapeWide.url,
  long: bgShapeLong.url,
} as const;
export const siteLogos = { black: logoBlack.url, white: logoWhite.url } as const;
export const siteMainLogos = { black: logoMainBlack.url, white: logoMainWhite.url } as const;
export const siteSymbols = { black: symbolBlack.url, white: symbolWhite.url } as const;
export const brandBackgrounds = { horizontal: backgroundHorizontal.url, vertical: backgroundVertical.url } as const;
export const siteFonts = [
  { name: "DRUK BOLD", family: "Druk", asset: druk, path: "DRUK/Druk-Bold.otf", role: "TÍTULOS PRINCIPAIS E LONGOS", className: "font-display" },
  { name: "DRUK WIDE BOLD", family: "Druk Wide", asset: drukWide, path: "DRUK/DrukWide-Bold.otf", role: "TÍTULOS SECUNDÁRIOS CURTOS", className: "font-display-wide" },
  { name: "MONOGLYPHIC", family: "Monoglyphic", asset: monoglyphic, path: "MONOGLYPHIC/Monoglyphic-VF.ttf", role: "TEXTO CORRIDO E INTERFACE", className: "font-sans" },
] as const;