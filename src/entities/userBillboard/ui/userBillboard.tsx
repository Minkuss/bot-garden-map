import s from './userBillboard.module.scss';
import { format } from 'date-fns';
import { Button } from 'src/shared/ui/button/button';

const mock = {
    src: 'https://rpk-rostov.ru/wp-content/uploads/2021/10/fl1455871649-2048x1574-min-1024x787.jpg',
    address: 'Ул. Некрасова - Серышева',
    startDate: format(new Date('2025-11-27'), 'dd.MM.yyyy'),
    endDate: format(new Date('2025-11-30'), 'dd.MM.yyyy'),
    price: '34000',
};

interface IUserBillboardProps {
    billboard_id?: string;
}

export const UserBillboard = (props: IUserBillboardProps) => {
    const { billboard_id } = props;

    // const getUserBillboard = useCallback(async() => {
    //     try {
    //         const userBillboard = await getModifiedBillboardInfo(billboard_id, 'A');
    //         console.log(userBillboard);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [ billboard_id ]);
    //
    // useEffect(() => {
    //     getUserBillboard();
    // }, [ billboard_id, getUserBillboard ]);

    return (
        <li
            className={s['item']}
        >
            <div
                className={s['img-wrapper']}
            >
                <img
                    src={mock.src}
                    alt={'Баннер'}
                />
            </div>
            <div
                className={s['info']}
            >
                <span>
                    Адрес: {mock.address}
                </span>
                <span>
                    Срок аренды: {mock.startDate} - {mock.endDate}
                </span>
                <span
                    className={s['price']}
                >
                    {mock.price} руб
                </span>
            </div>
            <Button
                label={'Продлить аренду'}
                variant={'contained'}
            />
        </li>
    );
};
