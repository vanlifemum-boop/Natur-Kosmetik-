import { ArrowRight, BookOpen, ChevronDown, Clock3, ExternalLink, ShieldCheck } from "lucide-react";
import { freshStorageNote, storageNote, type Recipe } from "@/lib/recipes";
import { ingredientGroups, type ImportedRecipe, type LibraryEntry } from "@/lib/library";

function RecipeArt({ shape }: { shape: Recipe["shape"] }) {
  return <svg viewBox="0 0 240 155" fill="none" className="recipe-art" aria-hidden="true">
    <ellipse cx="122" cy="138" rx="57" ry="7" fill="currentColor" opacity=".09" />
    <path d="M48 38v16m-8-8h16M191 85v12m-6-6h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="185" cy="33" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M67 108c-12-19-30-16-24 0 4 10 18 10 24 0Zm1 0c7-26 24-27 24-12-1 11-13 17-24 12Z" fill="currentColor" opacity=".35" />
    {shape === "bottle" ? <g transform="rotate(9 125 85)">
      <rect x="101" y="20" width="43" height="22" rx="8" fill="currentColor" />
      <path d="M101 41h43v12l12 16v57q0 9-9 9H98q-9 0-9-9V69l12-16Z" fill="white" stroke="currentColor" strokeWidth="3" />
      <rect x="96" y="78" width="53" height="38" rx="6" fill="var(--card-accent)" />
      <path d="M115 98q13-16 19-11-1 18-19 11Zm2 10 13-15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </g> : shape === "bar" ? <g transform="rotate(-12 125 87)">
      <rect x="77" y="56" width="102" height="69" rx="24" fill="white" stroke="currentColor" strokeWidth="3" />
      <rect x="86" y="64" width="84" height="48" rx="19" fill="var(--card-accent)" />
      <path d="M112 91q15-21 26-13-3 23-26 13Zm2 11 19-18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </g> : shape === "bowl" ? <g>
      <path d="m133 71 30-48q4-6 9-3t2 9l-24 48" fill="white" stroke="currentColor" strokeWidth="3" />
      <path d="M69 74h109q-5 56-55 56T69 74Z" fill="white" stroke="currentColor" strokeWidth="3" />
      <ellipse cx="123" cy="73" rx="54" ry="12" fill="var(--card-accent)" stroke="currentColor" strokeWidth="3" />
      <path d="M104 103q18 14 37 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </g> : <g transform="rotate(-7 125 87)">
      <rect x="77" y="59" width="97" height="72" rx="18" fill="white" stroke="currentColor" strokeWidth="3" />
      <rect x="72" y="44" width="107" height="24" rx="9" fill="currentColor" />
      <rect x="86" y="81" width="79" height="32" rx="5" fill="var(--card-accent)" />
      <path d="M119 97q0-10 7-5 8-5 8 5l-8 7Z" fill="currentColor" />
    </g>}
  </svg>;
}


function BasicRecipeDetails({ recipe }: { recipe: Recipe }) {
  return <>
    <div className="recipe-yield"><strong>Das brauchst du</strong><span>Ergibt {recipe.yieldGrams} g{recipe.fresh ? " · 1 Anwendung" : ""}</span></div>
    <ul className="ingredients">
      {recipe.ingredients.map((ingredient) => <li key={ingredient.name}><strong>{ingredient.grams.toLocaleString("de-DE")} g</strong><span>{ingredient.name}</span></li>)}
    </ul>
    <p className="equipment"><strong>Utensilien:</strong> {recipe.equipment}</p>
    <p className="prep-reminder">Vor dem Start: <a href="#wissen">sauber und trocken arbeiten</a>. {recipe.minutes} Minuten Arbeitszeit, gegebenenfalls plus Abkühlzeit.</p>
    <h4>Schritt für Schritt</h4>
    <ol className="recipe-steps">{recipe.steps.map((step) => <li key={step}>{step}</li>)}</ol>
    <h4>Anwendung</h4><p>{recipe.use}</p>
    <h4>Aufbewahrung</h4><p>{recipe.fresh ? freshStorageNote : storageNote}</p>
    <div className="recipe-warning"><ShieldCheck size={19} /><p><strong>Bitte beachten</strong>{recipe.caution} Nur für Erwachsene. Bei Unverträglichkeit absetzen. Die Basisidee ist nicht laborgeprüft.</p></div>
  </>;
}

function ImportedRecipeDetails({ recipe }: { recipe: ImportedRecipe }) {
  const needsReview = recipe.ingredients.filter((ingredient) => ingredient.quality !== "Erfasst").length;
  const sunClaim = /lichtschutz|\blsf\b|sonnenschutz/i.test(recipe.title);
  return <>
    <div className="import-notice">
      <BookOpen size={20} aria-hidden="true" />
      <p><strong>Quellenrezept von Schwatz Katz</strong>Aus der bereitgestellten Datei übernommen, Stand 24.08.2026. Zutaten können unvollständig oder falsch extrahiert sein. Dies ist keine vollständige Herstellungsanleitung.</p>
    </div>
    <a className="source-button" href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">Originalbeitrag öffnen <ExternalLink size={16} aria-hidden="true" /></a>
    {sunClaim && <p className="special-warning"><strong>Kein zugesicherter UV-Schutz.</strong> Ein LSF im Originaltitel ist hier nicht nachgewiesen. Diese ungeprüften Notizen nicht als Sonnenschutz-Rezept verwenden; für UV-Schutz ein geprüftes Sonnenschutzprodukt wählen.</p>}
    {recipe.ingredients.length > 0 ? <>
      <h4>Erfasste Zutaten & Materialien</h4>
      {recipe.yield && <p className="import-yield">Ausbeute laut Datei: {recipe.yield}</p>}
      <p className="import-caveat">Mengen und Varianten unverändert aus dem Import. Vor dem Nachmachen die vollständige Originalrezeptur einschließlich Phasen, Temperaturen, pH-Wert und Konservierung prüfen.</p>
      {needsReview > 0 && <p className="quality-note">{needsReview} {needsReview === 1 ? "Zutatenzeile ist" : "Zutatenzeilen sind"} bereits in der Datei als prüfbedürftig markiert.</p>}
      {ingredientGroups(recipe).map((group, groupIndex) => <div className="ingredient-group" key={groupIndex}>
        <h5>{group.name}</h5>
        <ul className="ingredients import-ingredients">{group.ingredients.map((ingredient, index) => <li key={index}>
          <strong>{ingredient.amount || "—"}</strong>
          <span>{ingredient.name}{ingredient.quality !== "Erfasst" && <small className="quality-flag">Angabe prüfen</small>}</span>
        </li>)}</ul>
      </div>)}
    </> : <div className="missing-data">
      <h4>Keine Mengenangaben im Import</h4>
      <p>{recipe.sourceStatus === "Kein Mengenrezept erkannt"
        ? "In der Datei wurde kein Mengenrezept erkannt. Der Originalbeitrag kann zum Beispiel eine DIY- oder Materialanleitung enthalten."
        : "Die Datei kennzeichnet diesen Eintrag als „Premium/kein öffentlicher Rezeptblock“. Ob ein Zugang nötig ist, siehst du beim Anbieter."}</p>
      <p>Fehlende Zutaten und Anleitungen wurden nicht ergänzt oder erfunden. Der Eintrag bleibt über seinen Original-Link in der Bibliothek auffindbar.</p>
    </div>}
    {recipe.equipment && <details className="import-equipment"><summary>Erfasstes Zubehör ansehen <ChevronDown size={16} /></summary><p>{recipe.equipment}</p></details>}
    {recipe.ph && <p className="import-caveat"><strong>pH-Notiz aus der Datei (ungeprüft):</strong> {recipe.ph}. Keine bestätigte Zielvorgabe; mehrere Zahlen können unterschiedliche Varianten betreffen.</p>}
    <p className="import-caveat">Originaltitel und Wirkungsangaben gehören zur verlinkten Quelle und sind keine Wirksamkeitszusage dieser Bibliothek. Keine Anwendungsempfehlung für Kinder, erkrankte Haut oder die Augen. Haltbarkeit und sichere Anwendung lassen sich aus diesen Notizen nicht bestimmen.</p>
    <p className="source-record">Quelle: Schwatz Katz · Datei-Eintrag Nr. {recipe.sourceNumber}</p>
  </>;
}

export function LibraryCard({ entry }: { entry: LibraryEntry }) {
  const statusLabel = entry.status === "basis" ? "Basisrezept mit Anleitung" : entry.status === "zutaten" ? "Zutaten im Import" : "Quellenverweis";
  return <article className={"recipe-card tone-" + entry.tone} id={"rezept-" + entry.id} tabIndex={-1}>
    <details className="recipe-disclosure">
      <summary>
        <div className="recipe-picture">
          <span className="recipe-category">{entry.category}</span>
          <RecipeArt shape={entry.shape} />
          <span className={"recipe-count status-" + entry.status}>{entry.status === "basis" ? "Mit Anleitung" : entry.status === "zutaten" ? "Ungeprüfter Import" : "Originalquelle nötig"}</span>
        </div>
        <div className="recipe-card-copy">
          <div className="recipe-meta">{entry.recipe ? <span><Clock3 size={14} /> {entry.recipe.minutes} Min.</span> : <span>Originaltitel · Schwatz Katz</span>}<span>{entry.topic}</span></div>
          <h3>{entry.title}</h3>
          <p>{entry.recipe?.note ?? (entry.status === "zutaten" ? "Zutatennotizen und Quellenlink. Vollständige Anleitung im Original prüfen." : "Alle Einträge bleiben auffindbar – auch wenn die Datei keine Mengen enthält.")}</p>
          <span className="entry-status">{statusLabel}</span>
          <span className="recipe-open"><span className="open-label">{entry.status === "basis" ? "Rezept öffnen" : "Eintrag öffnen"}</span><span className="close-label">Eintrag schließen</span><ChevronDown size={18} /></span>
        </div>
      </summary>
      <div className="recipe-details">
        {entry.recipe ? <BasicRecipeDetails recipe={entry.recipe} /> : entry.imported ? <ImportedRecipeDetails recipe={entry.imported} /> : null}
        <a className="recipe-permalink" href={"#rezept-" + entry.id}>Direktlink zu diesem Eintrag <ArrowRight size={15} /></a>
      </div>
    </details>
  </article>;
}
