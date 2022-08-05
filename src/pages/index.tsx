import type { NextPage } from 'next';
import styles from '../styles/LandingPage.module.css';
import Button, {
    ButtonColor,
    ButtonJustify,
    ButtonSize,
} from '../components/Button';
import RiseLogo from '../assets/svg/riseTechLogo.svg';
import Illustration from '../assets/svg/landingPageIllustration.svg';
import Link from 'next/link';
import Route from '../enums/Route';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>RiseQ - Kişisel İş Takip Uygulaması</title>
            </Head>
            <div className={styles.container}>
                {/** Left */}
                <div className={styles.leftSection}>
                    <h1>
                        İşlerini <span>RiseTechQ</span>
                        <br />
                        ile kolayca <span>takip et.</span>
                        <br />
                        Düzensizlikten <span>vazgeç!</span>
                    </h1>

                    <Link href={Route.dashboard} passHref>
                        <Button
                            component="a"
                            color={ButtonColor.blue}
                            size={ButtonSize.large}
                            justify={ButtonJustify.spaceBetween}
                            className={styles.goButton}
                        >
                            Beni
                            <div className={styles.logoSection}>
                                <RiseLogo width="1rem" height="1rem" />Q
                            </div>
                            paneline götür!
                        </Button>
                    </Link>
                </div>

                {/** Right*/}
                <div className={styles.rightSection}>
                    <Illustration viewBox="0 0 596.88227 400.00144" />
                </div>
            </div>
        </>
    );
};

export default Home;
