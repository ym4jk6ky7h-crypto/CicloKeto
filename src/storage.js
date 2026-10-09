const KEY = "cicloketo-v1";

const empty = {
  startDate: null,
  weightKg: 70,
  activity: 1.8,
  cycleIndex: 0,
  program: "ciclo",
  resetId: "reset1",
  hydrates: true,
  swaps: {},
  checkins: {},
  shopChecks: {},
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...empty, checkins: {}, shopChecks: {} };
    const parsed = JSON.parse(raw);
    return {
      ...empty,
      ...parsed,
      program: parsed.program || "ciclo",
      resetId: parsed.resetId || "reset1",
      checkins: parsed.checkins || {},
      swaps: parsed.swaps || {},
      shopChecks: parsed.shopChecks || {},
    };
  } catch {
    return { ...empty, checkins: {}, shopChecks: {} };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function todayISO(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(iso, days) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return todayISO(dt);
}

export function diffDays(fromIso, toIso) {
  const a = new Date(fromIso + "T12:00:00");
  const b = new Date(toIso + "T12:00:00");
  return Math.round((b - a) / 86400000);
}
