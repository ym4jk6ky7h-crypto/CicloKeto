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
  TOTAL_DAYS,
  weekMeta,
  getPhaseForDay,
  getWeekForDay,
  getMealsForDay,
  getWeekMeta,
  getWeekPlan,
  swapMeal,
} from "./data/cycle";
import { exercises, getRoutineForDay } from "./data/workouts";
import {
  cycleStory,
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
import { InstallHint } from "./pwa.jsx";

const TABS = [
  { id: "hoy", label: "Hoy", icon: "☀️" },
  { id: "recetas", label: "Recetas", icon: "🥗" },
  { id: "alimentos", label: "Alimentos", icon: "🥬" },
  { id: "moverte", label: "Moverte", icon: "🤸" },
  { id: "mas", label: "Guías", icon: "📖" },
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

  useEffect(() => saveState(state), [state]);

  const today = todayISO();
  const dayNumber = state.startDate ? diffDays(state.startDate, today) + 1 : 0;
  const inCycle = dayNumber >= 1 && dayNumber <= TOTAL_DAYS;
  const cycleDay = inCycle ? dayNumber : dayNumber > TOTAL_DAYS ? TOTAL_DAYS : 1;
  const week = getWeekForDay(cycleDay);
  const phaseId = getPhaseForDay(cycleDay);
  const phase = phases[phaseId];
  const meta = getWeekMeta(week);
  const baseMeals = getMealsForDay(cycleDay, state.cycleIndex || 0);
  const daySwaps = (state.swaps && state.swaps[today]) || {};
  const meals = {
    ...baseMeals,
    breakfast: daySwaps.breakfast || baseMeals.breakfast,
    lunch: daySwaps.lunch || baseMeals.lunch,
    dinner: daySwaps.dinner || baseMeals.dinner,
  };
  const weekPlan = getWeekPlan(cycleDay, state.cycleIndex || 0);
  const routine = getRoutineForDay(cycleDay);
  const check = state.checkins[today] || { water: 0 };

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
          <span className="logo">C</span>
          <div>
            <strong>Ciclo</strong>
            <small>6 semanas keto</small>
          </div>
        </div>
        <nav className="side-nav">
          {TABS.map((t) => (
            <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => {
                if (t.id !== "moverte") setPlaying(false);
                setTab(t.id);
              }}>
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
        {state.startDate && (
          <div className="side-progress">
            <p>Día {Math.min(Math.max(dayNumber, 1), TOTAL_DAYS)} de {TOTAL_DAYS}</p>
            <div className="bar">
              <i style={{ width: `${Math.min(100, Math.max(0, (dayNumber / TOTAL_DAYS) * 100))}%` }} />
            </div>
            <small>{meta.title}</small>
          </div>
        )}
      </aside>

      <main className="main">
        {!state.startDate ? (
          <Onboarding
            onStart={(startDate, weightKg, hydrates) =>
              patch({ startDate, weightKg, hydrates, cycleIndex: state.cycleIndex || 0 })
            }
          />
        ) : (
          <>
            {tab === "hoy" && (
              <Today
                dayNumber={dayNumber}
                inCycle={inCycle}
                phase={phase}
                meta={meta}
                meals={meals}
                weekPlan={weekPlan}
                hydrates={state.hydrates}
                routine={routine}
                check={check}
                onCheck={patchCheck}
                onOpenRecipe={setRecipeId}
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
                  setTab("moverte");
                  setPlaying(true);
                }}
                onReset={() => patch({ startDate: null })}
                onOpenGuides={() => {
                  setGuideSub("compra");
                  setTab("mas");
                }}
              />
            )}
            {tab === "recetas" && <Recipes phaseId={phaseId} onOpen={setRecipeId} />}
            {tab === "alimentos" && <Foods />}
            {tab === "moverte" && (
              <Move
                routine={routine}
                dayNumber={cycleDay}
                playing={playing}
                setPlaying={setPlaying}
                done={!!check.workout}
                onDone={() => patchCheck({ workout: true })}
              />
            )}
            {tab === "mas" && (
              <Guides
                state={state}
                week={week}
                weekPlan={weekPlan}
                sub={guideSub}
                onSub={setGuideSub}
                onWeight={(weightKg) => patch({ weightKg })}
                onRestart={() =>
                  patch({
                    startDate: null,
                    checkins: {},
                    swaps: {},
                    cycleIndex: (state.cycleIndex || 0) + 1,
                  })
                }
              />
            )}
          </>
        )}
      </main>

      {state.startDate && (
        <nav className="tabbar">
          {TABS.map((t) => (
            <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => {
                if (t.id !== "moverte") setPlaying(false);
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

function Onboarding({ onStart }) {
  const [date, setDate] = useState(todayISO());
  const [kg, setKg] = useState(70);
  const [hydrates, setHydrates] = useState(true);

  return (
    <section className="onboard">
      <p className="eyebrow">Método de 6 semanas</p>
      <h1>Un ciclo keto amable, claro y con ganas de seguirlo.</h1>
      <p className="lead">
        Semana 1 para adaptar. Cuatro semanas de cetosis. La sexta, para volver al día a día sin caos.
        Menús reales del Reset y del Ciclo 12, para no repetir plato cada vez.
      </p>
      <div className="story-grid">
        {cycleStory.map((s) => (
          <article key={s.title} className="card">
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </article>
        ))}
      </div>
      <div className="card start-card">
        <label>
          Empiezo el
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Peso (kg), para la proteína
          <input type="number" min="40" max="160" value={kg} onChange={(e) => setKg(Number(e.target.value))} />
        </label>
        <label className="check-row">
          <input type="checkbox" checked={hydrates} onChange={(e) => setHydrates(e.target.checked)} />
          Es mi primer ciclo: muéstrame la opción hidrato en semana 1
        </label>
        <button className="btn primary" onClick={() => onStart(date, kg, hydrates)}>
          Empezar mi ciclo
        </button>
        <p className="hint">Se guarda en este navegador. Si ya hiciste un ciclo, al reiniciar cambiarán los menús.</p>
      </div>
    </section>
  );
}

function Today({ dayNumber, inCycle, phase, meta, meals, weekPlan, hydrates, routine, check, onCheck, onOpenRecipe, onSwap, onPlay, onReset, onOpenGuides }) {
  const ended = dayNumber > TOTAL_DAYS;
  const future = dayNumber < 1;

  return (
    <section className="today">
      <header className="hero">
        <p className="eyebrow">{greeting()}</p>
        {ended ? (
          <h1>Ciclo completado. Mira cómo te sientes al reintroducir.</h1>
        ) : future ? (
          <h1>Tu ciclo aún no empieza. Mientras, explora recetas y el semáforo.</h1>
        ) : (
          <h1>
            Día {dayNumber} · Semana {meta.week}
          </h1>
        )}
        <div className="chips">
          <span className={`chip ${phase.color}`}>{phase.title}</span>
          <span className="chip ghost">Ayuno {meta.fastingDaily}</span>
          <span className="chip ghost">Domingo {meta.fastingSunday.split(" (")[0]}</span>
        </div>
        <p className="motto">{meta.motto}</p>
        {weekPlan && <p className="muted">{meals.weekday} · {weekPlan.title}</p>}
      </header>

      <p className="today-tip">{meta.focus}</p>

      <h2 className="block-title">Qué comes hoy</h2>
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
          <p className="eyebrow">Si es tu primer ciclo</p>
          <h3>Puedes sumar este hidrato</h3>
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
          <button className="link" onClick={onOpenGuides}>Lista de la compra →</button>
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
        <h1>Recetario</h1>
        <p>Todos los platos, salsas y extras. Filtra y toca uno para ver por qué está, los ingredientes y cómo se hace.</p>
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
            {item.chapter} · {item.proteinLabel} · {item.minutes} min
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
          <h3>Qué necesitas</h3>
          <ul className="ing-list">
            {(item.ingredients || []).map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <h3>Cómo se hace</h3>
          <ol className="step-list">
            {(item.steps || []).map((s, idx) => (
              <li key={s}>
                <span>{idx + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <button className="btn primary" onClick={onClose}>
            Listo
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

function Guides({ state, week, weekPlan, sub, onSub, onWeight, onRestart }) {
  const protein = Math.round(state.weightKg * 1.8);
  const shop = shoppingByWeek[weekPlan?.id];

  return (
    <section>
      <header className="page-head">
        <h1>Guías del método</h1>
        <p>Ciclo, ayuno sin agobio y proteína. Material de apoyo, no una receta médica.</p>
      </header>
      <div className="chips wrap">
        {[
          ["ciclo", "Las 6 semanas"],
          ["compra", "Compra"],
          ["ayuno", "Ayuno"],
          ["proteina", "Proteína"],
        ].map(([id, label]) => (
          <button key={id} className={`chip ${sub === id ? "sage" : "ghost"}`} onClick={() => onSub(id)}>
            {label}
          </button>
        ))}
      </div>

      {sub === "ciclo" && (
        <div className="weeks">
          {weekMeta.map((w) => (
            <article key={w.week} className={`card ${w.week === week ? "current" : ""}`}>
              <p className="eyebrow">Semana {w.week}</p>
              <h3>{w.title}</h3>
              <p>{w.motto}</p>
              <p className="muted">{w.focus}</p>
              <p>
                <strong>Ayuno diario:</strong> {w.fastingDaily}
              </p>
              <p>
                <strong>Domingo:</strong> {w.fastingSunday}
              </p>
            </article>
          ))}
          <p className="hint">
            Ciclo nº {(state.cycleIndex || 0) + 1}. Al reiniciar, las semanas 2–5 cambian de tanda para no repetir.
          </p>
          <button className="btn" onClick={onRestart}>
            Nuevo ciclo (otros menús)
          </button>
        </div>
      )}

      {sub === "compra" && shop && (
        <div className="guide">
          <article className="card">
            <h2>{shop.title}</h2>
            <p>Para 1 persona. Compra el viernes o sábado y batch el domingo (60–90 min).</p>
          </article>
          {Object.entries(shop.groups).map(([name, items]) => (
            <article key={name} className="card">
              <h3>{name}</h3>
              <ul>
                {items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
          {shop.batch && (
            <article className="card">
              <h3>Batch del finde</h3>
              <ul>
                {shop.batch.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          )}
        </div>
      )}

      {sub === "ayuno" && (
        <div className="guide">
          <article className="card">
            <h2>El ayuno es una herramienta, no una prueba</h2>
            <p>Si te genera ansiedad, te quita el sueño o te tiene contando horas, ya no te está ayudando.</p>
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
            <p>Propuesta del método: {sundayFasts[week]}. Elige completo, intermedio o suave (16–18 h) según sueño y regla.</p>
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
            <p>Usando 1,8 g/kg (déficit y preservar músculo). Reparte 25–40 g en cada comida.</p>
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
