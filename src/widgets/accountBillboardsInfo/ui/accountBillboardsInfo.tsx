import { UserBillboardsList } from 'src/features/userBillboardsList/ui/userBillboardsList';
import s from './accountBillboardsInfo.module.scss';

export const AccountBillboardsInfo = () => (
    <div
        className={s['info']}
    >
        <div
            className={s['heading']}
        >
            <h4>
                Арендованные конструкции
            </h4>
        </div>
        <UserBillboardsList/>
    </div>
);
