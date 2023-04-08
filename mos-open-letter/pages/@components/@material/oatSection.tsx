/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
import styles from '../../index.module.scss'
import claimIcon from '../../@assets/images/claimIcon.png'
import { isMobile } from 'react-device-detect'

export const OatSection = () => {
  return (
    <div className={styles.oatSection}>
      <img
        src={claimIcon.src}
        alt="discord Img"
        className="h-8 w-auto mb-4 mx-auto"
      />
      <div className={styles.oatSection__title}>Claim your OAT</div>
      <div className={styles.oatSection__text}>
        {isMobile
          ? 'Claim your Galxe On-chain Achievement Token for iOS or Android below'
          : 'To receive your on-chain achievement token on Galxe, claim below depending on your device'}
      </div>
      <div className={styles.oatSection__actions}>
        <a
          href="https://galxe.com/MomentsOfSpace/campaign/GCZkzU4MLC"
          rel="noreferrer"
          target="_blank"
          className={styles.oatSection__actions__ios}
        >
          <button>&nbsp;&nbsp;Claim iOS OAT&nbsp;&nbsp;</button>
        </a>

        <div className={`${styles.laptopShow}  ${styles.oatSection__OR}`}>
          Or
        </div>

        <a
          href="https://galxe.com/MomentsOfSpace/campaign/GCPDZU4F9W"
          rel="noreferrer"
          target="_blank"
          className={styles.oatSection__actions__android}
        >
          <button>Claim Android OAT</button>
        </a>
      </div>
    </div>
  )
}
export default OatSection
