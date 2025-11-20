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

    useGSAP(() => {
        gsap.to(mapContainer.current, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
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
