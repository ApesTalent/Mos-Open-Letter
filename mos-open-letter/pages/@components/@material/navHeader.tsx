/* eslint-disable no-console */
import styles from '../../index.module.scss'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import blackText from '../../@assets/images/logo_text_black.svg'
import logo from '../../@assets/images/logo.png'
import greyLogo from '../../@assets/images/logo_white.png'
import greyText from '../../@assets/images/logo_text_grey.svg'

interface navHeaderProps {
  pageIndex: any
}

export const NavHeader = ({ pageIndex }: navHeaderProps) => {
  const router = useRouter()
  const cRef = useRef(null)

  return (
    <div>
      <div className={`${styles.header__menu} ${styles.mobileShow}`}>
        <label>
          <input type="checkbox" ref={cRef} />
          <span className={styles.menu}>
            <span className={styles.hamburger}></span>
          </span>
          <ul>
            <li>
              <a
                href="#"
                onClick={() => {
                  cRef.current.checked = false
                  router.push('/')
                }}
              >
                Open Letter
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  cRef.current.checked = false
                  router.push('/auction')
                }}
              >
                NFT Auction
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  cRef.current.checked = false
                  router.push('/treasury')
                }}
              >
                Treasury
              </a>
            </li>
          </ul>
        </label>
      </div>

      <div
        className={`pt-6 pb-1 sm:pb-16 px-4 lg:flex-row lg:justify-between flex flex-col justify-center items-center gap-6`}
      >
        <a
          href="https://www.momentsofspace.com"
          className="flex items-center lg:flex-row lg:justify-between flex-col "
        >
          <img
            src={pageIndex == 0 ? logo.src : greyLogo.src}
            alt="MOS Logo"
            className="lg:mx-2 my-2 h-9 w-auto"
          />
          <img
            src={pageIndex == 0 ? blackText.src : greyText.src}
            alt="MOS Logo"
            className="lg:mx-2 my-2 h-auto w-48"
          />
        </a>

        <div
          className={`${styles.laptopShow} flex justify-between items-center`}
        >
          <div
            className={
              pageIndex == 0
                ? styles.header__letterBtn
                : styles.header__letterBtn__disable
            }
            onClick={() => {
              router.push('/')
            }}
          >
            Open letter
          </div>
          <div
            className={
              pageIndex == 2
                ? styles.header__treasuryBtn
                : styles.header__treasuryBtn__disable
            }
            onClick={() => {
              router.push('/auction')
            }}
          >
            NFT Auction
          </div>
          <div
            className={
              pageIndex == 1
                ? styles.header__treasuryBtn
                : styles.header__treasuryBtn__disable
            }
            onClick={() => {
              router.push('/treasury')
            }}
          >
            Treasury
          </div>
        </div>
      </div>
    </div>
  )
}
export default NavHeader
