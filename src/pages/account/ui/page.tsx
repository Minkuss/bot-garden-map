import { AccountUserInfo } from 'src/widgets/accountUserInfo/ui/accountUserInfo';
import { Container } from 'src/shared/ui/container/container';
import { AccountBillboardsInfo } from 'src/widgets/accountBillboardsInfo/ui/accountBillboardsInfo';
import { useAuth } from 'src/shared/auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { routes } from 'src/shared/routes';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const AccountPage = () => {
    const { user } = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current, {
            y: '50%',
            opacity: 0,
        }, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
        });
    });

    if (!user) {
        return <Navigate to={routes.MAP} replace={true}/>;
    }

    return (
        <Container
            style={{
                scrollSnapAlign: 'start',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                }}
                ref={containerRef}
            >
                <AccountUserInfo/>
                <AccountBillboardsInfo/>
            </div>
        </Container>
    );
};
