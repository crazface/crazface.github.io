import Home, { ITEMS, Item, Category } from "./Home";

const cdn = (id: string) =>
  `https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F${id}`;

const NEW_ITEMS: Item[] = [
  {
    key: "capture-moment-title",
    kind: "plain",
    top: 2271.782,
    left: 250.676,
    width: 938.647,
    z: 400,
    src: cdn("48e345f7b74d46308fa40e18b1e8999e"),
    alt: "Let's Capture the Moment",
  },
  {
    key: "weddings-label",
    kind: "plain",
    top: 962.51,
    left: 723.624,
    width: 687.682,
    z: 2,
    rotate: 7.72,
    src: cdn("009bf116fb9b45108b5f3243c2d41dac"),
    alt: "Weddings",
  },
  {
    key: "polaroid-1",
    kind: "shadow",
    top: 993.645,
    left: 36.402,
    width: 863.35,
    z: 0,
    rotate: -1.54,
    src: cdn("a64fb8aeed43474cba782ece6ad94994"),
    alt: "Wedding Photo Polaroid",
  },
  {
    key: "polaroid-2",
    kind: "shadow",
    top: 1266.432,
    left: 529.485,
    width: 863.35,
    z: 0,
    rotate: -0.91,
    src: cdn("65ad2c9f05ba4beeb41b4d697d7cdb97"),
    alt: "Candle Photo Polaroid",
  },
];

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
  "phone",
  "tea-spill",
  "cta-img",
]);

// Position overrides for shared items, scoped to the photography page only
const ITEM_OVERRIDES: Record<string, Partial<Item>> = {
  "bottom-bg": { top: 1879.454 },
  "bottom-actions": { top: 2627.646 },
  "email-text": { top: 2744.581 },
};

const BASE_ITEMS = ITEMS.filter((item) => !PROJECT_KEYS.has(item.key)).map((item) =>
  ITEM_OVERRIDES[item.key] ? { ...item, ...ITEM_OVERRIDES[item.key] } : item,
);

const PHOTO_ITEMS = [...BASE_ITEMS, ...NEW_ITEMS];

const EXTRA_CATEGORIES: Category[] = [
  {
    label: "Photography Assets",
    keys: NEW_ITEMS.map((item) => item.key),
  },
];

export default function PhotographyHome() {
  return <Home initialItems={PHOTO_ITEMS} enableDebug={true} extraCategories={EXTRA_CATEGORIES} initialCanvasHeight={2860} />;
}
