export type HouseholdEntry = {
  id: string;
  number?: number;
  kind: "mixture" | "tip" | "soap";
  title: string;
  summary: string;
  time?: string;
  sourceUrl: string;
  sourceName: string;
  ingredients: { amount: string; name: string }[];
  steps: string[];
  use?: string;
  storage?: string;
  missing?: string;
  warning?: string;
  guidanceUrls?: { label: string; url: string }[];
  equipment?: string;
  duration?: string;
  safety?: string[];
};

export const householdVideo = {
  "title": "Seit 40 Jahren kein Waschmittel gekauft Der polnische 50 Cent Trick, der sauberer wäscht",
  "channel": "Helena's Haushalt",
  "url": "https://www.youtube.com/watch?v=IDxt0Ykmih8",
  "note": "Alle 20 nummerierten Tipps wurden aus den vollständigen automatisch erstellten deutschen Untertiteln erfasst und in eigenen Worten zusammengefasst (Stand 25.10.2026). YouTube kennzeichnet das Video als KI-generiert. Es enthält ein Waschpulver-Grundrezept, weitere Anwendungen und allgemeine Tipps. Die Rezeptangaben sind nicht praktisch oder im Labor geprüft. Fehlende Maße und Konzentrationen bleiben ausdrücklich offen; Wirkungs- und Sparversprechen werden nicht bestätigt."
};

export const householdGuidance = [
  {
    "title": "Textilien beachten",
    "text": "Waschsoda nicht für Wolle, Seide oder farbempfindliche Textilien verwenden. Pflegeetikett und Produktdosierung beachten.",
    "url": "https://www.heitmann-hygiene-care.de/heitmann-pure-reine-soda-1l/ratgeber/",
    "label": "HEITMANN: Materialverträglichkeit von Soda"
  },
  {
    "title": "Geräteanleitung geht vor",
    "text": "Für Reinigung und Zusätze die Freigabe des Geräteherstellers beachten. Bosch rät bei der Maschinenentkalkung von Essig und Zitronensäure ab.",
    "url": "https://www.bosch-home.com/ch/de/service/hilfe-und-support/waschmaschine-entkalken-hausmittel",
    "label": "Bosch: Hausmittel und Waschmaschine"
  },
  {
    "title": "Säuren und Chlor trennen",
    "text": "Essig, Zitronensäure und andere saure Mittel niemals mit Chlorreinigern kombinieren: Es kann giftiges Chlorgas entstehen. Sauerstoffbleiche ist kein Chlorreiniger.",
    "url": "https://www.bgw-young.de/bgw-young/gesundheit/themen/weiteres-wissen/chlorreiniger-89366",
    "label": "BGW: Säuren und Chlorreiniger"
  }
];

export const householdEntries: HouseholdEntry[] = [
  {
    "id": "waschpulver-kernseife",
    "number": 20,
    "kind": "mixture",
    "title": "Waschpulver aus Kernseife, Waschsoda und Natron",
    "summary": "Das einzige Waschpulver-Grundrezept des Videos: drei Zutaten, aber keine genauen Grammangaben.",
    "time": "2:18",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=138s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 Stück",
        "name": "Kernseife, Stückgewicht nicht genannt"
      },
      {
        "amount": "1 Tasse",
        "name": "Waschsoda (Natriumcarbonat)"
      },
      {
        "amount": "1 Tasse",
        "name": "Natron (Natriumhydrogencarbonat)"
      }
    ],
    "steps": [
      "Kernseife fein reiben.",
      "Seifenraspel, Waschsoda und Natron in einem Schraubglas vermengen und durch Schütteln mischen.",
      "Das Video nennt ungefähr 2 Esslöffel der Mischung pro Waschgang.",
      "Für die Kaltwäsche wird in Tipp 19 empfohlen, die verwendete Portion vorher in 1 Tasse heißem Wasser aufzulösen.",
      "Im Schlussabschnitt bei 16:33 wird für Frontlader die Dosierung auf meistens 1,5 Esslöffel eingeschränkt.",
      "Bei 15:44 erwähnt das Video mehr Soda für hartes Wasser, nennt aber keine Zusatzmenge.",
      "Bei 16:04 empfiehlt das Video bei empfindlicher Haut zunächst eine kleine Menge und einen zusätzlichen Spülgang; eine generell bessere Hautverträglichkeit ist damit nicht belegt."
    ],
    "warning": "Bei hartem Wasser kann Seife als Kalkseife an Maschine und Wäsche zurückbleiben. Die Mengen im Video ergeben keine universell passende Dosierung. Waschsoda ist ungeeignet für Wolle, Seide und farbempfindliche Textilien. Soda mit Handschuhen handhaben. Für die vegane Variante pflanzliche Kernseife wählen.",
    "missing": "Nicht angegeben: Gewicht des Seifenstücks; Fassungsvermögen der Tasse; gehäufte oder gestrichene Esslöffel; konkretes Wäschegewicht; abgestufte Dosierung nach Wasserhärte und Verschmutzung; Überfettung beziehungsweise Zusammensetzung der Kernseife. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "VerbraucherService Bayern: Seife und hartes Wasser",
        "url": "https://www.verbraucherservice-bayern.de/themen/hauswirtschaft/tipps-und-infos-zu-bio-waschmitteln-und-co"
      },
      {
        "label": "HEITMANN: Materialverträglichkeit von Soda",
        "url": "https://www.heitmann-hygiene-care.de/heitmann-pure-reine-soda-1l/ratgeber/"
      }
    ],
    "storage": "Im Video: trocken im Schraubglas. Redaktionell ergänzt: eindeutig als Waschmittel mit Zutaten und Datum beschriften, von Lebensmitteln getrennt und für Kinder unzugänglich aufbewahren. Keine Haltbarkeitsdauer im Video genannt."
  },
  {
    "id": "pulver-vorloesen",
    "number": 19,
    "kind": "tip",
    "title": "Niedrigere Waschtemperatur und Pulver vorlösen",
    "summary": "Ergänzung zum Grundpulver für niedrige Temperaturen; kein zweites Rezept.",
    "time": "3:11",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=191s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 Waschportion",
        "name": "Grundmischung aus Tipp 20"
      },
      {
        "amount": "1 Tasse",
        "name": "Heißes Wasser"
      }
    ],
    "steps": [
      "Für die vom Video vorgeschlagene Kaltwäsche zunächst die Waschportion in heißem Wasser lösen.",
      "Das Video empfiehlt ansonsten überwiegend kalt zu waschen und nennt für Handtücher, Bettwäsche und Unterwäsche 60 °C, besonders bei Erkrankungen im Haushalt."
    ],
    "warning": "Temperatur nach Pflegeetikett, Waschmittel und Hygieneanforderung wählen. Das Vorlösen belegt weder die Waschleistung noch die Eignung dieses Pulvers für Kaltwäsche.",
    "missing": "Nicht angegeben: Volumen der Tasse; genaue Temperatur bei Kaltwäsche; geprüfte Eignung der Mischung für niedrige Temperaturen. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "Umweltbundesamt: Wäsche waschen",
        "url": "https://www.umweltbundesamt.de/umwelttipps-fuer-den-alltag/haushalt-wohnen/waesche-waschen-waschmittel"
      }
    ]
  },
  {
    "id": "essig-spuelgang",
    "number": 18,
    "kind": "mixture",
    "title": "Essig im Spülgang",
    "summary": "Ein im Video genannter Ersatz für Weichspüler. Vor einer Anwendung die Geräteanleitung prüfen.",
    "time": "4:01",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=241s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "ca. ½ Glas",
        "name": "Haushaltsessig mit 5 % Säure, keine Essigessenz"
      }
    ],
    "steps": [
      "Das Video gibt den Haushaltsessig anstelle von Weichspüler in das Weichspülerfach."
    ],
    "warning": "Bosch rät wegen möglicher Schäden an Gummiteilen von Essig zur Maschinenreinigung ab. Auch als Spülzusatz nur bei ausdrücklicher Herstellerfreigabe verwenden. Niemals mit Chlorreinigern kombinieren.",
    "missing": "Nicht angegeben: Volumen des Glases; Freigabe des konkreten Waschmaschinenherstellers. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "Bosch: Hausmittel und Waschmaschine",
        "url": "https://www.bosch-home.com/ch/de/service/hilfe-und-support/waschmaschine-entkalken-hausmittel"
      },
      {
        "label": "BGW: Säuren und Chlorreiniger",
        "url": "https://www.bgw-young.de/bgw-young/gesundheit/themen/weiteres-wissen/chlorreiniger-89366"
      }
    ]
  },
  {
    "id": "kragen-kernseife",
    "number": 17,
    "kind": "mixture",
    "title": "Kragen und Manschetten mit Kernseife vorbehandeln",
    "summary": "Seife direkt am Fleck anwenden, bevor das Kleidungsstück gewaschen wird.",
    "time": "4:49",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=289s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 Stück",
        "name": "Kernseife zur direkten Anwendung"
      },
      {
        "amount": "nach Bedarf",
        "name": "Wasser zum Anfeuchten; im Video nicht bemessen"
      }
    ],
    "steps": [
      "Kernseife anfeuchten.",
      "Die verschmutzte Stelle an Kragen oder Manschette ungefähr 30 Sekunden mit der Seife bearbeiten.",
      "Das Kleidungsstück anschließend waschen."
    ],
    "warning": "Zuerst an einer verdeckten Stelle auf Farbechtheit und Materialverträglichkeit prüfen; das Pflegeetikett beachten. Ein Reinigungserfolg ist nicht garantiert.",
    "missing": "Nicht angegeben: Textilabhängige Verträglichkeit; weitere Einwirkzeit vor dem Waschen. Diese Angaben wurden nicht ergänzt."
  },
  {
    "id": "waschmittel-dosierung",
    "number": 16,
    "kind": "tip",
    "title": "Waschmittel sparsam dosieren",
    "summary": "Die Dosierangaben des Videos sind uneinheitlich. Wasserhärte und Wäschemenge fehlen.",
    "time": "5:16",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=316s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [],
    "steps": [
      "Das Video warnt vor Rückständen durch zu hohe Dosierung.",
      "Hier werden 1 bis 2 Esslöffel Seife pro Ladung genannt; an anderer Stelle spricht es von der gesamten Pulvermischung."
    ],
    "warning": "Die Formulierungen im Video wechseln zwischen Seife und Pulvermischung. Daraus keine pauschale Dosierung ableiten; Herstellerangaben, Wasserhärte und Beladung berücksichtigen.",
    "missing": "Nicht angegeben: Ob hier reine Seife oder die Mischung aus Tipp 20 gemeint ist; Ladungsgewicht und Wasserhärte. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "Umweltbundesamt: Wäsche waschen",
        "url": "https://www.umweltbundesamt.de/umwelttipps-fuer-den-alltag/haushalt-wohnen/waesche-waschen-waschmittel"
      }
    ]
  },
  {
    "id": "soda-zusatz",
    "number": 15,
    "kind": "mixture",
    "title": "Zusätzliche Waschsoda bei stark verschmutzter Wäsche",
    "summary": "Zusatzvorschlag für Arbeitskleidung und Geschirrtücher mit einer unbestimmten Schaufelmenge.",
    "time": "5:48",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=348s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 Waschportion",
        "name": "Grundmischung aus Tipp 20"
      },
      {
        "amount": "1 zusätzliche Schaufel",
        "name": "Waschsoda, Schaufelgröße nicht genannt"
      }
    ],
    "steps": [
      "Für stark verschmutzte Arbeitskleidung oder Geschirrtücher wird im Video zusätzliche Waschsoda zum Grundwaschmittel gegeben."
    ],
    "warning": "Keine belastbare Dosieranleitung: Die Schaufelgröße fehlt. Waschsoda ist ungeeignet für Wolle, Seide und farbempfindliche Textilien. Die Dosierung des verwendeten Soda-Produkts beachten.",
    "missing": "Nicht angegeben: Masse oder Volumen der Schaufel; Textilmenge; Wasserhärte; Dosierobergrenze. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "HEITMANN: Materialverträglichkeit von Soda",
        "url": "https://www.heitmann-hygiene-care.de/heitmann-pure-reine-soda-1l/ratgeber/"
      }
    ]
  },
  {
    "id": "weisswaesche-peroxid",
    "number": 14,
    "kind": "mixture",
    "title": "Weiße Wäsche: Sonne und erwähnter Peroxid-Zusatz",
    "summary": "Trocknen in der Sonne und ein Peroxid-Zusatz, dessen Konzentration im Video fehlt.",
    "time": "6:24",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=384s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "½ Glas",
        "name": "Wasserstoffperoxid – Konzentration NICHT genannt; keine Dosierempfehlung"
      }
    ],
    "steps": [
      "Weiße Wäsche draußen in der Sonne trocknen.",
      "Zusätzlich erwähnt das Video bei hartnäckigem Grauschleier Wasserstoffperoxid im Waschgang."
    ],
    "warning": "Nicht nach dieser Mengenangabe anwenden: Ohne Peroxid-Konzentration ist keine sichere Dosierung ableitbar. Das ist eine unvollständige Quellennotiz, kein ausführbares Bleichrezept. Nur geeignete, ausdrücklich für Textilien vorgesehene Produkte nach Etikett verwenden.",
    "missing": "Nicht angegeben: Konzentration des Wasserstoffperoxids; Volumen des Glases; Einfüllstelle; Waschbedingungen und Textilverträglichkeit. Diese Angaben wurden nicht ergänzt."
  },
  {
    "id": "blut-eiweissflecken",
    "number": 13,
    "kind": "mixture",
    "title": "Blut- und Eiweißflecken kalt vorbehandeln",
    "summary": "Frische Blut- und Eiweißflecken zunächst mit kaltem Wasser behandeln.",
    "time": "7:04",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=424s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "ohne Menge",
        "name": "Kaltes Wasser"
      },
      {
        "amount": "etwas",
        "name": "Kernseife"
      }
    ],
    "steps": [
      "Den frischen Fleck sofort unter kaltem fließendem Wasser ausspülen.",
      "Bei Bedarf mit wenig Kernseife vorbehandeln.",
      "Das Video rät, bei Blut- und Eiweißflecken zunächst kein heißes Wasser zu verwenden."
    ],
    "warning": "Pflegeetikett und Farbechtheit beachten. Keine vollständige Fleckenentfernung zugesichert.",
    "missing": "Nicht angegeben: Konkrete Seifenmenge; Einwirkzeit; Gewebespezifische Eignung. Diese Angaben wurden nicht ergänzt."
  },
  {
    "id": "rueckstaende-gerueche",
    "number": 12,
    "kind": "tip",
    "title": "Rückstände und Gerüche in Textilien",
    "summary": "Eine Erklärung im Video, keine zusätzliche Mischung und kein Nachweis der Ursache.",
    "time": "7:41",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=461s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [],
    "steps": [
      "Das Video führt harte Handtücher und Gerüche auf Waschmittel- und Weichspülerrückstände zurück und empfiehlt sparsame Dosierung."
    ],
    "warning": "Rückstände können verschiedene Ursachen haben. Auch die seifenhaltige Mischung des Videos kann in hartem Wasser Ablagerungen bilden.",
    "guidanceUrls": [
      {
        "label": "VerbraucherService Bayern: Seife und hartes Wasser",
        "url": "https://www.verbraucherservice-bayern.de/themen/hauswirtschaft/tipps-und-infos-zu-bio-waschmitteln-und-co"
      }
    ]
  },
  {
    "id": "lufttrocknen",
    "number": 11,
    "kind": "tip",
    "title": "Wäsche an der Luft trocknen",
    "summary": "Trocknen an der Leine statt im Trockner; ein Haushaltstipp ohne Zutaten.",
    "time": "8:38",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=518s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [],
    "steps": [
      "Wäsche nach Möglichkeit draußen an der Leine trocknen.",
      "Im Video wird Sonnenlicht besonders für weiße Wäsche vorgeschlagen."
    ],
    "warning": "Pflegeetikett beachten; empfindliche Farben vor starker Sonne schützen. Lufttrocknen ersetzt keinen erforderlichen hygienischen Waschgang."
  },
  {
    "id": "trommel-beladen",
    "number": 10,
    "kind": "tip",
    "title": "Waschmaschine passend beladen",
    "summary": "Die Handbreit-Regel aus dem Video ersetzt nicht die Beladungsgrenze des Waschprogramms.",
    "time": "9:23",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=563s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [],
    "steps": [
      "Das Video rät, die Trommel ungefähr zu drei Vierteln zu füllen und oben etwa eine Handbreit Platz zu lassen."
    ],
    "warning": "Die zulässige Beladung hängt von Gerät, Programm und Textilart ab. Die Herstellerangabe hat Vorrang.",
    "missing": "Nicht angegeben: Maschinen- und programmspezifische Beladung; Textilart. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "Umweltbundesamt: Wäsche waschen",
        "url": "https://www.umweltbundesamt.de/umwelttipps-fuer-den-alltag/haushalt-wohnen/waesche-waschen-waschmittel"
      }
    ]
  },
  {
    "id": "waschmaschinenpflege",
    "number": 9,
    "kind": "mixture",
    "title": "Waschmaschinenpflege mit Soda oder Essig",
    "summary": "Zwei alternative Zusätze für einen heißen Leerwaschgang. Die Geräteanleitung ist maßgeblich.",
    "time": "9:54",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=594s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 Tasse ODER 1 Becher",
        "name": "Waschsoda ODER Essig; getrennte Varianten"
      }
    ],
    "steps": [
      "Das Video schlägt einmal im Monat einen heißen Leerwaschgang vor.",
      "Als Zusatz wird wahlweise Waschsoda oder Essig direkt in der Trommel genannt."
    ],
    "warning": "Die Varianten nicht kombinieren. Essig zur Maschinenreinigung ist beispielsweise von Bosch nicht empfohlen. Reinigung und Temperatur nach Geräteanleitung wählen; keine pauschale Freigabe für Soda oder Essig.",
    "missing": "Nicht angegeben: Tassen- beziehungsweise Bechervolumen; Waschtemperatur; Programmart; konkrete Essigkonzentration an dieser Stelle; Herstellerfreigabe. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "Bosch: Hausmittel und Waschmaschine",
        "url": "https://www.bosch-home.com/ch/de/service/hilfe-und-support/waschmaschine-entkalken-hausmittel"
      }
    ]
  },
  {
    "id": "salz-dunkle-waesche",
    "number": 8,
    "kind": "mixture",
    "title": "Salz für neue dunkle Wäsche",
    "summary": "Ein nicht nachgewiesener Farbpflege-Tipp mit ungenauer Salzmenge.",
    "time": "10:29",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=629s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 Handvoll",
        "name": "Gewöhnliches Salz"
      }
    ],
    "steps": [
      "Das Video schlägt vor, Salz zur Wäsche neuer, kräftig dunkler Kleidungsstücke zu geben."
    ],
    "warning": "Ein zuverlässiger Farbschutz ist aus dem Video nicht belegt. Kein Salz auf Verdacht in die Maschine geben; Textil- und Geräteangaben beachten.",
    "missing": "Nicht angegeben: Masse des Salzes; Waschvolumen; konkretes Färbeverfahren und Eignung; Nachweis der Wirksamkeit. Diese Angaben wurden nicht ergänzt."
  },
  {
    "id": "natron-geruch",
    "number": 7,
    "kind": "mixture",
    "title": "Zusätzliches Natron gegen Wäschegeruch",
    "summary": "Ein zusätzlicher Löffel Natron zur Grundmischung; die Löffelgröße bleibt offen.",
    "time": "11:09",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=669s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 Waschportion",
        "name": "Grundmischung aus Tipp 20"
      },
      {
        "amount": "1 zusätzlicher Löffel",
        "name": "Natron, Löffelgröße nicht genannt"
      }
    ],
    "steps": [
      "Für leicht säuerlich riechende Wäsche wird im Video ein weiterer Löffel Natron zum Grundwaschmittel gegeben."
    ],
    "warning": "Unbestimmte Dosierung; keine geprüfte desinfizierende Wirkung. Bei wiederkehrendem Geruch auch Dosierung, Trocknung und Maschinenpflege prüfen.",
    "missing": "Nicht angegeben: Löffelgröße; gestrichen oder gehäuft; Textilmenge. Diese Angaben wurden nicht ergänzt."
  },
  {
    "id": "zitrone-weisswaesche",
    "number": 6,
    "kind": "mixture",
    "title": "Zitrone und Sonne für Flecken auf Weißwäsche",
    "summary": "Eine Zitronenhälfte und Sonnenlicht; im Video ausdrücklich nur für weiße Textilien.",
    "time": "11:37",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=697s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "½ Zitrone",
        "name": "Mit frischer Schnittfläche; Sonnenlicht als weiterer Behandlungsschritt"
      }
    ],
    "steps": [
      "Den Fleck auf weißem Stoff mit der Schnittfläche der Zitronenhälfte einreiben.",
      "Das Kleidungsstück danach für einige Stunden in die Sonne hängen."
    ],
    "warning": "Nur als Quellenangabe dokumentiert: Säure und Sonnenlicht können Farbe und Material verändern. Nicht für Buntwäsche. Die fehlende Gewebeprüfung und Nachbehandlung verhindern eine allgemeine Anwendungsempfehlung.",
    "missing": "Nicht angegeben: genaue Behandlungsdauer; Saftmenge; Angaben zum anschließenden Ausspülen oder Waschen; Gewebespezifische Verträglichkeit. Diese Angaben wurden nicht ergänzt."
  },
  {
    "id": "einweichbad",
    "number": 5,
    "kind": "mixture",
    "title": "Einweichbad für vergraute Wäsche",
    "summary": "Warmes Wasser mit Soda oder Natron. Die Mischung ist nicht vollständig dosiert.",
    "time": "12:26",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=746s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 Schüssel",
        "name": "Warmes Wasser"
      },
      {
        "amount": "1 Schaufel",
        "name": "Waschsoda ODER Natron; getrennte Varianten"
      }
    ],
    "steps": [
      "Warmes Wasser in eine Schüssel geben und wahlweise Waschsoda oder Natron hinzufügen.",
      "Die vergrauten Textilien 1 bis 2 Stunden einweichen.",
      "Anschließend in der Waschmaschine waschen."
    ],
    "warning": "Die Pulvermengen und das Wasservolumen fehlen. Soda und Natron sind unterschiedliche Stoffe. Die Soda-Variante ist ungeeignet für Wolle, Seide und farbempfindliche Textilien.",
    "missing": "Nicht angegeben: Wasservolumen; Masse von Soda beziehungsweise Natron; Temperatur; geeignete Textilmenge. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "HEITMANN: Materialverträglichkeit von Soda",
        "url": "https://www.heitmann-hygiene-care.de/heitmann-pure-reine-soda-1l/ratgeber/"
      }
    ]
  },
  {
    "id": "speisestaerke-fettflecken",
    "number": 4,
    "kind": "mixture",
    "title": "Speisestärke bei frischen Fettflecken",
    "summary": "Pulver zum Aufnehmen frischen Fetts. Speisestärke und Babypuder werden als Varianten genannt.",
    "time": "13:00",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=780s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 Prise",
        "name": "Speisestärke ODER Babypuder; Zusammensetzung des Puders fehlt"
      }
    ],
    "steps": [
      "Direkt nach Entstehen des Flecks etwas Pulver auf die Stelle geben und leicht andrücken.",
      "Ungefähr 30 Minuten liegen lassen.",
      "Das Pulver anschließend abbürsten."
    ],
    "warning": "Pulver nicht einatmen. Vorher an unauffälliger Stelle prüfen. Der zusätzlich behauptete Nutzen bei Tintenflecken ist im Video nicht belegt; eine Babypuder-Rezeptur wird nicht genannt.",
    "missing": "Nicht angegeben: genaue Pulvermenge; Zusammensetzung des Babypuders; Textilverträglichkeit; Vorgehen bei verbleibendem Fleck. Diese Angaben wurden nicht ergänzt."
  },
  {
    "id": "muffige-handtuecher",
    "number": 3,
    "kind": "mixture",
    "title": "Muffige Handtücher: zwei getrennte Waschgänge",
    "summary": "Zuerst Essig, gegebenenfalls anschließend Natron: zwei getrennte Waschgänge im Video.",
    "time": "13:32",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=812s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [
      {
        "amount": "1 großer Becher",
        "name": "Essig im ersten Waschgang; Konzentration hier nicht genannt"
      },
      {
        "amount": "1 Schaufel",
        "name": "Natron nur im anschließenden Waschgang, falls nötig"
      }
    ],
    "steps": [
      "Das Video schlägt vor, die Handtücher separat heiß mit Essig und ohne Seife zu waschen.",
      "Falls der Geruch bleibt, folgt laut Video ein zweiter, getrennter Waschgang mit Natron."
    ],
    "warning": "Keine allgemeine Anwendungsempfehlung: Essig kann mit Geräteteilen unverträglich sein. Herstellerhinweise und Pflegeetikett beachten; Essig und Natron nicht zusammenmischen. Eine keimreduzierende Wirkung ist für diese ungenauen Angaben nicht belegt.",
    "missing": "Nicht angegeben: Volumen und Konzentration des Essigs an dieser Stelle; Masse des Natrons; konkrete Waschtemperatur; Einfüllstelle; Herstellerfreigabe. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "Bosch: Hausmittel und Waschmaschine",
        "url": "https://www.bosch-home.com/ch/de/service/hilfe-und-support/waschmaschine-entkalken-hausmittel"
      }
    ]
  },
  {
    "id": "woraus-seife-entsteht",
    "number": 2,
    "kind": "tip",
    "title": "Woraus Seife hergestellt wird",
    "summary": "Fett und Lauge werden erklärt. Ein Seifenrezept mit Mengen enthält das Video nicht.",
    "time": "14:16",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=856s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [],
    "steps": [
      "Das Video erklärt vereinfacht, dass Seife durch die Verarbeitung von Fett mit Lauge entsteht, und erwähnt historische Verfahren mit Holzasche."
    ],
    "warning": "Aus der historischen Erwähnung von Holzasche lässt sich keine sichere Laugenmenge berechnen. Für das Sieden ausschließlich die vollständige Rezeptur und die Schutzmaßnahmen beim zusätzlichen Seifenrezept verwenden.",
    "missing": "Nicht angegeben: Vollständiges Seifenrezept; Fettarten und Fettmengen; Laugenart, Konzentration und Menge; Wasseranteil; Verfahrens- und Sicherheitsanleitung. Diese Angaben wurden nicht ergänzt.",
    "guidanceUrls": [
      {
        "label": "Bramble Berry: sicher mit Lauge arbeiten",
        "url": "https://www.brambleberry.com/beginner/lye-safety-guide.html/"
      }
    ]
  },
  {
    "id": "selbst-mischen",
    "number": 1,
    "kind": "tip",
    "title": "Selbst mischen statt erneut kaufen",
    "summary": "Der Schluss verweist auf das Grundpulver. Es folgt keine weitere Rezeptur.",
    "time": "15:01",
    "sourceUrl": "https://www.youtube.com/watch?v=IDxt0Ykmih8&t=901s",
    "sourceName": "Helena's Haushalt · YouTube",
    "ingredients": [],
    "steps": [
      "Der Schlussappell verweist erneut auf das selbst gemischte Waschpulver aus Tipp 20."
    ],
    "warning": "Die Kosten- und Erfolgsversprechen des Videos sind hier nicht überprüft. Der Eintrag dokumentiert den Schlussgedanken und ist kein Kostenvergleich."
  },
  {
    "id": "pflanzenoel-seife",
    "kind": "soap",
    "title": "Palmölfreie Pflanzenöl-Seife selber sieden",
    "summary": "Feste Seife aus vier Pflanzenfetten, ohne zugesetzte Duft- oder Farbstoffe. Ergibt etwa 6–8 Stück. Kaltverfahren mit Natronlauge.",
    "sourceName": "Tanya Anderson / Lovely Greens",
    "sourceUrl": "https://lovelygreens.com/eco-friendly-cold-process-soap-recipe-instructions/",
    "ingredients": [
      {
        "amount": "227 g",
        "name": "Olivenöl"
      },
      {
        "amount": "114 g",
        "name": "Raffiniertes Kokosöl"
      },
      {
        "amount": "91 g",
        "name": "Raffinierte Sheabutter"
      },
      {
        "amount": "23 g",
        "name": "Rizinusöl"
      },
      {
        "amount": "62 g",
        "name": "Natriumhydroxid (NaOH) für die Seifenherstellung"
      },
      {
        "amount": "112 g",
        "name": "Destilliertes Wasser"
      }
    ],
    "duration": "Nach etwa 48 Stunden ausformen; mindestens 4 Wochen reifen lassen.",
    "equipment": "Genaue Waage, Thermometer, Edelstahlgefäße, laugenbeständiger Spatel, Stabmixer und geeignete Seifenform; Schutzausrüstung siehe Hinweise.",
    "steps": [
      "Schutzausrüstung anlegen. Arbeitsplatz vorbereiten und alle Zutaten getrennt genau abwiegen.",
      "NaOH langsam in das Wasser geben und vorsichtig vollständig lösen. Die heiße Lauge geschützt abkühlen lassen.",
      "Kokosöl und Sheabutter sanft schmelzen, vom Herd nehmen und die flüssigen Öle einrühren.",
      "Fette und Lauge auf etwa 35–38 °C abkühlen lassen. Die Lauge vorsichtig zu den Fetten geben.",
      "Mit eingetauchtem Stabmixer abwechselnd kurz mixen und rühren, bis eine dünne Rührspur auf der Oberfläche stehen bleibt.",
      "In die Form füllen. Nach ungefähr 48 Stunden ausformen und gegebenenfalls schneiden.",
      "Die Stücke mit Abstand mindestens vier Wochen luftig und ohne direkte Sonne reifen lassen."
    ],
    "use": "Zum Händewaschen aufschäumen und gründlich abspülen. Zwischen Anwendungen trocknen lassen.",
    "warning": "Diese Handseife ist überfettet. Sie ist kein gleichwertiger Ersatz für die Kernseife im Waschpulver.",
    "safety": [
      "NaOH und frischer Seifenleim können schwer verätzen. Dicht abschließende Schutzbrille, chemikalienbeständige Handschuhe, lange Kleidung und geschlossene Schuhe tragen. Gut lüften, nicht über der Lauge einatmen; Kinder und Tiere fernhalten.",
      "Immer NaOH in Wasser geben, niemals Wasser auf NaOH. Nur laugen- und hitzebeständige Gefäße, etwa geeigneten Edelstahl, verwenden; kein Aluminium. Natron, Waschsoda und NaOH sind verschiedene Stoffe. Keinen Abflussreiniger verwenden.",
      "Die Mengen gelten nur für diese Fettzusammensetzung. Keine Öle austauschen oder Mengen frei ändern; jede Änderung braucht eine neue Laugenberechnung. Reifezeit macht eine falsch dosierte Seife nicht sicher.",
      "NaOH im beschrifteten Originalbehälter unzugänglich aufbewahren. Schutzausrüstung auch beim Ausformen und Reinigen tragen. Bei Hautkontakt sofort mit reichlich fließendem Wasser spülen, keinen Essig zum Neutralisieren verwenden. Bei Augenkontakt sofort spülen und umgehend medizinische Hilfe holen."
    ],
    "guidanceUrls": [
      {
        "label": "Bramble Berry: sicher mit Lauge arbeiten",
        "url": "https://www.brambleberry.com/beginner/lye-safety-guide.html/"
      },
      {
        "label": "CDC/NIOSH: Natriumhydroxid",
        "url": "https://www.cdc.gov/niosh/npg/npgd0565.html"
      }
    ]
  }
];
