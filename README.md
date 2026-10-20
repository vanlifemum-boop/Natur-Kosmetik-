# Natürlich gerührt

Eine ruhige Website rund um vegane Naturkosmetik zum Selbermachen. Gedecktes Salbei- und Waldgrün, kühles Weiß und klare Serifenschrift begleiten eine durchsuchbare Bibliothek mit 267 Einträgen. Dezente Pflanzenmotive, gerade Bildrahmen und zurückhaltende Rezeptkarten prägen das natürliche Design – ohne Beige.

## Live ansehen

[vanlifemum-boop.github.io/Natur-Kosmetik-/](https://vanlifemum-boop.github.io/Natur-Kosmetik-/)

## Enthalten

- responsive Startseite mit eigenem aufklappbaren Handy-Menü
- alle 255 Rezept-/DIY-Einträge aus `Naturkosmetik_YouTube_Redaktionsplan-1.xlsx` plus zwölf eigene Basisrezepte
- Suche nach Titeln und Zutaten sowie kombinierbare Filter für Pflegebereich, Original-Themenfeld und Datenumfang
- alphabetische Sortierung und übersichtliche Seiten mit jeweils zwölf Einträgen
- klar gekennzeichnete Basisrezepte, Zutatenimporte und Quellenverweise mit fehlenden Rezeptdaten
- aufklappbare Details mit Originalmengen, Varianten, Phasen und Prüfhinweisen; eigene Basisrezepte zusätzlich mit Schritten und Anwendung
- Direktlinks zu jedem Rezept sowie echte Sprunglinks zu allen Seitenbereichen
- natürliche Seitenscrollfläche ohne Scrollsperre; ein zentraler, unmittelbarer Scrollvorgang pro Sprunglink, der auch noch nicht sichtbare Rezepte auf der richtigen Bibliotheksseite öffnet
- Wissensbereich zu Hygiene, Aufbewahrung und Verträglichkeit mit Quellenlinks
- Tastaturbedienung, sichtbare Fokusmarkierungen und reduzierte Bewegung

## Herkunft und Grenzen der Rezeptdaten

`data/imported-recipes.json` enthält die 255 Einträge aus den Tabellenblättern „Rezeptdaten“ und „Zutaten einzeln“. Die Datei nennt Schwatz Katz als Originalquelle und den 24.08.2026 als Erfassungsstand. Die Originaltitel und Quellenlinks bleiben sichtbar. Redaktionsplanung, Bildkonzepte und YouTube-Ideen wurden nicht veröffentlicht.

181 importierte Einträge besitzen Zutatenlisten, 74 sind Quellenverweise ohne ausreichend erfasste Rezeptdaten. Alle 1.548 Zutatenzeilen bleiben einschließlich Mengen, Einheiten, Phasen und Varianten erhalten. 154 bereits in der Datei als „Prüfen“ markierte Angaben werden auch in der Oberfläche gekennzeichnet. Die Extraktion ist nicht fachlich geprüft; insbesondere Mengen, pH-Angaben und Varianten dürfen nicht als validierte Rezeptur verstanden werden. Fehlende Mengen, Zubereitungen und Haltbarkeiten werden nicht erfunden. Die vollständige Anleitung ist jeweils bei der Originalquelle nachzulesen und kann dort eingeschränkt zugänglich sein.

Die zwölf eigenen Rezepte sind nicht laborgeprüfte Basisideen für Erwachsene und intakte Haut. Es werden keine Heil- oder Haltbarkeitsversprechen gegeben. Elf dieser Mischungen sind wasserfrei; die wasserhaltige Hafermaske ist ausschließlich zur sofortigen einmaligen Verwendung gedacht. Vor gewerblicher Nutzung sind fachliche Prüfung und die geltenden Anforderungen erforderlich. Die Sicherheitsquellen validieren weder eigene noch importierte Rezepturen. Importierte Originaltitel mit Lichtschutz-Bezug erhalten einen ausdrücklichen Warnhinweis: Eigenmischungen ersetzen kein geprüftes Sonnenschutzmittel.

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

`npm test` baut die Seite, erzeugt den GitHub-Pages-Export und prüft die vollständige Datenübernahme, Suche, Filter, Sortierung, Pagination, alle Rezept-Direktlinks, Scroll-Steuerung, HTML-Navigation, responsive CSS-Regeln und die exportierten Asset-Pfade. Das ersetzt keinen interaktiven Browser- oder Gerätetest.

## GitHub Pages veröffentlichen

`npm run export:pages` schreibt die statische, vorgerenderte Seite nach `docs/`. Aus derselben React-Seite wird ein eigenständiges Browser-Bundle ohne Vinext-Server-Router erstellt. Damit benötigen auch Vor-/Zurücknavigation und Sprunglinks keinen RSC-Server. Navigation und Rezept-Aufklapper sind native HTML-Elemente; Filter, Suche, Bibliotheksseiten und Direktlinks zu noch nicht gerenderten Rezepten benötigen JavaScript. Die erste Bibliotheksseite und Quellenhinweise sind vorgerendert. Alle Asset-Pfade sind relativ, damit die Seite auch im GitHub-Unterordner `Natur-Kosmetik-` funktioniert.

Quellcode **und** den aktualisierten Ordner `docs/` nach `main` committen. Der Workflow `.github/workflows/pages.yml` veröffentlicht diesen Ordner automatisch über GitHub Pages; er baut den Quellcode nicht erneut. Die Erfolgsmeldung unter GitHub Actions abwarten.

## Technik

- React 19 und TypeScript
- Next.js/Vinext
- Tailwind CSS
- Cloudflare-Worker-Ausgabe für ChatGPT Sites

Die Hosting-Zuordnung der bestehenden ChatGPT Site liegt in `.openai/hosting.json`.
