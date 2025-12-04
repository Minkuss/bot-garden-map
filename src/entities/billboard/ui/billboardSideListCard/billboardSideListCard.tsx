import s from './billboardSideListCard.module.scss';
import { BillboardTypeEnum, BillboardTypeEnumType } from 'src/entities/billboard/enums/billboardTypeEnum';
import Favorite from 'src/app/assets/images/svg/favorite.svg?react';
import { useStore } from 'src/shared/store';

interface IBillboardSideListCard {
    type: BillboardTypeEnumType,
    address: string;
    rent_price: number;
    image_url: string;
    long: number,
    lat: number,
}

export const BillboardSideListCard = (props: IBillboardSideListCard) => {
    const { type, address, rent_price, image_url, lat, long } = props;

    const setZoomCoords = useStore(store => store.setZoomCoords);

    const handleSetZoomCoords = () => {
        setZoomCoords(long, lat);
    };

    return (
        <li
            className={s['billboard']}
            onClick={handleSetZoomCoords}
        >
            <div
                className={s['image-wrapper']}
            >
                <img
                    className={s['image']}
                    src={image_url}
                />
            </div>
            <div
                className={s['info']}
            >
                <div
                    className={s['info-header']}
                >
                    <p
                        className={s['header-text']}
                    >
                        <span
                            className={s['type']}
                        >
                            {BillboardTypeEnum[type].name}
                        </span>
                        <span>
                            {address}
                        </span>
                    </p>
                    <button>
                        <Favorite/>
                    </button>
                </div>
                <span
                    className={s['info-price']}
                >
                    {rent_price + ' руб/мес'}
                </span>
            </div>
        </li>
    );
};
