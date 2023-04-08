import { FunctionComponent } from 'react'
import styles from '../../../index.module.scss'
import discord from '../../../@assets/images/Discord.svg'
import instagram from '../../../@assets/images/Instagram.svg'
import linkedin from '../../../@assets/images/LinkedIn.svg'
import tiktoc from '../../../@assets/images/TikToc.svg'
import twitter from '../../../@assets/images/Twitter.svg'

const SocialLinks: React.FunctionComponent<{ classNames: string }> = ({
  classNames,
}: {
  classNames: string
}) => {
  return (
    <div
      className={`${classNames} flex flex-row lg:flex-row justify-center items-center gap-1 sm:justify-between sm:items-start sm:grow sm:shrink sm:basis-0`}
    >
      <a
        href="https://www.linkedin.com/company/moments-of-space"
        rel="noreferrer"
        target="_blank"
      >
        <img src={linkedin.src} className="h-12 sm:h-16 w-auto " />
      </a>
      <a
        href="https://mobile.twitter.com/momentsofspace"
        rel="noreferrer"
        target="_blank"
      >
        <img src={twitter.src} className="h-12 sm:h-16 w-auto" />
      </a>
      <a
        href="https://www.instagram.com/momentsofspace"
        rel="noreferrer"
        target="_blank"
      >
        <img src={instagram.src} className="h-12 sm:h-16 w-auto" />
      </a>
      <a
        href="https://vm.tiktok.com/ZMNj6dywE"
        rel="noreferrer"
        target="_blank"
      >
        <img src={tiktoc.src} className="h-12 sm:h-16 w-auto" />
      </a>
      <a
        href="https://discord.com/invite/CcjRumb5uv"
        rel="noreferrer"
        target="_blank"
      >
        <img src={discord.src} className="h-12 sm:h-16 w-auto" />
      </a>
    </div>
  )
}

const ExternalLinks: FunctionComponent = () => {
  return (
    <div className="flex flex-col lg:flex-col justify-center items-center gap-1 lg:flex-col lg:justify-between lg:items-end lg:grow lg:shrink lg:basis-0  lg:mx-2">
      <a
        href="https://www.momentsofspace.com/faqs"
        rel="noreferrer"
        target="_blank"
      >
        FAQS
      </a>
      <a
        href="https://www.momentsofspace.com/news"
        rel="noreferrer"
        target="_blank"
      >
        Newsletter
      </a>
      <a
        href="https://www.momentsofspace.com/website-privacy-policy"
        rel="noreferrer"
        target="_blank"
      >
        Privacy Policy
      </a>
      <a
        href="https://www.momentsofspace.com/website-terms-and-conditions"
        rel="noreferrer"
        target="_blank"
      >
        Terms & Conditions
      </a>
    </div>
  )
}

const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col-reverse justify-center items-center lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center items-center gap-1 lg:flex-col lg:justify-between lg:items-start lg:grow lg:shrink lg:basis-0 lg:mx-2 mt-6 lg:my-auto">
          <p>© 2023 Moments of Space Ltd </p>
          <p>community@momentsofspace.com</p>
          <p className={styles.laptopShow}> Company No. 12173633</p>
        </div>

        <SocialLinks classNames={styles.laptopShow} />
        <ExternalLinks />

        <div
          className={`${styles.mobileShow} mt-6 mb-6 flex flex-col justify-center items-center lg:flex-row lg:justify-between`}
        >
          <a
            href="https://www.momentsofspace.com/"
            rel="noreferrer"
            target="_blank"
          >
            Go to website
          </a>
        </div>

        <div
          className={`${styles.mobileShow} mt-6 flex flex-col justify-center items-center lg:flex-row lg:justify-between`}
        >
          <a
            href="https://apps.apple.com/gb/app/moments-of-space/id1576497070"
            rel="noreferrer"
            target="_blank"
          >
            Download the IOS app
          </a>
        </div>

        <SocialLinks classNames={styles.mobileShow} />
      </div>
    </footer>
  )
}

export default Footer
