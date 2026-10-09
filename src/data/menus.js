function d(breakfast, lunch, dinner, hydrate) {
  return { breakfast, lunch, dinner, hydrate };
}

function meal(title, recipe, detail) {
  return { title, recipe, detail };
}

const reset1 = [
  d(
    meal("Yogur de coco con arándanos", "yogur-coco-arandanos", "Nueces, semillas, cacao. Suma huevo o proteína."),
    meal("Pinchitos de pavo", "pinchitos-pavo", "Marinados, con ensalada de verano."),
    meal("Crema fría de calabacín + tortilla", "crema-fria-calabacin", "Melón, pepino y hierbabuena. Haz el doble."),
    "Desayuno: 1 melocotón pequeño. Comida: puñado de arroz salvaje enfriado."
  ),
  d(
    meal("Tortilla con ibérico y rúcula", "tortilla-iberico", "Aceitunas y 4 nueces."),
    meal("Ensalada de caballa", "ensalada-caballa", "Pimiento asado, pepino y pipas."),
    meal("Endivias, tahini y hamburguesa", "endivias-burger", "Ternera 100% carne."),
    "Desayuno: 2 tostadas de sarraceno. Comida: puñado de lentejas."
  ),
  d(
    meal("Yogur de coco y anacardos", "yogur-coco-arandanos", "Canela, arándanos y proteína o huevo."),
    meal("Timbal de escalivada y pollo", "timbal-escalivada", "Del batch del domingo, solo montar."),
    meal("Ceviche de salmón + crema fría", "ceviche-salmon", "Usa la crema del lunes."),
    "Desayuno: 2 albaricoques. Comida: ½ patata asada enfriada."
  ),
  d(
    meal("Caballa con tomate y rúcula", "caballa-tomate", "Crackers de almendra o puñado de almendras."),
    meal("Wok de gambas y tortilla", "wok-gambas", "Fuego muy alto, 8–10 min."),
    meal("Wraps de cerdo y guacamole", "wraps-cerdo", "En hojas de lechuga. Cerdo del batch."),
    "Cambia crackers por tostadas de sarraceno. Comida: arroz salvaje."
  ),
  d(
    meal("Pudding de chía y fresas", "pudding-chia-fresas", "Prepáralo el jueves noche."),
    meal("Pollo con brócoli al ajillo", "pollo-brocoli-ajo", "Limón y ajo al final."),
    meal("Lubina con escarola y naranja", "lubina-naranja", "O lomos a la plancha si vas justa de tiempo."),
    "Desayuno: ½ plátano. Comida: 1 patata enfriada."
  ),
  d(
    meal("Huevos poché, aguacate e ibérico", "huevos-poche", "Si el poché falla: duros o plancha."),
    meal("Gazpacho de cerezas y solomillo", "gazpacho-cerezas", "El gazpacho mejora de un día para otro."),
    meal("Tártar de salmón", "tartar-salmon", "O ahumado si no quieres crudo."),
    "Tostadas de sarraceno. Comida: arroz salvaje."
  ),
  d(
    meal("Batido verde saciante", "batido-verde", "En cetosis estricta, quita la manzana."),
    meal("Ensaladilla rusa no rusa", "ensaladilla-no-rusa", "Base de coliflor y mayonesa casera."),
    meal("Milhojas de calabacín", "milhojas-calabacin", "Bacon de calidad, gratín rápido."),
    "Comida: patata enfriada en lugar de coliflor."
  ),
];

const reset2 = [
  d(
    meal("Muffins de calabacín y bacon", "muffins-calabacin", "Tanda doble el domingo."),
    meal("Conejo al ajillo con escalivada", "conejo-ajillo", "Sin conejo: contramuslo de pollo."),
    meal("Vichyssoise + sardinas", "vichyssoise", "La crema también vale el miércoles."),
    "Harina de espelta solo si usas hidrato. Comida: patata enfriada."
  ),
  d(
    meal("Yogur de coco y frutos rojos", "yogur-coco-arandanos", "Canela, nueces y proteína."),
    meal("Pulpo a la brasa con pisto", "pulpo-pisto", "Sepia si no hay pulpo."),
    meal("Pollo al limón con tahini", "ensalada-pollo-tahini", "Escarola, endivias y pipas."),
    "Melocotón en desayuno. Comida: patata enfriada."
  ),
  d(
    meal("Muffins de calabacín (batch)", "muffins-calabacin", "Cero cocina: de nevera o congelador."),
    meal("Caprese de búfala y solomillo", "caprese-solomillo", "Pesto del recetario."),
    meal("Dorada a la sal + vichyssoise", "dorada-sal", "O horno con limón, 18 min."),
    "Arroz salvaje en la comida."
  ),
  d(
    meal("Batido verde con semillas", "batido-verde", "Chía o lino molidos. Huevos si no hay proteína."),
    meal("Pinchos de pavo y berenjena", "pinchos-pavo-berenjena", "Salsa de yogur de coco y menta."),
    meal("Mejillones y salmón al pesto", "mejillones-salmon-pesto", "Spaghetti de calabacín al dente."),
    "Arroz salvaje en la comida."
  ),
  d(
    meal("Pudding de chía con cacao", "pudding-chia-cacao", "Jueves noche, 2 minutos."),
    meal("Pollo, brócoli y espárragos", "pollo-esparragos", "Champis al ajillo."),
    meal("Tortilla de calabacín y chucrut", "tortilla-chukrut", "Probióticos naturales."),
    "½ plátano. Comida: patata enfriada."
  ),
  d(
    meal("Revuelto de jamón y champis", "revuelto-jamon-champis", "Semillas por encima."),
    meal("Cordero y costillas con allioli", "cordero-allioli", "Horno o barbacoa."),
    meal("Pizza keto", "pizza-keto", "Comodín: usa lo que quede en la nevera."),
    "Tostadas de sarraceno. Comida: patata enfriada."
  ),
  d(
    meal("Ibérico, alfalfa y nueces", "jamon-alfalfa", "AOVE y limón."),
    meal("Roast beef y gazpacho verde", "roast-beef-lombarda", "Col lombarda en juliana."),
    meal("Frittata de restos", "frittata-restos", "Cierre de semana, cero desperdicio."),
    "Melón de postre. Fruta al gusto si reinsertas."
  ),
];

const c12s2 = [
  d(meal("Ayuno", "ayuno", "Agua, sal, infusión. Café solo si duermes bien."), meal("Caldo con pollo, huevos y aguacate", "batido-verde", "Rompe suave: caldo, huevo, aguacate."), meal("Sepia a la plancha con allioli", "allioli", "Endivias a la plancha y vinagreta de pistacho.")),
  d(meal("Ayuno", "ayuno", "Sigue la ventana de 16 h."), meal("Berenjena rellena de carne", "wraps-cerdo", "Tahini y hierbas. Misma idea que un relleno keto."), meal("Tortilla de espinacas", "tortilla-chukrut", "Pimientos asados, chucrut y aceitunas.")),
  d(meal("Ayuno", "ayuno", "Si es día 20–regla, come un desayuno keto."), meal("Hamburguesa, bacon y hummus de coliflor", "endivias-burger", "Ensalada de rúcula y macadamia."), meal("Tártar de salmón", "tartar-salmon", "Con huevos de codorniz si los tienes.")),
  d(meal("Ayuno", "ayuno", "Electrolitos si notas mareo."), meal("Sopa de kale con butifarra", "pollo-brocoli-ajo", "Col rizada y butifarra de calidad, sin azúcar."), meal("Pescado blanco al horno", "lubina-naranja", "Mayonesa tártara casera.")),
  d(meal("Ayuno", "ayuno", "Cena de ayer temprana ayuda."), meal("Costillas con ensalada de pepino", "cordero-allioli", "Aguacate, huevo, rúcula y avellanas."), meal("Pizza keto", "pizza-keto", "Base de coliflor.")),
  d(meal("Ayuno", "ayuno", "Último ayuno de entre semana."), meal("Cazuela de pollo mediterránea", "pollo-esparragos", "Tomate seco, champis y pistachos."), meal("Revuelto de gambas y acelgas", "wok-gambas", "Limón y almendras.")),
  d(meal("Yogur de coco y cacao", "yogur-coco-arandanos", "Avellanas, nibs y arándanos."), meal("Ternasco con crema de calabacín", "crema-fria-calabacin", "Cordero y crema caliente o templada."), meal("Ayuno hacia el lunes", "ayuno", "Cena temprana si mañana hay 24 h.")),
];

const c12s3 = [
  d(meal("Ayuno de 24 h", "ayuno", "Domingo a lunes. Nivel suave: 16–18 h."), meal("Crema de calabacín y lubina", "lubina-naranja", "Cúrcuma en la crema. Nueces de macadamia."), meal("Frittata rápida con amargos", "frittata-restos", "Endivias, rúcula o escarola.")),
  d(meal("Pan de coco, huevo y olivada", "pan-coco", "Frambuesas o moras, poquito."), meal("Caldo, calabacín y pavo", "pinchos-pavo-berenjena", "Setas y pimiento rojo."), meal("Ayuno 16 h", "ayuno", "Cena de ayer cuenta.")),
  d(meal("Tortitas proteicas y melva", "creps", "Hojas verdes y guacamole."), meal("Pollo exprés y ensalada", "pollo-brocoli-ajo", "Brotes, rabanitos, pepino, espárragos, olivas."), meal("Ayuno 16 h", "ayuno", "Infusión si apetece.")),
  d(meal("Yogur de coco, chía y moras", "pudding-chia-cacao", "Nueces de Brasil y nibs de cacao."), meal("Bacalao, mayonesa y pulpo", "pulpo-pisto", "Espárragos, AOVE y pimentón."), meal("Ayuno 16 h", "ayuno", "Sal marina en el agua.")),
  d(meal("Huevos de codorniz y pavo", "tortilla-iberico", "Aceitunas y espinaca baby."), meal("Acelgas con ajo negro y solomillo", "caprese-solomillo", "Nueces de macadamia."), meal("Ayuno 16 h", "ayuno", "Sin café si dormiste mal.")),
  d(meal("Crackers keto y anchoas", "crackers", "O jamón / lomo. Café bulletproof si te sienta."), meal("Estofado de ternera", "conejo-ajillo", "Ensalada de rúcula, pepino, olivas y avellanas. Congela raciones."), meal("Ayuno 16 h", "ayuno", "Prepara el domingo de brasa.")),
  d(meal("Rollitos de salmón y aguacate", "tartar-salmon", "Canónigos dentro del rollito."), meal("Chuletillas, alcachofas y allioli", "cordero-allioli", "Verduras a la brasa."), meal("Ayuno de 24 h", "ayuno", "Si el anterior costó, quédate en 16–18 h.")),
];

const mixKeto = [
  d(meal("Pudding de chía y fresas", "pudding-chia-fresas"), meal("Pavo con coliflor asada", "pollo-brocoli-ajo", "Romero y cúrcuma."), meal("Sepia a la plancha", "allioli", "Acelgas con ajo negro.")),
  d(meal("Caballa, rúcula y tomatitos", "caballa-tomate"), meal("Ternera picada con escalivada", "timbal-escalivada"), meal("Crema fría de pepino y huevos", "crema-fria-calabacin")),
  d(meal("Huevos duros, ibérico y aguacate", "huevos-poche"), meal("Endivias, tahini y bacalao", "endivias-burger", "Allioli para el bacalao."), meal("Wok de verduras y sardinas", "wok-gambas")),
  d(meal("Yogur de coco, avellanas y cacao", "yogur-coco-arandanos"), meal("Wraps de cerdo", "wraps-cerdo"), meal("Tortilla de espinacas y chucrut", "tortilla-chukrut")),
  d(meal("Tortilla, rúcula y aceitunas", "tortilla-iberico"), meal("Merluza y verduras salteadas", "lubina-naranja", "Mayonesa casera."), meal("Crema de pepino y pollo al limón", "ensalada-pollo-tahini")),
  d(meal("Pudding de chía, cacao y Brasil", "pudding-chia-cacao"), meal("Conejo al horno y ensalada", "conejo-ajillo", "Pepino, aguacate, huevo, rúcula."), meal("Pizza keto", "pizza-keto")),
  d(meal("Aguacate, caballa y canónigos", "caballa-tomate"), meal("Jamoncitos de pollo y vinagreta", "pollo-esparragos"), meal("Dorada a la sal y calabacín", "dorada-sal")),
];

const ciclo12s1 = [
  d(
    meal("Creps de sarraceno con pesto", "creps", "Rúcula, cherry, jamón serrano y pesto."),
    meal("Solomillo con endivias y tahini", "endivias-burger", "Pepino, tomate, mayonesa de tahini."),
    meal("Crema de calabacín y gambas", "crema-fria-calabacin", "Coco, jengibre, gambas al ajillo."),
    "Los carbos van en el desayuno: creps de sarraceno."
  ),
  d(
    meal("Chía pudding con frutos rojos", "pudding-chia-fresas", "En adaptación puedes poner un poco de plátano."),
    meal("Salmón al horno y espárragos", "mejillones-salmon-pesto", "Vinagreta de limón, eneldo y pistachos."),
    meal("Muslo de pollo y espinacas", "pollo-esparragos", "Anacardos salteados.")
  ),
  d(
    meal("Omelette de champis y nueces", "revuelto-jamon-champis", "Fresas al lado, ración pequeña."),
    meal("Ensalada templada de arroz enfriado", "ensalada-caballa", "Caballa y vegetales crujientes. Carbos al mediodía."),
    meal("Berenjena asada con panceta", "milhojas-calabacin", "Rúcula y rabanitos."),
    "Arroz enfriado: almidón resistente."
  ),
  d(
    meal("Porridge de avena (solo adaptación)", "yogur-coco-arandanos", "Si ya estás en cetosis, cambia a yogur de coco."),
    meal("Pavo con salsa de aguacate", "pinchitos-pavo", "Tomate y albahaca."),
    meal("Crema de espinacas y boquerones", "vichyssoise", "Carpaccio de calabacín.")
  ),
  d(
    meal("Yogur de coco, higo y macadamia", "yogur-coco-arandanos", "Higo solo en adaptación o semana 6."),
    meal("Patata enfriada, rúcula y gambas", "wok-gambas", "Patata asada 24 h en nevera."),
    meal("Ternera, endivias y fresas", "ensalada-pollo-tahini", "Queso curado y nueces."),
    "Patata enfriada al mediodía."
  ),
  d(
    meal("Tostada de boniato y anchoas", "huevos-poche", "Aguacate y nueces. Boniato = adaptación/reinserción."),
    meal("Espaguetis de calabacín boloñesa", "bolonesa", "Almendras tostadas."),
    meal("Tártar de salmón en cogollo", "tartar-salmon", "Pepino y sésamo.")
  ),
  d(
    meal("Revuelto de espárragos e ibérico", "revuelto-jamon-champis"),
    meal("Entrecot, pimientos y allioli", "cordero-allioli"),
    meal("Ayuno", "ayuno", "Cena libre si no ayunas: huevos y verdura.")
  ),
];

const reintro = [
  d(
    meal("Yogur y 1 pieza de fruta", "yogur-coco-arandanos", "Melocotón o albaricoques. Observa energía."),
    meal("Pollo y puñado de arroz salvaje", "pollo-brocoli-ajo", "El resto del plato sigue keto."),
    meal("Cena keto", "tartar-salmon", "Sin carbo extra por la noche.")
  ),
  d(
    meal("Creps de sarraceno y huevo", "creps", "Vuelves a un carbo de verdad, sin paliza."),
    meal("Ensalada de caballa y lentejas", "ensalada-caballa", "Puñado de lentejas, no un plato lleno."),
    meal("Endivias y hamburguesa", "endivias-burger")
  ),
  d(
    meal("Pudding de chía y ½ plátano", "pudding-chia-fresas"),
    meal("Patata enfriada y pavo", "pinchitos-pavo", "½–1 patata asada de ayer."),
    meal("Lubina y verdura", "lubina-naranja")
  ),
  d(
    meal("Pan de coco o sarraceno", "pan-coco"),
    meal("Wok de gambas + arroz salvaje", "wok-gambas", "Si el arroz te hincha, quítalo."),
    meal("Wraps de cerdo", "wraps-cerdo")
  ),
  d(
    meal("Huevos y tostada de sarraceno", "huevos-poche"),
    meal("Estofado o pollo + boniato", "pollo-esparragos", "Boniato pequeño con canela."),
    meal("Tortilla y chucrut", "tortilla-chukrut")
  ),
  d(
    meal("Brunch: ibérico y fruta o sarraceno", "jamon-alfalfa"),
    meal("Cordero y el carbo que mejor te sentó", "cordero-allioli"),
    meal("Pizza keto o frittata", "pizza-keto", "Si sales, elige proteína + verdura.")
  ),
  d(
    meal("El desayuno que quieras mantener", "yogur-coco-arandanos", "Anota qué carbos te sentaron bien."),
    meal("Plato mixto del domingo", "roast-beef-lombarda", "Sin ayuno largo."),
    meal("Cierre del ciclo", "frittata-restos", "Cena temprana. Mañana puedes repetir ciclo o vivir flexible.")
  ),
];

export const WEEK_BANK = {
  reset1: { id: "reset1", phase: "adaptacion", title: "Reset verano · Semana 1", days: reset1 },
  reset2: { id: "reset2", phase: "cetosis", title: "Reset verano · Semana 2", days: reset2 },
  c12s1: { id: "c12s1", phase: "adaptacion", title: "Ciclo 12 · Semana 1", days: ciclo12s1 },
  c12s2: { id: "c12s2", phase: "cetosis", title: "Ciclo 12 · Semana 2", days: c12s2 },
  c12s3: { id: "c12s3", phase: "cetosis", title: "Ciclo 12 · Semana 3", days: c12s3 },
  mix: { id: "mix", phase: "cetosis", title: "Semana 2 Reset (otra tanda)", days: mixKeto },
  reintro: { id: "reintro", phase: "reinsercion", title: "Reinserción inteligente", days: reintro },
};

const ADAPT = ["reset1", "c12s1"];
const KETO = ["reset2", "c12s2", "c12s3", "mix"];

export function weeksForCycle(cycleIndex = 0) {
  const adapt = ADAPT[cycleIndex % ADAPT.length];
  const keto = [];
  for (let i = 0; i < 4; i++) keto.push(KETO[(cycleIndex + i) % KETO.length]);
  return [adapt, ...keto, "reintro"].map((id) => WEEK_BANK[id]);
}

export function getMenuDay(dayNumber, cycleIndex = 0) {
  const weeks = weeksForCycle(cycleIndex);
  const week = weeks[Math.min(5, Math.max(0, Math.ceil(dayNumber / 7) - 1))];
  const idx = (dayNumber - 1) % 7;
  return { week, day: week.days[idx], weekday: idx };
}

export const WEEKDAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
