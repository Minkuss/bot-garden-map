import React, { useMemo, useState } from 'react';
import { Placemark, withYMaps } from '@pbe/react-yandex-maps';
import { billboardApi, BillboardDetailDto, BillboardMarkerDto } from 'src/entities/billboard';
import './selectableBillboardMarker.scss';
import { BillboardBalloonCard } from 'src/features/billboardBalloonCard';
import { imagesApi } from 'src/shared/api/images-service';

interface IBillboardMarkerProps {
    billboard: BillboardMarkerDto;
    ymaps?: any;
}

const SelectableBillboardMarkerCore = React.memo(({ billboard, ymaps }: IBillboardMarkerProps) => {
    const [ billboardInfo, setBillboardInfo ] = useState<BillboardDetailDto>();
    const [ selectedPlaceMarkId, setSelectedPlaceMarkId ] = useState<string>('');

    const getBillboard = async(id: string) => {
        try {
            const billboard = await billboardApi.getBillboardInfo({
                id,
                side: 'A',
            });
            const billboardImages = await imagesApi.getBillboardImages({
                id,
                side: billboard.side,
            });

	    // Правильно формируем URL
            const baseUrl = import.meta.env.VITE_API_URL || '';
            const imagePath = billboardImages.images[0].file_path;

            // Если file_path уже начинается с /, не добавляем baseUrl
            billboard.image_url = imagePath.startsWith('http')
                ? imagePath
                : `${baseUrl}${imagePath}`;            

            setBillboardInfo(billboard);
        } catch (error) {
            console.error(error);
        }
    };

    const balloonContentLayout = ymaps.templateLayoutFactory.createClass(
        BillboardBalloonCard(billboardInfo),
        {
            build() {
                this.constructor.superclass.build.call(this);
                const events = this.getData().geoObject.events;

                this.getParentElement().querySelector('.balloon-card__cart-btn')
                    ?.addEventListener('click', () => {
                        window.dispatchEvent(new CustomEvent('cartClicked', { detail: { id: billboardInfo?.id } }));
                    });

                this.getParentElement().querySelector('.balloon-card__request-btn')
                    ?.addEventListener('click', () => {
                        window.dispatchEvent(new CustomEvent('requestClicked', { detail: { id: billboardInfo?.id } }));
                    });

                events.add('balloonclose', () => {
                    document.getElementById(selectedPlaceMarkId)
                        ?.classList
                        .remove('billboard-marker__active');
                });
            },
            clear: function() {
                this.constructor.superclass.clear.call(this);
            },
        },
    );

    const iconLayout = useMemo(() => {
        if (!ymaps?.templateLayoutFactory) return null;

        return ymaps.templateLayoutFactory.createClass(
            `<div class='billboard-marker' id={selectedPlaceMarkId}>
                <div class="billboard-marker__pin"></div>
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
                            getBillboard(billboard.id);
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
