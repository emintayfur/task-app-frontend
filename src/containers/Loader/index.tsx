import styles from '../../styles/for-containers/Loader.module.css';
import React, { useMemo } from 'react';
import Lottie from 'react-lottie';
import useMobileViewController from '../../hooks/useMobileViewController';
import * as loader from '../../assets/lottie/loader.json';
import * as loaderForDesktop from '../../assets/lottie/loader.desktop.json';

const Loader = () => {
    const isMobile = useMobileViewController();

    const lottieOptions = useMemo(
        () => ({
            animationData: isMobile ? loader : loaderForDesktop,
            autoplay: true,
            loop: true,
        }),
        [isMobile],
    );

    const title = (
        <div className={styles.context}>
            <h1 className={styles.text}>
                İhtiyacımız olan verileri alıyoruz lütfen bekleyin... ⏳
            </h1>
        </div>
    );

    return (
        <div className={styles.container}>
            {!isMobile && title}

            <Lottie
                options={lottieOptions}
                isClickToPauseDisabled={true}
                style={{ cursor: 'default' }}
                height={isMobile ? 400 : 600}
            />

            {isMobile && title}
        </div>
    );
};

export default Loader;
