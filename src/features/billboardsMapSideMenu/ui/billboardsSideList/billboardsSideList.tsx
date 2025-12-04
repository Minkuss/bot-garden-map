import s from './billboardsSideList.module.scss';
import { BillboardSideListCard } from 'src/entities/billboard/ui/billboardSideListCard/billboardSideListCard';

const mockBillboardsList = [
    {
        id: 1,
        image_url: 'https://www.vink.ru/upload/resize_cache/iblock/21f/4w448fbbs16m85d5iv5ts0e23nudbx8t/640_480_1/000.jpg',
        type: 'banner',
        address: 'Хабаровск, улица Серышева 31',
        rent_price: 34000,
    },
    {
        id: 2,
        image_url: 'https://www.vink.ru/upload/resize_cache/iblock/21f/4w448fbbs16m85d5iv5ts0e23nudbx8t/640_480_1/000.jpg',
        type: 'prism',
        address: 'Хабаровск, улица Ленина 21',
        rent_price: 40000,
    },
    {
        id: 3,
        image_url: 'https://www.vink.ru/upload/resize_cache/iblock/21f/4w448fbbs16m85d5iv5ts0e23nudbx8t/640_480_1/000.jpg',
        type: 'scroll',
        address: 'Хабаровск, улица Запарина 2',
        rent_price: 45000,
    },
    {
        id: 4,
        image_url: 'https://www.vink.ru/upload/resize_cache/iblock/21f/4w448fbbs16m85d5iv5ts0e23nudbx8t/640_480_1/000.jpg',
        type: 'banner',
        address: 'Хабаровск, улица Павла-Морозова 10',
        rent_price: 50000,
    },
];

export const BillboardsSideList = () => (
    <ul
        className={s['list']}
    >
        {
            mockBillboardsList.map(billboard => (
                <BillboardSideListCard
                    key={billboard.id}
                    type={billboard.type}
                    address={billboard.address}
                    rent_price={billboard.rent_price}
                    image_url={billboard.image_url}
                />
            ))
        }
    </ul>
);
