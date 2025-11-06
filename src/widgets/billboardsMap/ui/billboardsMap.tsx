import { Map, YMaps } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';
import { billboardApi, BillboardMarkerDto } from 'src/entities/billboard';
import { SelectableBillboardMarker } from 'src/features/selectableBillboardMarker';
import { BookingCreateParams, useCart } from 'src/entities/cart';
import NiceModal from '@ebay/nice-modal-react';
import SelectDateRangeModal from 'src/features/selectDateRangeModal/ui/selectDateRangeModal';
import { format, parse } from 'date-fns';
import toast from 'react-hot-toast';
import CartLeaveOrderModal, { Inputs } from 'src/features/cartLeaveOrderModal/ui/cartLeaveOrderModal';
import { getModifiedBillboard } from 'src/shared/utils/getModifiedBillboard';

export const BillboardsMap = () => {
    const [ billboardsMarkers, setBillboardsMarkers ] = useState<BillboardMarkerDto[]>([]);
    const { add, clearCart } = useCart();

    useEffect(() => {
        const handleCartClicked = async e => {
            try {
                const result: [{
                    startDate: Date,
                    endDate: Date,
                }] = await NiceModal.show(SelectDateRangeModal);

                const start = format(result[0].startDate, 'dd.MM.yyyy');
                const end = format(result[0].endDate, 'dd.MM.yyyy');

                const { id } = (e as CustomEvent<{ id: string }>).detail;
                add(id, start, end);

                toast.success('Товар добавлен в корзину');
            } catch (error) {
                console.log('Модальное окно закрыто без сохранения');
            }
        };

        window.addEventListener('cartClicked', handleCartClicked);

        return () => {
            window.removeEventListener('cartClicked', handleCartClicked);
        };
    }, [ add ]);

    useEffect(() => {
        const handleRequestClicked = async e => {
            try {
                const result: [{
                    startDate: Date,
                    endDate: Date,
                }] = await NiceModal.show(SelectDateRangeModal);

                const start = format(result[0].startDate, 'dd.MM.yyyy');
                const end = format(result[0].endDate, 'dd.MM.yyyy');

                const { id } = (e as CustomEvent<{ id: string }>).detail;

                const info: Inputs = await NiceModal.show(CartLeaveOrderModal);

                const billboard = await getModifiedBillboard(id, start, end);

                const params: BookingCreateParams = {
                    billboards: [ {
                        billboard_id: billboard.id,
                        side: billboard.side,
                        start_date: format(parse(billboard.start_date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd'),
                        end_date: format(parse(billboard.end_date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd'),
                    } ],
                    email: info.email,
                    first_name: info.firstName,
                    last_name: info.lastName,
                    middle_name: info.middleName,
                    organization: info.organization,
                    phone: info.phoneNumber.replace(/[^\d+]/g, ''),
                };

                clearCart(params);
            } catch (error) {
                console.log('Модальное окно закрыто без сохранения');
            }
        };

        window.addEventListener('requestClicked', handleRequestClicked);

        return () => {
            window.removeEventListener('requestClicked', handleRequestClicked);
        };
    }, [ clearCart ]);

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
