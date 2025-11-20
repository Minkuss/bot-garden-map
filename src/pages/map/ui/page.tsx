import { BillboardsMap } from 'src/widgets/billboardsMap';
import s from './map.module.scss';
import { Container } from 'src/shared/ui/container/container';
import FilterIcon from 'src/app/assets/images/svg/filter-btn.svg?react';
import { useState } from 'react';

export const MapPage = () => {
    const [ showFilters, setShowFilters ] = useState<boolean>(false);

    return (
        <Container
            style={{
                height: '100vh',
                scrollSnapAlign: 'start',
            }}
        >
            <div
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
