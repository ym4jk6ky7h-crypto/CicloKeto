import { recipes } from "./recipes";

export const MEAL_FILTERS = [
  { id: "all", label: "Todas" },
  { id: "breakfast", label: "Desayuno" },
  { id: "lunch", label: "Comida" },
  { id: "dinner", label: "Cena" },
  { id: "extra", label: "Salsas y extras" },
];

export const PROTEIN_FILTERS = [
  { id: "all", label: "Cualquier proteína" },
  { id: "huevo", label: "Huevo" },
  { id: "ave", label: "Pollo / pavo" },
  { id: "pescado", label: "Pescado" },
  { id: "marisco", label: "Marisco" },
  { id: "roja", label: "Ternera / cordero" },
  { id: "cerdo", label: "Cerdo" },
  { id: "vegetal", label: "Sin carne" },
];

export const KIND_FILTERS = [
  { id: "all", label: "Todo" },
  { id: "Platos", label: "Platos" },
  { id: "Salsas", label: "Salsas" },
  { id: "Masas", label: "Panes y masas" },
  { id: "Dulces", label: "Dulces" },
  { id: "Helados", label: "Helados" },
];

export const MEAL_LABELS = {
  breakfast: "Desayuno",
  lunch: "Comida",
  dinner: "Cena",
  extra: "Extra",
};

export const TIPS = {
  "yogur-coco-arandanos": "Si te quedas corta, un huevo duro o un cacito de proteína sin azúcar al lado.",
  "pinchitos-pavo": "Marina el domingo. Sin pavo: pechuga o contramuslo de pollo.",
  "crema-fria-calabacin": "Haz el doble: la otra mitad es la cena del miércoles.",
  "tortilla-iberico": "Si vas justa de tiempo, cambia la tortilla por huevos duros del batch.",
  "ensalada-caballa": "Atún, bonito o sardinas valen como recambio puntual.",
  "endivias-burger": "La hamburguesa tiene que ser 100% carne, sin pan rallado ni relleno.",
  "timbal-escalivada": "La escalivada aguanta 5 días. El lunes solo montas.",
  "ceviche-salmon": "Congélalo antes. Si no te convence crudo: ahumado o papillote.",
  "caballa-tomate": "Un desayuno salado que sacia y no pide pan.",
  "wok-gambas": "Sin gambas: langostinos o tiras de pollo. Fuego muy alto.",
  "wraps-cerdo": "Sin cerdo: pollo desmenuzado o atún. También vale en bol.",
  "pudding-chia-fresas": "Se hace la noche anterior. Suma huevo si te quedas corta.",
  "pollo-brocoli-ajo": "El brócoli, corto de cocción. El ajo, picado unos minutos antes.",
  "lubina-naranja": "Sin lubina: dorada o lomos a la plancha en 8 minutos.",
  "huevos-poche": "Si el poché se resiste: micro, plancha o duros de reserva.",
  "gazpacho-cerezas": "El gazpacho, hecho el día antes, gana. El solomillo, 2–3 min.",
  "tartar-salmon": "Versión exprés: salmón ahumado en tiras.",
  "batido-verde": "En cetosis estricta quita la manzana. Sin proteína en polvo: 2 huevos duros.",
  "ensaladilla-no-rusa": "Coliflor en lugar de patata. Se puede dejar hecha del sábado.",
  "milhojas-calabacin": "Sin lácteos, quita el queso. Más saciante: huevo poché encima.",
  "muffins-calabacin": "Calabacín bien escurrido. Tanda doble el domingo.",
  "conejo-ajillo": "Sin conejo: contramuslo de pollo.",
  vichyssoise: "Haz doble para el miércoles. Las sardinas, con espina si te sienta bien.",
  "pulpo-pisto": "Sepia o calamar si no hay pulpo. El pimentón, al final.",
  "ensalada-pollo-tahini": "Los amargos (escarola, endivia) ayudan a digerir la cena.",
  "caprese-solomillo": "Búfala tiene menos lactosa que la mozzarella de vaca.",
  "dorada-sal": "Si no quieres lío: horno con AOVE, limón y romero, 18 min.",
  "pinchos-pavo-berenjena": "El yogur de coco con menta ayuda a digerir la proteína.",
  "mejillones-salmon-pesto": "Sin espiralizador, usa el pelador de verdura.",
  "pudding-chia-cacao": "Prepáralo el jueves noche. 2 minutos.",
  "pollo-esparragos": "Un plato de plancha que cubre verdura y proteína sin pensar.",
  "tortilla-chukrut": "El chucrut al lado, no dentro, para que no se cueza.",
  "revuelto-jamon-champis": "Fuego medio-bajo: el huevo debe quedar cremoso.",
  "cordero-allioli": "Allioli casero, no industrial. Verdura a fuego fuerte al lado.",
  "pizza-keto": "El truco es sacar el agua de la coliflor. Comodín de fin de semana.",
  "jamon-alfalfa": "Cero cocina. Brotes, rúcula, nueces y un buen AOVE.",
  "roast-beef-lombarda": "El roast beef frío conserva mejor la proteína.",
  "frittata-restos": "Cierre de semana: huevo + lo que sobre. Cero desperdicio.",
  ayuno: "Agua, sal, infusión. Si te quita el sueño, baja a 16–18 h.",
  mayonesa: "El huevo a temperatura ambiente. Si corta, empieza de nuevo con otro huevo y añade la mezcla.",
  allioli: "Un diente pequeño: que se note, no que pite.",
  guacamole: "Hazlo al momento: se oxida. Textura con trozos, no puré.",
  pesto: "Cúbrelo con aceite en el tarro para que no se oxide.",
  bolonesa: "En cetosis, poca zanahoria y poco tomate. Sobre calabacín, no pasta.",
  panecillo: "Para burger keto o tostada rápida. Tótalo 30 s más si lo quieres más firme.",
  "pan-sarraceno": "Solo semana 1 (mañana o mediodía) y semana 6. No es para cetosis.",
  "panellets-healthy": "Llevan boniato: resérvalos para la semana 6.",
  "helado-frutos": "En cetosis, quita el plátano y usa solo yogur y frutos rojos.",
  "helado-cacao": "Solo reinserción: el plátano saca de cetosis.",
};

const WHY = {
  "yogur-coco-arandanos": "El cacao puro es de los alimentos más antiinflamatorios. Las semillas molidas sueltan omega-3; enteras casi no se absorben. La proteína en el desayuno evita el pico de insulina y aguanta hasta la comida.",
  "pinchitos-pavo": "Pavo magro + especias (cúrcuma, pimentón, comino) y un bol de verdes. Marina el domingo y el lunes solo planchas. Si no hay pavo, sirve pechuga o contramuslo.",
  "crema-fria-calabacin": "Calabacín, pepino y melón hidratan y sientan ligero. Haz el doble: la otra mitad es la cena del miércoles y mejora de un día para otro. La tortilla pone la proteína.",
  "tortilla-iberico": "Huevo, jamón de calidad, rúcula, aceitunas y nueces: proteína, grasa buena y amargos. Si vas justa de tiempo, cambia la tortilla por huevos duros del batch.",
  "ensalada-caballa": "La caballa aporta EPA y DHA. El tomate o pimiento asado con AOVE mejora la absorción de antioxidantes. Atún, bonito o sardinas valen como recambio puntual.",
  "endivias-burger": "Las endivias amargas estimulan la digestión de las grasas. El tahini suma calcio, magnesio y zinc. La hamburguesa tiene que ser 100% carne, sin relleno.",
  "timbal-escalivada": "Pollo campero y verduras asadas: el plato de domingo que luego solo se monta. La escalivada aguanta 5 días y cada día está más rica.",
  "ceviche-salmon": "El cítrico “cuece” sin calor y conserva omega-3. Usa salmón de calidad, congelado antes. Si no te convence crudo, pasa a ahumado o papillote.",
  "caballa-tomate": "Pescado azul + tomate + AOVE: omega-3 y licopeno. Un desayuno salado que sacia de verdad y no pide pan.",
  "wok-gambas": "Fuego muy alto, pocos minutos. El jengibre y los champiñones ayudan a modular inflamación. Sin gambas: langostinos o tiras de pollo.",
  "wraps-cerdo": "El cerdo del batch, guacamole en el momento y lechuga como wrap. Si no comes cerdo, pollo desmenuzado o atún. También vale en bol.",
  "pudding-chia-fresas": "Se hace la noche anterior en 2 minutos. La chía hidratada da fibra y saciedad; las fresas aportan polifenoles. Suma huevo o proteína si te quedas corta.",
  "pollo-brocoli-ajo": "El brócoli corto de cocción conserva sulforafano. El ajo, picado unos minutos antes, rinde más. Plato de diario, 20 minutos.",
  "lubina-naranja": "Pescado blanco al horno y una ensalada amarga con naranja. La escarola ayuda a digerir la grasa; el vinagre de manzana suaviza la glucemia.",
  "huevos-poche": "La yema poco hecha conserva colina (sistema nervioso e inflamación). Si el poché se resiste: micro, plancha o duros de reserva.",
  "gazpacho-cerezas": "Las cerezas son ricas en antocianinas; en frío se conservan mejor. El solomillo ibérico pone la proteína. El gazpacho, hecho el día antes, gana.",
  "tartar-salmon": "Salmón sin calor, máximo omega-3, con aguacate y rúcula. Congélalo antes. Versión exprés: ahumado en tiras.",
  "batido-verde": "Grasa de coco, espinacas (magnesio) y jengibre. En cetosis estricta quita la manzana. Si no usas proteína en polvo, 2 huevos duros al lado.",
  "ensaladilla-no-rusa": "Coliflor en lugar de patata: mismo ritual, menos glucosa. Mayonesa casera, caballa y pepinillos. Se puede dejar hecha del sábado.",
  "milhojas-calabacin": "Cena ligera de domingo: calabacín, bacon de calidad y un gratinado corto. Sin lácteos, quita el queso. Más saciante: huevo poché encima.",
  "muffins-calabacin": "Tanda doble el domingo = desayuno de lunes y miércoles. Calabacín bien escurrido para que no queden húmedos. Bacon sin nitritos.",
  "conejo-ajillo": "El conejo es de las carnes más magras y digestivas. El ajo laminado antes de cocinar rinde más. Sin conejo: contramuslo de pollo.",
  "vichyssoise": "Coliflor en vez de patata: crema fría con poca carga. Las sardinas dan omega-3 y, si llevas espina, calcio. Haz doble para el miércoles.",
  "pulpo-pisto": "Pulpo magro (hierro, zinc, selenio) y pisto de verdura. El pimentón, al final, no en la plancha. Sepia o calamar si no hay pulpo.",
  "ensalada-pollo-tahini": "Amargos (escarola, endivia) + tahini-limón. Facilitan la cena y la digestión de la proteína. Pipas para el crujiente.",
  "caprese-solomillo": "Búfala (menos lactosa que la de vaca), tomate, pesto y un solomillo jugoso de 2–3 minutos. La albahaca sienta muy bien al digestivo.",
  "dorada-sal": "La costra de sal sella el pescado sin añadir grasa. 20–25 min. Si no quieres lío: horno con AOVE, limón y romero.",
  "pinchos-pavo-berenjena": "Pavo con comino y pimentón sobre berenjena asada. El yogur de coco con menta ayuda a digerir la proteína. Clásico mediterráneo-oriental.",
  "mejillones-salmon-pesto": "Mejillones (B12, hierro, zinc) y spaghetti de calabacín al dente: la sensación de pasta, casi sin carbo. Sin espiralizador, usa el pelador.",
  "pudding-chia-cacao": "Chía + cacao = más magnesio y flavonoides. Se prepara el jueves noche. Frutos rojos y almendras por la mañana.",
  "pollo-esparragos": "Espárragos (inulina y glutatión), brócoli y champis al ajillo. Un plato de plancha que cubre verdura y proteína sin pensar.",
  "tortilla-chukrut": "El chucrut es probiótico de verdad: microbiota e inflamación de origen digestivo. Aceitunas y rúcula al lado, no dentro, para que no se cueza.",
  "revuelto-jamon-champis": "Champis (beta-glucanos) y jamón de calidad. Fuego medio-bajo para que el huevo quede cremoso. Semillas al final.",
  "cordero-allioli": "Cordero de pasto y allioli casero (huevo + ajo + AOVE), no industrial. Horno o barbacoa. Verdura a fuego fuerte al lado.",
  "pizza-keto": "Base de coliflor bien escurrida: el truco es sacar el agua. Comodín de fin de semana con lo que quede en la nevera. Crucífera + ritual de pizza.",
  "jamon-alfalfa": "Los brotes de alfalfa son densísimos en nutrientes por gramo. Ibérico, rúcula, nueces, AOVE y limón. Cero cocina, mucho plato.",
  "roast-beef-lombarda": "La lombarda tiene muchísimas más antocianinas que la col blanca. El roast beef frío conserva mejor la proteína. Gazpacho verde para el calor.",
  "frittata-restos": "Cierre de semana: huevo + lo que sobre. Cero desperdicio, proteína alta. El patrón de todo el programa en una sartén.",
  ayuno: "El ayuno es una herramienta, no una prueba. Agua, sal, infusión. Si te quita el sueño o te pone de los nervios, baja a 16–18 h. La salud va antes que el reloj.",
  mayonesa: "La salsa de diario. Huevo, limón y AOVE: grasa buena para aliñar sin aceites refinados. Si emulsiona mal, el huevo tenía que estar a temperatura ambiente.",
  allioli: "Mayonesa con ajo. Acompaña pescado, cordero y verduras asadas. Un diente pequeño: que se note, no que pite.",
  "mayo-aguacate": "Misma función que la mayonesa, con aguacate. Más cremosa, más fácil de triturar, perfecta para pescado y calabacín.",
  guacamole: "Aguacate, tomate, cebolla y lima. Hazlo al momento: se oxida. Textura con trozos, no puré fino.",
  pesto: "Albahaca, frutos secos, parmesano y AOVE. Cubre spaghetti de calabacín, solomillo y ensaladas. Cúbrelo con aceite en el tarro.",
  bolonesa: "Carne y sofrito. En cetosis, poca zanahoria y poco tomate. Sobre calabacín, no sobre pasta.",
  panecillo: "Pan de micro en 2 minutos: almendra, huevo y AOVE. Para burger keto o tostada rápida.",
  "pan-coco": "Pan de horno con huevo y harina de coco. Tótalo en rebanadas. Vale en las tres fases.",
  "pan-sarraceno": "Carbo de adaptación y de la semana 6. Sin gluten, fermentado. No es para cetosis estricta.",
  creps: "Masa fina de sarraceno. Desayuno de semana 1 o 6, con huevo y verdes. Reposa 10 min para que no se rompan.",
  crackers: "Crujiente keto para caballa, queso o guacamole. Se hacen el finde y aguantan varios días en bote.",
  "panellets-keto": "Dulce de ciclo: almendra, calabacín escurrido y eritritol. Para un antojo sin salir de cetosis.",
  "panellets-healthy": "Llevan boniato: resérvalos para la semana 6.",
  coca: "Brioche keto de almendra y psyllium. Para un desayuno especial o merienda de ciclo.",
  "crema-pastelera": "Relleno de coca o vasitos. Coco o almendra, yemas y eritritol. Sin azúcar.",
  cheesecake: "Queso, nata y eritritol. El centro se mueve al salir: cuaja en nevera. Ración pequeña.",
  brownie: "Aguacate y cacao. Si el paladar ya está adaptado, puedes saltarte el eritritol.",
  "helado-coco": "Helado de coco y vainilla, sin azúcar. Saca 10 min antes. En las tres fases.",
  "helado-frutos": "El plátano es para adaptación o semana 6. En cetosis, solo yogur y frutos rojos.",
  "helado-cacao": "Plátano congelado: solo reinserción. Saca de cetosis, pero cierra el ciclo con gusto.",
};

const ART = {
  bowl: "/img/art/bowl.jpg",
  fish: "/img/art/fish.jpg",
  salad: "/img/art/salad.jpg",
  soup: "/img/art/soup.jpg",
  eggs: "/img/art/eggs.jpg",
  meat: "/img/art/meat.jpg",
  smoothie: "/img/art/smoothie.jpg",
  pudding: "/img/art/pudding.jpg",
};

function blob(text) {
  return (text || "").toLowerCase();
}

function inferMeal(r) {
  if (r.meal) return r.meal;
  if (r.chapter && r.chapter !== "Platos") return "extra";
  return "extra";
}

function inferProtein(r) {
  const t = blob(`${r.title} ${(r.ingredients || []).join(" ")}`);
  if (/gamba|mejill|pulpo|sepia|langost/.test(t)) return "marisco";
  if (/salm[oó]n|caballa|lubina|dorada|sardina|merluza|bacalao|boquer|anchoa|melva|pescado/.test(t)) return "pescado";
  if (/pavo|pollo|conejo|ave/.test(t)) return "ave";
  if (/ternera|hamburg|entrecot|cordero|ternasco|roast|buey/.test(t)) return "roja";
  if (/cerdo|bacon|ib[eé]rico|solomillo|costilla|jam[oó]n|lomo/.test(t) && !/pavo/.test(t)) return "cerdo";
  if (/huevo|tortilla|frittata|revuelto|poch/.test(t)) return "huevo";
  return "vegetal";
}

function inferArt(r, protein) {
  const t = blob(r.title);
  if (r.id === "ayuno") return "fast";
  if (r.chapter === "Salsas") return "sauce";
  if (r.chapter === "Masas") return "bread";
  if (r.chapter === "Dulces") return "dessert";
  if (r.chapter === "Helados") return "ice";
  if (/batido/.test(t)) return "smoothie";
  if (/pudding|ch[ií]a/.test(t)) return "pudding";
  if (/crema|gazpacho|vichys|caldo|sopa/.test(t)) return "soup";
  if (/ensalada|endivia|caprese|escalivada/.test(t)) return "salad";
  if (protein === "huevo" || /tortilla|frittata|revuelto|omelette|muffins|poch/.test(t)) return "eggs";
  if (protein === "pescado" || protein === "marisco") return "fish";
  if (protein === "ave" || protein === "roja" || protein === "cerdo") return "meat";
  if (r.meal === "breakfast") return "bowl";
  return "bowl";
}

function proteinLabel(id) {
  return PROTEIN_FILTERS.find((p) => p.id === id)?.label || "Proteína";
}

export function enrich(recipe) {
  const meal = inferMeal(recipe);
  const protein = recipe.protein || inferProtein(recipe);
  const art = inferArt(recipe, protein);
  return {
    ...recipe,
    meal,
    protein,
    proteinLabel: proteinLabel(protein),
    mealLabel: MEAL_LABELS[meal] || "Extra",
    art,
    artSrc: recipe.image || ART[art],
    why: recipe.why || WHY[recipe.id] || "Plato del método: proteína, verdura y grasa buena. Si un ingrediente falta, usa el equivalente de la guía.",
    tip: recipe.tip || TIPS[recipe.id] || "",
    servings: recipe.servings || "1 ración",
    searchBlob: blob(
      [recipe.title, recipe.chapter, meal, protein, proteinLabel(protein), MEAL_LABELS[meal], ...(recipe.ingredients || []), ...(recipe.steps || []), WHY[recipe.id] || "", TIPS[recipe.id] || ""].join(" ")
    ),
  };
}

export const catalog = recipes.map(enrich);

export function getCatalogItem(id) {
  return catalog.find((r) => r.id === id);
}

export { ART };
