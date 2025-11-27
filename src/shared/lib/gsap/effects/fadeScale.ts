import gsap from 'gsap';

export const registerFadeScaleEffect = () => {
    gsap.registerEffect({
        name: 'fadeScale',
        effect: (targets, config) =>
            gsap.to(targets, {
                opacity: config.opacity,
                scale: config.scale,
                duration: config.duration,
                ease: config.ease,
            }),
        defaults: {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
        },
        extendTimeline: true,
    });
};
