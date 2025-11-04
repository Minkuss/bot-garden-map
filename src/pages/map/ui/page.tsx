import { BillboardsMap } from 'src/widgets/billboardsMap';
import s from './map.module.scss';

export const MapPage = () => (
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
);
