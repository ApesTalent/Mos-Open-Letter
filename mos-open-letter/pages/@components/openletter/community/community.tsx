/* eslint-disable react/jsx-key */
import { FunctionComponent } from 'react'
import styles from '../../../index.module.scss'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import communityTitle from '../../../@assets/images/communityTitle.png'
import logoSeed from '../../../@assets/images/logoSeed.png'
import logoSeed_mobile from '../../../@assets/images/logoSeed_mobile.png'
import logoShefi from '../../../@assets/images/logoShefi.png'
import logoLido from '../../../@assets/images/logoLido.png'
import logoEth from '../../../@assets/images/logoEth.png'

const companies = [
  {
    name: 'Seed',
    img: logoSeed,
  },
  {
    name: 'Lido',
    img: logoLido,
  },
  {
    name: 'Shefi',
    img: logoShefi,
  },

  {
    name: 'Ethereum',
    img: logoEth,
  },
]

const Community: FunctionComponent = () => {
  const properties = {
    duration: 0,
    transitionDuration: 3000,
    infinite: true,
    slidesToScroll: 1,
    arrows: false,
    slidesToShow: 3,
  }

  return (
    <div className={`${styles.community}`}>
      <div className={styles.community__content}>
        <img
          src={communityTitle.src}
          alt="title Img"
          className={styles.community__content__title}
        />

        <div className={styles.laptopShow}>
          <div className={styles.community__content__list}>
            {companies.map((item) => (
              <img
                src={item.img.src}
                alt="company Img"
                className="object-contain"
              />
            ))}
          </div>
        </div>

        <div
          className={`${styles.community__content__slide} ${styles.mobileShow}`}
        >
          <Slide easing="ease" {...properties}>
            <div className={styles.community__content__slide__seed}>
              <img
                src={logoSeed_mobile.src}
                alt="seed Img"
                className="object-contain"
              />
            </div>
            <div className={styles.community__content__slide__lido}>
              <img
                src={logoLido.src}
                alt="lido Img"
                className="object-contain"
              />
            </div>
            <div className={styles.community__content__slide__shefi}>
              <img
                src={logoShefi.src}
                alt="shefi Img"
                className="object-contain"
              />
            </div>
            <div className={styles.community__content__slide__eth}>
              <img src={logoEth.src} alt="eth Img" className="object-contain" />
            </div>
          </Slide>
        </div>
      </div>
    </div>
  )
}

export default Community
