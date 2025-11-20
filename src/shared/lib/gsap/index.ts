import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { CustomBounce } from 'gsap/CustomBounce';
import { useGSAP } from '@gsap/react';
import { registerFadeScaleEffect } from './effects';

// Регистрация всех эффектов
export const initGSAPEffects = () => {
    registerFadeScaleEffect();
};

// Регистрация плагинов
gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, CustomBounce);

export { gsap, useGSAP, ScrollTrigger };
