import { siteBackgroundShapes } from "@/lib/site-media";

/**
 * Shared site background: the official background shapes (supplied as
 * separate vectors) laid over the flat base colour, each drifting slowly on
 * its own path. The frame behaves like `background-size: cover` at 16:9.
 */
export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="site-bg-animated">
      <div className="site-bg-animated__frame">
        <img src={siteBackgroundShapes.wide} alt="" className="site-bg-shape site-bg-shape--wide" />
        <img src={siteBackgroundShapes.stairs} alt="" className="site-bg-shape site-bg-shape--stairs" />
        <img src={siteBackgroundShapes.long} alt="" className="site-bg-shape site-bg-shape--long" />
      </div>
      <div className="site-bg-animated__dim" />
    </div>
  );
}
