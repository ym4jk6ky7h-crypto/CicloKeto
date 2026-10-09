import { useState } from "react";
import { getCatalogItem } from "./data/catalog";
import { FoodArt } from "./FoodArt.jsx";

const MEAL_KEYS = [
  { key: "breakfast", label: "Desayuno" },
  { key: "lunch", label: "Comida" },
  { key: "dinner", label: "Cena" },
];

function Cover({ item }) {
  if (!item) return <div className="cover" />;
  return (
    <div className="cover">
      <FoodArt kind={item.art} title={item.title} />
    </div>
  );
}

export function WeekBoard({
  program,
  weekNumber,
  weekCount,
  weekMenu,
  meta,
  todayNumber,
  hydrates,
  onWeek,
  onOpenRecipe,
  onGoToday,
}) {
  const [openDay, setOpenDay] = useState(todayNumber);

  const selected = weekMenu.find((d) => d.dayNumber === openDay) || weekMenu[0];

  return (
    <section className="week-board">
      <header className="page-head">
        <p className="eyebrow">{meta.title}</p>
        <h1>{program === "reset" ? "Tu semana" : `Semana ${weekNumber}`}</h1>
        <p>{meta.motto}</p>
      </header>

      {program !== "reset" && (
        <div className="week-nav">
          <button className="mini" disabled={weekNumber <= 1} onClick={() => onWeek(weekNumber - 1)}>
            Anterior
          </button>
          <span>
            {weekNumber} / {weekCount}
          </span>
          <button className="mini" disabled={weekNumber >= weekCount} onClick={() => onWeek(weekNumber + 1)}>
            Siguiente
          </button>
        </div>
      )}

      <div className="cal-grid">
        {weekMenu.map((d) => (
          <button
            key={d.dayNumber}
            className={`cal-day ${d.dayNumber === openDay ? "open" : ""} ${d.dayNumber === todayNumber ? "today" : ""}`}
            onClick={() => setOpenDay(d.dayNumber)}
          >
            <span className="cal-letter">{d.short}</span>
            <strong>{d.weekday}</strong>
            {MEAL_KEYS.map((m) => (
              <p key={m.key}>{d[m.key]?.title}</p>
            ))}
          </button>
        ))}
      </div>

      {selected && (
        <div className="cal-detail">
          <div className="cal-detail-head">
            <h2>{selected.weekday}</h2>
            {selected.dayNumber === todayNumber ? (
              <button className="link" onClick={onGoToday}>
                Es hoy →
              </button>
            ) : (
              <p className="muted">Día {selected.dayNumber}</p>
            )}
          </div>
          <div className="meals">
            {MEAL_KEYS.map((m) => {
              const item = selected[m.key];
              const cat = item?.recipe ? getCatalogItem(item.recipe) : null;
              return (
                <button
                  key={m.key}
                  className="card meal visual meal-open cal-meal"
                  onClick={() => item?.recipe && onOpenRecipe(item.recipe)}
                >
                  <Cover item={cat} />
                  <div>
                    <p className="eyebrow">{m.label}</p>
                    <h3>{item?.title}</h3>
                    <p>{item?.detail}</p>
                  </div>
                </button>
              );
            })}
          </div>
          {hydrates && selected.hydrate && meta.phase !== "cetosis" && (
            <article className="card hydrate">
              <p className="eyebrow">Si quieres un carbo</p>
              <p>{selected.hydrate}</p>
            </article>
          )}
        </div>
      )}
    </section>
  );
}

export function ShopList({ shop, checks, onToggle }) {
  const [onlyLeft, setOnlyLeft] = useState(false);
  if (!shop) {
    return (
      <section>
        <header className="page-head">
          <h1>Lista de la compra</h1>
          <p>Cuando empieces la semana, aquí sale lo que hay que traer.</p>
        </header>
      </section>
    );
  }

  const all = [
    ...shop.sections.flatMap((s) => s.items.map((it) => ({ ...it, section: s.label }))),
    ...(shop.batch || []).map((it) => ({ ...it, section: "Cocinar el domingo" })),
  ];
  const done = all.filter((it) => checks[it.id]).length;

  function show(it) {
    if (!onlyLeft) return true;
    return !checks[it.id];
  }

  return (
    <section className="shop">
      <header className="page-head">
        <h1>Lista de la compra</h1>
        <p>{shop.note}</p>
      </header>
      <div className="shop-progress">
        <div className="bar">
          <i style={{ width: `${all.length ? (done / all.length) * 100 : 0}%` }} />
        </div>
        <p>
          {done} de {all.length} · {all.length - done === 0 ? "lista lista" : `faltan ${all.length - done}`}
        </p>
        <button className={`mini ${onlyLeft ? "on" : ""}`} onClick={() => setOnlyLeft((v) => !v)}>
          {onlyLeft ? "Ver todo" : "Solo lo que falta"}
        </button>
      </div>

      {shop.sections.map((section) => {
        const items = section.items.filter(show);
        if (!items.length) return null;
        return (
          <article key={section.id} className="card shop-aisle">
            <h2>{section.label}</h2>
            <ul className="shop-list">
              {items.map((it) => (
                <li key={it.id}>
                  <label className={checks[it.id] ? "got" : ""}>
                    <input type="checkbox" checked={!!checks[it.id]} onChange={() => onToggle(it.id)} />
                    <span>
                      <strong>{it.name}</strong>
                      {it.qty ? <em>{it.qty}</em> : null}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </article>
        );
      })}

      {shop.batch?.length ? (
        <article className="card shop-aisle batch-card">
          <h2>Cocinar el domingo</h2>
          <p className="muted">Una hora. Luego la semana es montar, no inventar.</p>
          <ul className="shop-list">
            {shop.batch.filter(show).map((it) => (
              <li key={it.id}>
                <label className={checks[it.id] ? "got" : ""}>
                  <input type="checkbox" checked={!!checks[it.id]} onChange={() => onToggle(it.id)} />
                  <span>
                    <strong>{it.name}</strong>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </article>
      ) : null}
    </section>
  );
}
