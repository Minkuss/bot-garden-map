import s from './billboardImage.module.scss';
import { BillboardDetailDto } from 'src/entities/billboard';

interface IBillboardImageProps {
    billboardInfo?: BillboardDetailDto;
    onChangeSide: () => void;
    isLastIndex: boolean;
}

export const BillboardImage = (props: IBillboardImageProps) => {
    const { billboardInfo, onChangeSide, isLastIndex } = props;

    if (!billboardInfo) return null;

    return (
        <div
            className={s['image-wrapper']}
        >
            <img
                className={s['image']}
                src={billboardInfo.image_url}
            />
            <button
                className={s['side-btn']}
                onClick={onChangeSide}
            >
                {
                    isLastIndex &&
                    <span>{'< '}</span>
                }
                Сторона {billboardInfo.side}
                {
                    !isLastIndex &&
                    <span>{' >'}</span>
                }
            </button>
        </div>
    );
};
