/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TreasuryHeader from './header'
import Roadmap from './roadmap'
import Sign from './sign'
import styles from '../../index.module.scss'
import DownloadSection from '../@material/downloadSection'
import OatSection from '../@material/oatSection'

const Treasury = () => {
  return (
    <div className={styles.treasurySection}>
      <div className={`max-w-7xl mx-auto px-4 pb-16`}>
        <TreasuryHeader />
        <Roadmap />
        <Sign />
        <OatSection />
        <DownloadSection />
      </div>
    </div>
  )
}

export default Treasury
