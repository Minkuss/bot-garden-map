import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';
import { registerFadeScaleEffect } from './effects';

// Регистрация всех эффектов
export const initGSAPEffects = () => {
    registerFadeScaleEffect();
};

// Регистрация плагинов
gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

export { gsap, useGSAP, ScrollTrigger };
