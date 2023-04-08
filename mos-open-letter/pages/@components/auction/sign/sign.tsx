/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styles from '../../../index.module.scss'
import { Link } from 'react-scroll'
import { useRouter } from 'next/router'
import store from '../../../../lib/store'
import {
  checkIfAuction,
  checkIfAuctionFinished,
} from '../../../../lib/auctionDate'

interface scrollProps {
  pendingScroll: any
  updatePendingScroll: any
}

const Sign = () => {
  const router = useRouter()
  const updateScrollTo = store(
    (state: scrollProps) => state.updatePendingScroll
  )
  const goToScroll = (scrollTo) => {
    if (location.pathname != '/') {
      updateScrollTo(scrollTo)
      router.push('/')
    }
  }
  return (
    <div className={`${styles.content} max-w-7xl mx-auto`}>
      <div className={styles.tSignSection}>
        <p className={styles.tSignSection__title}>
          {checkIfAuction() || checkIfAuctionFinished() ? (
            'Sign the Open Letter to gain access to the proposal page from Jan 5th'
          ) : (
            <>
              Sign the Open Letter to have your voice represented in the 1/1
              NFT,
              <br />
              and to gain access the proposal page from Jan 5th
            </>
          )}
        </p>

        <Link
          className={styles.tSignSection__btn}
          smooth={true}
          duration={500}
          spy={true}
          to={'joinUs'}
          onClick={() => {
            goToScroll('joinUs')
          }}
        >
          Sign the Open Letter
        </Link>
      </div>
    </div>
  )
}

export default Sign
