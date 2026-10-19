"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock3,
  Droplets,
  FlaskConical,
  Leaf,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const recipes = [
  {
    title: "Sanfte Hafer-Reinigungscreme",
    category: "Gesicht",
    time: "25 Min.",
    level: "Mittel",
    type: "Emulsion",
    note: "Reinigt mild und hinterlässt ein weiches Hautgefühl.",
    ingredients: ["Haferöl", "pflanzlicher Emulgator", "Glycerin"],
    tone: "sage",
  },
  {
    title: "Rosen-Hyaluron-Gel",
    category: "Gesicht",
    time: "15 Min.",
    level: "Einfach",
    type: "Wasserbasiert",
    note: "Ein leichtes Feuchtigkeitsgel für die tägliche Pflegeroutine.",
    ingredients: ["Rosenhydrolat", "Hyaluron", "Glycerin"],
    tone: "rose",
  },
  {
    title: "Festes Glanz-Shampoo",
    category: "Haare",
    time: "35 Min.",
    level: "Mittel",
    type: "Wasserfrei",
    note: "Kompakte Haarpflege mit cremigem Schaum und wenig Verpackung.",
    ingredients: ["mildes Tensid", "Brokkolisamenöl", "Inulin"],
    tone: "gold",
  },
  {
    title: "Leichte Lockencreme",
    category: "Haare",
    time: "30 Min.",
    level: "Fortgeschritten",
    type: "Emulsion",
    note: "Bündelt Locken, ohne das Haar unnötig zu beschweren.",
    ingredients: ["Leinsamengel", "Jojobaöl", "Panthenol"],
    tone: "moss",
  },
  {
    title: "Shea-Handbalsam",
    category: "Körper",
    time: "20 Min.",
    level: "Einfach",
    type: "Wasserfrei",
    note: "Eine reichhaltige, schützende Pflege für beanspruchte Hände.",
    ingredients: ["Sheabutter", "Mandelöl", "Beerenwachs"],
    tone: "apricot",
  },
  {
    title: "Aprikosen-Lippenpflege",
    category: "Körper",
    time: "15 Min.",
    level: "Einfach",
    type: "Wasserfrei",
    note: "Schmilzt sanft und pflegt mit einer übersichtlichen Rezeptur.",
    ingredients: ["Aprikosenkernöl", "Candelillawachs", "Kakaobutter"],
    tone: "clay",
  },
];

const knowledge = [
  {
    number: "01",
    title: "Sauber arbeiten",
    text: "Hygiene, Geräte und Behälter so vorbereiten, dass deine Rezeptur eine gute Basis bekommt.",
  },
  {
    number: "02",
    title: "Rohstoffe verstehen",
    text: "Öle, Emulgatoren und Wirkstoffe nach Funktion auswählen – statt nur nach Trend.",
  },
  {
    number: "03",
    title: "Sicher formulieren",
    text: "pH-Wert, Konservierung, Dosierung und Haltbarkeit bei jeder Rezeptur mitdenken.",
  },
];

export default function Home() {
  const [filter, setFilter] = useState("Alle");
  const visibleRecipes = recipes.filter(
    (recipe) => filter === "Alle" || recipe.category === filter,
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#start" aria-label="Natürlich gerührt – Startseite">
          <span className="brand-mark" aria-hidden="true">
            <Leaf size={18} strokeWidth={1.8} />
          </span>
          <span>
            Natürlich <em>gerührt</em>
          </span>
        </a>

        <nav className="main-nav" aria-label="Hauptnavigation">
          <a href="#rezepte">Rezepte</a>
          <a href="#wissen">Wissen</a>
          <a href="#video">Videos</a>
          <a href="#ueber-uns">Über uns</a>
        </nav>

        <Button asChild className="header-cta">
          <a href="#rezepte">
            Rezept finden <ArrowRight />
          </a>
        </Button>
      </header>

      <section className="hero" id="start">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> Vegane Naturkosmetik selbst machen
          </p>
          <h1>
            Pflege, die du
            <br />
            <em>verstehst.</em>
          </h1>
          <p className="hero-intro">
            Erprobte Rezeptideen, verständliches Rohstoffwissen und klare
            Anleitungen für deine selbst gerührte Pflege.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-cta">
              <a href="#rezepte">
                Rezepte entdecken <ArrowDown />
              </a>
            </Button>
            <a className="text-link" href="#wissen">
              Neu hier? So startest du <ArrowRight />
            </a>
          </div>
          <div className="trust-row" aria-label="Unsere Grundsätze">
            <span><Check /> 100 % vegan</span>
            <span><Check /> klar erklärt</span>
            <span><Check /> sicher gedacht</span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/naturkosmetik-hero-cool.webp"
            alt="Handgemachte Creme, Pflegeöl und festes Pflegestück in einem hellen Pflanzenatelier"
            width="1536"
            height="1024"
          />
          <div className="hero-stamp" aria-hidden="true">
            <Sparkles />
            <span>mit Liebe</span>
            <strong>selbst gerührt</strong>
          </div>
          <div className="hero-caption">
            <span>Wissen im Tiegel</span>
            <strong>Einfach. Pflanzlich. Durchdacht.</strong>
          </div>
        </div>
      </section>

      <section className="category-strip" aria-label="Vorteile">
        <div><Leaf /><span>pflanzlich</span></div>
        <div><FlaskConical /><span>nachvollziehbar</span></div>
        <div><ShieldCheck /><span>sicherheitsbewusst</span></div>
        <div><Droplets /><span>alltagstauglich</span></div>
      </section>

      <section className="recipe-section" id="rezepte">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow"><span /> Aus dem Rühratelier</p>
            <h2>Finde deine nächste Rezeptidee.</h2>
          </div>
          <p>
            Von unkomplizierter Lippenpflege bis zur feinen Emulsion: Wähle den
            Pflegebereich, der zu deiner Routine passt.
          </p>
        </div>

        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(value) => value && setFilter(value)}
          spacing={2}
          className="recipe-filters"
          aria-label="Rezepte nach Pflegebereich filtern"
        >
          {["Alle", "Gesicht", "Haare", "Körper"].map((item) => (
            <ToggleGroupItem key={item} value={item} aria-label={`${item} anzeigen`}>
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="recipe-grid" aria-live="polite">
          {visibleRecipes.map((recipe, index) => (
            <article className={`recipe-card tone-${recipe.tone}`} key={recipe.title}>
              <div className="recipe-topline">
                <span>{recipe.category}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="recipe-symbol" aria-hidden="true">
                <FlaskConical strokeWidth={1.3} />
              </div>
              <h3>{recipe.title}</h3>
              <p>{recipe.note}</p>
              <div className="recipe-meta">
                <span><Clock3 /> {recipe.time}</span>
                <span>{recipe.level}</span>
                <span>{recipe.type}</span>
              </div>
              <details>
                <summary>Rezeptvorschau <ArrowDown /></summary>
                <div className="recipe-details">
                  <small>Im Mittelpunkt</small>
                  <ul>
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                  <p>
                    Die vollständige Rezeptur enthält genaue Mengen, Ablauf,
                    Anwendung und Sicherheitshinweise.
                  </p>
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section className="knowledge-section" id="wissen">
        <div className="knowledge-intro">
          <p className="eyebrow light"><span /> Wissen, das mitrührt</p>
          <h2>Gute Pflege beginnt vor dem ersten Gramm.</h2>
          <p>
            Wir erklären nicht nur, was in den Tiegel kommt, sondern auch warum.
            So kannst du Rezepturen bewusster auswählen und sicher umsetzen.
          </p>
        </div>

        <div className="knowledge-list">
          {knowledge.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="video-section" id="video">
        <div className="video-card">
          <div className="video-orbit" aria-hidden="true">
            <span className="orbit-one" />
            <span className="orbit-two" />
            <span className="play-button"><Play fill="currentColor" /></span>
          </div>
          <div>
            <p className="eyebrow"><span /> Schritt für Schritt im Video</p>
            <h2>Sehen. Verstehen. Selbst rühren.</h2>
            <p>
              Zu ausgewählten Rezepten zeigen Videos die richtige Konsistenz,
              wichtige Verarbeitungsschritte und typische Fehlerquellen.
            </p>
            <div className="video-points">
              <span><Check /> Zutaten verstehen</span>
              <span><Check /> Konsistenz erkennen</span>
              <span><Check /> Fehler vermeiden</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" id="ueber-uns">
        <div className="about-number">01</div>
        <div className="about-copy">
          <p className="eyebrow"><span /> Unsere Haltung</p>
          <h2>Naturkosmetik ohne Rätselraten.</h2>
          <p>
            Natürlich gerührt steht für vegane Rezeptideen, nachvollziehbare
            Entscheidungen und einen achtsamen Umgang mit Rohstoffen. Keine
            Heilversprechen, kein Fachwissen hinter verschlossenen Türen –
            sondern Orientierung, die dich beim Selbermachen begleitet.
          </p>
        </div>
        <div className="about-quote">
          <Leaf />
          <blockquote>
            „Nicht möglichst viele Zutaten. Sondern die richtigen – und das
            Wissen, wie sie zusammenwirken.“
          </blockquote>
        </div>
      </section>

      <section className="safety-note">
        <ShieldCheck />
        <div>
          <strong>Sicher rühren</strong>
          <p>
            Kosmetische Rezepturen brauchen sauberes Arbeiten, geeignete
            Konservierung und passende Einsatzkonzentrationen. Hinweise zu
            Allergien, pH-Wert und Haltbarkeit gehören deshalb direkt zum
            jeweiligen Rezept.
          </p>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#start">
          <span className="brand-mark" aria-hidden="true">
            <Leaf size={18} strokeWidth={1.8} />
          </span>
          <span>Natürlich <em>gerührt</em></span>
        </a>
        <p>Vegane Naturkosmetik. Verständlich selbst gemacht.</p>
        <div className="footer-nav">
          <a href="#rezepte">Rezepte</a>
          <a href="#wissen">Wissen</a>
          <a href="#video">Videos</a>
          <a href="#ueber-uns">Über uns</a>
        </div>
      </footer>
    </main>
  );
}
