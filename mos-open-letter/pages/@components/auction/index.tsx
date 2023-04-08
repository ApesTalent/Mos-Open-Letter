/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TreasuryHeader from './header'
import About from './about'
import Countdown from './countdown'
import DownloadSection from '../@material/downloadSection'
import OatSection from '../@material/oatSection'

import styles from '../../index.module.scss'
import {
  checkIfAuctionFinished,
  checkIfAuction,
} from '../../../lib/auctionDate'

const Auction = () => {
  return (
    <div className={styles.treasurySection}>
      <div className={`max-w-7xl mx-auto px-4 pb-16`}>
        <TreasuryHeader />
        <About />
        {!checkIfAuction() && !checkIfAuctionFinished() && <Countdown />}
        <OatSection />
        <DownloadSection />
      </div>
    </div>
  )
}

export default Auction
