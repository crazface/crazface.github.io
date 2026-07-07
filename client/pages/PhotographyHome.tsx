import Home, { ITEMS, Item, Category } from "./Home";

const cdn = (id: string) =>
  `https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F${id}`;

const NEW_ITEMS: Item[] = [
  {
    key: "capture-moment-title",
    kind: "plain",
    top: 3575.145,
    left: 250.676,
    width: 938.647,
    z: 400,
    src: cdn("48e345f7b74d46308fa40e18b1e8999e"),
    alt: "Let's Capture the Moment",
  },
  {
    key: "weddings-label",
    kind: "plain",
    top: 1084.646,
    left: 1020.964,
    width: 320,
    z: 401,
    rotate: -4,
    src: cdn("009bf116fb9b45108b5f3243c2d41dac"),
    alt: "Weddings",
  },
  {
    key: "polaroid-1",
    kind: "shadow",
    top: 1045.721,
    left: 37.094,
    width: 863.35,
    z: 402,
    rotate: -6,
    src: cdn("a64fb8aeed43474cba782ece6ad94994"),
    alt: "Wedding Photo Polaroid",
  },
  {
    key: "polaroid-2",
    kind: "shadow",
    top: 1318.091,
    left: 531.661,
    width: 863.35,
    z: 403,
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

const PHOTO_ITEMS = [...ITEMS.filter((item) => !PROJECT_KEYS.has(item.key)), ...NEW_ITEMS];

const EXTRA_CATEGORIES: Category[] = [
  {
    label: "Photography Assets",
    keys: NEW_ITEMS.map((item) => item.key),
  },
];

export default function PhotographyHome() {
  return <Home initialItems={PHOTO_ITEMS} enableDebug={true} extraCategories={EXTRA_CATEGORIES} />;
}
