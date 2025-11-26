import classNames from 'classnames';
import { CSSProperties, PropsWithChildren, RefObject } from 'react';
import s from './modalLayout.module.scss';

interface IModalLayoutProps extends PropsWithChildren {
    isVisible: boolean;
    onClose: (e: React.MouseEvent) => void;
    modalRef: RefObject<HTMLDivElement>;
    contentStyle?: CSSProperties;
}

export const ModalLayout = (props: IModalLayoutProps) => {
    const { isVisible, onClose, modalRef, children, contentStyle } = props;

    return (
        <div
            className={classNames(
                s['overlay'],
                isVisible && s['overlay__visible'],
            )}
            onClick={e => onClose(e)}
        >
            <div
                className={s['content']}
                ref={modalRef}
                style={contentStyle}
            >
                {children}
            </div>
        </div>
    );
};
