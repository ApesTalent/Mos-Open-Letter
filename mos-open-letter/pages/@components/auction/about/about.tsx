/* eslint-disable no-console */
import { FunctionComponent } from 'react'
import styles from '../../../index.module.scss'
import {
  checkIfAuction,
  checkIfAuctionFinished,
} from '../../../../lib/auctionDate'

const About: FunctionComponent = () => {
  return (
    <div className={`${styles.content} max-w-7xl mx-auto mt-10`}>
      <div className={styles.auctionSection}>
        <p className={styles.auctionSection__title}>
          {checkIfAuction()
            ? 'Auction now LIVE'
            : checkIfAuctionFinished()
            ? 'Auction Over: Bidding Now Closed'
            : 'About the Auction'}
        </p>
        {checkIfAuctionFinished() && (
          <div className={styles.auctionSection__sold}>
            NFT Sold for: 3.33ETH
          </div>
        )}
        <p className={styles.auctionSection__text}>
          {checkIfAuction()
            ? 'Our incredible 1/1 NFT, designed by Josh Pierce, is being auctioned now on SuperRare. '
            : checkIfAuctionFinished()
            ? 'Our incredible 1/1 NFT, designed by Josh Pierce, was auctioned on SuperRare. '
            : 'Our incredible 1/1 NFT, designed by Josh Pierce, will be auctioned between 16th Dec 8am - 18th Dec 8am PST (4pm - 4pm GMT) on SuperRare. '}
          All proceeds from the sale will go into a treasury that will fund
          projects aligning with our vision, submitted and voted on by our
          community.
        </p>

        <div className="mt-6">
          <div className={`${styles.auctionSection__text}`}>
            {checkIfAuction()
              ? 'Visit the SuperRare auction page here to view the NFT and start bidding!'
              : 'Visit the SuperRare auction page here to view the NFT and find out more.'}
          </div>
          <button
            className={styles.auctionSection__btn}
            onClick={() => {
              console.log('Go to SuperRare Click')
            }}
          >
            <a
              href="https://superrare.com/artwork-v2/spacious-moment-41320"
              target="_blank"
              rel="noreferrer"
            >
              Go to SuperRare
            </a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
