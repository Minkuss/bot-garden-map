import React, { useMemo, useState } from 'react';
import { Placemark, withYMaps } from '@pbe/react-yandex-maps';
import { BillboardDetailDto, BillboardMarkerDto } from 'src/entities/billboard';
import './selectableBillboardMarker.scss';
import { BillboardBalloonCard } from 'src/features/billboardBalloonCard';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { getModifiedBillboardInfo } from 'src/shared/utils/getModifiedBillboardWithDates';
import { BillboardStatusEnumType } from 'src/entities/billboard/enums/billboardStatusEnum';
import { getMarkerSvgByType } from 'src/features/billboardBalloonCard/utils/getMarkerIcon';

const BILLBOARD_STATUS_COLORS: Record<BillboardStatusEnumType, string> = {
    available: '#35B44A',
    reserved: '#F5A623',
    occupied: '#D93636',
};

interface IBillboardMarkerProps {
    billboard: BillboardMarkerDto;
    ymaps?: any;
}

const SelectableBillboardMarkerCore = React.memo(({ billboard, ymaps }: IBillboardMarkerProps) => {
    const [ billboardInfo, setBillboardInfo ] = useState<BillboardDetailDto>();
    const [ selectedPlaceMarkId, setSelectedPlaceMarkId ] = useState<string>('');
    const [ billboardSides, setBillboardSides ] = useState<string[]>([]);
    const [ billboardSideIndex, setBillboardSideIndex ] = useState<number>(0);
    const [ changedSideFlag, setChangedSideFlag ] = useState(false);

    const getBillboard = async(id: string, sideIndex: number) => {
        try {
            const billboardFetchedSides = [ 'A', 'B' ]; //todo temp: пример (нужен новый хвост)
            setBillboardSides(billboardFetchedSides);

            setBillboardSideIndex(sideIndex);

            const billboard = await getModifiedBillboardInfo(id, billboardFetchedSides[sideIndex]);

            setBillboardInfo(billboard);
        } catch (error) {
            toast.error(error.response.data.detail);
            console.error(error);
        }
    };

    const balloonContentLayout = useMemo(() => {
        if (!ymaps?.templateLayoutFactory) return null;

        return ymaps.templateLayoutFactory.createClass(
            BillboardBalloonCard(billboardInfo, billboardSideIndex === billboardSides.length - 1),
            {
                build() {
                    this.constructor.superclass.build.call(this);
                    const events = this.getData().geoObject.events;
                    const balloonElement = this.getParentElement();

                    if (billboardInfo && !changedSideFlag) {
                        // Создаем timeline с небольшой задержкой
                        const tl = gsap.timeline({
                            defaults: { ease: 'power2.out' },
                            delay: 0.1,
                        });

                        tl.fromTo(balloonElement.querySelector('.balloon-card__image-wrapper'), {
                            rotateY: '5deg',
                        }, {
                            rotateY: 0,
                            duration: 0.4,
                        }, 0)
                        .fromTo(balloonElement.querySelector('.balloon-card__side-btn'), {
                            opacity: 0,
                            x: 100,
                        }, {
                            opacity: 1,
                            x: -10,
                            duration: 0.3,
                        }, 0.1)
                        .fromTo(balloonElement.querySelector('.balloon-card__info'), {
                            opacity: 0,
                        }, {
                            opacity: 1,
                            duration: 0.4,
                        }, 0.2)
                        .fromTo(balloonElement.querySelectorAll('.balloon-card__info > *'), {
                            opacity: 0,
                            x: -100,
                        }, {
                            opacity: 1,
                            x: 0,
                            stagger: 0.05,
                            duration: 0.3,
                        }, 0.3);

                        // Сохраняем timeline для очистки
                        this._gsapTimeline = tl;
                    }

                    this.getParentElement().querySelector('.balloon-card__cart-btn')
                        ?.addEventListener('click', () => {
                            window.dispatchEvent(new CustomEvent('cartClicked', { detail: { id: billboardInfo?.id, side: billboardInfo?.side } }));
                        });

                    this.getParentElement().querySelector('.balloon-card__request-btn')
                        ?.addEventListener('click', () => {
                            window.dispatchEvent(new CustomEvent('requestClicked', { detail: { id: billboardInfo?.id, side: billboardInfo?.side } }));
                        });

                    this.getParentElement().querySelector('.balloon-card__detailed-btn')
                        ?.addEventListener('click', () => {
                            window.dispatchEvent(new CustomEvent('detailedClicked',
                                { detail: { id: billboardInfo?.id, side: billboardInfo?.side } }));
                        });

                    this.getParentElement().querySelector('.balloon-card__side-btn')
                        ?.addEventListener('click', () => {
                            if (!billboardInfo) return;
                            getBillboard(billboardInfo?.id, billboardSideIndex + 1 !== billboardSides.length ? billboardSideIndex + 1 : 0);
                            setChangedSideFlag(true);
                        });

                    events.add('balloonclose', () => {
                        document.getElementById(selectedPlaceMarkId)
                            ?.classList
                            .remove('billboard-marker__active');
                        setBillboardInfo(undefined);
                        setChangedSideFlag(false);
                    });
                },
                clear: function() {
                    if (this._gsapTimeline) {
                        this._gsapTimeline.kill();
                    }
                    this.constructor.superclass.clear.call(this);
                },
            },
        );
    }, [ ymaps.templateLayoutFactory, billboardInfo, billboardSideIndex, billboardSides.length, changedSideFlag, selectedPlaceMarkId ]);

    const iconLayout = useMemo(() => {
        if (!ymaps?.templateLayoutFactory) return null;

        const color = BILLBOARD_STATUS_COLORS['available'];
        const svg = getMarkerSvgByType('banner', color);

        return ymaps.templateLayoutFactory.createClass(
            `<div class="billboard-marker" id="${billboard.id}">
                ${svg}
            </div>`,
            {
                build: function() {
                    this.constructor.superclass.build.call(this);

                    const offset = this.getData().options.get('iconImageOffset');
                    const size = this.getData().options.get('iconImageSize');

                    this.getData().options.set('shape', {
                        type: 'Circle',
                        coordinates: offset || [ 0, 0 ],
                        radius: (size?.[0] || 40) / 2,
                    });

                    const element = this.getParentElement()
                        .getElementsByClassName('billboard-marker')[0];

                    if (element) {
                        this.getData().geoObject.events.add('mouseenter', () => {
                            element.classList.add('billboard-marker--hover');
                        });

                        this.getData().geoObject.events.add('mouseleave', () => {
                            element.classList.remove('billboard-marker--hover');
                        });

                        this.getData().geoObject.events.add('click', () => {
                            setSelectedPlaceMarkId(billboard.id);
                            getBillboard(billboard.id, 0);
                        });
                    }
                },
            },
        );
    }, [ ymaps, billboard.id ]);

    if (!iconLayout) {
        return null;
    }

    return (
        <Placemark
            geometry={[ billboard.latitude, billboard.longitude ]}
            options={{
                iconLayout,
                balloonContentLayout,
                balloonPanelMaxMapArea: 0,
                hideIconOnBalloonOpen: false,
                balloonMaxWidth: 700,
                balloonMaxHeight: 700,
                balloonOffset: [ -2, -54 ],
                iconImageSize: [ 40, 50 ],
                iconImageOffset: [ -20, -50 ],
            }}
        />
    );
});

export const SelectableBillboardMarker = ({ billboard }: Omit<IBillboardMarkerProps, 'ymaps'>) => {
    const WrappedMarker = useMemo(
        () => withYMaps(
            SelectableBillboardMarkerCore,
            true,
            [ 'templateLayoutFactory', 'geoObject.addon.balloon' ],
        ),
        [],
    );

    return (
        <WrappedMarker
            billboard={billboard}
        />
    );
};
