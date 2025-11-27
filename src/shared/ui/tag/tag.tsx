import s from './tag.module.scss';

interface ITagProps {
    label: string;
}

export const Tag = (props: ITagProps) => {
    const { label } = props;

    return (
        <div
            className={s['tag']}
        >
            {label}
        </div>
    );
};
