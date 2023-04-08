/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styles from '../../../index.module.scss'
import lineSvg from '../../../@assets/images/line.svg'
import NavHeader from '../../@material/navHeader'
import auctionLogo from '../../../@assets/video/auctionLogo.mp4'
import {
  checkIfAuction,
  checkIfAuctionFinished,
} from '../../../../lib/auctionDate'

const TreasuryHeader = () => {
  return (
    <header>
      <div className="max-w-7xl mx-auto">
        <NavHeader pageIndex={2} />

        <div className={styles.header__title}>
          {checkIfAuctionFinished()
            ? 'NFT Auction - Finished'
            : 'NFT Auction 16th - 18th Dec'}
        </div>

        <img
          src={lineSvg.src}
          alt="line Img"
          className={`${styles.mobileShow} w-4 h-auto my-5 mx-auto`}
        />

        <div className={styles.header__treatitle}>
          Auction Fundraiser {checkIfAuction() && ' is Live'}{' '}
        </div>

        <div className={styles.header__description}>
          {checkIfAuction() ? (
            <>
              Make a bid for our 1/1 collective NFT and have your chance to fuel
              awakening. <br />
              Available on SuperRare NOW <br />
              16th Dec 8am - 18th Dec 8am PST (4pm - 4pm GMT)
            </>
          ) : checkIfAuctionFinished() ? (
            'Our 1/1 collective NFT was auctioned on SuperRare and raised 3.33ETH to fuel awakening.'
          ) : (
            'Make a bid for our 1/1 collective NFT on SuperRare and have your chance to fuel awakening'
          )}
        </div>

        <div
          className={styles.videoContainer}
          dangerouslySetInnerHTML={{
            __html: `
          <video
            loop
            muted
            autoplay
            playsinline
            class="${styles.auctionVideo}"
          ><source src="${auctionLogo}" type="video/mp4" /> </video>
        `,
          }}
        ></div>
      </div>
    </header>
  )
}

export default TreasuryHeader
