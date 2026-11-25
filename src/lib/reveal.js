import { createContext, useContext } from 'react';

// Indica si el preloader ya se retiró y la página se está mostrando. La app puede montarse
// detrás del preloader (para que el trabajo pesado ocurra mientras se ve el logo), pero las
// animaciones de entrada deben esperar a este momento para que se vean.
// Fuera del preloader (por ejemplo en pruebas) vale true: todo se anima de inmediato.
export const RevealContext = createContext(true);

export const useRevealed = () => useContext(RevealContext);
