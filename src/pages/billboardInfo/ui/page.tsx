import { Container } from 'src/shared/ui/container/container';
import { DetailedBillboardInfo } from 'src/widgets/detailedBillboardInfo/ui/detailedBillboardInfo';
import { Navigate, useParams } from 'react-router-dom';
import { routes } from 'src/shared/routes';
import { useEffect, useRef } from 'react';

export const BillboardInfoPage = () => {
    const { billboardId, side } = useParams();
    const infoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!infoRef.current) return;

        infoRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);

    if (!billboardId || !side) {
        return <Navigate to={routes.MAP}/>;
    }

    return (
        <Container
            style={{
                height: '100vh',
                scrollSnapAlign: 'start',
            }}
            ref={infoRef}
        >
            <DetailedBillboardInfo
                billboardId={billboardId}
                side={side}
            />
        </Container>
    );
};
