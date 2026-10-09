function i(id, name, qty = "") {
  return { id, name, qty };
}

export const shoppingByWeek = {
  reset1: {
    title: "La compra de esta semana",
    note: "Para una persona. Pasa el viernes o el sábado y el domingo cocina una hora: el resto de la semana solo montas.",
    sections: [
      {
        id: "carne",
        label: "Carnicería",
        items: [
          i("pavo", "Pechuga de pavo", "400 g"),
          i("pollo", "Medio pollo campero", "1"),
          i("burger", "Hamburguesa 100% ternera", "2"),
          i("solomillo", "Solomillo ibérico", "200 g"),
          i("cerdo", "Cerdo para desmenuzar", "400 g"),
          i("jamon", "Jamón ibérico", "150 g"),
          i("bacon", "Bacon de calidad, sin azúcar", "100 g"),
        ],
      },
      {
        id: "pescado",
        label: "Pescadería",
        items: [
          i("caballa", "Caballa en AOVE", "2 latas"),
          i("salmon", "Salmón fresco (congelar antes)", "350 g"),
          i("lubina", "Lubina o dorada", "1"),
          i("gambas", "Gambas", "150 g"),
        ],
      },
      {
        id: "huevos",
        label: "Huevos y nevera",
        items: [
          i("huevos", "Huevos", "18"),
          i("yogur", "Yogur de coco sin azúcar", "3"),
          i("coco", "Leche de coco de lata", "2"),
        ],
      },
      {
        id: "verde",
        label: "Fruta y verdura",
        items: [
          i("calabacin", "Calabacines", "3"),
          i("brocoli", "Brócoli", "1"),
          i("pimiento", "Pimiento asado o rojo", "2"),
          i("pepino", "Pepinos", "3"),
          i("verdes", "Rúcula, espinacas y mezclum", "1 bolsa de cada"),
          i("escarola", "Escarola y endivias", "1 + 2"),
          i("tomate", "Tomates", "5"),
          i("aguacate", "Aguacates", "4"),
          i("coliflor", "Coliflor", "1"),
          i("lechuga", "Lechuga romana", "1"),
          i("ajos", "Ajo, cebolla, jengibre", ""),
          i("hierba", "Hierbabuena", "1 manojo"),
          i("arandanos", "Arándanos y fresas", "1 tarrina"),
          i("limon", "Limones", "4"),
          i("melon", "Medio melón", "1"),
        ],
      },
      {
        id: "despensa",
        label: "Despensa",
        items: [
          i("aove", "AOVE", "1 botella"),
          i("frutos", "Nueces, almendras, anacardos", "1 bolsa"),
          i("pipas", "Pipas de calabaza y chía", ""),
          i("tahini", "Tahini", "1 tarro"),
          i("cacao", "Cacao puro", "1"),
          i("aceitunas", "Aceitunas", "1 bote"),
        ],
      },
    ],
    batch: [
      i("b-cerdo", "Cerdo desmenuzado (2 raciones)"),
      i("b-crema", "Crema de calabacín a doble"),
      i("b-huevos", "Huevos duros ×4"),
      i("b-pollo", "Pollo y escalivada"),
      i("b-chia", "Pudding de chía el jueves noche"),
    ],
  },
  reset2: {
    title: "La compra de esta semana",
    note: "Para una persona. El domingo: muffins a doble, vichyssoise y una salsa. El resto es plancha.",
    sections: [
      {
        id: "carne",
        label: "Carnicería",
        items: [
          i("bacon", "Bacon de calidad", "80 g"),
          i("conejo", "Medio conejo (o contramuslo de pollo)", "1"),
          i("solomillo", "Solomillo de cerdo", "200 g"),
          i("pollo", "Pechugas de pollo", "2"),
          i("pavo", "Pavo", "200 g"),
          i("cordero", "Costillas o cordero", "400 g"),
          i("roast", "Roast beef", "150 g"),
          i("jamon", "Jamón ibérico", "120 g"),
        ],
      },
      {
        id: "pescado",
        label: "Pescadería",
        items: [
          i("pulpo", "Pulpo precocido", "350 g"),
          i("sardinas", "Sardinas", "1 bandeja"),
          i("dorada", "Dorada", "1"),
          i("mejillones", "Mejillones", "500 g"),
          i("salmon", "Salmón", "150 g"),
        ],
      },
      {
        id: "huevos",
        label: "Huevos y nevera",
        items: [
          i("huevos", "Huevos", "16"),
          i("yogur", "Yogur de coco", "3"),
          i("bufala", "Mozzarella de búfala", "1"),
          i("parmesano", "Parmesano", "50 g"),
        ],
      },
      {
        id: "verde",
        label: "Fruta y verdura",
        items: [
          i("calabacin", "Calabacines", "6"),
          i("berenjena", "Berenjenas", "2"),
          i("pimientos", "Pimientos", "3"),
          i("cebolla", "Cebollas y puerros", "3 + 2"),
          i("coliflor", "Coliflor", "1"),
          i("brocoli", "Brócoli y espárragos", ""),
          i("verdes", "Escarola, endivias, rúcula, espinacas", ""),
          i("lombarda", "Col lombarda", "1/4"),
          i("tomate", "Tomates", "6"),
          i("menta", "Perejil y menta", ""),
          i("alfalfa", "Brotes de alfalfa", "1"),
          i("rojos", "Frutos rojos", "1 tarrina"),
          i("limon", "Limones", "5"),
        ],
      },
      {
        id: "despensa",
        label: "Despensa",
        items: [
          i("aove", "AOVE", ""),
          i("almendra", "Harina de almendra (para muffins y pizza)", "150 g"),
          i("tahini", "Tahini", ""),
          i("cacao", "Cacao puro y chía", ""),
          i("pesto", "Albahaca y piñones (o pesto)", ""),
        ],
      },
    ],
    batch: [
      i("b-muffins", "Muffins de calabacín a doble"),
      i("b-escalivada", "Escalivada"),
      i("b-vichys", "Vichyssoise a doble"),
      i("b-salsas", "Pesto y allioli"),
      i("b-chia", "Pudding de chía el jueves"),
    ],
  },
  c12s1: {
    title: "La compra de esta semana",
    note: "Semana de aterrizaje: el carbo va por la mañana o al mediodía. La cena, siempre keto.",
    sections: [
      {
        id: "carne",
        label: "Carnicería",
        items: [
          i("solomillo", "Solomillo de cerdo", "200 g"),
          i("pollo", "Muslo de pollo", "2"),
          i("ternera", "Filete de ternera", "200 g"),
          i("entrecot", "Entrecot", "1"),
          i("pavo", "Pavo", "200 g"),
          i("serrano", "Jamón serrano y panceta", ""),
          i("picada", "Carne picada", "150 g"),
        ],
      },
      {
        id: "pescado",
        label: "Pescadería",
        items: [
          i("salmon", "Salmón", "350 g"),
          i("gambas", "Gambas", "300 g"),
          i("boquerones", "Boquerones, caballa y anchoas", ""),
        ],
      },
      {
        id: "huevos",
        label: "Huevos y nevera",
        items: [i("huevos", "Huevos", "12")],
      },
      {
        id: "verde",
        label: "Fruta y verdura",
        items: [
          i("calabacin", "Calabacín", "600 g"),
          i("verdes", "Espinacas, rúcula, endivias", ""),
          i("tomate", "Tomate, pepino, berenjena, pimientos", ""),
          i("esparragos", "Espárragos", "1 manojo"),
        ],
      },
      {
        id: "despensa",
        label: "Despensa",
        items: [
          i("sarraceno", "Harina de sarraceno (creps)", "60 g"),
          i("chia", "Chía y frutos secos", ""),
        ],
      },
    ],
    batch: [
      i("b-salsas", "Mayonesa y allioli"),
      i("b-creps", "Masa de creps o pan de sarraceno"),
      i("b-carbo", "Arroz o patata, enfriados 12 h"),
    ],
  },
  c12s2: {
    title: "La compra de esta semana",
    note: "Hay más ayunos: el caldo del domingo es oro. Rompe suave, no con un festín.",
    sections: [
      {
        id: "carne",
        label: "Carnicería",
        items: [
          i("pollo", "Muslos de pollo", "2"),
          i("picada", "Carne picada", "150 g"),
          i("burger", "Hamburguesa", "150 g"),
          i("bacon", "Bacon", "80 g"),
          i("costilla", "Costilla de cerdo", "400 g"),
          i("butifarra", "Butifarra sin azúcar", "2"),
          i("ternasco", "Ternasco", "300 g"),
        ],
      },
      {
        id: "pescado",
        label: "Pescadería",
        items: [
          i("sepia", "Sepia", "1"),
          i("salmon", "Salmón", "150 g"),
          i("blanco", "Pescado blanco", "1"),
          i("gambas", "Gambas", "100 g"),
        ],
      },
      {
        id: "huevos",
        label: "Huevos y nevera",
        items: [
          i("huevos", "Huevos", "10"),
          i("codorniz", "Huevos de codorniz (si los hay)", "8"),
          i("yogur", "Yogur de coco", "1"),
        ],
      },
      {
        id: "verde",
        label: "Fruta y verdura",
        items: [
          i("aguacate", "Aguacates", "3"),
          i("coliflor", "Coliflor, kale, acelgas", ""),
          i("verdes", "Endivia, rúcula, espinaca", ""),
          i("calabacin", "Calabacines", "3"),
          i("setas", "Setas y champis", "300 g"),
          i("chucrut", "Chucrut", "1 bote"),
        ],
      },
    ],
    batch: [
      i("b-caldo", "Caldo de pollo el domingo"),
      i("b-pizza", "Base de pizza de coliflor"),
      i("b-huevos", "Huevos duros"),
    ],
  },
  c12s3: {
    title: "La compra de esta semana",
    note: "El estofado de ternera te saca dos comidas. Congela una ración.",
    sections: [
      {
        id: "carne",
        label: "Carnicería",
        items: [
          i("solomillo", "Solomillo de cerdo", "200 g"),
          i("ternera", "Ternera para estofar", "700 g"),
          i("pavo", "Pavo", "200 g"),
          i("pollo", "Pollo", "200 g"),
          i("cordero", "Chuletillas de cordero", "400 g"),
        ],
      },
      {
        id: "pescado",
        label: "Pescadería",
        items: [
          i("lubina", "Lubina", "1"),
          i("bacalao", "Bacalao", "1 lomo"),
          i("pulpo", "Pulpo cocido", "200 g"),
          i("salmon", "Salmón marinado", "150 g"),
          i("melva", "Melva o caballa", "1 lata"),
        ],
      },
      {
        id: "huevos",
        label: "Huevos y nevera",
        items: [i("huevos", "Huevos", "16")],
      },
      {
        id: "verde",
        label: "Fruta y verdura",
        items: [
          i("calabacin", "Calabacines", "3"),
          i("setas", "Setas", "350 g"),
          i("pimiento", "Pimientos rojos", "3"),
          i("esparragos", "Espárragos", "2 manojos"),
          i("verdes", "Canónigos, rúcula, acelgas, endivias", ""),
          i("alcachofa", "Alcachofas", "3"),
        ],
      },
    ],
    batch: [
      i("b-estofado", "Estofado de ternera (congelas 2 raciones)"),
      i("b-pan", "Pan de coco"),
      i("b-caldo", "Caldo de huesos"),
    ],
  },
  mix: {
    title: "La compra de esta semana",
    note: "Semana de diario: si algo falta, cambia por otra proteína de la misma familia.",
    sections: [
      {
        id: "carne",
        label: "Carnicería",
        items: [
          i("pavo", "Pavo", "300 g"),
          i("picada", "Ternera picada", "200 g"),
          i("cerdo", "Cerdo desmenuzado", "300 g"),
          i("conejo", "Conejo o pollo", "1"),
          i("jamoncitos", "Jamoncitos de pollo", "4"),
        ],
      },
      {
        id: "pescado",
        label: "Pescadería",
        items: [
          i("bacalao", "Bacalao o merluza", "2 lomos"),
          i("sepia", "Sepia", "1"),
          i("sardinas", "Sardinas y caballa", ""),
        ],
      },
      {
        id: "huevos",
        label: "Huevos y nevera",
        items: [i("huevos", "Huevos", "12"), i("iberico", "Jamón ibérico", "100 g")],
      },
      {
        id: "verde",
        label: "Fruta y verdura",
        items: [
          i("coliflor", "Coliflor", "1"),
          i("escalivada", "Pimiento, berenjena, cebolla", ""),
          i("verdes", "Endivias, rúcula, canónigos, escarola", ""),
          i("calabacin", "Calabacín, zanahoria, puerro", ""),
          i("aguacate", "Aguacates", "3"),
          i("chucrut", "Chucrut", "1 bote"),
        ],
      },
    ],
    batch: [
      i("b-cerdo", "Cerdo desmenuzado"),
      i("b-crema", "Crema de pepino"),
      i("b-huevos", "Huevos duros"),
      i("b-pizza", "Base de pizza"),
    ],
  },
  reintro: {
    title: "La compra de esta semana",
    note: "Reintroduces de uno en uno. Si un carbo te hincha, no es el tuyo: quítalo y prueba otro.",
    sections: [
      {
        id: "carne",
        label: "Carnicería",
        items: [
          i("pollo", "Pollo", "1"),
          i("pavo", "Pavo", "200 g"),
          i("cordero", "Ternera o cordero", "400 g"),
          i("iberico", "Ibérico", "100 g"),
        ],
      },
      {
        id: "pescado",
        label: "Pescadería",
        items: [i("caballa", "Caballa", "2 latas"), i("salmon", "Salmón", "200 g"), i("gambas", "Gambas", "150 g")],
      },
      {
        id: "huevos",
        label: "Huevos y nevera",
        items: [i("huevos", "Huevos", "12"), i("yogur", "Yogur de coco", "2")],
      },
      {
        id: "verde",
        label: "Fruta y verdura",
        items: [
          i("verdes", "Verdura verde de siempre", ""),
          i("aguacate", "Aguacates", "3"),
          i("fruta", "Melocotón, plátano, frutos rojos (prueba, no avalancha)", ""),
        ],
      },
      {
        id: "despensa",
        label: "Carbos a probar",
        items: [
          i("sarraceno", "Trigo sarraceno o pan de coco", ""),
          i("arroz", "Arroz salvaje", "1 bolsa pequeña"),
          i("patata", "Patatas (enfriar 12 h)", "4"),
          i("lentejas", "Lentejas (un puñado, no un plato)", "1"),
          i("boniato", "Boniato pequeño", "2"),
        ],
      },
    ],
    batch: [
      i("b-carbo", "Patatas y arroz, enfriados"),
      i("b-proteina", "Una proteína asada para 2 días"),
    ],
  },
};

export const snacks = [
  "Yogur de coco con frutos rojos y nueces",
  "Huevo duro y aceitunas",
  "Un puñado de almendras (no el paquete)",
  "Lonchas de ibérico o pavo",
  "Pepino o apio con tahini",
  "Una onza de chocolate +80%",
  "Caldo de huesos, si tienes",
];
