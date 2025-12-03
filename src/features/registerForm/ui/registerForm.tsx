import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from 'src/shared/ui/input/input';
import { MaskedInput } from 'src/shared/ui/maskedInput/maskedInput';
import { Checkbox } from 'src/shared/ui/checkbox/checkbox';
import { Button } from 'src/shared/ui/button/button';
import CheckedLight from 'src/app/assets/images/svg/checked_light.svg?react';
import { useRef, useState } from 'react';
import { EMAIL_PATTERN, PHONE_PATTERN } from 'src/shared/utils/regsPatterns';
import toast from 'react-hot-toast';
import s from './registerForm.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'src/shared/routes';

interface RegisterInputs {
    lastName: string;
    firstName: string;
    middleName: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
    } = useForm<RegisterInputs>();
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    const [ checked, setChecked ] = useState(false);
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

    const onSubmit: SubmitHandler<RegisterInputs> = data => {
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

        //todo
        navigate(routes.MAP);
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            ease: 'power2.out',
        });

        tl.to(formRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
        })
            .to('#inputs', {
                scale: 1.1,
                duration: 0.5,
            })
            .to('#inputs', {
                scale: 1,
                duration: 0.5,
                ease: 'bounce',
            });
    }, {
        scope: formRef,
    });

    return (
        <form
            className={s['form']}
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
        >
            <div
                className={s['heading']}
            >
                <h4
                    className={s['title']}
                >
                    Регистрация
                </h4>
                <span>
                    Заполните данные для регистрации
                </span>
            </div>
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
                label={'Зарегистрироваться'}
                variant={'contained'}
                type={'submit'}
            />
        </form>
    );
};
