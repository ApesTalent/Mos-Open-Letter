/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styles from '../../../index.module.scss'
import lineSvg from '../../../@assets/images/line.svg'
import NavHeader from '../../@material/navHeader'

const TreasuryHeader = () => {
  return (
    <header>
      <div className="max-w-7xl mx-auto">
        <NavHeader pageIndex={1} />

        <div className={styles.header__title}>Treasury</div>

        <img
          src={lineSvg.src}
          alt="line Img"
          className={`${styles.mobileShow} w-4 h-auto my-5 mx-auto`}
        />

        <div className={styles.header__treatitle}>
          Join the Community-Powered Journey
        </div>

        <div className={styles.header__description}>
          Let’s harness the power of meditation, technology and co-creation to
          fuel positive change
        </div>
      </div>
    </header>
  )
}

export default TreasuryHeader
