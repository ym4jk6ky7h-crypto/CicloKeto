import { dishes } from "./dishes";
import { getMenuDay, weeksForCycle, WEEKDAYS, WEEKDAYS_SHORT, WEEK_BANK } from "./menus";

export const TOTAL_DAYS = 42;
export const RESET_DAYS = 7;

export const weekMeta = [
  {
    week: 1,
    phase: "adaptacion",
    title: "Aterrizar",
    motto: "Esta semana no se trata de apretar. Se trata de que el cuerpo deje de pedir azúcar a gritos.",
    fastingDaily: "12–14 h",
    fastingSunday: "Si te sienta, 16–18 h. Si no, cena temprano y listo.",
    focus: "Carbo por la mañana o al mediodía, nunca en la cena. Come con calma y duerme.",
  },
  {
    week: 2,
    phase: "cetosis",
    title: "Entrar en grasa",
    motto: "Puede que estés más cansada los primeros días. No es fracaso: es el cambio de combustible.",
    fastingDaily: "14–16 h",
    fastingSunday: "24 h, o 16–18 si duermes mal.",
    focus: "Verdura verde, proteína y grasa buena. Nada de cereal, fruta, legumbre ni tubérculo.",
  },
  {
    week: 3,
    phase: "cetosis",
    title: "La energía se asienta",
    motto: "Si ya no tienes antojos a media tarde, vas bien. Si sí, mira la proteína y el agua.",
    fastingDaily: "16 h",
    fastingSunday: "Hasta 30 h, solo si el cuerpo va a gusto.",
    focus: "En días 20–regla, ayuno corto. El ciclo hormonal manda más que el reloj.",
  },
  {
    week: 4,
    phase: "cetosis",
    title: "Cuerpo flexible",
    motto: "Ya no es un sprint. Es cocina de diario y electrolitos, como quien se lava los dientes.",
    fastingDaily: "16 h",
    fastingSunday: "36 h, o baja si no te sienta.",
    focus: "Agua, sal marina, potasio y magnesio. Proteína en las tres comidas.",
  },
  {
    week: 5,
    phase: "cetosis",
    title: "Sin agobio",
    motto: "Si el ayuno te quita la paz, no es tu ayuno. Come y sigue.",
    fastingDaily: "16 h",
    fastingSunday: "48 h solo si el anterior te sentó bien.",
    focus: "Profundizas, pero la salud va antes que el récord.",
  },
  {
    week: 6,
    phase: "reinsercion",
    title: "Volver al mundo",
    motto: "El objetivo no es vivir siempre en cetosis. Es saber entrar y salir sin caos.",
    fastingDaily: "12–13 h",
    fastingSunday: "Sin ayuno largo. Come con la gente.",
    focus: "Reintroduces carbos de uno en uno y anotas cómo te sientan.",
  },
];

export const resetMeta = {
  reset1: {
    week: 1,
    phase: "adaptacion",
    title: "Reset suave",
    motto: "Siete días para bajar revoluciones y comer como si te importaras.",
    fastingDaily: "12–14 h",
    fastingSunday: "16–18 h, sin heroísmo",
    focus: "Platos frescos y proteína en cada comida. Si es tu primer reset, puedes sumar un carbo al mediodía.",
  },
  reset2: {
    week: 1,
    phase: "cetosis",
    title: "Reset keto",
    motto: "Una semana de nevera clara: verde, proteína y grasa buena.",
    fastingDaily: "14–16 h",
    fastingSunday: "16–18 h está perfecto",
    focus: "Sin cereal, fruta, legumbre ni tubérculo. Cocina el domingo y la semana se pone fácil.",
  },
};

export function totalDaysFor(program) {
  return program === "reset" ? RESET_DAYS : TOTAL_DAYS;
}

export function getPhaseForDay(dayNumber, program = "ciclo", resetId = "reset1") {
  if (program === "reset") return WEEK_BANK[resetId]?.phase || "adaptacion";
  if (dayNumber <= 7) return "adaptacion";
  if (dayNumber <= 35) return "cetosis";
  return "reinsercion";
}

export function getWeekForDay(dayNumber, program = "ciclo") {
  if (program === "reset") return 1;
  return Math.min(6, Math.max(1, Math.ceil(dayNumber / 7)));
}

export function getWeekMeta(week, program = "ciclo", resetId = "reset1") {
  if (program === "reset") return resetMeta[resetId] || resetMeta.reset1;
  return weekMeta[week - 1];
}

export function getMealsForDay(dayNumber, cycleIndex = 0, program = "ciclo", resetId = "reset1") {
  if (program === "reset") {
    const plan = WEEK_BANK[resetId] || WEEK_BANK.reset1;
    const idx = Math.max(0, Math.min(6, (dayNumber - 1) % 7));
    return {
      ...plan.days[idx],
      source: plan.title,
      weekday: WEEKDAYS[idx],
      weekPlanId: plan.id,
    };
  }
  const { week, day, weekday } = getMenuDay(dayNumber, cycleIndex);
  return {
    ...day,
    source: week.title,
    weekday: WEEKDAYS[weekday],
    weekPlanId: week.id,
  };
}

export function getWeekPlan(dayNumber, cycleIndex = 0, program = "ciclo", resetId = "reset1") {
  if (program === "reset") return WEEK_BANK[resetId] || WEEK_BANK.reset1;
  return getMenuDay(dayNumber, cycleIndex).week;
}

export function getWeekMenu(weekNumber, cycleIndex = 0, program = "ciclo", resetId = "reset1") {
  if (program === "reset") {
    const plan = WEEK_BANK[resetId] || WEEK_BANK.reset1;
    return plan.days.map((day, i) => ({
      weekday: WEEKDAYS[i],
      short: WEEKDAYS_SHORT[i],
      dayNumber: i + 1,
      weekTitle: plan.title,
      ...day,
    }));
  }
  const start = (Math.max(1, Math.min(6, weekNumber)) - 1) * 7 + 1;
  return Array.from({ length: 7 }, (_, i) => {
    const dayNumber = start + i;
    const { week, day, weekday } = getMenuDay(dayNumber, cycleIndex);
    return {
      weekday: WEEKDAYS[weekday],
      short: WEEKDAYS_SHORT[weekday],
      dayNumber,
      weekTitle: week.title,
      ...day,
    };
  });
}

export function swapMeal(current, mealKey, phase) {
  const pool = dishes.filter((d) => d.meal === mealKey && d.phases.includes(phase) && d.id !== current?.recipe);
  if (!pool.length) return current;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return { title: pick.title, recipe: pick.id, detail: pick.ingredients?.slice(0, 2).join(" · ") || pick.title };
}

export function nextCycleIndex(current = 0) {
  return current + 1;
}

export { weeksForCycle, WEEKDAYS, WEEKDAYS_SHORT };
