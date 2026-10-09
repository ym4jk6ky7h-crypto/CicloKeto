import { useEffect, useState } from "react";
import { APP_NAME } from "./brand.js";

function isIosDevice() {
  const ua = navigator.userAgent || "";
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  return /WhatsApp|FBAN|FBAV|Instagram|Line\//i.test(ua);
}

function openInSafari() {
  const href = window.location.href;
  if (href.startsWith("https:")) {
    window.location.href = "x-safari-" + href;
    return;
  }
  if (href.startsWith("http:")) {
    window.location.href = "x-safari-" + href;
    return;
  }
}

export function InstallHint() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [hidden, setHidden] = useState(() => localStorage.getItem("ciclo-hide-install") === "1");
  const [ios, setIos] = useState(false);
  const [inApp, setInApp] = useState(false);
  const [forced] = useState(() => {
    const q = new URLSearchParams(window.location.search);
    return q.get("instalar") === "1" || window.location.hash === "#instalar";
  });

  useEffect(() => {
    const standalone = isStandalone();
    const iosDevice = isIosDevice();
    setIos(iosDevice && !standalone);
    setInApp(isInAppBrowser());
    if (standalone) setHidden(true);

    const onPrompt = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (isStandalone()) return null;
  if (!forced && (hidden || (!promptEvent && !ios))) return null;

  if (ios) {
    return (
      <aside className="install-sheet">
        <p className="eyebrow">iPhone</p>
        <h2>Deja {APP_NAME} en tu pantalla de inicio</h2>
        {inApp ? (
          <p>WhatsApp no puede instalar apps. Ábrela en Safari y en 3 toques queda el icono.</p>
        ) : (
          <p>Safari no instala sola: tú la añades, y se abre como una app, sin App Store.</p>
        )}
        <ol className="install-steps">
          <li>
            <span>1</span>
            {inApp ? "Pulsa el botón de abajo para abrir Safari." : "Quédate en Safari (no en WhatsApp)."}
          </li>
          <li>
            <span>2</span>
            Abajo, el cuadrado con flecha: Compartir.
          </li>
          <li>
            <span>3</span>
            Añadir a pantalla de inicio → Añadir.
          </li>
        </ol>
        <div className="install-actions">
          {inApp && (
            <button className="btn primary" onClick={openInSafari}>
              Abrir en Safari
            </button>
          )}
          <button
            className="btn"
            onClick={() => {
              localStorage.setItem("ciclo-hide-install", "1");
              setHidden(true);
            }}
          >
            Ahora no
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="install">
      <p>Instala {APP_NAME} en el móvil: se abre como app, sin tienda.</p>
      <div>
        {promptEvent && (
          <button
            className="btn primary"
            onClick={async () => {
              promptEvent.prompt();
              await promptEvent.userChoice;
              setPromptEvent(null);
            }}
          >
            Instalar
          </button>
        )}
        <button
          className="btn"
          onClick={() => {
            localStorage.setItem("ciclo-hide-install", "1");
            setHidden(true);
          }}
        >
          Ahora no
        </button>
      </div>
    </aside>
  );
}

export function registerSW() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {});
  });
}
