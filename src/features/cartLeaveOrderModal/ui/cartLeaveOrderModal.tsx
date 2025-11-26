import NiceModal, { useModal } from '@ebay/nice-modal-react';
import s from './cartLeaveOrderModal.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ModalLayout } from 'src/shared/ui/modalLayout/modalLayout';
import { FormValues, LeaveOrderForm, LeaveOrderInputs } from 'src/entities/order/ui/leaveOrderForm';

export default NiceModal.create(({ billboardId, side, showMonthInput }: {billboardId: string, side: string, showMonthInput?: boolean}) => {
    const modalContent = useRef<HTMLDivElement>(null);
    const [ formValues, setFormValues ] = useState<FormValues>();

    const modal = useModal();

    useEffect(() => {
        if (modal.visible) {
            setFormValues({
                lastName: '',
                firstName: '',
                middleName: '',
                phoneNumber: '',
                organization: '',
                email: '',
                dates: null,
                checked: false,
                phoneNumberError: false,
                emailError: false,
            });
        }
    }, [ modal.visible ]);

    const onSubmit = (data: LeaveOrderInputs) => {
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
        <ModalLayout
            isVisible={modal.visible}
            onClose={handleOverlayClick}
            modalRef={modalContent}
            contentStyle={{
                maxHeight: 'calc(100vh - 20px)',
                overflow: 'auto',
            }}
        >
            <h1
                className={s['heading']}
            >
                Арендовать рекламную конструкцию
            </h1>
            <LeaveOrderForm
                onSubmitted={onSubmit}
                billboardId={billboardId}
                side={side}
                values={formValues}
                showMonthInput={showMonthInput}
            />
        </ModalLayout>
    );
});
