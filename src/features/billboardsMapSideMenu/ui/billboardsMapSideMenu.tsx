import gsap from 'gsap';
import s from './billboardsMapSideMenu.module.scss';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { SideMenuHeader } from 'src/features/billboardsMapSideMenu/ui/sideMenuHeader/sideMenuHeader';
import { BillboardsFilters } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/billboardsFilters';
import classNames from 'classnames';
import { BillboardsSideList } from 'src/features/billboardsMapSideMenu/ui/billboardsSideList/billboardsSideList';

export const BillboardsMapSideMenu = () => {
    const [ show, setShow ] = useState(false);
    const [ selectedTab, setSelectedTab ] = useState(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (show) {
            tl.to(wrapperRef.current, {
                x: '0%',
                duration: 0.3,
            });
        } else {
            tl.to(wrapperRef.current, {
                x: '-100%',
                duration: 0.3,
            });
        }
    }, { dependencies: [ show ] });

    return (
        <div
            className={s['side-menu-wrapper']}
            ref={wrapperRef}
        >
            <div
                className={s['side-menu']}
            >
                <SideMenuHeader
                    onChangeTab={setSelectedTab}
                />
                {
                    selectedTab === 0
                        ? <BillboardsSideList/>
                        : <BillboardsFilters/>
                }
            </div>
            <button
                className={classNames(
                    s['side-btn'],
                    {
                        [s['side-btn--show']]: !show,
                    },
                )}
                ref={buttonRef}
                style={{
                    left: `${wrapperRef.current?.offsetWidth + 8}px`,
                }}
                onClick={() => setShow(prev => !prev)}
            >
                {show ? '< свернуть' : 'развернуть >'}
            </button>
        </div>
    );
};
