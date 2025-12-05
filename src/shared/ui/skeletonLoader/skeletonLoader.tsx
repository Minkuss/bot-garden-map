import s from './skeletonLoader.module.scss';

interface ISkeletonLoaderProps {
    style?: React.CSSProperties ;
}

export const SkeletonLoader = (props: ISkeletonLoaderProps) => {
    const { style } = props;

    return (
        <div
            style={style}
            className={s['skeleton-loader']}
        />
    );
};
