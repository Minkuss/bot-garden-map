import { UserInfoForm } from 'src/features/userInfoForm/ui/userInfoForm';
import s from './accountUserInfo.module.scss';

export const AccountUserInfo = () => (
    <div
        className={s['info']}
    >
        <UserInfoForm/>
    </div>
);
