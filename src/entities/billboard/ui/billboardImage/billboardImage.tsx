import s from './billboardImage.module.scss';
import { BillboardDetailDto } from 'src/entities/billboard';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { textSlideAnim } from 'src/shared/lib/gsap/animations/textSlideAnim';

interface IBillboardImageProps {
    billboardInfo?: BillboardDetailDto;
    onChangeSide: () => void;
    isLastIndex: boolean;
}

export const BillboardImage = (props: IBillboardImageProps) => {
    const { billboardInfo, onChangeSide, isLastIndex } = props;
    const buttonTextRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        if (!buttonTextRef.current) return;

        const newText = `${isLastIndex ? '<' : ''} Сторона ${billboardInfo?.side ?? ''} ${!isLastIndex ? '>' : ''}`;

        textSlideAnim(buttonTextRef.current, newText);
    }, [ billboardInfo?.side ]);

    if (!billboardInfo) return null;

    return (
        <div
            className={s['image-wrapper']}
        >
            <img
                className={s['image']}
                src={billboardInfo.photo_url}
            />
            <button
                className={s['side-btn']}
                onClick={onChangeSide}
            >
                <span ref={buttonTextRef}/>
            </button>
        </div>
    );
};
