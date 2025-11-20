import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { registerFadeScaleEffect } from './effects';

// Регистрация плагинов
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Регистрация всех эффектов
export const initGSAPEffects = () => {
    registerFadeScaleEffect();
};

export { gsap, useGSAP, ScrollTrigger };
