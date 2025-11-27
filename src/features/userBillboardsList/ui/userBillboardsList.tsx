import s from './userBillboardsList.module.scss';
import { UserBillboard } from 'src/entities/userBillboard/ui/userBillboard';

export const UserBillboardsList = () => (
    <ul
        className={s['list']}
    >
        <UserBillboard/>
        <UserBillboard/>
        <UserBillboard/>
        <UserBillboard/>
    </ul>
);
