import { BillboardsMap } from 'src/widgets/billboardsMap';
import s from './map.module.scss';
import { Container } from 'src/shared/ui/container/container';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const MapPage = () => {
    const mapContainer = useRef<HTMLDivElement>(null);

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
                </div>
                <BillboardsMap/>
            </div>
        </Container>
    );
};
