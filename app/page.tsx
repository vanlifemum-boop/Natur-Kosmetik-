"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ChevronDown, Clock3, Flower2, Heart, Leaf, Menu, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { categories, filterRecipes, freshStorageNote, preparationNote, recipes, storageNote, type Recipe } from "@/lib/recipes";

const navigation = [
  { href: "#rezepte", label: "Rezepte" },
  { href: "#so-gehts", label: "So geht’s" },
  { href: "#wissen", label: "Gut zu wissen" },
  { href: "#ueber-uns", label: "Unsere Idee" },
];

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

function RecipeCard({ recipe, hidden, onNavigate }: { recipe: Recipe; hidden: boolean; onNavigate: (href: string) => void }) {
  return <article className={"recipe-card tone-" + recipe.tone} id={"rezept-" + recipe.id} hidden={hidden} tabIndex={-1}>
    <details className="recipe-disclosure">
      <summary>
        <div className="recipe-picture">
          <span className="recipe-category">{recipe.category}</span>
          <RecipeArt shape={recipe.shape} />
          <span className="recipe-count">{recipe.ingredients.length} Zutaten</span>
        </div>
        <div className="recipe-card-copy">
          <div className="recipe-meta"><span><Clock3 size={14} /> {recipe.minutes} Min.</span><span>{recipe.fresh ? "Frisch verwenden" : "Wasserfrei"}</span></div>
          <h3>{recipe.title}</h3>
          <p>{recipe.note}</p>
          <span className="recipe-open"><span className="open-label">Rezept öffnen</span><span className="close-label">Rezept schließen</span><ChevronDown size={18} /></span>
        </div>
      </summary>
      <div className="recipe-details">
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
        <a className="recipe-permalink" href={"#rezept-" + recipe.id} onClick={() => onNavigate("#rezept-" + recipe.id)}>Direktlink zu diesem Rezept <ArrowRight size={15} /></a>
      </div>
    </details>
  </article>;
}

export default function Home() {
  const [filter, setFilter] = useState("Alle");
  const [query, setQuery] = useState("");
  const menuRef = useRef<HTMLDetailsElement>(null);
  const scrollFrame = useRef(0);
  const visibleRecipes = filterRecipes(filter, query);
  const visibleIds = new Set(visibleRecipes.map((recipe) => recipe.id));

  function resetRecipes() { setFilter("Alle"); setQuery(""); }
  function closeMenu() { if (menuRef.current) menuRef.current.open = false; }
  const navigate = useCallback((href: string) => {
    if (menuRef.current) menuRef.current.open = false;
    const hash = href.slice(1);
    const isRecipe = recipes.some((recipe) => "rezept-" + recipe.id === hash);
    if (hash !== "rezepte" && !isRecipe) return;
    setFilter("Alle");
    setQuery("");
    if (isRecipe) {
      cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = requestAnimationFrame(() => {
        const article = document.getElementById(hash);
        const details = article?.querySelector("details");
        if (details) details.open = true;
        article?.focus({ preventScroll: true });
        article?.scrollIntoView({ block: "start" });
      });
    }
  }, []);

  useEffect(() => {
    const syncHash = () => navigate(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => { window.removeEventListener("hashchange", syncHash); cancelAnimationFrame(scrollFrame.current); };
  }, [navigate]);

  return <>
    <a className="skip-link" href="#inhalt">Zum Inhalt springen</a>
    <div className="announcement"><Flower2 size={15} aria-hidden="true" /> Ein bisschen DIY. Ein bisschen Zeit für dich. <Flower2 size={15} aria-hidden="true" /></div>
    <header className="site-header">
      <a className="brand" href="#start" aria-label="Natürlich gerührt – Startseite" onClick={closeMenu}><span className="brand-mark"><Flower2 aria-hidden="true" /></span><span>Natürlich<br /><em>gerührt.</em></span></a>
      <nav className="main-nav" aria-label="Hauptnavigation">{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => navigate(item.href)}>{item.label}</a>)}</nav>
      <a className="header-cta" href="#rezepte" onClick={resetRecipes}>Losrühren <ArrowRight size={17} aria-hidden="true" /></a>
      <details className="mobile-menu" ref={menuRef} onKeyDown={(event) => { if (event.key === "Escape") { closeMenu(); menuRef.current?.querySelector("summary")?.focus(); } }}>
        <summary aria-label="Navigation öffnen oder schließen"><Menu size={21} aria-hidden="true" /><span>Menü</span></summary>
        <nav aria-label="Mobile Navigation">{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => navigate(item.href)}>{item.label}<ArrowRight size={18} aria-hidden="true" /></a>)}</nav>
      </details>
    </header>

    <main id="inhalt" tabIndex={-1}>
      <section className="hero page-width" id="start">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Dein buntes Rühratelier</p>
          <h1>Selbst gerührt.<br /><em>Ganz du.</em></h1>
          <p className="hero-intro">Kleine Zutatenliste, große Lust aufs Selbermachen. Entdecke vegane Pflegeideen für Gesicht, Haare und alles dazwischen.</p>
          <div className="hero-actions"><a className="button button-coral" href="#rezepte" onClick={resetRecipes}>Finde dein erstes Rezept <ArrowDown size={18} aria-hidden="true" /></a><a className="text-link" href="#so-gehts">Wie fange ich an? <ArrowRight size={17} aria-hidden="true" /></a></div>
          <div className="hero-facts"><span><Leaf size={16} /> Pflanzliche Zutaten</span><span><Heart size={16} /> Ohne zugesetzten Duft</span></div>
        </div>
        <div className="hero-visual">
          <span className="hero-doodle" aria-hidden="true">✳</span>
          <div className="photo-frame"><img src="./naturkosmetik-hero-cool.webp" alt="Creme, Pflegeöl und grünes Pflegestück mit frischen Blättern auf weißem Untergrund" width="1536" height="1024" fetchPriority="high" /></div>
          <div className="hero-sticker"><Sparkles size={22} aria-hidden="true" /><strong>12</strong><span>kleine<br />Pflegeideen</span></div>
          <span className="photo-note">Ein Löffel Neugier, bitte. <Heart size={16} aria-hidden="true" /></span>
        </div>
      </section>

      <div className="happy-strip" aria-label="Rezeptbereiche"><span>Gesicht <Flower2 /></span><span>Haare <Sparkles /></span><span>Körper <Heart /></span><span>Lippen & Hände <Leaf /></span></div>

      <section className="recipe-section page-width" id="rezepte">
        <div className="section-heading"><div><p className="eyebrow">Für deinen nächsten Me-Time-Moment</p><h2>Was rühren wir <span>heute?</span></h2></div><p>12 Basisrezepte, vier Pflegebereiche.<br />Mit Mengen, Anleitung und Hinweisen.</p></div>
        <div className="recipe-tools">
          <fieldset className="recipe-filters"><legend className="sr-only">Rezepte nach Pflegebereich filtern</legend>{categories.map((category) => <label key={category} className={filter === category ? "active" : ""}><input type="radio" name="category" value={category} checked={filter === category} onChange={() => setFilter(category)} aria-label={category + " anzeigen"} /><span>{category}</span><small>{category === "Alle" ? recipes.length : recipes.filter((recipe) => recipe.category === category).length}</small></label>)}</fieldset>
          <div className="recipe-search"><Search size={19} aria-hidden="true" /><label className="sr-only" htmlFor="recipe-query">Rezepte oder Zutaten suchen</label><input id="recipe-query" type="search" placeholder="Rezept oder Zutat suchen …" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" aria-label="Suche löschen" onClick={() => setQuery("")}><X size={18} /></button>}</div>
        </div>
        <div className="recipe-result-line"><p role="status" aria-live="polite">{visibleRecipes.length} {visibleRecipes.length === 1 ? "Rezept" : "Rezepte"}{filter !== "Alle" ? " für " + filter : " zum Entdecken"}</p><span>Vegan · ohne zugesetztes Parfüm</span></div>
        <div className="recipe-grid">{recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} hidden={!visibleIds.has(recipe.id)} onNavigate={navigate} />)}</div>
        {visibleRecipes.length === 0 && <div className="empty-state"><Flower2 size={40} /><h3>Hier hat sich noch nichts eingerührt.</h3><p>Versuche einen anderen Suchbegriff oder zeige wieder alle Rezepte.</p><button className="button button-dark" type="button" onClick={resetRecipes}>Alle Rezepte anzeigen</button></div>}
        <aside className="recipe-editorial-note"><ShieldCheck size={20} aria-hidden="true" /><p><strong>Gut zu wissen:</strong> Eigene Basisideen, nicht laborgeprüft. Keine Heil- oder Haltbarkeitsversprechen. Für Erwachsene und intakte Haut; bei bekannten Allergien passende Rohstoffe meiden. <a href="#wissen">Vor dem Start bitte die Hinweise lesen.</a></p></aside>
      </section>

      <section className="how-section" id="so-gehts"><div className="page-width">
        <div className="section-heading"><div><p className="eyebrow">Neu hier? Willkommen!</p><h2>Drei Schritte.<br /><span>Dein erster Tiegel.</span></h2></div><a className="text-link" href="#rezept-jojoba-gesichtsoel" onClick={() => navigate("#rezept-jojoba-gesichtsoel")}>Mit einem einfachen Öl starten <ArrowRight size={18} /></a></div>
        <div className="steps-grid">
          <article><span className="step-number">01</span><h3>Klein anfangen.</h3><p>Such dir ein einfaches Rezept aus. Lies erst alle Schritte und Hinweise und lege Waage, Zutaten und passende Gefäße bereit.</p></article>
          <article><span className="step-number">02</span><h3>In Ruhe rühren.</h3><p>Arbeite sauber und trocken, wiege genau ab und ergänze keine Zutaten auf eigene Faust. Bei warmen Rezepten vorsichtig mit Gefäßen und Wasserbad umgehen.</p></article>
          <article><span className="step-number">03</span><h3>Bewusst pflegen.</h3><p>Beschrifte deine Mischung mit Datum und Zutaten. Verwende sparsam, beachte die Aufbewahrung und setze das Produkt bei Hautreizungen ab.</p></article>
        </div>
      </div></section>

      <section className="knowledge-section page-width" id="wissen">
        <div className="knowledge-intro"><div className="knowledge-flower" aria-hidden="true"><Flower2 size={58} /></div><p className="eyebrow">Ein bisschen Wissen rührt mit</p><h2>Natürlich.<br />Und mit <em>Bedacht.</em></h2><p>Selbstgemacht ist nicht automatisch besser verträglich. Diese Grundlagen gehören zu jedem Rezept.</p></div>
        <div className="knowledge-list">
          <details open><summary>Was brauche ich für einen sauberen Start?<ChevronDown size={20} /></summary><p>{preparationNote}</p></details>
          <details><summary>Warum so viele wasserfreie Rezepte?<ChevronDown size={20} /></summary><p>Öl- und Buttermischungen brauchen keine Wasserphase. Das macht den Einstieg übersichtlicher, aber nicht automatisch keimfrei. Bitte kein Wasser, Hydrolat, Aloe-Gel oder frische Pflanzen zugeben. Die Hafermaske ist eine Ausnahme: frisch mischen, sofort verwenden, Reste entsorgen.</p></details>
          <details><summary>Wie lange hält meine Mischung?<ChevronDown size={20} /></summary><p>Für unsere Basisideen wurde keine Lagerstabilität oder mikrobiologische Haltbarkeit geprüft. Deshalb gibt es kein pauschales „hält drei Monate“. Rohstoffe, Verarbeitung, Verpackung und Lagerung beeinflussen die Haltbarkeit. Arbeite mit kleinen Mengen und lies die Hinweise beim jeweiligen Rezept. Vitamin E ist kein Ersatz für eine geeignete Konservierung.</p></details>
          <details><summary>Was gilt bei Allergien und empfindlicher Haut?<ChevronDown size={20} /></summary><p>Auch pflanzliche Rohstoffe können Reizungen oder Allergien auslösen. Bekannte Allergene meiden; ein kleiner Anwendungstest garantiert keine Verträglichkeit. Nicht auf verletzte oder entzündete Haut, in Augen oder auf Schleimhäute geben. Bei bestehenden Hauterkrankungen oder Unsicherheit vorher ärztlich abklären. Diese Ideen sind nicht für Babys oder Kinder formuliert.</p></details>
          <div className="source-links"><span>Hintergrund zu Sicherheit und Haltbarkeit (englisch):</span><a href="https://www.fda.gov/cosmetics/potential-contaminants-cosmetics/microbiological-safety-and-cosmetics" target="_blank" rel="noopener noreferrer">FDA: Hygiene bei Kosmetik ↗</a><a href="https://www.fda.gov/cosmetics/cosmetics-labeling/shelf-life-and-expiration-dating-cosmetics" target="_blank" rel="noopener noreferrer">FDA: Haltbarkeit von Kosmetik ↗</a><small>Diese Quellen erklären Grundlagen, sie prüfen oder bestätigen nicht unsere Rezepturen.</small></div>
        </div>
      </section>

      <section className="about-section page-width" id="ueber-uns"><div><p className="eyebrow">Die Idee hinter Natürlich gerührt</p><h2>Mehr Neugier.<br /><span>Weniger Rätselraten.</span></h2><p>Ein buntes Rühratelier für alle, die wissen möchten, was in ihrer Pflege steckt. Mit übersichtlichen Zutaten, ehrlichen Grenzen und Freude am Ausprobieren – ohne Perfektionsdruck.</p><a className="button button-dark" href="#rezepte" onClick={resetRecipes}>Zur Rezeptsammlung <ArrowRight size={18} /></a></div><div className="about-note"><Heart size={36} aria-hidden="true" /><p>Deine Pflege.<br />Dein Tempo.<br /><em>Dein kleiner Moment.</em></p><span>Mit Neugier gerührt.</span></div></section>
    </main>
    <footer className="site-footer"><div className="page-width"><a className="brand" href="#start"><Flower2 size={30} aria-hidden="true" /><span>Natürlich <em>gerührt.</em></span></a><nav aria-label="Fußnavigation">{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => navigate(item.href)}>{item.label}</a>)}</nav><p>Vegane Pflegeideen zum Selbermachen. Kein Shop, keine medizinische Beratung.</p><a className="back-top" href="#start">Nach oben ↑</a></div></footer>
  </>;
}
