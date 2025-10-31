import { Map, YMaps } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';
import { billboardApi, BillboardMarkerDto } from 'src/entities/billboard';
import { SelectableBillboardMarker } from 'src/features/selectableBillboardMarker';
import { useCart } from 'src/entities/cart';

export const BillboardsMap = () => {
    const [ billboardsMarkers, setBillboardsMarkers ] = useState<BillboardMarkerDto[]>([]);
    const { add } = useCart();

    window.addEventListener('cartClicked', e => {
        const { id } = (e as CustomEvent<{ id: string }>).detail;
        add(id);
    });

    useEffect(() => {
        const loadBillBoardsMarkers = async() => {
            try {
                const data = await billboardApi.getBillboardsCoords();
                setBillboardsMarkers(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadBillBoardsMarkers();
    }, []);

    return (
        <div
            style={{
                height: '600px',
            }}
        >
            <YMaps
                query={{
                    apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
                    load: 'templateLayoutFactory',
                }}
            >
                <Map
                    defaultState={{
                        center: [ 48.52, 135.12 ],
                        zoom: 10,
                    }}
                    width='100%'
                    height='100%'
                >
                    {
                        billboardsMarkers.length !== 0 &&
                        billboardsMarkers.map((billboardMarker: BillboardMarkerDto) => (
                            <SelectableBillboardMarker
                                key={billboardMarker.id}
                                billboard={billboardMarker}
                            />
                        ))
                    }
                </Map>
            </YMaps>
        </div>
    );
};
