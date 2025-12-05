import { BillboardDetailDto } from 'src/entities/billboard';
import s from './billboardInfo.module.scss';
import { BillboardTypeEnum } from 'src/entities/billboard/enums/billboardTypeEnum';
import { BillboardStatusEnum } from 'src/entities/billboard/enums/billboardStatusEnum';
import { Tag } from 'src/shared/ui/tag/tag';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { textSlideAnim } from 'src/shared/lib/gsap/animations/textSlideAnim';

interface IBillboardInfoProps {
    billboardInfo?: BillboardDetailDto;
}

export const BillboardInfo = (props: IBillboardInfoProps) => {
    const { billboardInfo } = props;
    const priceRef = useRef<HTMLSpanElement | null>(null);
    const addressRef = useRef<HTMLSpanElement | null>(null);
    const sizeRef = useRef<HTMLSpanElement | null>(null);
    const typeRef = useRef<HTMLSpanElement | null>(null);
    const statusRef = useRef<HTMLSpanElement | null>(null);

    useGSAP(() => {
        if (!priceRef.current) return;

        const price = priceRef.current;

        textSlideAnim(price, String(billboardInfo?.rent_price ?? ''));
    }, [ billboardInfo?.rent_price ]);

    useGSAP(() => {
        if (!addressRef.current) return;

        const address = addressRef.current;

        textSlideAnim(address, billboardInfo?.address ?? '');
    }, [ billboardInfo?.address ]);

    useGSAP(() => {
        if (!sizeRef.current) return;

        const sizeWidth = sizeRef.current;

        textSlideAnim(sizeWidth, String(billboardInfo?.size ?? ''));
    }, [ billboardInfo?.size ]);

    useGSAP(() => {
        if (!typeRef.current) return;

        const type = typeRef.current;

        textSlideAnim(type, billboardInfo?.type ? BillboardTypeEnum[billboardInfo?.type].name : 'Неизвестен');
    }, [ billboardInfo?.type ]);

    useGSAP(() => {
        if (!statusRef.current) return;

        const status = statusRef.current;

        textSlideAnim(status, billboardInfo?.status ? BillboardStatusEnum[billboardInfo?.status].name : 'Неизвестна');
    }, [ billboardInfo?.status ]);

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
                    Цена:
                    <span ref={priceRef}/>
                    руб/мес
                </span>
                <span>
                    Адрес:
                    <span ref={addressRef}/>
                </span>
                <span>
                    Размер:
                    <span ref={sizeRef}/>
                </span>
                <span>
                    Тип:
                    <span ref={typeRef}/>
                </span>
                <span>
                    Занятость:
                    <span
                        className={
                            billboardInfo?.status === 'available'
                                ? s['status--available']
                                : s['status--unavailable']
                        }
                        ref={statusRef}
                    />
                </span>
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
                        billboardInfo?.hashtags.map((tag, index) => (
                            <Tag
                                key={index}
                                label={'#' + tag}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};
