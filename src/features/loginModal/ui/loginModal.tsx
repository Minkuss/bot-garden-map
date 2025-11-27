import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ModalLayout } from 'src/shared/ui/modalLayout/modalLayout';
import s from './loginModal.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { MaskedInput } from 'src/shared/ui/maskedInput/maskedInput';
import { Input } from 'src/shared/ui/input/input';
import { Button } from 'src/shared/ui/button/button';
import toast from 'react-hot-toast';
import { routes } from 'src/shared/routes';
import { generatePath } from 'react-router-dom';
import { PHONE_PATTERN } from 'src/shared/utils/regsPatterns';

const tempUser = {
    phoneNumber: '+7 (994) 147-32-44',
    password: '123456',
};

export interface LoginInputs {
    phoneNumber: string;
    password: string;
}

export default NiceModal.create(() => {
    const modalContent = useRef<HTMLDivElement>(null);

    const modal = useModal();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
    } = useForm<LoginInputs>();
    const [ phoneError, setPhoneError ] = useState(false);

    const phoneValue = watch('phoneNumber');

    useEffect(() => {
        if (modal.visible) {
        }
    }, [ modal.visible ]);

    const validatePhone = (value: string) => {
        if (!value) return false;
        return PHONE_PATTERN.test(value);
    };

    const onSubmit = (data: LoginInputs) => {
        if (!validatePhone(phoneValue)) {
            toast.error('Введите корректный номер телефона');
            return;
        }

        if (data.phoneNumber !== tempUser.phoneNumber || data.password !== tempUser.password) {
            toast.error('Неверный номер телефона или пароль');
            return;
        }

        modal.resolve(data);
        modal.remove();
    };

    const handleGoToRegisterPage = () => {
        window.open(
            generatePath('/map' + routes.REGISTER),
            '_blank',
            'noopener,noreferrer',
        );
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            modal.remove();
        }
    };

    useGSAP(() => {
        if (!modalContent.current) return;

        if (modal.visible) {
            // Анимация открытия
            gsap.fromTo(
                modalContent.current,
                {
                    scale: 0.8,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                },
            );
        }
    }, {
        dependencies: [ modal.visible ],
        scope: modalContent,
    });

    // Не рендерим ничего если модалка была удалена
    if (!modal.visible && !modalContent.current) {
        return null;
    }

    return (
        <ModalLayout
            isVisible={modal.visible}
            onClose={handleOverlayClick}
            modalRef={modalContent}
            contentStyle={{
                padding: 0,
            }}
        >
            <form
                className={s['form']}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    className={s['heading']}
                >
                    <h4
                        className={s['title']}
                    >
                        Вход
                    </h4>
                    <span>
                        Заполните данные для входа
                    </span>
                </div>
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
                <Input
                    label={'Пароль'}
                    fullWidth={true}
                    placeholder={'***********'}
                    error={!!errors.password}
                    errorText={'Придумайте пароль.'}
                    type={'password'}
                    {...register('password', { required: true })}
                />
                <div
                    className={s['actions']}
                >
                    <Button
                        label={'Войти'}
                        variant={'contained'}
                        type={'submit'}
                    />
                    <p
                        className={s['info']}
                    >
                        Ещё нет аккаунта?
                        <a
                            className={s['link']}
                            onClick={handleGoToRegisterPage}
                        >
                            Создайте его!
                        </a>
                    </p>
                </div>
            </form>
        </ModalLayout>
    );
});
