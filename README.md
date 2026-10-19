# Natürlich gerührt

Eine responsive Website rund um vegane Naturkosmetik zum Selbermachen. Die Startseite verbindet Rezeptideen, Rohstoffwissen, Videoformate und wichtige Sicherheitshinweise in einem eigenständigen Markenauftritt.

## Live ansehen

[vanlifemum-boop.github.io/Natur-Kosmetik-/](https://vanlifemum-boop.github.io/Natur-Kosmetik-/)

## Enthalten

- responsive Startseite für Smartphone und Desktop
- filterbare Rezeptkarten für Gesicht, Haare und Körper
- Wissensbereich mit Grundlagen zum sicheren Formulieren
- YouTube- und Video-Bereich
- eigener Markenauftritt und Hero-Bild
- barrierearme Navigation und semantische Seitenstruktur

Die Rezeptkarten sind derzeit redaktionelle Beispiele und keine vollständig geprüften Rezepturen. Vor einer Veröffentlichung echter Rezepturen sollten Dosierung, pH-Wert, Konservierung, Allergene und Haltbarkeit fachlich geprüft werden.

## Lokal starten

Voraussetzung: Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

Anschließend die in der Konsole ausgegebene lokale Adresse öffnen.

## Prüfen und bauen

```bash
npm test
npm run build
```

## Technik

- React 19 und TypeScript
- Next.js/Vinext
- Tailwind CSS
- Cloudflare-Worker-Ausgabe für ChatGPT Sites

Die Hosting-Zuordnung der bestehenden ChatGPT Site liegt in `.openai/hosting.json`.
