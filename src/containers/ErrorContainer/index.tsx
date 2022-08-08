import styles from '../../styles/for-containers/ErrorContainer.module.css';
import React, { useMemo } from 'react';
import Lottie from 'react-lottie';
import * as errorMobile from '../../assets/lottie/error.json';
import * as errorDesktop from '../../assets/lottie/error.desktop.json';
import useMobileViewController from '../../hooks/useMobileViewController';

const ErrorContainer = () => {
    const isMobile = useMobileViewController();

    const lottieOptions = useMemo(
        () => ({
            animationData: isMobile ? errorMobile : errorDesktop,
            autoplay: true,
            loop: true,
        }),
        [isMobile],
    );

    const title = useMemo(() => {
        return isMobile ? (
            <>
                Başaramadık...
                <br />
                İhtiyacımız olan verileri alamadık 😢
            </>
        ) : (
            <>
                Çok aradık, çabaladık ama...
                <br />
                İhtiyacımız olan verileri alamadık 😢
            </>
        );
    }, [isMobile]);

    return (
        <div className={styles.container}>
            <Lottie
                options={lottieOptions}
                isClickToPauseDisabled={true}
                style={{ cursor: 'default' }}
                height={isMobile ? 400 : 600}
            />

            <div className={styles.context}>
                <h1 className={styles.text}>{title}</h1>
            </div>
        </div>
    );
};

export default ErrorContainer;
