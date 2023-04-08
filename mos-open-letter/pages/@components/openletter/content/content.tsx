import { FunctionComponent } from 'react'
import styles from '../../../index.module.scss'
import { isMobile } from 'react-device-detect'
import lineSvg from '../../../@assets/images/line.svg'

const Content: FunctionComponent = () => {
  return (
    <div className={`${styles.content} max-w-7xl mx-auto px-4`}>
      <p className={styles.content__paragraph}>
        We’re building a community-powered meditation platform to share the
        benefits of meditation and transform the scale, pace and positive impact
        of awakening.
      </p>

      <p className={styles.content__paragraph}>
        We collaborated with Josh Pierce to create a{' '}
        <a href="/auction" target="_blank">
          1/1 collective NFT
        </a>{' '}
        that raised 3.3ETH at auction. The funds went into the community
        treasury to start our first ever grant round.
      </p>

      <p className={styles.content__paragraph}>
        We asked for innovative ideas to help us find new ways to connect,
        collaborate and meditate together and we were blown away by all the
        proposals we received.
      </p>

      <p className={styles.content__paragraph}>
        Our selection panel whittled down the proposals to five finalists, and
        the community voted on which projects we should fund.
      </p>

      <p className={styles.content__paragraph}>
        Check out the winners{' '}
        <a href="/treasury" target="_blank">
          here
        </a>
        .
      </p>

      <img
        src={lineSvg.src}
        alt="line Img"
        className={`${styles.laptopShow} w-5 h-auto my-12 mx-auto`}
      />

      <p className={styles.content__subtitle}>
        Our Digital Revolution Needs a New Mindset
      </p>
      <p className={styles.content__paragraph}>
        We are at the dawn of a new era, and web3 is just the beginning. As the
        space evolves, it awakens never-ending possibilities. But with the
        energy of innovation comes strain, overwhelm and exhaustion.{' '}
        {isMobile && (
          <>
            <br />
            <br />
          </>
        )}
        To be a meaningful part of this movement, it can feel like we must
        always be on, always connected, always available and always doing.
      </p>

      <p className={styles.content__paragraph}>
        We’re all working together to radically reclaim the web and our digital
        identities, but what if we could, at the same time, revolutionise our
        minds to uplevel our wellbeing?
      </p>

      <div className={styles.content__pink}>
        <p className={styles.content__pink__title}>
          Wellbeing Contradictions in Web3
        </p>
        <p className={styles.content__pink__text}>
          Web3 lets us create and dream without barriers, but limitless
          potential can become all-consuming and burn us out
        </p>
      </div>

      <p className={`${styles.content__rectangle} lg:px-12 px-4`}>
        Hyper-connectivity can make our expansive world feel closer than ever
        but can also leave us feeling isolated and triggered by the pressure of
        FOMO and competition
      </p>

      <p className={`${styles.content__rectangle} lg:px-24 px-4`}>
        This high-stakes world is captivating, but its rapid progress can
        command our attention 24/7, and we forget to reclaim it
      </p>

      <p className={styles.content__paragraph__start}>
        We are here for this movement, but we want to pioneer a new mindset that
        can allow us to bring about radical change while still protecting our
        wellbeing. As we work together to claim digital autonomy, can we reclaim
        autonomy over our mental and emotional states, too?
      </p>

      <p className={styles.content__paragraph}>
        There is a way to become masters of our own minds, habits and emotional
        behaviours so they no longer govern how we feel and how we show up in
        the space.
      </p>
      <p className={styles.content__paragraph}>
        Many of us move through life trapped in our minds, believing we are the
        thoughts in our heads, but we are not. We are the deeper conscious
        presence that can recognise and observe our thoughts.{' '}
        {isMobile && (
          <>
            <br />
            <br />
          </>
        )}
        By delving inwards to better understand our true nature, we can venture
        outwards with reframed mindsets and bring about real, positive change
        together while still staying well.
      </p>

      <div className={styles.content__blue}>
        <p className={styles.content__blue__title}>
          Our Vision for Uplevelled Wellbeing in Web3
        </p>
        <p className={styles.content__blue__text}>
          Reframe our relationship with our minds to help us stay well in the
          space
        </p>
      </div>

      <p className={`${styles.content__rectangle}`}>
        Embrace the power of community to stay connected without isolation
      </p>

      <p className={`${styles.content__rectangle}`}>
        Transform perspectives to doing and being so we can stay busy without
        burnout
      </p>

      <p className={`${styles.content__rectangle}`}>
        Celebrate collective progress so we can all flourish and create without
        FOMO
      </p>

      <p className={styles.content__title} id="ourVision">
        Join us in pledging to power awakening and take better care of our
        individual and collective minds, {!isMobile && <br />} so we can change
        the world from the inside out.
      </p>

      <ul className={styles.content__skip}>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <p className={styles.content__paragraph__margin}>
        Pledge to support the Open Letter by signing with your wallet.
      </p>

      <p className={styles.content__paragraph__margin}>
        Let’s pave the way towards a brighter, more mindful future, together.
      </p>

      <br />
    </div>
  )
}

export default Content
