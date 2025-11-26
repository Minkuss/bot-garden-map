import gsap from 'gsap';

const BASIC_DURATION = 0.2;

export function textSlideAnim(
    el: Element | null,
    newText: string,
    options?: { duration?: number },
) {
    if (!el) return;

    const duration = options?.duration ?? BASIC_DURATION;

    gsap.to(el, {
        y: '100%',
        opacity: 0,
        duration,
        ease: 'power2.in',
        onComplete: () => {
            el.textContent = newText;
            gsap.set(el, { y: '-100%', opacity: 0 });

            gsap.to(el, {
                y: '0%',
                opacity: 1,
                duration,
                ease: 'power2.out',
            });
        },
    });
}
