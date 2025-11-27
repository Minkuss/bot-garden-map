import { BillboardsMap } from 'src/widgets/billboardsMap';
import s from './map.module.scss';
import { Container } from 'src/shared/ui/container/container';
import FilterIcon from 'src/app/assets/images/svg/filter-btn.svg?react';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const MapPage = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [ showFilters, setShowFilters ] = useState<boolean>(false);
    const filterRef = useRef<HTMLButtonElement>(null);
    const { contextSafe } = useGSAP({ scope: filterRef });
    let animation: gsap.core.Tween | null = null;

    useGSAP(() => {
        gsap.to(mapContainer.current, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
        });
    });

    const handleMouseEnter = contextSafe(() => {
        animation = gsap.fromTo('#filter-circle', {
            y: 0,
            ease: 'power2.out',
        }, {
            y: 4,
            stagger: 0.05,
            yoyo: true,
            repeat: -1,
            ease: 'bounce',
        });
    });

    const handleMouseLeave = contextSafe(() => {
        if (animation) {
            animation.kill();
        }

        // плавно возвращаем в исходное положение
        gsap.to('#filter-circle', {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true,
        });
    });

    return (
        <Container
            style={{
                height: '100vh',
                scrollSnapAlign: 'start',
            }}
        >
            <div
                ref={mapContainer}
                className={s['map']}
            >
                <div
                    className={s['map-header']}
                >
                    <h1
                        className={s['heading']}
                    >
                        <span
                            className={s['dash']}
                        >
                            -
                        </span>
                        Выберите объект
                        <span
                            className={s['point']}
                        >
                            .
                        </span>
                    </h1>
                    <button
                        className={s['filter-btn']}
                        onClick={() => setShowFilters(prev => !prev)}
                        ref={filterRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Фильтры
                        <FilterIcon
                            className={showFilters ? s['icon-close'] : s['icon-open']}
                        />
                    </button>
                </div>
                <BillboardsMap
                    showFilters={showFilters}
                />
            </div>
        </Container>
    );
};
