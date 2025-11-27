import { Input } from 'src/shared/ui/input/input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MaskedInput } from 'src/shared/ui/maskedInput/maskedInput';
import { Button } from 'src/shared/ui/button/button';
import { useEffect, useRef, useState } from 'react';
import { EMAIL_PATTERN, PHONE_PATTERN } from 'src/shared/utils/regsPatterns';
import toast from 'react-hot-toast';
import s from './userInfoForm.module.scss';
import { useAuth } from 'src/shared/auth/hooks/useAuth';

interface UserInfoFormInputs {
    lastName: string;
    firstName: string;
    middleName: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export const UserInfoForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue,
    } = useForm<UserInfoFormInputs>();
    const { user } = useAuth();

    const formRef = useRef<HTMLFormElement>(null);

    const [ phoneError, setPhoneError ] = useState(false);
    const [ emailError, setEmailError ] = useState(false);

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

    const onSubmit: SubmitHandler<UserInfoFormInputs> = data => {
        if (!validatePhone(phoneValue)) {
            toast.error('Введите корректный номер телефона');
            return;
        }

        if (!validateEmail(emailValue)) {
            toast.error('Введите корректный email');
            return;
        }
        console.log(data);
    };

    useEffect(() => {
        if (!user) return;

        setValue('firstName', user?.firstName);
        setValue('lastName', user?.lastName);
        setValue('middleName', user?.middleName);
        setValue('phoneNumber', user?.phoneNumber);
        setValue('email', user?.email);
    }, [ setValue, user ]);

    return (
        <form
            className={s['form']}
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
        >
            <div
                className={s['grid']}
                id={'inputs'}
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
                <Input
                    label={'Пароль'}
                    fullWidth={true}
                    placeholder={'***********'}
                    error={!!errors.password}
                    errorText={'Придумайте пароль.'}
                    type={'password'}
                    {...register('password', { required: true })}
                />
            </div>
            <div
                className={s['btn-wrapper']}
            >
                <Button
                    label={'Сохранить изменения'}
                    variant={'contained'}
                    type={'submit'}
                />
            </div>
        </form>
    );
};
