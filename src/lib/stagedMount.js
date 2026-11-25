import { useEffect, useState } from 'react';

// La página se monta por etapas para no bloquear el navegador con un solo cálculo enorme
// justo cuando termina el preloader:
//   etapa 0 → Hero (lo que se ve al entrar)
//   etapa 1 → Tortas y Clásicos
//   etapa 2 → Queques y Cuchareables
//   etapa 3 → Cómo pedir y comunidad
//   etapa 4 → Preguntas y footer
// Cada etapa espera a que el navegador esté libre. revealAll() las monta todas de una vez
// (por ejemplo, si se hace clic en el menú antes de que terminen).
const LAST_STAGE = 4;
// Con la página ya visible se espera más entre etapas para no interrumpir las animaciones de
// entrada del Hero; detrás del preloader (modo rápido) no hay nada que proteger.
const FIRST_DELAY_MS = 700;
const GAP_MS = 350;
const FAST_FIRST_DELAY_MS = 150;
const FAST_GAP_MS = 120;

let stage = 0;
let started = false;
const listeners = new Set();

const whenIdle = (cb) =>
  'requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 800 }) : setTimeout(cb, 200);

function setStage(next) {
  if (next <= stage) return;
  stage = next;
  listeners.forEach((listener) => listener(stage));
  if (stage >= LAST_STAGE) window.dispatchEvent(new Event('pastelia:mounted'));
}

export function startStaging({ fast = false } = {}) {
  if (started) return;
  started = true;
  const next = () => {
    if (stage >= LAST_STAGE) return;
    whenIdle(() => {
      setStage(stage + 1);
      setTimeout(next, fast ? FAST_GAP_MS : GAP_MS);
    });
  };
  setTimeout(next, fast ? FAST_FIRST_DELAY_MS : FIRST_DELAY_MS);
}

// Se cumple cuando ya está montada toda la página (el preloader espera a esto antes de retirarse)
export function whenFullyMounted() {
  return new Promise((resolve) => {
    if (stage >= LAST_STAGE) return resolve();
    const listener = (current) => {
      if (current >= LAST_STAGE) {
        listeners.delete(listener);
        resolve();
      }
    };
    listeners.add(listener);
  });
}

export function revealAll() {
  started = true;
  setStage(LAST_STAGE);
}

export function useStage(n) {
  const [ready, setReady] = useState(stage >= n);
  useEffect(() => {
    if (stage >= n) {
      setReady(true);
      return;
    }
    const listener = (current) => {
      if (current >= n) setReady(true);
    };
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [n]);
  return ready;
}

export function Deferred({ stage: n, children }) {
  return useStage(n) ? children : null;
}
