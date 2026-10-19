import imported from "@/data/imported-recipes.json";
import { recipes, type Recipe } from "@/lib/recipes";

export type ImportedRecipe = (typeof imported.recipes)[number];
export type LibraryEntry = {
  id: string;
  title: string;
  category: string;
  topic: string;
  status: "basis" | "zutaten" | "quelle";
  tone: Recipe["tone"];
  shape: Recipe["shape"];
  recipe?: Recipe;
  imported?: ImportedRecipe;
};

export const libraryCategories = ["Alle", "Gesicht", "Haare", "Körper", "Lippen & Hände", "Bad & Wellness", "Duft & Deo", "Rohstoffe & DIY", "Weitere"];
export const PAGE_SIZE = 12;
export const importMetadata = {
  sourceName: imported.sourceName,
  recordedOn: imported.recordedOn,
  sourceUrl: imported.sourceUrl,
  count: imported.recipes.length,
  ingredientRows: imported.recipes.reduce((count, recipe) => count + recipe.ingredients.length, 0),
};

export function normalizeSearch(value: string) {
  return value.toLocaleLowerCase("de").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g, "ss").replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u");
}

function categoryFor(recipe: ImportedRecipe) {
  const title = normalizeSearch(recipe.title);
  if (/lippen|lip balm|lipgloss|hande|handcreme|handpflege|handbalsam|nagel/.test(title)) return "Lippen & Hände";
  if (/haar|hair|shampoo|conditioner|locken|bartol/.test(title) || recipe.topic === "Haarpflege") return "Haare";
  if (/hakeln|waschlappen|microfaser/.test(title)) return "Rohstoffe & DIY";
  if (/gesicht|face |facial|make.?up|foundation|primer/.test(title)) return "Gesicht";
  if (recipe.topic === "Bad & Wellness") return "Bad & Wellness";
  if (["Deo", "Düfte & Aromapflege"].includes(recipe.topic) || /deo|parfum|roll-on/.test(title)) return "Duft & Deo";
  if (["Rohstoffe & Extrakte", "Seife & Haushalt"].includes(recipe.topic) || /extrakt|pigment|pink clay|cacay/.test(title)) return "Rohstoffe & DIY";
  if (["Gesichtspflege", "Augenpflege", "Anti-Age & Seren", "Abschminken & Reinigung", "Männerpflege"].includes(recipe.topic)) return "Gesicht";
  if (recipe.topic === "Lippenpflege") return "Lippen & Hände";
  if (["Körperpflege", "Peeling", "Sonne & Sommer"].includes(recipe.topic) || /pflegemuffin|herbstsahne|hangehaut/.test(title)) return "Körper";
  return "Weitere";
}

const tones: Recipe["tone"][] = ["pink", "lavender", "mint", "yellow"];
export const libraryEntries: LibraryEntry[] = [
  ...recipes.map((recipe): LibraryEntry => ({ id: recipe.id, title: recipe.title, category: recipe.category, topic: recipe.category, status: "basis", tone: recipe.tone, shape: recipe.shape, recipe })),
  ...imported.recipes.map((recipe, index): LibraryEntry => ({
    id: recipe.id,
    title: recipe.title,
    category: categoryFor(recipe),
    topic: recipe.topic,
    status: recipe.ingredients.length ? "zutaten" : "quelle",
    tone: tones[index % tones.length],
    shape: /öl|serum|spray|fluid|extrakt|parfüm/i.test(recipe.title) ? "bottle" : /salz|peeling|maske/i.test(recipe.title) ? "bowl" : /stück|bar|seife|taler|praline/i.test(recipe.title) ? "bar" : "jar",
    imported: recipe,
  })),
];

export const libraryTopics = ["Alle", ...Array.from(new Set(libraryEntries.map((entry) => entry.topic))).sort((a, b) => a.localeCompare(b, "de"))];
export const libraryCounts = {
  all: libraryEntries.length,
  basis: libraryEntries.filter((entry) => entry.status === "basis").length,
  zutaten: libraryEntries.filter((entry) => entry.status === "zutaten").length,
  quelle: libraryEntries.filter((entry) => entry.status === "quelle").length,
};

export type LibraryFilters = { category: string; topic: string; status: string; query: string; sort: string; page: number };
export const defaultFilters: LibraryFilters = { category: "Alle", topic: "Alle", status: "Alle", query: "", sort: "az", page: 1 };

const searchText = new Map(libraryEntries.map((entry) => [entry.id, normalizeSearch([
  entry.title, entry.category, entry.topic,
  ...(entry.recipe?.ingredients.map((ingredient) => ingredient.name) ?? []),
  ...(entry.imported?.ingredients.map((ingredient) => ingredient.name) ?? []),
  entry.imported?.sourceNumber ?? "",
].join(" "))]));

export function filterLibrary(filters: LibraryFilters) {
  const words = normalizeSearch(filters.query).trim().split(/\s+/).filter(Boolean);
  const result = libraryEntries.filter((entry) =>
    (filters.category === "Alle" || entry.category === filters.category) &&
    (filters.topic === "Alle" || entry.topic === filters.topic) &&
    (filters.status === "Alle" || entry.status === filters.status) &&
    words.every((word) => searchText.get(entry.id)!.includes(word)),
  );
  return result.sort((a, b) => {
    if (filters.sort === "basis" && (a.status === "basis") !== (b.status === "basis")) return a.status === "basis" ? -1 : 1;
    const alphabetical = a.title.localeCompare(b.title, "de", { sensitivity: "base", ignorePunctuation: true, numeric: true });
    return filters.sort === "za" ? -alphabetical : alphabetical;
  });
}

export function paginateLibrary(filters: LibraryFilters) {
  const results = filterLibrary(filters);
  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Math.floor(filters.page) || 1));
  return { results, pages, page, entries: results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) };
}

export function recipeIdFromHash(hash: string) {
  if (!hash.startsWith("#rezept-")) return null;
  const id = hash.slice("#rezept-".length);
  return libraryEntries.some((entry) => entry.id === id) ? id : null;
}

export function filtersForRecipe(id: string, current: LibraryFilters): LibraryFilters {
  let filters = current;
  let index = filterLibrary(filters).findIndex((entry) => entry.id === id);
  if (index < 0) {
    filters = { ...defaultFilters, sort: current.sort };
    index = filterLibrary(filters).findIndex((entry) => entry.id === id);
  }
  return index < 0 ? current : { ...filters, page: Math.floor(index / PAGE_SIZE) + 1 };
}

export function ingredientGroups(recipe: ImportedRecipe) {
  // Keep consecutive sections and alternatives in their original order.
  const groups: { name: string; ingredients: ImportedRecipe["ingredients"] }[] = [];
  for (const ingredient of recipe.ingredients) {
    const name = ingredient.section || "Zutaten";
    if (groups.at(-1)?.name !== name) groups.push({ name, ingredients: [] });
    groups.at(-1)!.ingredients.push(ingredient);
  }
  return groups;
}
