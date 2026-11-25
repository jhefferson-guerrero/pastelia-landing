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
const FIRST_DELAY_MS = 700; // deja correr las animaciones de entrada del Hero
const GAP_MS = 350; // respiro entre etapas

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

export function startStaging() {
  if (started) return;
  started = true;
  const next = () => {
    if (stage >= LAST_STAGE) return;
    whenIdle(() => {
      setStage(stage + 1);
      setTimeout(next, GAP_MS);
    });
  };
  setTimeout(next, FIRST_DELAY_MS);
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
