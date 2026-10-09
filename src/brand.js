export const APP_NAME = "Menú Keto";
export const APP_SHORT = "Menú Keto";
export const APP_TAGLINE = "Comida keto para cada día, recetas paso a paso";
export const APP_BLURB =
  "Qué hay hoy en la mesa, cómo se cocina aunque no sepas, y la lista del súper.";

export function iconUrl(file = "icon.svg") {
  return `${import.meta.env.BASE_URL}${file}`;
}
