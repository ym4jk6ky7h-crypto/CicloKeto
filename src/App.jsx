import { useEffect, useMemo, useState } from "react";
import { foodGroups, phases } from "./data/foods";
import { recipes } from "./data/recipes";
import {
  catalog,
  getCatalogItem,
  MEAL_FILTERS,
  PROTEIN_FILTERS,
  KIND_FILTERS,
} from "./data/catalog";
import {
  weekMeta,
  getPhaseForDay,
  getWeekForDay,
  getMealsForDay,
  getWeekMeta,
  getWeekPlan,
  getWeekMenu,
  swapMeal,
  totalDaysFor,
} from "./data/cycle";
import { RESET_OPTIONS } from "./data/menus";
import { exercises, getRoutineForDay } from "./data/workouts";
import {
  fastingLevels,
  fastingBreaks,
  sundayFasts,
  proteinTable,
  safety,
} from "./data/guides";
import { shoppingByWeek, snacks } from "./data/shopping";
import { loadState, saveState, todayISO, diffDays } from "./storage";
import { Pose } from "./Pose.jsx";
import { FoodArt } from "./FoodArt.jsx";
import { WeekBoard, ShopList } from "./Kitchen.jsx";
import { InstallHint } from "./pwa.jsx";
import { APP_NAME, APP_TAGLINE, APP_BLURB } from "./brand.js";
import { AppLogo } from "./AppLogo.jsx";

const TABS = [
  { id: "hoy", label: "Hoy", icon: "☀️" },
  { id: "semana", label: "Semana", icon: "🗓️" },
  { id: "recetas", label: "Recetas", icon: "🥗" },
  { id: "compra", label: "Compra", icon: "🛒" },
  { id: "mas", label: "Más", icon: "✨" },
];

const MEAL_KEYS = [
  { key: "breakfast", label: "Desayuno", icon: "🍳" },
  { key: "lunch", label: "Comida", icon: "🍽️" },
  { key: "dinner", label: "Cena", icon: "🌙" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 20) return "Buenas tardes";
  return "Buenas noches";
}

function Cover({ item, className = "" }) {
  if (!item) return <div className={`cover ${className}`} />;
  return (
    <div className={`cover ${className}`}>
      <FoodArt kind={item.art} title={item.title} />
    </div>
  );
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [tab, setTab] = useState("hoy");
  const [guideSub, setGuideSub] = useState("ciclo");
  const [recipeId, setRecipeId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [viewWeek, setViewWeek] = useState(null);

  useEffect(() => saveState(state), [state]);

  const program = state.program || "ciclo";
  const resetId = state.resetId || "reset1";
  const totalDays = totalDaysFor(program);
  const today = todayISO();
  const dayNumber = state.startDate ? diffDays(state.startDate, today) + 1 : 0;
  const inCycle = dayNumber >= 1 && dayNumber <= totalDays;
  const cycleDay = inCycle ? dayNumber : dayNumber > totalDays ? totalDays : 1;
  const week = getWeekForDay(cycleDay, program);
  const phaseId = getPhaseForDay(cycleDay, program, resetId);
  const phase = phases[phaseId];
  const meta = getWeekMeta(week, program, resetId);
  const baseMeals = getMealsForDay(cycleDay, state.cycleIndex || 0, program, resetId);
  const daySwaps = (state.swaps && state.swaps[today]) || {};
  const meals = {
    ...baseMeals,
    breakfast: daySwaps.breakfast || baseMeals.breakfast,
    lunch: daySwaps.lunch || baseMeals.lunch,
    dinner: daySwaps.dinner || baseMeals.dinner,
  };
  const weekPlan = getWeekPlan(cycleDay, state.cycleIndex || 0, program, resetId);
  const weekMenu = getWeekMenu(viewWeek || week, state.cycleIndex || 0, program, resetId);
  const routine = getRoutineForDay(cycleDay);
  const check = state.checkins[today] || { water: 0 };
  const shop = shoppingByWeek[weekPlan?.id];
  const shopChecks = (state.shopChecks && state.shopChecks[weekPlan?.id]) || {};

  function patch(partial) {
    setState((s) => ({ ...s, ...partial }));
  }

  function patchCheck(partial) {
    setState((s) => ({
      ...s,
      checkins: {
        ...s.checkins,
        [today]: { water: 0, ...(s.checkins[today] || {}), ...partial },
      },
    }));
  }

  const recipe = recipeId ? getCatalogItem(recipeId) || recipes.find((r) => r.id === recipeId) : null;

  return (
    <div className="app">
      <aside className="side">
        <div className="brand">
          <AppLogo size={44} />
          <div>
            <strong>{APP_NAME}</strong>
            <small>{program === "reset" ? "Tu reset de 7 días" : "Comida keto, cada día"}</small>
          </div>
        </div>
        <nav className="side-nav">
          {TABS.map((t) => (
            <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => {
                setPlaying(false);
                setTab(t.id);
              }}>
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
        {state.startDate && (
          <div className="side-progress">
            <p>Día {Math.min(Math.max(dayNumber, 1), totalDays)} de {totalDays}</p>
            <div className="bar">
              <i style={{ width: `${Math.min(100, Math.max(0, (dayNumber / totalDays) * 100))}%` }} />
            </div>
            <small>{meta.title}</small>
          </div>
        )}
      </aside>

      <main className="main">
        {state.startDate ? (
          <header className="topbar">
            <AppLogo size={40} />
            <div>
              <strong>{APP_NAME}</strong>
              <small>{program === "reset" ? "Reset de 7 días" : "Comida keto, cada día"}</small>
            </div>
          </header>
        ) : null}
        {!state.startDate ? (
          <Onboarding
            onStart={(startDate, weightKg, hydrates, nextProgram, nextReset) =>
              patch({
                startDate,
                weightKg,
                hydrates,
                program: nextProgram,
                resetId: nextReset,
                cycleIndex: nextProgram === "ciclo" ? state.cycleIndex || 0 : state.cycleIndex || 0,
                shopChecks: {},
              })
            }
          />
        ) : (
          <>
            {tab === "hoy" && (
              <Today
                dayNumber={dayNumber}
                totalDays={totalDays}
                inCycle={inCycle}
                program={program}
                phase={phase}
                meta={meta}
                meals={meals}
                weekMenu={getWeekMenu(week, state.cycleIndex || 0, program, resetId)}
                hydrates={state.hydrates}
                routine={routine}
                check={check}
                onCheck={patchCheck}
                onOpenRecipe={setRecipeId}
                onOpenWeek={() => {
                  setViewWeek(week);
                  setTab("semana");
                }}
                onSwap={(key) => {
                  const next = swapMeal(meals[key], key, phaseId);
                  setState((s) => ({
                    ...s,
                    swaps: {
                      ...(s.swaps || {}),
                      [today]: { ...((s.swaps || {})[today] || {}), [key]: next },
                    },
                  }));
                }}
                onPlay={() => {
                  setGuideSub("moverte");
                  setTab("mas");
                  setPlaying(true);
                }}
                onReset={() => patch({ startDate: null })}
                onOpenShop={() => setTab("compra")}
              />
            )}
            {tab === "semana" && (
              <WeekBoard
                program={program}
                weekNumber={viewWeek || week}
                weekCount={program === "reset" ? 1 : 6}
                weekMenu={weekMenu}
                meta={getWeekMeta(viewWeek || week, program, resetId)}
                todayNumber={cycleDay}
                hydrates={state.hydrates}
                onWeek={(n) => setViewWeek(n)}
                onOpenRecipe={setRecipeId}
                onGoToday={() => setTab("hoy")}
              />
            )}
            {tab === "recetas" && <Recipes phaseId={phaseId} onOpen={setRecipeId} />}
            {tab === "compra" && (
              <ShopList
                shop={shop}
                checks={shopChecks}
                onToggle={(id) => {
                  const weekId = weekPlan?.id;
                  if (!weekId) return;
                  setState((s) => ({
                    ...s,
                    shopChecks: {
                      ...(s.shopChecks || {}),
                      [weekId]: { ...((s.shopChecks || {})[weekId] || {}), [id]: !((s.shopChecks || {})[weekId] || {})[id] },
                    },
                  }));
                }}
              />
            )}
            {tab === "mas" && (
              <>
                <MoreNav sub={guideSub} onSub={(id) => { if (id !== "moverte") setPlaying(false); setGuideSub(id); }} />
                {guideSub === "alimentos" && <Foods />}
                {guideSub === "moverte" && (
                  <Move
                    routine={routine}
                    dayNumber={cycleDay}
                    playing={playing}
                    setPlaying={setPlaying}
                    done={!!check.workout}
                    onDone={() => patchCheck({ workout: true })}
                  />
                )}
                {(guideSub === "ciclo" || guideSub === "ayuno" || guideSub === "proteina") && (
                  <Guides
                    state={state}
                    week={week}
                    program={program}
                    sub={guideSub}
                    onWeight={(weightKg) => patch({ weightKg })}
                    onRestart={() =>
                      patch({
                        startDate: null,
                        checkins: {},
                        swaps: {},
                        shopChecks: {},
                        cycleIndex: program === "ciclo" ? (state.cycleIndex || 0) + 1 : state.cycleIndex || 0,
                      })
                    }
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {state.startDate && (
        <nav className="tabbar">
          {TABS.map((t) => (
            <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => {
                setPlaying(false);
                setTab(t.id);
              }}>
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
      )}

      {recipe && <RecipeModal recipe={recipe} phaseId={phaseId} onClose={() => setRecipeId(null)} />}
      <InstallHint />
    </div>
  );
}

function MoreNav({ sub, onSub }) {
  return (
    <div className="chips wrap more-nav">
      {[
        ["ciclo", "Tu camino"],
        ["alimentos", "¿Puedo comer…?"],
        ["moverte", "Moverte"],
        ["ayuno", "Ayuno"],
        ["proteina", "Proteína"],
      ].map(([id, label]) => (
        <button key={id} className={`chip ${sub === id ? "sage" : "ghost"}`} onClick={() => onSub(id)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function Onboarding({ onStart }) {
  const [date, setDate] = useState(todayISO());
  const [kg, setKg] = useState(70);
  const [hydrates, setHydrates] = useState(true);
  const [program, setProgram] = useState("ciclo");
  const [resetId, setResetId] = useState("reset1");

  return (
    <section className="onboard splash">
      <div className="splash-hero">
        <AppLogo size={92} className="splash-logo" />
        <p className="eyebrow">La app de keto en casa</p>
        <h1 className="app-title">{APP_NAME}</h1>
        <p className="lead">{APP_BLURB}</p>
        <p className="tagline">{APP_TAGLINE}</p>
      </div>
      <div className="fun-pills">
        <span>🍳 Recetas como si te las dictaran</span>
        <span>🗓️ El menú de toda la semana</span>
        <span>🛒 La compra, pasillo a pasillo</span>
      </div>
      <div className="program-pick">
        <button className={`card program-card visual ${program === "ciclo" ? "on" : ""}`} onClick={() => setProgram("ciclo")}>
          <FoodArt kind="bowl" title="" />
          <p className="eyebrow">6 semanas</p>
          <h3>Plan de 6 semanas</h3>
          <p>Aterrizas, entras en cetosis y vuelves al día a día. Menús distintos cada tanda.</p>
        </button>
        <button className={`card program-card visual ${program === "reset" ? "on" : ""}`} onClick={() => setProgram("reset")}>
          <FoodArt kind="meat" title="" />
          <p className="eyebrow">7 días</p>
          <h3>Un reset keto</h3>
          <p>Una semana concreta. Cocinas el domingo y el resto es montar platos.</p>
        </button>
      </div>
      {program === "reset" && (
        <div className="program-pick">
          {RESET_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`card program-card ${resetId === opt.id ? "on" : ""}`}
              onClick={() => setResetId(opt.id)}
            >
              <h3>{opt.title}</h3>
              <p>{opt.blurb}</p>
              <p className="muted">{opt.vibe}</p>
            </button>
          ))}
        </div>
      )}
      <div className="card start-card go-card">
        <p className="eyebrow">Empieza {APP_NAME} hoy</p>
        <label>
          El primer día
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Peso (kg), para la proteína
          <input type="number" min="40" max="160" value={kg} onChange={(e) => setKg(Number(e.target.value))} />
        </label>
        {(program === "ciclo" || resetId === "reset1") && (
          <label className="check-row">
            <input type="checkbox" checked={hydrates} onChange={(e) => setHydrates(e.target.checked)} />
            Primera vez: un carbo pequeño al mediodía
          </label>
        )}
        <button className="btn primary go" onClick={() => onStart(date, kg, hydrates, program, resetId)}>
          {program === "reset" ? "Empezar mi reset keto" : `Empezar ${APP_NAME}`}
        </button>
        <p className="hint">Se queda en este teléfono. Nadie más lo ve.</p>
      </div>
    </section>
  );
}

function Today({ dayNumber, totalDays, inCycle, program, phase, meta, meals, weekMenu, hydrates, routine, check, onCheck, onOpenRecipe, onOpenWeek, onSwap, onPlay, onReset, onOpenShop }) {
  const ended = dayNumber > totalDays;
  const future = dayNumber < 1;

  return (
    <section className="today">
      <header className="hero">
        <p className="eyebrow">{greeting()}</p>
        {ended ? (
          <h1>{program === "reset" ? "Reset hecho. Mira cómo te sientes." : "Plan cerrado. Ahora, a vivir con lo que has aprendido."}</h1>
        ) : future ? (
          <h1>Todavía no es el día. Mientras, mira la semana y las recetas.</h1>
        ) : (
          <h1>
            Hoy es {meals.weekday}.
          </h1>
        )}
        <p className="motto">{meta.motto}</p>
        <div className="chips">
          <span className={`chip ${phase.color}`}>{meta.title}</span>
          <span className="chip ghost">{program === "reset" ? `Día ${Math.min(Math.max(dayNumber, 1), totalDays)} de 7` : `Día ${Math.min(Math.max(dayNumber, 1), totalDays)}`}</span>
        </div>
      </header>

      <nav className="week-strip" aria-label="Esta semana">
        {weekMenu.map((d) => (
          <button key={d.dayNumber} className={d.dayNumber === dayNumber ? "on" : ""} onClick={onOpenWeek}>
            <span>{d.short}</span>
          </button>
        ))}
      </nav>
      <button className="link week-link" onClick={onOpenWeek}>Ver la semana completa →</button>

      <p className="today-tip">{meta.focus}</p>

      <h2 className="block-title">Hoy en la mesa</h2>
      <div className="meals">
        {MEAL_KEYS.map((m) => {
          const item = meals[m.key];
          const cat = item.recipe ? getCatalogItem(item.recipe) : null;
          return (
            <article key={m.key} className={`card meal visual ${check[m.key] ? "done" : ""}`}>
              <button className="meal-open" onClick={() => item.recipe && onOpenRecipe(item.recipe)}>
                <Cover item={cat} />
                <div>
                  <p className="eyebrow">{m.label}{cat ? ` · ${cat.proteinLabel}` : ""}</p>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </button>
              <div className="meal-actions">
                <button className={`mini ${check[m.key] ? "on" : ""}`} onClick={() => onCheck({ [m.key]: !check[m.key] })}>
                  {check[m.key] ? "Hecho" : "Marcar"}
                </button>
                <button className="mini" onClick={() => onSwap(m.key)}>Otra idea</button>
              </div>
            </article>
          );
        })}
      </div>

      {hydrates && meals.hydrate && phase.id !== "cetosis" && (
        <article className="card hydrate">
          <p className="eyebrow">Si te apetece un carbo</p>
          <h3>Hoy puedes sumar esto</h3>
          <p>{meals.hydrate}</p>
        </article>
      )}

      <div className="today-row">
        <article className="card checks">
          <h3>Agua y movimiento</h3>
          <div className="water">
            <div>
              {Array.from({ length: 8 }, (_, i) => (
                <button
                  key={i}
                  className={i < (check.water || 0) ? "drop on" : "drop"}
                  onClick={() => onCheck({ water: i + 1 === check.water ? i : i + 1 })}
                  aria-label={`${i + 1} vasos`}
                />
              ))}
            </div>
          </div>
          <button className={check.workout ? "mini on" : "mini"} onClick={() => onCheck({ workout: !check.workout })}>
            {check.workout ? "Ya te has movido" : "Aún no te has movido"}
          </button>
        </article>
        <article className="card snacks-card">
          <details>
            <summary>¿Hambre entre horas?</summary>
            <p className="muted">Primero proteína y agua. Si sigue:</p>
            <ul className="snack-list">
              {snacks.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </details>
          <button className="link" onClick={onOpenShop}>Lista de la compra →</button>
        </article>
      </div>

      <article className="card workout-teaser">
        <div>
          <p className="eyebrow">8–10 minutos</p>
          <h3>{routine.title}</h3>
          <p>{routine.vibe}</p>
        </div>
        <button className="btn primary" onClick={onPlay}>
          Empezar
        </button>
      </article>

      {!inCycle && (
        <p className="hint">
          Si la fecha de inicio no encaja,{" "}
          <button className="link" onClick={onReset}>
            elige otro día
          </button>
          .
        </p>
      )}
    </section>
  );
}

function Recipes({ phaseId, onOpen }) {
  const [q, setQ] = useState("");
  const [meal, setMeal] = useState("all");
  const [protein, setProtein] = useState("all");
  const [kind, setKind] = useState("all");
  const query = q.trim().toLowerCase();

  const list = useMemo(() => {
    return catalog.filter((r) => {
      if (meal !== "all" && r.meal !== meal) return false;
      if (protein !== "all" && r.protein !== protein) return false;
      if (kind !== "all" && r.chapter !== kind) return false;
      if (query && !r.searchBlob.includes(query) && !r.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [q, meal, protein, kind, query]);

  return (
    <section className="catalog">
      <header className="page-head">
            <h1>La cocina</h1>
        <p>Toca un plato: te digo qué sartén, qué haces primero y cómo sabes que está listo. Aunque no sepas cocinar.</p>
      </header>
      <input
        className="search"
        placeholder="Busca: salmón, huevo, pesto, calabacín…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="filter-block">
        <p className="filter-label">Cuándo</p>
        <div className="chips wrap">
          {MEAL_FILTERS.map((f) => (
            <button key={f.id} className={`chip ${meal === f.id ? "sage" : "ghost"}`} onClick={() => setMeal(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <p className="filter-label">Proteína</p>
        <div className="chips wrap">
          {PROTEIN_FILTERS.map((f) => (
            <button key={f.id} className={`chip ${protein === f.id ? "sage" : "ghost"}`} onClick={() => setProtein(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <p className="filter-label">Tipo</p>
        <div className="chips wrap">
          {KIND_FILTERS.map((f) => (
            <button key={f.id} className={`chip ${kind === f.id ? "sage" : "ghost"}`} onClick={() => setKind(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <p className="result-n">{list.length} receta{list.length === 1 ? "" : "s"}</p>
      <div className="recipe-grid">
        {list.map((r) => (
          <button key={r.id} className="recipe-card" onClick={() => onOpen(r.id)}>
            <Cover item={r} />
            <div>
              <p className="eyebrow">
                {r.proteinLabel} · {r.minutes} min
              </p>
              <h3>{r.title}</h3>
              <p className="card-why">{r.why}</p>
              {!r.phases?.includes(phaseId) && <span className="tag">Mejor en otra fase</span>}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function RecipeModal({ recipe, phaseId, onClose }) {
  const item = recipe.artSrc ? recipe : getCatalogItem(recipe.id) || recipe;
  const okNow = item.phases?.includes(phaseId);
  return (
    <div className="overlay" onClick={onClose}>
      <article className="modal sheet" onClick={(e) => e.stopPropagation()}>
        <Cover item={item} className="hero" />
        <div className="modal-body">
          <p className="eyebrow">
            {item.chapter} · {item.proteinLabel} · {item.minutes} min · 1 ración
          </p>
          <h2>{item.title}</h2>
          {!okNow && (
            <p className="warn">Hoy estás en {phases[phaseId].title}. Puedes cocinarlo, pero encaja mejor en otra semana.</p>
          )}
          <section className="why-box">
            <h3>Por qué este plato</h3>
            <p>{item.why}</p>
          </section>
          {item.note && <p className="note">{item.note}</p>}
          {item.tools?.length ? (
            <p className="tools-line">
              En la cocina: {item.tools.join(" · ")}
            </p>
          ) : null}
          <h3>Qué compras</h3>
          <ul className="ing-list">
            {(item.ingredients || []).map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <h3>Cómo se hace, sin prisa</h3>
          <ol className="step-list">
            {(item.steps || []).map((s, idx) => (
              <li key={`${idx}-${s.slice(0, 24)}`}>
                <span>{idx + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          {item.ready && (
            <section className="ready-box">
              <h3>Está listo cuando…</h3>
              <p>{item.ready}</p>
            </section>
          )}
          {item.rescue && (
            <section className="rescue-box">
              <h3>Si se tuerce</h3>
              <p>{item.rescue}</p>
            </section>
          )}
          {item.tip && <p className="note">{item.tip}</p>}
          <button className="btn primary" onClick={onClose}>
            ¡Hecho!
          </button>
        </div>
      </article>
    </div>
  );
}

function Foods() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  function match(list) {
    if (!query) return list;
    return list.filter((x) => x.toLowerCase().includes(query));
  }

  return (
    <section>
      <header className="page-head">
        <h1>¿Puedo comer esto?</h1>
        <p>Verde sí, ámbar de vez en cuando, rojo mejor no. Escribe un alimento y salta a la respuesta.</p>
      </header>
      <input className="search" placeholder="¿Puedo comer…?" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="legend">
        <span className="yes">Recomendado</span>
        <span className="mid">Con moderación</span>
        <span className="no">Evitar</span>
      </div>
      {foodGroups.map((g) => {
        const rec = match(g.recommended);
        const mod = match(g.moderate);
        const av = match(g.avoid);
        if (query && !rec.length && !mod.length && !av.length) return null;
        return (
          <article key={g.id} className="card food-group">
            <h2>
              {g.icon} {g.title}
            </h2>
            <div className="food-cols">
              <div>
                {rec.map((x) => (
                  <p key={x} className="yes">
                    {x}
                  </p>
                ))}
              </div>
              <div>
                {mod.map((x) => (
                  <p key={x} className="mid">
                    {x}
                  </p>
                ))}
              </div>
              <div>
                {av.map((x) => (
                  <p key={x} className="no">
                    {x}
                  </p>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function Move({ routine, dayNumber, playing, setPlaying, done, onDone }) {
  const [step, setStep] = useState(0);
  const [left, setLeft] = useState(0);
  const move = exercises[routine.moves[step]];

  useEffect(() => {
    if (!playing || !move) return;
    setLeft(move.seconds);
  }, [playing, step, move]);

  useEffect(() => {
    if (!playing || left <= 0) return;
    const id = setTimeout(() => {
      if (left === 1) {
        if (step < routine.moves.length - 1) setStep((s) => s + 1);
        else {
          setPlaying(false);
          onDone();
        }
      } else setLeft((n) => n - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [playing, left, step, routine.moves.length, setPlaying, onDone]);

  if (playing && move) {
    return (
      <section className="player">
        <p className="eyebrow">
          {step + 1} / {routine.moves.length} · {routine.title}
        </p>
        <Pose pose={move.pose} />
        <h1>{move.name}</h1>
        <p className="cue">{move.cue}</p>
        <div className="timer">{left}s</div>
        <div className="row">
          <button className="btn" onClick={() => setPlaying(false)}>
            Pausar
          </button>
          <button
            className="btn primary"
            onClick={() => {
              if (step < routine.moves.length - 1) setStep((s) => s + 1);
              else {
                setPlaying(false);
                onDone();
              }
            }}
          >
            Siguiente
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <header className="page-head">
        <h1>Moverte un rato</h1>
        <p>Rutinas cortas, con dibujos claros. El objetivo es constancia, no palizas.</p>
      </header>
      <article className="card workout-teaser">
        <div>
          <p className="eyebrow">Hoy · día {dayNumber}</p>
          <h3>{routine.title} · {routine.minutes} min</h3>
          <p>{routine.vibe}</p>
          {done && <p className="note">Hecho. El cuerpo ya ha recibido la señal.</p>}
        </div>
        <button
          className="btn primary"
          onClick={() => {
            setStep(0);
            setPlaying(true);
          }}
        >
          {done ? "Repetir" : "Empezar"}
        </button>
      </article>
      <div className="move-list">
        {routine.moves.map((id) => {
          const ex = exercises[id];
          return (
            <article key={id} className="card move-item">
              <Pose pose={ex.pose} />
              <div>
                <h3>{ex.name}</h3>
                <p>{ex.cue}</p>
                <small>{ex.seconds} s</small>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Guides({ state, week, program, sub, onWeight, onRestart }) {
  const protein = Math.round(state.weightKg * 1.8);

  return (
    <section>
      {sub === "ciclo" && (
        <div className="weeks">
          <header className="page-head">
            <h1>{program === "reset" ? "Este reset" : "Las seis semanas"}</h1>
            <p>
              {program === "reset"
                ? "Siete días. Sin nombres raros. Cocina, agua, y a otra cosa."
                : "No es un examen. Cada semana tiene un tono distinto."}
            </p>
          </header>
          {(program === "reset" ? weekMeta.slice(0, 1) : weekMeta).map((w) => (
            <article key={w.week} className={`card ${w.week === week || program === "reset" ? "current" : ""}`}>
              {program !== "reset" && <p className="eyebrow">Semana {w.week}</p>}
              <h3>{program === "reset" ? "Tu semana" : w.title}</h3>
              <p>{program === "reset" ? "Come, duerme, bebe agua. El domingo, una hora de cocina y listo." : w.motto}</p>
              {program !== "reset" && <p className="muted">{w.focus}</p>}
            </article>
          ))}
          <p className="hint">
            {program === "reset"
              ? "Cuando termines, puedes hacer el ciclo de 6 semanas o repetir el reset con la otra tanda."
              : "Si empiezas otro ciclo, los menús cambian para no repetir plato."}
          </p>
          <button className="btn" onClick={onRestart}>
            {program === "reset" ? "Elegir otro camino" : "Empezar otro ciclo"}
          </button>
        </div>
      )}

      {sub === "ayuno" && (
        <div className="guide">
          <article className="card">
            <h2>El ayuno no es una prueba</h2>
            <p>Si te quita el sueño o te tiene contando horas, ya no te está ayudando. Come.</p>
          </article>
          {fastingLevels.map((f) => (
            <article key={f.hours} className="card">
              <p className="eyebrow">{f.hours}</p>
              <h3>{f.name}</h3>
              <p>{f.benefit}</p>
            </article>
          ))}
          <article className="card">
            <h3>Domingo de este ciclo</h3>
            <p>{sundayFasts[week]}</p>
          </article>
          <div className="grid-3">
            <article className="card">
              <h3>No lo rompe</h3>
              <ul>
                {fastingBreaks.no.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Un poco</h3>
              <ul>
                {fastingBreaks.little.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Sí lo rompe</h3>
              <ul>
                {fastingBreaks.yes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          </div>
          <article className="card warn-card">
            <h3>Seguridad</h3>
            <ul>
              {safety.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
        </div>
      )}

      {sub === "proteina" && (
        <div className="guide">
          <article className="card">
            <h2>Tu objetivo de hoy</h2>
            <label>
              Peso (kg)
              <input type="number" value={state.weightKg} onChange={(e) => onWeight(Number(e.target.value))} />
            </label>
            <p className="protein-n">{protein} g</p>
            <p>Unos 1,8 g por kilo, para no perder músculo. Reparte entre las tres comidas, no lo dejes para la noche.</p>
          </article>
          <article className="card">
            <h3>Por 100 g de alimento</h3>
            <table>
              <tbody>
                {proteinTable.map((r) => (
                  <tr key={r.food}>
                    <td>{r.food}</td>
                    <td>{r.grams} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      )}
    </section>
  );
}
