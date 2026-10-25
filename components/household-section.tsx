import { ArrowDown, ArrowRight, BookOpen, ChevronDown, ExternalLink, FlaskConical, Leaf, Play, ShieldCheck, Sparkles } from "lucide-react";
import { householdEntries, householdGuidance, householdVideo, type HouseholdEntry } from "@/lib/household";
import "./household-section.css";

function EntrySources({ entry }: { entry: HouseholdEntry }) {
  return <div className="household-entry-sources">
    <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer">
      {entry.kind === "soap" ? <BookOpen size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
      <span>{entry.sourceName}{entry.time ? ` · ab ${entry.time}` : " · Originalrezept"}</span>
      <ExternalLink size={14} aria-hidden="true" />
    </a>
    {entry.guidanceUrls?.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer"><span>{source.label}</span><ExternalLink size={14} aria-hidden="true" /></a>)}
    <a className="household-permalink" href={"#haushalt-" + entry.id}><span>Direktlink zu diesem Eintrag</span><ArrowRight size={15} aria-hidden="true" /></a>
  </div>;
}

function EntryBody({ entry }: { entry: HouseholdEntry }) {
  return <div className="household-entry-body">
    {entry.ingredients.length > 0 && <>
      <h5>{entry.kind === "soap" ? "Zutaten" : "Mengen laut Video"}</h5>
      <ul className="household-ingredients">{entry.ingredients.map((ingredient, index) => <li key={ingredient.name + index}><strong>{ingredient.amount}</strong><span>{ingredient.name}</span></li>)}</ul>
    </>}
    {entry.equipment && <p className="household-equipment"><strong>Utensilien:</strong> {entry.equipment}</p>}
    {entry.duration && <p className="household-duration"><strong>Zeit einplanen:</strong> {entry.duration}</p>}
    {entry.missing && <div className="household-entry-note"><strong>Diese Angaben fehlen</strong><p>{entry.missing}</p></div>}
    {entry.warning && <div className="household-entry-warning"><ShieldCheck size={18} aria-hidden="true" /><div><strong>Vor der Anwendung beachten</strong><p>{entry.warning}</p></div></div>}
    {entry.steps.length > 0 && <>
      <h5>{entry.kind === "soap" ? "Schritt für Schritt" : "Im Video beschrieben"}</h5>
      <ol className="household-steps">{entry.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>
    </>}
    {entry.use && <><h5>{entry.kind === "soap" ? "Anwendung" : "Anwendung laut Quelle"}</h5><p>{entry.use}</p></>}
    {entry.storage && <><h5>Aufbewahrung</h5><p>{entry.storage}</p></>}
    <EntrySources entry={entry} />
  </div>;
}

function VideoEntry({ entry }: { entry: HouseholdEntry }) {
  return <article className="household-entry" id={"haushalt-" + entry.id} tabIndex={-1}>
    <details className="household-disclosure">
      <summary>
        <span className="household-entry-top"><span className="household-entry-number">{entry.number ? `Tipp ${String(entry.number).padStart(2, "0")}` : "Video-Notiz"}</span>{entry.time && <span className="household-entry-time"><Play size={12} aria-hidden="true" />{entry.time}</span>}</span>
        <h4>{entry.title}</h4>
        <p className="household-entry-summary">{entry.summary}</p>
        <span className="household-entry-toggle"><span><span className="household-open-label">{entry.kind === "mixture" ? "Mengen & Hinweise ansehen" : "Tipp & Hinweise ansehen"}</span><span className="household-close-label">Eintrag schließen</span></span><ChevronDown size={18} aria-hidden="true" /></span>
      </summary>
      <EntryBody entry={entry} />
    </details>
  </article>;
}

function SoapEntry({ entry }: { entry: HouseholdEntry }) {
  return <article className="household-soap" id={"haushalt-" + entry.id} tabIndex={-1}>
    <div className="household-soap-heading"><span className="household-soap-icon"><Leaf size={29} strokeWidth={1.5} aria-hidden="true" /></span><div><p className="household-soap-kicker">Zusätzlich recherchiertes Rezept</p><h4>{entry.title}</h4><p>{entry.summary}</p></div></div>
    {entry.safety && entry.safety.length > 0 && <aside className="household-soap-safety" aria-label="Sicherheit beim Seifensieden"><h5><ShieldCheck size={19} aria-hidden="true" />Mit Natronlauge sorgfältig arbeiten</h5>{entry.safety.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</aside>}
    <details className="household-disclosure household-soap-disclosure">
      <summary><span><span className="household-open-label">Zutaten & Seifenanleitung öffnen</span><span className="household-close-label">Seifenanleitung schließen</span></span><ChevronDown size={20} aria-hidden="true" /></summary>
      <EntryBody entry={entry} />
    </details>
  </article>;
}

export function HouseholdSection() {
  const mixtures = householdEntries.filter((entry) => entry.kind === "mixture");
  const tips = householdEntries.filter((entry) => entry.kind === "tip");
  const soaps = householdEntries.filter((entry) => entry.kind === "soap");
  const videoCount = mixtures.length + tips.length;

  return <section className="household-section" id="haushaltsmittel" aria-labelledby="household-heading">
    <div className="page-width">
      <div className="household-heading-row">
        <div><p className="eyebrow"><Leaf size={16} aria-hidden="true" />Natürlich selbst gemacht.</p><h2 id="household-heading">Haushaltsmittel<br /><span>selbst gemacht</span></h2></div>
        <p>Eine eigene Sammlung für deinen Haushalt.<br />{videoCount} Tipps aus dem Video und {soaps.length === 1 ? "ein zusätzliches Seifenrezept" : `${soaps.length} zusätzliche Seifenrezepte`} – mit Quellen, Mengenangaben und Hinweisen.</p>
      </div>

      <nav className="household-jump-links" aria-label="Bereiche der Haushaltsrubrik">
        <a href="#haushaltsmittel-mischungen"><FlaskConical size={17} aria-hidden="true" /><span>Mischungen & Anwendungen aus dem Video</span><span className="household-jump-count">{mixtures.length}</span><ArrowDown size={15} aria-hidden="true" /></a>
        <a href="#haushaltsmittel-tipps"><Sparkles size={17} aria-hidden="true" /><span>Weitere Haushaltstipps</span><span className="household-jump-count">{tips.length}</span><ArrowDown size={15} aria-hidden="true" /></a>
        <a href="#haushaltsmittel-seife"><Leaf size={17} aria-hidden="true" /><span>Seife selber machen</span><ArrowDown size={15} aria-hidden="true" /></a>
      </nav>

      <aside className="household-source-note">
        <BookOpen size={21} aria-hidden="true" />
        <div><strong>Zur Quelle dieser Sammlung</strong><p>{householdVideo.note}</p><a href={householdVideo.url} target="_blank" rel="noopener noreferrer"><span>{householdVideo.channel}: „{householdVideo.title}“</span><ExternalLink size={15} aria-hidden="true" /></a></div>
      </aside>

      <section className="household-group" id="haushaltsmittel-mischungen" aria-labelledby="household-mixtures-heading">
        <div className="household-group-heading"><div><span className="household-group-index">01</span><h3 id="household-mixtures-heading">Mischungen & Anwendungen aus dem Video</h3></div><p>Quellenangaben zum Aufklappen. Fehlende Maße bleiben ausdrücklich offen.</p></div>
        <div className="household-grid">{mixtures.map((entry) => <VideoEntry entry={entry} key={entry.id} />)}</div>
      </section>

      <section className="household-group" id="haushaltsmittel-tipps" aria-labelledby="household-tips-heading">
        <div className="household-group-heading"><div><span className="household-group-index">02</span><h3 id="household-tips-heading">Weitere Haushaltstipps</h3></div><p>Anwendungen und Hinweise aus dem Video, die kein eigenes Mischrezept sind.</p></div>
        <div className="household-grid household-tips-grid">{tips.map((entry) => <VideoEntry entry={entry} key={entry.id} />)}</div>
      </section>

      <section className="household-group" id="haushaltsmittel-seife" aria-labelledby="household-soap-heading">
        <div className="household-group-heading"><div><span className="household-group-index">03</span><h3 id="household-soap-heading">Seife selber machen</h3></div><p>Eine separate Anleitung mit Grammangaben. Vor dem Start vollständig lesen.</p></div>
        {soaps.map((entry) => <SoapEntry entry={entry} key={entry.id} />)}
      </section>

      {householdGuidance.length > 0 && <aside className="household-guidance" aria-labelledby="household-guidance-heading"><h3 id="household-guidance-heading"><ShieldCheck size={21} aria-hidden="true" />Gut zu wissen, bevor du mischst</h3><div className="household-guidance-grid">{householdGuidance.map((item) => <div key={item.title}><h4>{item.title}</h4><p>{item.text}</p><a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}<ExternalLink size={13} aria-hidden="true" /></a></div>)}</div></aside>}
    </div>
  </section>;
}
