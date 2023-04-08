/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styles from '../../../index.module.scss'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import number0 from '../../../@assets/images/number0.svg'
import number1 from '../../../@assets/images/number1.svg'
import arrow from '../../../@assets/images/Arrow2.svg'
import { isMobile } from 'react-device-detect'
import { checkIfAuctionFinished } from '../../../../lib/auctionDate'
import { useEffect, useRef } from 'react'
const responsiveSettings = [
  {
    breakpoint: 850,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
]

const Roadmap = () => {
  const slideRef = useRef(null)
  useEffect(() => {
    if (isMobile && checkIfAuctionFinished()) {
      slideRef.current.goTo(2)
    }
  }, [])
  return (
    <div className={`${styles.content} max-w-7xl mx-auto mt-8 lg:mt-16`}>
      <div className="lg:-mr-8 mr-0 ">
        <Slide
          indicators={isMobile ? true : false}
          responsive={responsiveSettings}
          arrows={false}
          autoplay={false}
          canSwipe={isMobile ? true : false}
          ref={slideRef}
        >
          <div className="step1 h-full flex justify-center items-center">
            <div className={`h-auto lg:w-[calc(100%-2.5rem)] w-5/6`}>
              <img
                src={checkIfAuctionFinished() ? number0.src : number1.src}
                alt="number1"
                className={styles.roadmap__card__number}
              />
              <div
                className={
                  checkIfAuctionFinished()
                    ? styles.roadmap__bCard
                    : styles.roadmap__card
                }
              >
                <p
                  className={
                    checkIfAuctionFinished()
                      ? styles.roadmap__bCard__title
                      : styles.roadmap__card__title
                  }
                >
                  {checkIfAuctionFinished() ? (
                    <> 16th - 18th Dec</>
                  ) : (
                    <> Now - 18th Dec</>
                  )}
                </p>
                <p
                  className={
                    checkIfAuctionFinished()
                      ? styles.roadmap__bCard__subtitle
                      : styles.roadmap__card__subtitle
                  }
                >
                  {checkIfAuctionFinished() ? (
                    <>
                      NFT Auction <br />
                      Closed
                    </>
                  ) : (
                    <>
                      Be Part of the <br /> 1/1 NFT & Auction
                    </>
                  )}
                </p>
                <p
                  className={
                    checkIfAuctionFinished()
                      ? styles.roadmap__bCard__text
                      : styles.roadmap__card__text
                  }
                >
                  {checkIfAuctionFinished() ? (
                    <>
                      Our 1/1 NFT, designed by Josh Pierce, was auctioned on
                      SuperRare. All proceeds from the sale have gone into our
                      community treasury to help fund our first ever grant
                      round.
                    </>
                  ) : (
                    <>
                      Sign before Dec 16th to have your voice represented in a
                      special 1/1 NFT designed by Josh Pierce. The NFT will be
                      auctioned and all proceeds from the sale will go into our
                      community treasury.
                    </>
                  )}{' '}
                  See more info about the <a href="/auction">auction here</a>.
                </p>
              </div>
            </div>

            <img
              src={arrow.src}
              alt="arrow"
              className="lg:block hidden w-10 h-auto p-2"
            />
          </div>
          <div className="step2 h-full flex justify-center items-center">
            <div className={`h-auto lg:w-[calc(100%-2.5rem)] w-5/6`}>
              <img
                src={number0.src}
                alt="number2"
                className={styles.roadmap__card__number}
              />
              <div className={styles.roadmap__bCard}>
                <p className={styles.roadmap__bCard__title}>5th - 19th Jan</p>
                <p className={styles.roadmap__bCard__subtitle}>
                  Grant <br /> Round
                </p>
                <p className={styles.roadmap__bCard__text}>
                  We called on coders and creators to submit proposals that
                  helped to expand the MoS ecosystem. We were looking for
                  innovative ways to spark radical change, and we were blown
                  away by the quality of proposals that we received.
                </p>
              </div>
            </div>
            <img
              src={arrow.src}
              alt="arrow"
              className="lg:block hidden w-10 h-auto p-2"
            />
          </div>
          <div className="step3 h-full flex lg:justify-start justify-center items-center">
            <div className={`h-auto lg:w-[calc(100%-2.5rem)] w-5/6`}>
              <img
                src={number0.src}
                alt="number3"
                className={styles.roadmap__card__number}
              />
              <div className={styles.roadmap__bCard}>
                <p className={styles.roadmap__bCard__title}>
                  26th Jan - 2nd Feb
                </p>
                <p className={styles.roadmap__bCard__subtitle}>
                  Community <br />
                  Voting
                </p>
                <p className={styles.roadmap__bCard__text}>
                  Our selection panel helped to whittle the proposals down to
                  five finalists. We then ran a round of voting on Snapshot, and
                  the community decided who should receive funding. You can find
                  out who the winners are below.
                </p>
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </div>
  )
}

export default Roadmap
