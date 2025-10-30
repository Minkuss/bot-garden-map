import { BillboardsMap } from 'src/widgets/billboardsMap';
import s from './map.module.scss';

export const MapPage = () => (
    <div
        className={s['map']}
    >
        <h1
            className={s['heading']}
        >
            -Выберите объект.
        </h1>
        <BillboardsMap/>
    </div>
);
