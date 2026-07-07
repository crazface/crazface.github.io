import Home, { ITEMS } from "./Home";

// Keys of the graphic-design project items (brand images + logos) to exclude
const PROJECT_KEYS = new Set([
  "starlight-img",
  "brandopus",
  "inside-img",
  "aya-img",
  "regenb-img",
  "flow-img",
  "starlight-logo",
  "inside-logo",
  "aya-logo",
  "regenb-logo",
  "flow-logo",
]);

const PHOTO_ITEMS = ITEMS.filter((item) => !PROJECT_KEYS.has(item.key));

export default function PhotographyHome() {
  return <Home initialItems={PHOTO_ITEMS} enableDebug={true} />;
}
