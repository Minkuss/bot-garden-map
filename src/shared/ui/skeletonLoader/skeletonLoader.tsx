import s from './skeletonLoader.module.scss';

interface ISkeletonLoaderProps {
    minHeight?: string;
}

export const SkeletonLoader = (props: ISkeletonLoaderProps) => {
    const { minHeight } = props;

    return (
        <div
            style={
                minHeight
                    ? {
                        minHeight,
                    }
                    : undefined
            }
            className={s['skeleton-loader']}
        />
    );
};
