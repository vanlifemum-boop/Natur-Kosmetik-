# Natürlich gerührt

Eine farbenfrohe Website rund um vegane Naturkosmetik zum Selbermachen. Flieder, Koralle, Mint und Sonnengelb treffen auf zwölf vollständige Basisideen und verständliche Sicherheitshinweise – ohne beiges Design.

## Live ansehen

[vanlifemum-boop.github.io/Natur-Kosmetik-/](https://vanlifemum-boop.github.io/Natur-Kosmetik-/)

## Enthalten

- responsive Startseite mit eigenem aufklappbaren Handy-Menü
- zwölf Rezepte: je drei für Gesicht, Haare, Körper sowie Lippen und Hände
- Suche nach Rezepten und Zutaten, kombinierbar mit dem Pflegebereich
- aufklappbare Rezepte mit Grammangaben, Utensilien, Schritten, Anwendung und Hinweisen
- Direktlinks zu jedem Rezept sowie echte Sprunglinks zu allen Seitenbereichen
- Wissensbereich zu Hygiene, Aufbewahrung und Verträglichkeit mit Quellenlinks
- Tastaturbedienung, sichtbare Fokusmarkierungen und reduzierte Bewegung

Die Rezepturen sind eigene, nicht laborgeprüfte Basisideen für Erwachsene und intakte Haut. Es werden keine Heil- oder Haltbarkeitsversprechen gegeben. Elf Mischungen sind wasserfrei; die wasserhaltige Hafermaske ist ausschließlich zur sofortigen einmaligen Verwendung gedacht. Vor gewerblicher Nutzung sind fachliche Prüfung und die geltenden Anforderungen erforderlich. Die Quellenlinks erläutern Sicherheitsgrundlagen, nicht die Validierung dieser Rezepturen.

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
npm run export:pages
```

`npm test` baut die Seite, erzeugt den GitHub-Pages-Export und prüft Rezeptdaten, Suche, HTML-Navigation, responsive CSS-Regeln und die exportierten Asset-Pfade. Das ersetzt keinen interaktiven Browser- oder Gerätetest.

## GitHub Pages veröffentlichen

`npm run export:pages` schreibt die statische, vorgerenderte Seite nach `docs/`. Aus derselben React-Seite wird ein eigenständiges Browser-Bundle ohne Vinext-Server-Router erstellt. Damit benötigen auch Vor-/Zurücknavigation und Sprunglinks keinen RSC-Server. Navigation und Rezept-Aufklapper sind native HTML-Elemente; Filter und Suche benötigen JavaScript. Alle Asset-Pfade sind relativ, damit die Seite auch im GitHub-Unterordner `Natur-Kosmetik-` funktioniert.

Quellcode **und** den aktualisierten Ordner `docs/` nach `main` committen. Der Workflow `.github/workflows/pages.yml` veröffentlicht diesen Ordner automatisch über GitHub Pages; er baut den Quellcode nicht erneut. Die Erfolgsmeldung unter GitHub Actions abwarten.

## Technik

- React 19 und TypeScript
- Next.js/Vinext
- Tailwind CSS
- Cloudflare-Worker-Ausgabe für ChatGPT Sites

Die Hosting-Zuordnung der bestehenden ChatGPT Site liegt in `.openai/hosting.json`.
