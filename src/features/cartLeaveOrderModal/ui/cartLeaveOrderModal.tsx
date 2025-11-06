import NiceModal, { useModal } from '@ebay/nice-modal-react';
import s from './cartLeaveOrderModal.module.scss';
import classNames from 'classnames';
import { Input } from 'src/shared/ui/input/input';
import { Checkbox } from 'src/shared/ui/checkbox/checkbox';
import CheckedLight from 'src/app/assets/images/svg/checked_light.svg?react';
import { Button } from 'src/shared/ui/button/button';
import { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MaskedInput } from 'src/shared/ui/maskedInput/maskedInput';

export type Inputs = {
    lastName: string;
    firstName: string;
    middleName: string;
    phoneNumber: string;
    organization: string;
    email: string;
}

const PHONE_PATTERN = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default NiceModal.create(() => {
    const modal = useModal();
    const [ checked, setChecked ] = useState(false);
    const [ phoneError, setPhoneError ] = useState(false);
    const [ emailError, setEmailError ] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
    } = useForm<Inputs>();

    const phoneValue = watch('phoneNumber');
    const emailValue = watch('email');

    const validatePhone = (value: string) => {
        if (!value) return false;
        return PHONE_PATTERN.test(value);
    };

    const validateEmail = (value: string) => {
        if (!value) return false;
        return EMAIL_PATTERN.test(value);
    };

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (!checked) {
            toast.error('Пожалуйста, подтвердите согласие на обработку персональных данных.');
            return;
        }

        if (!validatePhone(phoneValue)) {
            toast.error('Введите корректный номер телефона');
            return;
        }

        if (!validateEmail(emailValue)) {
            toast.error('Введите корректный email');
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
                        error={!!errors.lastName}
                        errorText={'Заполните фамилию'}
                        {...register('lastName', { required: true })}
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
                        label={'Название организации'}
                        fullWidth={true}
                        placeholder={'ООО'}
                        error={!!errors.organization}
                        errorText={'Заполните название организации'}
                        {...register('organization', { required: true })}
                    />
                    <Controller
                        name={'phoneNumber'}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { ref, ...field } }) => (
                            <MaskedInput
                                ref={ref}
                                maskOptions={{ mask: '+7 (000) 000-00-00' }}
                                fullWidth={true}
                                label={'Номер телефона'}
                                placeholder={'+7 (___)-___-__-__'}
                                error={phoneError || !!errors.phoneNumber}
                                errorText={phoneError ? 'Введите полный номер телефона' : 'Заполните номер телефона'}
                                {...field}
                                onChange={value => {
                                    field.onChange(value);
                                    setPhoneError(!validatePhone(value) && value.length > 0);
                                }}
                            />
                        )}
                    />
                    <Controller
                        name={'email'}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { ref, ...field } }) => (
                            <MaskedInput
                                ref={ref}
                                maskOptions={{ mask: /^\S*@?\S*$/ }}
                                label={'Почта'}
                                fullWidth={true}
                                placeholder={'example@mail.ru'}
                                error={emailError || !!errors.email}
                                errorText={emailError ? 'Введите корректный email' : 'Заполните почту'}
                                {...field}
                                onChange={value => {
                                    field.onChange(value);
                                    setEmailError(!validateEmail(value) && value.length > 0);
                                }}
                            />
                        )}
                    />
                    <Checkbox
                        id={'my-checkbox'}
                        icon={<CheckedLight />}
                        checked={checked}
                        onChange={e => setChecked(e.target.checked)}
                    >
                        {'Нажимая на кнопку "Отправить заявку" вы даете' +
                            'согласие на обработку персональных данных в соответствии с Соглашением и Политикой'}
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
