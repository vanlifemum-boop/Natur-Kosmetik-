export type RecipeCategory = "Gesicht" | "Haare" | "Körper" | "Lippen & Hände";

export type Recipe = {
  id: string;
  title: string;
  category: RecipeCategory;
  tone: "pink" | "lavender" | "mint" | "yellow";
  shape: "bottle" | "jar" | "bar" | "bowl";
  minutes: number;
  yieldGrams: number;
  note: string;
  fresh?: boolean;
  ingredients: { name: string; grams: number }[];
  equipment: string;
  steps: string[];
  use: string;
  caution: string;
};

export const categories = ["Alle", "Gesicht", "Haare", "Körper", "Lippen & Hände"] as const;

export const storageNote = "Kleine Mengen herstellen, mit Datum beschriften und verschlossen, kühl, trocken und lichtgeschützt lagern. Nur mit sauberem, trockenem Spatel entnehmen; kein Wasser zugeben. Für diese nicht laborgeprüften Basisideen ist keine sichere Haltbarkeit bestimmt. Bei verändertem Geruch, Aussehen oder Hautreizungen entsorgen; unauffälliges Aussehen beweist keine Keimfreiheit.";
export const freshStorageNote = "Nur für eine Anwendung frisch anrühren, sofort verwenden und sämtliche Reste entsorgen. Nicht im Kühlschrank aufbewahren und nicht auf Vorrat mischen.";
export const preparationNote = "Hände, Arbeitsfläche, Gefäße und Werkzeuge reinigen, geeignete Utensilien nach Herstellerangabe desinfizieren und vollständig trocknen lassen. Rohstoffe in Kosmetikqualität verwenden; für Lippenpflege nur ausdrücklich lippengeeignete Rohstoffe. Mit einer Waage auf 0,1 g genau abwiegen. Beim Wasserbad darf kein Wasser in die Mischung gelangen.";

export const recipes: Recipe[] = [
  {
    id: "jojoba-gesichtsoel", title: "Jojoba-Gesichtsöl", category: "Gesicht", tone: "pink", shape: "bottle", minutes: 5, yieldGrams: 10,
    note: "Zwei Pflanzenöle, ein kleiner Pflegemoment. Ganz ohne zugesetzten Duft.",
    ingredients: [{ name: "Jojobaöl", grams: 7 }, { name: "Aprikosenkernöl", grams: 3 }],
    equipment: "Waage, Becherglas, Spatel, kleine trockene Tropfflasche",
    steps: ["Beide Öle nacheinander in das Becherglas einwiegen.", "Mit dem trockenen Spatel gleichmäßig verrühren. Erwärmen ist nicht nötig.", "In die vorbereitete Tropfflasche füllen und Zutaten sowie Herstellungsdatum notieren."],
    use: "Mit einem Tropfen beginnen und sparsam auf die gereinigte Gesichtshaut verteilen. Bei Bedarf etwas mehr verwenden.",
    caution: "Augen und Schleimhäute aussparen. Bei bekannter Unverträglichkeit gegen einen Rohstoff nicht verwenden. Kein Sonnenschutz und kein Ersatz für die Behandlung von Hauterkrankungen.",
  },
  {
    id: "hafer-maske", title: "Hafer-Maske frisch gerührt", category: "Gesicht", tone: "lavender", shape: "bowl", minutes: 5, yieldGrams: 20, fresh: true,
    note: "Ein kleiner Mix für jetzt. Anrühren, auftragen, wieder abnehmen.",
    ingredients: [{ name: "Sehr fein gemahlener kolloidaler Hafer in Kosmetikqualität", grams: 5 }, { name: "Frisches Trinkwasser", grams: 15 }],
    equipment: "Waage, sauberes Schälchen, Spatel",
    steps: ["Hafer und frisches Wasser direkt vor der Anwendung abwiegen.", "In einem sauberen Schälchen zu einer weichen Paste verrühren.", "Eine Minute quellen lassen und unmittelbar verwenden. Die gesamte Mischung ist eine Einzelportion."],
    use: "Dünn auf intakte Haut auftragen, Augen und Lippen aussparen. Nach etwa 5 Minuten mit lauwarmem Wasser ohne Rubbeln abnehmen; bei Unbehagen sofort abspülen.",
    caution: "Bei Haferallergie nicht verwenden. Pulver nicht einatmen. Nicht auf gereizter oder verletzter Haut anwenden. Keine Aufbewahrung der angerührten Mischung.",
  },
  {
    id: "reinigungsoel", title: "Zwei-Zutaten-Reinigungsöl", category: "Gesicht", tone: "mint", shape: "bottle", minutes: 5, yieldGrams: 20,
    note: "Eine schlichte Ölmischung für deinen abendlichen Pflegeschritt.",
    ingredients: [{ name: "Sonnenblumenöl, high oleic", grams: 14 }, { name: "Jojobaöl", grams: 6 }],
    equipment: "Waage, Becherglas, Spatel, trockene Pumpflasche",
    steps: ["Sonnenblumenöl und Jojobaöl abwiegen.", "Beide Öle gründlich verrühren.", "In eine trockene Pumpflasche umfüllen und beschriften."],
    use: "Wenig Öl auf die trockene Gesichtshaut geben, kurz verteilen und mit einem sauberen, feuchten Tuch sanft abnehmen. Bei Bedarf mit einem verträglichen Reinigungsprodukt nachreinigen.",
    caution: "Enthält keinen Emulgator: lässt sich nicht wie ein fertiges Reinigungsöl allein mit Wasser abspülen. Nicht zur Augen-Make-up-Entfernung verwenden; kein feuchtes Tuch an die Flaschenöffnung bringen.",
  },
  {
    id: "haarspitzenoel", title: "Glanz für deine Haarspitzen", category: "Haare", tone: "yellow", shape: "bottle", minutes: 5, yieldGrams: 10,
    note: "Ein Tropfen reicht oft schon. Für Längen, die etwas Pflege mögen.",
    ingredients: [{ name: "Jojobaöl", grams: 7 }, { name: "Arganöl", grams: 3 }],
    equipment: "Waage, Becherglas, Spatel, kleine Tropfflasche",
    steps: ["Beide Öle in das saubere, trockene Becherglas einwiegen.", "Langsam und gleichmäßig verrühren.", "In eine Tropfflasche geben, verschließen und beschriften."],
    use: "Einen Tropfen zwischen den Händen verreiben und zunächst nur in die Spitzen geben. Bei feinem Haar besonders sparsam dosieren.",
    caution: "Nicht in Augen oder auf eine gereizte Kopfhaut bringen. Das Öl pflegt die Oberfläche, repariert aber keinen Spliss.",
  },
  {
    id: "prewash-haaroel", title: "Pre-Wash-Kokosölkur", category: "Haare", tone: "pink", shape: "jar", minutes: 10, yieldGrams: 20,
    note: "Dein kleiner Pflegeschritt vor dem Haarewaschen, nicht danach.",
    ingredients: [{ name: "Kokosöl", grams: 12 }, { name: "Jojobaöl", grams: 8 }],
    equipment: "Waage, hitzefestes Becherglas, Spatel, Wasserbad, trockener Tiegel",
    steps: ["Das Kokosöl im sanften Wasserbad gerade so weit erwärmen, bis es flüssig ist.", "Aus dem Wasserbad nehmen, außen abtrocknen und Jojobaöl einrühren.", "In einen trockenen Tiegel geben, abkühlen lassen und beschriften. Die Konsistenz verändert sich mit der Raumtemperatur."],
    use: "Eine kleine Menge in trockene Haarlängen geben. Nach etwa 20 Minuten mit dem gewohnten Shampoo auswaschen; bei Bedarf ein zweites Mal waschen.",
    caution: "Nicht heiß anwenden. Manche Haartypen mögen Kokosöl nicht; zunächst nur eine kleine Strähne ausprobieren. Ölreste in der Dusche können rutschig sein.",
  },
  {
    id: "locken-balsam", title: "Shea-Balsam für Lockenspitzen", category: "Haare", tone: "lavender", shape: "jar", minutes: 15, yieldGrams: 20,
    note: "Reichhaltig und wasserfrei. Für eine winzige Portion Spitzenpflege.",
    ingredients: [{ name: "Sheabutter", grams: 12 }, { name: "Jojobaöl", grams: 6 }, { name: "Arganöl", grams: 2 }],
    equipment: "Waage, hitzefestes Becherglas, Spatel, Wasserbad, kleiner Tiegel",
    steps: ["Sheabutter im sanften Wasserbad vollständig schmelzen.", "Vom Wasserbad nehmen, Gefäß außen abtrocknen und die abgewogenen Öle einrühren.", "Beim Abkühlen gelegentlich rühren, in den Tiegel füllen und vollständig fest werden lassen. Datum notieren."],
    use: "Eine reiskorngroße Menge zwischen den Händen schmelzen und in die Haarspitzen kneten. Langsam an die passende Menge herantasten.",
    caution: "Dies ist ein Öl-Butter-Balsam, keine wasserhaltige Lockencreme und kein Conditioner. Kann feine Haare beschweren. Nicht auf eine gereizte Kopfhaut geben.",
  },
  {
    id: "shea-koerperbutter", title: "Kleine Shea-Körperbutter", category: "Körper", tone: "mint", shape: "jar", minutes: 15, yieldGrams: 30,
    note: "Drei Zutaten für eine reichhaltige, schmelzende Körperpflege.",
    ingredients: [{ name: "Sheabutter", grams: 18 }, { name: "Kakaobutter", grams: 6 }, { name: "Sonnenblumenöl, high oleic", grams: 6 }],
    equipment: "Waage, hitzefestes Becherglas, Spatel, Wasserbad, trockener Tiegel",
    steps: ["Shea- und Kakaobutter im sanften Wasserbad schmelzen, ohne sie unnötig lange zu erhitzen.", "Becherglas herausnehmen und außen trocknen. Sonnenblumenöl unterrühren.", "Während des Abkühlens gelegentlich umrühren. In den Tiegel füllen und fest werden lassen; Abkühlzeit kommt zur Arbeitszeit hinzu."],
    use: "Eine kleine Menge auf intakte Körperhaut geben und verteilen. Vor dem Anziehen einziehen lassen.",
    caution: "Kein Wasser, Aloe-Gel oder Hydrolat einrühren. Nicht für Gesicht, Schleimhäute oder entzündete Haut bestimmt. Unparfümiert bedeutet nicht allergiefrei.",
  },
  {
    id: "koerperoel", title: "Aprikosen-Körperöl", category: "Körper", tone: "pink", shape: "bottle", minutes: 5, yieldGrams: 30,
    note: "Flüssig statt cremig. Schnell gemischt, sparsam aufgetragen.",
    ingredients: [{ name: "Aprikosenkernöl", grams: 18 }, { name: "Jojobaöl", grams: 12 }],
    equipment: "Waage, Becherglas, Spatel, trockene Pumpflasche",
    steps: ["Beide Öle genau abwiegen.", "Im trockenen Becherglas gleichmäßig vermischen.", "In die vorbereitete Pumpflasche füllen, schließen und mit Datum beschriften."],
    use: "Nach dem Abtrocknen wenig Öl auf die Körperhaut geben. Die Pumpöffnung trocken halten.",
    caution: "Nicht als Badezusatz verwenden: Öl verteilt sich ohne geeigneten Emulgator nicht im Wasser und macht Wanne oder Boden rutschig. Bei Rohstoffallergien nicht verwenden.",
  },
  {
    id: "feste-koerperpflege", title: "Kakao-Pflegestück", category: "Körper", tone: "yellow", shape: "bar", minutes: 20, yieldGrams: 30,
    note: "Pflege zum In-die-Hand-Nehmen. Ohne Flasche und ohne Wasser.",
    ingredients: [{ name: "Kakaobutter", grams: 18 }, { name: "Sheabutter", grams: 9 }, { name: "Jojobaöl", grams: 3 }],
    equipment: "Waage, hitzefestes Becherglas, Spatel, Wasserbad, kleine Silikonform",
    steps: ["Kakao- und Sheabutter im Wasserbad langsam schmelzen.", "Das Gefäß herausnehmen, außen trocknen und Jojobaöl einrühren.", "In eine saubere, trockene Silikonform gießen. Mehrere Stunden vollständig aushärten lassen, dann ausformen und beschriften."],
    use: "Kurz zwischen den Händen anwärmen und das geschmolzene Produkt dünn auf die Körperhaut verteilen.",
    caution: "Schmilzt bei Wärme: nicht in Sonne oder heißem Auto lagern. Trocken in einer Dose aufbewahren, nicht in der Dusche verwenden. Kein Seifenstück; nicht zum Waschen gedacht.",
  },
  {
    id: "aprikosen-lippenbalsam", title: "Aprikosen-Lippenbalsam", category: "Lippen & Hände", tone: "lavender", shape: "jar", minutes: 20, yieldGrams: 10,
    note: "Ein kleiner Tiegel, drei pflanzliche Zutaten. Ohne Bienenwachs.",
    ingredients: [{ name: "Aprikosenkernöl, lippengeeignet", grams: 6 }, { name: "Kakaobutter, lippengeeignet", grams: 3 }, { name: "Candelillawachs, lippengeeignet", grams: 1 }],
    equipment: "0,1-g-Waage, hitzefestes Becherglas, Spatel, Wasserbad, kleiner Tiegel",
    steps: ["Öl, Kakaobutter und Candelillawachs in das hitzefeste Becherglas einwiegen.", "Im Wasserbad erhitzen und rühren, bis das Wachs vollständig gelöst ist. Achtung: heißes Gefäß und heißes Wachs.", "Aus dem Wasserbad nehmen, außen trocknen und vorsichtig in den Tiegel füllen. Vollständig abkühlen lassen, bevor du den Balsam verwendest."],
    use: "Mit einem sauberen, trockenen Spatel wenig entnehmen und dünn auf intakte Lippen geben.",
    caution: "Nur ausdrücklich für Lippen geeignete Rohstoffe verwenden. Kein Parfüm, ätherisches Öl oder Bastelfarbstoff zugeben. Kein UV-Schutz. Nicht auf offene oder entzündete Lippen auftragen.",
  },
  {
    id: "shea-handbalsam", title: "Shea-Handbalsam", category: "Lippen & Hände", tone: "yellow", shape: "jar", minutes: 15, yieldGrams: 20,
    note: "Für den Abend: ein reichhaltiger Balsam aus Butter und Öl.",
    ingredients: [{ name: "Sheabutter", grams: 12 }, { name: "Jojobaöl", grams: 6 }, { name: "Kakaobutter", grams: 2 }],
    equipment: "Waage, hitzefestes Becherglas, Spatel, Wasserbad, kleiner Tiegel",
    steps: ["Shea- und Kakaobutter im Wasserbad gerade vollständig schmelzen.", "Vom Wasserbad nehmen, außen trocknen und Jojobaöl einrühren.", "Beim Abkühlen mehrmals umrühren. In einen trockenen Tiegel füllen, fest werden lassen und beschriften."],
    use: "Eine kleine Menge auf trockene, intakte Hände geben und verteilen. Besonders angenehm als letzter Pflegeschritt am Abend.",
    caution: "Nicht auf offene Risse oder entzündete Haut auftragen. Hände können zunächst rutschig sein. Der Balsam ersetzt keine medizinische Behandlung bei Handekzemen.",
  },
  {
    id: "nagelhautoel", title: "Jojoba-Nagelhautöl", category: "Lippen & Hände", tone: "mint", shape: "bottle", minutes: 5, yieldGrams: 10,
    note: "Ein unkompliziertes Zwei-Öl-Ritual für Nagelränder und Hände.",
    ingredients: [{ name: "Jojobaöl", grams: 8 }, { name: "Aprikosenkernöl", grams: 2 }],
    equipment: "Waage, kleines Becherglas, Spatel, Tropfflasche",
    steps: ["Jojobaöl und Aprikosenkernöl abwiegen.", "Mit dem trockenen Spatel sorgfältig verrühren.", "In eine kleine Tropfflasche füllen und beschriften. Die Tropfspitze später nicht direkt auf die Haut setzen."],
    use: "Einen Tropfen auf einen sauberen Finger geben und auf mehrere intakte Nagelränder verteilen.",
    caution: "Nicht auf eingerissene, blutende oder entzündete Nagelhaut geben. Bei Rohstoffallergien nicht verwenden; keine Behandlung von Nagelpilz.",
  },
];

export function filterRecipes(category: string, query: string) {
  const normalize = (value: string) => value.toLocaleLowerCase("de").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g, "ss");
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  return recipes.filter((recipe) => {
    const text = normalize([recipe.title, recipe.category, recipe.note, ...recipe.ingredients.map((ingredient) => ingredient.name)].join(" "));
    return (category === "Alle" || recipe.category === category) && words.every((word) => text.includes(word));
  });
}
