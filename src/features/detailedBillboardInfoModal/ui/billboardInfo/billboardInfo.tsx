import { BillboardDetailDto } from 'src/entities/billboard';
import s from './billboardInfo.module.scss';
import { BillboardTypeEnum } from 'src/entities/billboard/enums/billboardTypeEnum';
import { BillboardStatusEnum } from 'src/entities/billboard/enums/billboardStatusEnum';
import { Tag } from 'src/shared/ui/tag/tag';

const tempTags = [
    '#университет',
    '#школа',
    '#детский сад',
    '#больница',
];

interface IBillboardInfoProps {
    billboardInfo?: BillboardDetailDto;
}

export const BillboardInfo = (props: IBillboardInfoProps) => {
    const { billboardInfo } = props;

    return (
        <div
            className={s['info-card']}
        >
            <div
                className={s['info']}
            >
                <span
                    className={s['price']}
                >
                    Цена: {billboardInfo?.rent_price ?? ''} руб/мес
                </span>
                <span>
                    Адрес: {billboardInfo?.address ?? ''}
                </span>
                <span>
                    Размер: {billboardInfo?.width ?? ''}x{billboardInfo?.height ?? ''}
                </span>
                <span>
                    Тип: {billboardInfo?.type ? BillboardTypeEnum[billboardInfo?.type].name : 'Неизвестен'}
                </span>
                <p>
                    Занятость:{' '}
                    <span
                        className={
                            billboardInfo?.status === 'available'
                                ? s['status--available']
                                : s['status--unavailable']
                        }
                    >
                        {billboardInfo?.status ? BillboardStatusEnum[billboardInfo?.status].name : 'Неизвестна'}
                    </span>
                </p>
            </div>
            <div
                className={s['tags']}
            >
                <span>
                    Находится рядом:
                </span>
                <ul
                    className={s['list']}
                >
                    {
                        tempTags.map((tag, index) => (
                            <Tag
                                key={index}
                                label={tag}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};
