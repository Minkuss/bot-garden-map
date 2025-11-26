import gsap from 'gsap';

const BASIC_DURATION = 0.5;

export function numberCountAnim(
    el: Element | null,
    newText: string,
    options?: { duration?: number },
) {
    if (!el) return;

    const duration = options?.duration ?? BASIC_DURATION;

    gsap.to(el, {
        textContent: newText,
        duration,
        ease: 'power2.out',
        snap: { textContent: 1 },
    });
}
