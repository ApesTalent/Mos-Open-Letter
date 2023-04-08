/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Link } from 'react-scroll'
import NavHeader from '../../@material/navHeader'
import styles from '../../../index.module.scss'
import logo from '../../../@assets/images/logo.svg'
import Lotus from '../../../@assets/images/lotus.svg'
import lineSvg from '../../../@assets/images/line.svg'
import stickyBar from '../../../@assets/images/StickyBar.png'
import stickyTransBar from '../../../@assets/images/stickyTransBar.png'
import stickyWave from '../../../@assets/video/stickyWave.mp4'
import Sticky from 'react-stickynode'
import { useRef } from 'react'
interface HeaderProps {
  signerCount: any
}

const Header = ({ signerCount }: HeaderProps) => {
  const stickyRef = useRef(null)
  const stickyMobileRef = useRef(null)
  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      stickyRef.current.style.backgroundImage = `url(${stickyBar.src})`
      stickyMobileRef.current.style.display = 'block'
    } else {
      stickyRef.current.style.backgroundImage = `url(${stickyTransBar.src})`
      stickyMobileRef.current.style.display = 'none'
    }
  }

  return (
    <header>
      <div className="max-w-7xl mx-auto px-4">
        <NavHeader pageIndex={0} />

        <div className={styles.header__title}>Open Letter</div>

        <img
          src={lineSvg.src}
          alt="line Img"
          className={`${styles.mobileShow} w-4 h-auto my-5 mx-auto`}
        />

        <div className={styles.header__subtitle}>
          Join the next evolution of meditation
        </div>

        <img src={Lotus.src} alt="Lotus Img" className={styles.lotus} />

        <Sticky
          onStateChange={handleStateChange}
          top={-15}
          bottomBoundary="#ourVision"
          className={`${styles.laptopShow} ${styles.header__stickyBarWrapper} flex justify-between items-center`}
        >
          <div className={styles.header__stickyBar} ref={stickyRef}>
            <div
              className={styles.header__stickyBar__wave}
              dangerouslySetInnerHTML={{
                __html: `
                    <video
                      loop
                      muted
                      autoplay
                      playsinline
                    ><source src="${stickyWave}" type="video/mp4" /> </video>
                  `,
              }}
            ></div>
            <div className={styles.header__stickyBar__count}>
              {signerCount && signerCount.toLocaleString()}
            </div>
            <div className={styles.header__stickyBar__label}>
              Total <br /> Signatures
            </div>
            <Link
              className={styles.header__stickyBar__signBtn}
              smooth={true}
              duration={500}
              spy={true}
              to={'joinUs'}
            >
              Sign the Open Letter
            </Link>
          </div>
        </Sticky>

        <Sticky
          onStateChange={handleStateChange}
          bottomBoundary="#ourVision"
          className={`${styles.mobileShow} ${styles.header__stickyBarWrapper} flex justify-between items-center`}
        >
          <div
            className={styles.header__stickyBar__padding}
            ref={stickyMobileRef}
          />
          <div className={styles.header__stickyBar}>
            <div className={styles.header__stickyBar__header}>
              <div
                className={styles.header__stickyBar__wave}
                dangerouslySetInnerHTML={{
                  __html: `
                    <video
                      loop
                      muted
                      autoplay
                      playsinline
                    ><source src="${stickyWave}" type="video/mp4" /> </video>
                  `,
                }}
              ></div>
              <div className={styles.header__stickyBar__count}>
                {signerCount && signerCount.toLocaleString()}
              </div>
              <div className={styles.header__stickyBar__label}>
                Total <br /> Signatures
              </div>
              <img
                src={logo.src}
                alt="MOS Logo"
                className={styles.header__stickyBar__logo}
              />
            </div>
            <div className={styles.header__stickyBar__footer}>
              <Link
                className={styles.header__stickyBar__signBtn}
                smooth={true}
                duration={500}
                spy={true}
                to={'joinUs'}
              >
                Sign the Open Letter
              </Link>
            </div>
          </div>
        </Sticky>
      </div>
    </header>
  )
}

export default Header
