import NiceModal, { useModal } from '@ebay/nice-modal-react';
import s from './cartLeaveOrderModal.module.scss';
import classNames from 'classnames';
import { Input } from 'src/shared/ui/input/input';
import { Checkbox } from 'src/shared/ui/checkbox/checkbox';
import CheckedLight from 'src/app/assets/images/svg/checked_light.svg?react';
import { Button } from 'src/shared/ui/button/button';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Inputs = {
    secondName: string;
    firstName: string;
    middleName: string;
    phoneNumber: string;
    email: string;
}

export default NiceModal.create(() => {
    const modal = useModal();
    const [ checked, setChecked ] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (!checked) {
            toast.error('Пожалуйста, подтвердите согласие на обработку персональных данных.');
            return;
        }
        modal.resolve(data);
        modal.remove();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            modal.hide();
        }
    };

    return (
        <div
            className={classNames(
                s['overlay'],
                modal.visible && s['overlay__visible'],
            )}
            onClick={handleOverlayClick}
        >
            <div
                className={s['content']}
            >
                <h1
                    className={s['heading']}
                >
                    Арендовать рекламную конструкцию
                </h1>
                <form
                    className={s['form']}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label={'Фамилия'}
                        fullWidth={true}
                        placeholder={'Иванов'}
                        error={!!errors.secondName}
                        errorText={'Заполните фамилию'}
                        {...register('secondName', { required: true })}
                    />
                    <Input
                        label={'Имя'}
                        fullWidth={true}
                        placeholder={'Иван'}
                        error={!!errors.firstName}
                        errorText={'Заполните имя'}
                        {...register('firstName', { required: true })}
                    />
                    <Input
                        label={'Отчество'}
                        fullWidth={true}
                        placeholder={'Иванович'}
                        error={!!errors.middleName}
                        errorText={'Заполните отчество'}
                        {...register('middleName', { required: true })}
                    />
                    <Input
                        label={'Номер телефона'}
                        fullWidth={true}
                        placeholder={'+7 (***)-***-**-**'}
                        error={!!errors.phoneNumber}
                        errorText={'Заполните номер телефона'}
                        {...register('phoneNumber', { required: true })}
                    />
                    <Input
                        label={'Почта'}
                        fullWidth={true}
                        placeholder={'@mail.ru'}
                        error={!!errors.email}
                        errorText={'Заполните почту'}
                        {...register('email', { required: true })}
                    />
                    <Checkbox
                        id={'my-checkbox'}
                        icon={<CheckedLight />}
                        checked={checked}
                        onChange={e => setChecked(e.target.checked)}
                    >
                        Нажимая на кнопку “Отправить заявку”{' '}
                        вы даете согласие на обработку персональных данных в соответствии с Соглашением и Политикой
                    </Checkbox>
                    <Button
                        label={'Оставить заявку'}
                        variant={'contained'}
                        type={'submit'}
                    />
                </form>
            </div>
        </div>
    );
});
