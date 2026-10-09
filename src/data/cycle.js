import { dishes } from "./dishes";
import { getMenuDay, weeksForCycle, WEEKDAYS } from "./menus";

export const TOTAL_DAYS = 42;

export const weekMeta = [
  {
    week: 1,
    phase: "adaptacion",
    title: "Adaptación con propósito",
    motto: "Planta la semilla. Esta semana, a rajatabla.",
    fastingDaily: "12–14 h",
    fastingSunday: "24 h (completo / intermedio / suave 16–18 h)",
    focus: "Carbohidratos controlados por la mañana o al mediodía. Cena keto. El cuerpo deja de depender del azúcar.",
  },
  {
    week: 2,
    phase: "cetosis",
    title: "Cetosis activa",
    motto: "Entras en modo quemagrasa.",
    fastingDaily: "14–16 h",
    fastingSunday: "24 h",
    focus: "Sin cereal, fruta, legumbre ni tubérculo. Verdura verde, proteína y grasa buena.",
  },
  {
    week: 3,
    phase: "cetosis",
    title: "Cetosis activa",
    motto: "La energía se estabiliza.",
    fastingDaily: "16 h",
    fastingSunday: "30 h",
    focus: "Si duermes mal o estás en días 20–regla, baja el ayuno del domingo. No es fracaso.",
  },
  {
    week: 4,
    phase: "cetosis",
    title: "Cetosis activa",
    motto: "Flexibilidad metabólica.",
    fastingDaily: "16 h",
    fastingSunday: "36 h",
    focus: "Electrolitos cada día: agua, sal marina, potasio y magnesio. Proteína en las 3 comidas.",
  },
  {
    week: 5,
    phase: "cetosis",
    title: "Cetosis activa",
    motto: "Profundizas, sin agobio.",
    fastingDaily: "16 h",
    fastingSunday: "48 h (solo si el anterior te sentó bien)",
    focus: "El ayuno es una herramienta, no una prueba. Si te quita la paz, no es tu ayuno.",
  },
  {
    week: 6,
    phase: "reinsercion",
    title: "Reinserción inteligente",
    motto: "Ensayo general de tu nueva vida.",
    fastingDaily: "12–13 h",
    fastingSunday: "Sin ayuno largo",
    focus: "Reintroduces carbos estratégicos. El objetivo no es vivir siempre en cetosis.",
  },
];

export function getPhaseForDay(dayNumber) {
  if (dayNumber <= 7) return "adaptacion";
  if (dayNumber <= 35) return "cetosis";
  return "reinsercion";
}

export function getWeekForDay(dayNumber) {
  return Math.min(6, Math.max(1, Math.ceil(dayNumber / 7)));
}

export function getWeekMeta(week) {
  return weekMeta[week - 1];
}

export function getMealsForDay(dayNumber, cycleIndex = 0) {
  const { week, day, weekday } = getMenuDay(dayNumber, cycleIndex);
  return {
    ...day,
    source: week.title,
    weekday: WEEKDAYS[weekday],
    weekPlanId: week.id,
  };
}

export function getWeekPlan(dayNumber, cycleIndex = 0) {
  return getMenuDay(dayNumber, cycleIndex).week;
}

export function swapMeal(current, mealKey, phase) {
  const pool = dishes.filter((d) => d.meal === mealKey && d.phases.includes(phase) && d.id !== current?.recipe);
  if (!pool.length) return current;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return { title: pick.title, recipe: pick.id, detail: pick.steps?.[0] || pick.title };
}

export function nextCycleIndex(current = 0) {
  return current + 1;
}

export { weeksForCycle, WEEKDAYS };
