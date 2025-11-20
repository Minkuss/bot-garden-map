import NiceModal, { useModal } from '@ebay/nice-modal-react';
import s from './cartLeaveOrderModal.module.scss';
import classNames from 'classnames';
import { Input } from 'src/shared/ui/input/input';
import { Checkbox } from 'src/shared/ui/checkbox/checkbox';
import CheckedLight from 'src/app/assets/images/svg/checked_light.svg?react';
import { Button } from 'src/shared/ui/button/button';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MaskedInput } from 'src/shared/ui/maskedInput/maskedInput';
import { SelectDateRange } from 'src/shared/ui/selectDateRange/selectDateRange';
import { DateRange } from 'src/features/selectDateRangeModal/model/dateRange';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export type LeaveOrderInputs = {
    lastName: string;
    firstName: string;
    middleName: string;
    phoneNumber: string;
    organization: string;
    email: string;
    dates: DateRange;
}

const PHONE_PATTERN = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default NiceModal.create(({ billboardId, side }: {billboardId: string, side: string}) => {
    const modalContent = useRef();

    const modal = useModal();
    const [ checked, setChecked ] = useState(false);
    const [ phoneError, setPhoneError ] = useState(false);
    const [ emailError, setEmailError ] = useState(false);
    const [ dates, setDates ] = useState<DateRange | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        reset,
    } = useForm<LeaveOrderInputs>();

    const phoneValue = watch('phoneNumber');
    const emailValue = watch('email');

    useEffect(() => {
        if (modal.visible) {
            reset({
                lastName: '',
                firstName: '',
                middleName: '',
                phoneNumber: '',
                organization: '',
                email: '',
            });
            setChecked(false);
            setPhoneError(false);
            setEmailError(false);
            setDates(null);
        }
    }, [ modal.visible, reset ]);

    const validatePhone = (value: string) => {
        if (!value) return false;
        return PHONE_PATTERN.test(value);
    };

    const validateEmail = (value: string) => {
        if (!value) return false;
        return EMAIL_PATTERN.test(value);
    };

    const onSubmit: SubmitHandler<LeaveOrderInputs> = data => {
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

        if (!dates) {
            toast.error('Выберите даты');
            return;
        }

        data.dates = dates;

        modal.resolve(data);
        modal.remove();
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
        <div
            className={classNames(
                s['overlay'],
                modal.visible && s['overlay__visible'],
            )}
            onClick={handleOverlayClick}
        >
            <div
                className={s['content']}
                ref={modalContent}
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
                    <SelectDateRange
                        billboardId={billboardId}
                        side={side}
                        onMonthRangeChange={setDates}
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
