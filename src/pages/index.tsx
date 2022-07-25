import type {NextPage} from 'next'
import styles from '../styles/LandingPage.module.css';
import Button, {ButtonColor, ButtonJustify, ButtonSize} from "../components/Button";
import RiseLogo from '../assets/svg/riseLogo.svg';
import Illustration from '../assets/svg/landingPageIllustration.svg';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            {/** Left */}
            <div className={styles.leftSection}>
                <h1>
                    İşlerini <span>RiseTechQ</span>
                    <br/>
                    ile kolayca <span>takip et.</span>
                    <br/>
                    Düzensizlikten <span>vazgeç!</span>
                </h1>

                <Button
                    color={ButtonColor.blue}
                    size={ButtonSize.large}
                    justify={ButtonJustify.spaceBetween}
                    className={styles.goButton}
                >
                    Beni
                    <div className="flex justify-center items-center gap-0.5">
                        <RiseLogo
                            width="1rem"
                            height="1rem"
                        />
                        Q
                    </div>
                    paneline götür!
                </Button>
            </div>

            {/** Right*/}
            <div className={styles.rightSection}>
                <Illustration
                    viewBox="0 0 596.88227 400.00144"
                />
            </div>
        </div>
    )
}

export default Home
