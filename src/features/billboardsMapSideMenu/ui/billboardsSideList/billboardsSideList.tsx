import s from './billboardsSideList.module.scss';
import { BillboardSideListCard } from 'src/entities/billboard/ui/billboardSideListCard/billboardSideListCard';
import { BillboardMarkerDto } from 'src/entities/billboard';

interface IBillboardsSideListProps {
    billboards: BillboardMarkerDto[];
}

export const BillboardsSideList = (props: IBillboardsSideListProps) => {
    const { billboards } = props;

    return (
        <ul
            className={s['list']}
        >
            {
                billboards.map(billboard => (
                    <BillboardSideListCard
                        key={billboard.id}
                        type={billboard.type}
                        address={billboard.address}
                        rent_price={billboard.rent_price}
                        image_url={billboard.photo_url}
                        long={billboard.longitude}
                        lat={billboard.latitude}
                    />
                ))
            }
        </ul>
    );
};
