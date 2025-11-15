import { Map, YMaps } from '@pbe/react-yandex-maps';
import { useEffect, useRef, useState } from 'react';
import { billboardApi, BillboardMarkerDto } from 'src/entities/billboard';
import { SelectableBillboardMarker } from 'src/features/selectableBillboardMarker';
import { BookingCreateParams, useCart } from 'src/entities/cart';
import NiceModal from '@ebay/nice-modal-react';
import SelectDateRangeModal from 'src/features/selectDateRangeModal/ui/selectDateRangeModal';
import { format, parse } from 'date-fns';
import toast from 'react-hot-toast';
import CartLeaveOrderModal, { LeaveOrderInputs } from 'src/features/cartLeaveOrderModal/ui/cartLeaveOrderModal';
import { getModifiedBillboard } from 'src/shared/utils/getModifiedBillboard';
import { DateRange } from 'src/features/selectDateRangeModal/model/dateRange';
import s from './billboardsMap.module.scss';

export const BillboardsMap = () => {
    const [ billboardsMarkers, setBillboardsMarkers ] = useState<BillboardMarkerDto[]>([]);
    const { add, clearCart } = useCart();
    const mapRef = useRef<any>(null);

    /**
     * Слушаем ивент на нажатие "Добавить в корзину" в карточке баннера на карте
     */
    useEffect(() => {
        const handleCartClicked = async e => {
            try {
                const { id, side } = (e as CustomEvent<{ id: string, side: string }>).detail;

                const result: DateRange = await NiceModal.show(SelectDateRangeModal, { billboardId: id, side });

                const start = format(result.startDate, 'dd.MM.yyyy');
                const end = format(result.endDate, 'dd.MM.yyyy');

                add(id, side, start, end);

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

    /**
     * Слушаем ивент на нажатие клавиши "Оставить заявку" в карточке баннера на карте
     */
    useEffect(() => {
        const handleRequestClicked = async e => {
            try {
                const { id, side } = (e as CustomEvent<{ id: string, side: string }>).detail;

                const info: LeaveOrderInputs = await NiceModal.show(CartLeaveOrderModal, { billboardId: id, side });

                const start = format(info.dates.startDate, 'dd.MM.yyyy');
                const end = format(info.dates.endDate, 'dd.MM.yyyy');

                const billboard = await getModifiedBillboard(id, side, start, end);

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

    /**
     * Сайд эффект для закрытия балуна при клике на свободное место на карте
     */
    useEffect(() => {
        if (!mapRef.current) return;

        const handleMapClick = () => {
            mapRef.current.balloon.close();
        };

        mapRef.current.events.add('click', handleMapClick);

        return () => {
            mapRef.current.events.remove('click', handleMapClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ mapRef.current ]);

    return (
        <div
            className={s['map']}
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
                    defaultOptions={{
                        suppressMapOpenBlock: false,
                        yandexMapDisablePoiInteractivity: true,
                    }}
                    instanceRef={ref => mapRef.current = ref}
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
