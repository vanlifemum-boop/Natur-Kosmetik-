"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { ArrowDown, ArrowRight, BookOpen, ChevronDown, Flower2, Heart, Leaf, Menu, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { preparationNote } from "@/lib/recipes";
import { defaultFilters, filtersForRecipe, importMetadata, libraryCategories, libraryCounts, libraryEntries, libraryTopics, PAGE_SIZE, paginateLibrary, recipeIdFromHash, type LibraryFilters } from "@/lib/library";
import { isPlainNavigationClick, scrollToPageTarget } from "@/lib/scroll-navigation";
import { LibraryCard } from "@/components/recipe-library-card";
import { LibraryPagination } from "@/components/library-pagination";

const navigation = [
  { href: "#bibliothek", label: "Bibliothek" },
  { href: "#so-gehts", label: "So geht’s" },
  { href: "#wissen", label: "Gut zu wissen" },
  { href: "#ueber-uns", label: "Unsere Idee" },
];

export default function Home() {
  const [filters, setFilters] = useState<LibraryFilters>({ ...defaultFilters });
  const [pendingTarget, setPendingTarget] = useState<{ id: string } | null>(null);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const collection = useMemo(() => paginateLibrary(filters), [filters]);

  function closeMenu() { if (menuRef.current) menuRef.current.open = false; }
  function updateFilters(patch: Partial<LibraryFilters>) { setFilters((current) => ({ ...current, ...patch, page: 1 })); }
  function resetLibrary() { setFilters({ ...defaultFilters }); }
  function changePage(page: number) {
    setFilters((current) => ({ ...current, page }));
    setPendingTarget({ id: "bibliothek-ergebnisse" });
  }

  const requestNavigation = useCallback((hash: string, addHistory = false) => {
    if (!hash.startsWith("#")) return false;
    const recipeId = recipeIdFromHash(hash);
    const id = hash === "#rezepte" ? "bibliothek" : hash.slice(1);
    if (!recipeId && !document.getElementById(id)) return false;
    if (menuRef.current) menuRef.current.open = false;
    if (recipeId) setFilters((current) => filtersForRecipe(recipeId, current));
    setPendingTarget({ id });
    if (addHistory && window.location.hash !== hash) window.history.pushState(null, "", hash);
    return true;
  }, []);

  function handleAnchorClick(event: MouseEvent<HTMLDivElement>) {
    if (!isPlainNavigationClick(event) || !(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>("a[href^='#']");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
    const hash = link.getAttribute("href");
    if (hash && requestNavigation(hash, true)) event.preventDefault();
  }

  useEffect(() => {
    const syncHash = () => { if (window.location.hash) requestNavigation(window.location.hash); };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [requestNavigation]);

  useEffect(() => {
    if (!pendingTarget) return;
    // React has now rendered the correct result page. Scroll exactly once.
    scrollToPageTarget(pendingTarget.id);
    setPendingTarget(null);
  }, [pendingTarget]);

  return <div className="site-shell" onClick={handleAnchorClick}>
    <a className="skip-link" href="#inhalt">Zum Inhalt springen</a>
    <div className="announcement"><Flower2 size={15} aria-hidden="true" /> Ein bisschen DIY. Ein bisschen Zeit für dich. <Flower2 size={15} aria-hidden="true" /></div>
    <header className="site-header">
      <a className="brand" href="#start" aria-label="Natürlich gerührt – Startseite" ><span className="brand-mark"><Flower2 aria-hidden="true" /></span><span>Natürlich<br /><em>gerührt.</em></span></a>
      <nav className="main-nav" aria-label="Hauptnavigation">{navigation.map((item) => <a key={item.href} href={item.href} >{item.label}</a>)}</nav>
      <a className="header-cta" href="#bibliothek" >Bibliothek <ArrowRight size={17} aria-hidden="true" /></a>
      <details className="mobile-menu" ref={menuRef} onKeyDown={(event) => { if (event.key === "Escape") { closeMenu(); menuRef.current?.querySelector("summary")?.focus(); } }}>
        <summary aria-label="Navigation öffnen oder schließen"><Menu size={21} aria-hidden="true" /><span>Menü</span></summary>
        <nav aria-label="Mobile Navigation">{navigation.map((item) => <a key={item.href} href={item.href} >{item.label}<ArrowRight size={18} aria-hidden="true" /></a>)}</nav>
      </details>
    </header>

    <main id="inhalt" tabIndex={-1}>
      <section className="hero page-width" id="start">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Dein buntes Rühratelier</p>
          <h1>Selbst gerührt.<br /><em>Ganz du.</em></h1>
          <p className="hero-intro">Dein buntes Nachschlagewerk für Naturkosmetik. Finde Pflegeideen, entdecke Zutaten und sammle Wissen für deinen nächsten Rührmoment.</p>
          <div className="hero-actions"><a className="button button-coral" href="#bibliothek" >Rezeptbibliothek entdecken <ArrowDown size={18} aria-hidden="true" /></a><a className="text-link" href="#so-gehts">Wie fange ich an? <ArrowRight size={17} aria-hidden="true" /></a></div>
          <div className="hero-facts"><span><Leaf size={16} /> Nach Pflegebereich stöbern</span><span><Heart size={16} /> Zutaten gezielt finden</span></div>
        </div>
        <div className="hero-visual">
          <span className="hero-doodle" aria-hidden="true">✳</span>
          <div className="photo-frame"><img src="./naturkosmetik-hero-cool.webp" alt="Creme, Pflegeöl und grünes Pflegestück mit frischen Blättern auf weißem Untergrund" width="1536" height="1024" fetchPriority="high" /></div>
          <div className="hero-sticker"><Sparkles size={22} aria-hidden="true" /><strong>{libraryCounts.all}</strong><span>Einträge zum<br />Entdecken</span></div>
          <span className="photo-note">Ein Löffel Neugier, bitte. <Heart size={16} aria-hidden="true" /></span>
        </div>
      </section>

      <div className="happy-strip" aria-label="Rezeptbereiche"><span>Gesicht <Flower2 /></span><span>Haare <Sparkles /></span><span>Körper <Heart /></span><span>Lippen & Hände <Leaf /></span></div>

      <section className="recipe-section page-width" id="bibliothek" aria-labelledby="library-heading">
        <span id="rezepte" className="anchor-alias" aria-hidden="true" />
        <div className="section-heading">
          <div><p className="eyebrow"><BookOpen size={16} /> Dein persönliches Rührregal</p><h2 id="library-heading">Die Rezept-<br /><span>bibliothek.</span></h2></div>
          <p>Alle {importMetadata.count} Einträge aus deiner Datei<br />und {libraryCounts.basis} eigene Basisrezepte an einem Ort.</p>
        </div>
        <div className="library-stats" aria-label="Umfang der Bibliothek">
          <span><strong>{libraryCounts.all}</strong> Einträge insgesamt</span>
          <span><strong>{libraryCounts.zutaten}</strong> mit importierten Zutaten</span>
          <span><strong>{libraryCounts.quelle}</strong> Quellenverweise</span>
          <span><strong>{libraryCounts.basis}</strong> Basisrezepte mit Anleitung</span>
        </div>
        <div className="library-controls">
          <div className="recipe-search">
            <Search size={20} aria-hidden="true" /><label className="sr-only" htmlFor="recipe-query">Bibliothek nach Rezept oder Zutat durchsuchen</label>
            <input id="recipe-query" type="search" placeholder="Rezept, Zutat oder Thema suchen …" value={filters.query} onChange={(event) => updateFilters({ query: event.target.value })} autoCapitalize="none" spellCheck={false} />
            {filters.query && <button type="button" aria-label="Suche löschen" onClick={() => updateFilters({ query: "" })}><X size={18} /></button>}
          </div>
          <div className="library-filter-grid">
            <label>Pflegebereich<select value={filters.category} onChange={(event) => updateFilters({ category: event.target.value, topic: "Alle" })}>{libraryCategories.map((category) => <option key={category} value={category}>{category === "Alle" ? "Alle Pflegebereiche" : category} ({category === "Alle" ? libraryCounts.all : libraryEntries.filter((entry) => entry.category === category).length})</option>)}</select></label>
            <label>Thema<select value={filters.topic} onChange={(event) => updateFilters({ topic: event.target.value })}>{libraryTopics.map((topic) => <option key={topic} value={topic}>{topic === "Alle" ? "Alle Themen" : topic}</option>)}</select></label>
            <label>Inhalt<select value={filters.status} onChange={(event) => updateFilters({ status: event.target.value })}><option value="Alle">Alle Einträge</option><option value="basis">Basisrezepte mit Anleitung ({libraryCounts.basis})</option><option value="zutaten">Zutaten im Import ({libraryCounts.zutaten})</option><option value="quelle">Quellenverweise ({libraryCounts.quelle})</option></select></label>
            <label>Sortierung<select value={filters.sort} onChange={(event) => updateFilters({ sort: event.target.value })}><option value="az">Titel A–Z</option><option value="za">Titel Z–A</option><option value="basis">Basisrezepte zuerst</option></select></label>
          </div>
          <div className="library-filter-footer"><p>Suche und Filter lassen sich kombinieren. {PAGE_SIZE} Einträge pro Seite.</p><button type="button" onClick={resetLibrary}>Filter zurücksetzen <X size={14} aria-hidden="true" /></button></div>
        </div>
        <noscript><p className="import-notice">Für Suche und Seitenwechsel bitte JavaScript aktivieren. Die angezeigten Einträge lassen sich auch ohne JavaScript aufklappen. <a href={importMetadata.sourceUrl}>Alle Quellenrezepte beim Originalanbieter ansehen.</a></p></noscript>
        <div className="recipe-result-line" id="bibliothek-ergebnisse" tabIndex={-1}>
          <p role="status" aria-live="polite">{collection.results.length} {collection.results.length === 1 ? "Eintrag gefunden" : "Einträge gefunden"}{collection.results.length > 0 && <span> · {((collection.page - 1) * PAGE_SIZE) + 1}–{Math.min(collection.page * PAGE_SIZE, collection.results.length)} werden angezeigt</span>}</p>
        </div>
        <LibraryPagination page={collection.page} pages={collection.pages} position="oben" onChange={changePage} />
        <div className="recipe-grid">{collection.entries.map((entry) => <LibraryCard key={entry.id} entry={entry} />)}</div>
        {collection.results.length === 0 && <div className="empty-state"><Flower2 size={40} /><h3>Hier hat sich noch nichts eingerührt.</h3><p>Versuche einen anderen Suchbegriff oder setze deine Filter zurück.</p><button className="button button-dark" type="button" onClick={resetLibrary}>Alle {libraryCounts.all} Einträge anzeigen</button></div>}
        <LibraryPagination page={collection.page} pages={collection.pages} position="unten" onChange={changePage} />
        <aside className="recipe-editorial-note"><ShieldCheck size={20} aria-hidden="true" /><p><strong>Die Sammlung ist vollständig, die Rezeptdaten nicht immer.</strong> Alle {importMetadata.count} Rezept-/DIY-Einträge der Datei sind enthalten. {libraryCounts.zutaten} haben Zutatennotizen, bei {libraryCounts.quelle} fehlen Mengenangaben. Keine importierte Zutatenliste ersetzt die vollständige Anleitung. Auch die {libraryCounts.basis} eigenen Basisrezepte sind nicht laborgeprüft. <a href="#wissen">Hinweise lesen.</a></p></aside>
        <p className="library-provenance">Importstand: 24.08.2026 · Quellenrezepte: <a href={importMetadata.sourceUrl} target="_blank" rel="noopener noreferrer">Schwatz Katz</a>. Fehlende Anleitungen und Premiuminhalte wurden nicht ergänzt.</p>
      </section>

      <section className="how-section" id="so-gehts"><div className="page-width">
        <div className="section-heading"><div><p className="eyebrow">Neu hier? Willkommen!</p><h2>Drei Schritte.<br /><span>Dein erster Tiegel.</span></h2></div><a className="text-link" href="#rezept-jojoba-gesichtsoel" >Mit einem einfachen Öl starten <ArrowRight size={18} /></a></div>
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
          <details><summary>Welche Einträge enthalten eine vollständige Anleitung?<ChevronDown size={20} /></summary><p>Die zwölf eigenen Basisrezepte enthalten Mengen, Herstellung und Anwendung. Die 255 Einträge aus der Datei sind Quellenrezepte: 181 enthalten automatisch erfasste Zutatennotizen, 74 nur einen Quellenverweis beziehungsweise keine erkannten Mengen. Auch vorhandene Zutatenlisten können unvollständig sein. Fehlende Phasen, Zeiten, Temperaturen oder Konservierungsangaben werden hier nicht erfunden – bitte im Original nachlesen.</p></details>
          <details><summary>Wie lange hält meine Mischung?<ChevronDown size={20} /></summary><p>Für unsere Basisideen wurde keine Lagerstabilität oder mikrobiologische Haltbarkeit geprüft. Aus den importierten Zutatennotizen lässt sich ebenfalls keine sichere Haltbarkeit ableiten. Deshalb gibt es kein pauschales „hält drei Monate“. Rohstoffe, Verarbeitung, Verpackung und Lagerung beeinflussen die Haltbarkeit. Arbeite mit kleinen Mengen und lies die Hinweise beim jeweiligen Rezept. Vitamin E ist kein Ersatz für eine geeignete Konservierung.</p></details>
          <details><summary>Was gilt bei Allergien und empfindlicher Haut?<ChevronDown size={20} /></summary><p>Auch pflanzliche Rohstoffe können Reizungen oder Allergien auslösen. Bekannte Allergene meiden; ein kleiner Anwendungstest garantiert keine Verträglichkeit. Nicht auf verletzte oder entzündete Haut, in Augen oder auf Schleimhäute geben. Bei bestehenden Hauterkrankungen oder Unsicherheit vorher ärztlich abklären. Diese Ideen sind nicht für Babys oder Kinder formuliert.</p></details>
          <details><summary>Was gilt bei Sonnenpflege und Wirkungsversprechen?<ChevronDown size={20} /></summary><p>Originaltitel aus der Datei können Wirkungen oder einen Lichtschutzfaktor nennen. Die Bibliothek bestätigt diese Aussagen nicht. Ein LSF wird am fertigen Produkt geprüft; eine übernommene Rezeptnotiz ist kein Wirksamkeitsnachweis. Nutze ungeprüfte DIY-Mischungen nicht als Ersatz für geprüften Sonnenschutz oder eine medizinische Behandlung.</p></details><div className="source-links"><span>Hintergrund zu Sicherheit und Haltbarkeit (englisch):</span><a href="https://www.fda.gov/cosmetics/potential-contaminants-cosmetics/microbiological-safety-and-cosmetics" target="_blank" rel="noopener noreferrer">FDA: Hygiene bei Kosmetik ↗</a><a href="https://www.fda.gov/cosmetics/cosmetics-labeling/shelf-life-and-expiration-dating-cosmetics" target="_blank" rel="noopener noreferrer">FDA: Haltbarkeit von Kosmetik ↗</a><a href="https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun" target="_blank" rel="noopener noreferrer">FDA: Sonnenschutz und SPF-Prüfung ↗</a><small>Diese Quellen erklären Grundlagen, sie prüfen oder bestätigen nicht die Rezepturen dieser Bibliothek.</small></div>
        </div>
      </section>

      <section className="about-section page-width" id="ueber-uns"><div><p className="eyebrow">Die Idee hinter Natürlich gerührt</p><h2>Mehr Neugier.<br /><span>Weniger Rätselraten.</span></h2><p>Ein buntes Rühratelier für alle, die wissen möchten, was in ihrer Pflege steckt. Mit übersichtlichen Zutaten, ehrlichen Grenzen und Freude am Ausprobieren – ohne Perfektionsdruck.</p><a className="button button-dark" href="#bibliothek" >Zur Bibliothek <ArrowRight size={18} /></a></div><div className="about-note"><Heart size={36} aria-hidden="true" /><p>Deine Pflege.<br />Dein Tempo.<br /><em>Dein kleiner Moment.</em></p><span>Mit Neugier gerührt.</span></div></section>
    </main>
    <footer className="site-footer"><div className="page-width"><a className="brand" href="#start"><Flower2 size={30} aria-hidden="true" /><span>Natürlich <em>gerührt.</em></span></a><nav aria-label="Fußnavigation">{navigation.map((item) => <a key={item.href} href={item.href} >{item.label}</a>)}</nav><p>Rezeptbibliothek und Pflegeideen. Kein Shop, keine medizinische Beratung.</p><a className="back-top" href="#start">Nach oben ↑</a></div></footer>
  </div>;
}
