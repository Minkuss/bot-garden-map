import s from './sideMenuHeader.module.scss';
import { Button } from 'src/shared/ui/button/button';
import { useState } from 'react';

interface ISideMenuHeaderProps {
    onChangeTab: (tab: number) => void;
}

export const SideMenuHeader = ({ onChangeTab }: ISideMenuHeaderProps) => {
    const [ selectedTab, setSelectedTab ] = useState(0);

    const handleChangeTab = (tab: number) => {
        setSelectedTab(tab);
        onChangeTab(tab);
    };

    return (
        <div
            className={s['header']}
        >
            <h4
                className={s['title']}
            >
                Хабаровск
            </h4>
            <div
                className={s['btn-group']}
            >
                <Button
                    label={'Список конструкций'}
                    onClick={() => handleChangeTab(0)}
                    variant={selectedTab === 0 ? 'contained' : 'outlined'}
                />
                <Button
                    label={'Фильтры'}
                    onClick={() => handleChangeTab(1)}
                    variant={selectedTab === 1 ? 'contained' : 'outlined'}
                />
            </div>
        </div>
    );
};
