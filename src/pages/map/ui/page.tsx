import { BillboardsMap } from 'src/widgets/billboardsMap';
import s from './map.module.scss';
import { Container } from 'src/shared/ui/container/container';

export const MapPage = () => (
    <Container
        style={{
            height: '100vh',
            scrollSnapAlign: 'start',
        }}
    >
        <div
            className={s['map']}
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
            <BillboardsMap/>
        </div>
    </Container>
);
