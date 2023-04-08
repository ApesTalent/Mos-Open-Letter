/* eslint-disable no-console */
import styles from '../../index.module.scss'
import { useEffect, useState } from 'react'
import bounceVideo from '../../@assets/video/bounce.mp4'
import iPhone from '../../@assets/images/iPhone.png'
import android from '../../@assets/images/android.png'
import qrCode from '../../@assets/images/qrSubscription.png'
import ellipse from '../../@assets/images/ellipse-black.svg'
import { isMobile } from 'react-device-detect'
import mixpanel from 'mixpanel-browser'
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN

mixpanel.init(MIXPANEL_TOKEN, { debug: true })

const AutoplayVideo: React.FunctionComponent<{ classNames: string }> = ({
  classNames,
}: {
  classNames: string
}) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <video
            loop
            muted
            autoplay
            playsinline
            class="${classNames}"
          ><source src="${bounceVideo}" type="video/mp4" /> </video>
        `,
      }}
    ></div>
  )
}

export const DownloadSection = () => {
  const [deviceType, setDeviceType] = useState('')

  useEffect(() => {
    let hasTouchScreen = false
    let isIOS = false
    let isAndroid = false

    // Only as a last resort, fall back to user agent sniffing
    var UA = navigator.userAgent || navigator.vendor || window.opera
    hasTouchScreen =
      /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
      /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
    if (hasTouchScreen) {
      isIOS = /\b(iPad|iPod|iPhone)\b/i.test(UA)
      isAndroid = /\b(Android)\b/i.test(UA)
    }

    if (isIOS) {
      setDeviceType('IOS')
    } else if (isAndroid) {
      setDeviceType('Android')
    } else if (hasTouchScreen) {
      setDeviceType('Mobile')
    } else {
      setDeviceType('Desktop')
    }
  }, [])

  return (
    <div className={styles.mobileSection}>
      <div className={styles.mobileHeader}>
        {deviceType == 'IOS'
          ? 'Find a moment of space now with our iOS meditation app'
          : deviceType == 'Android'
          ? 'Don’t have an iphone?'
          : 'Find a moment of space now with our iOS meditation app'}
      </div>
      <div className={styles.mobileContent}>
        {deviceType == 'IOS' ? (
          <span>
            As one of our earliest supporters, if you download our app, we will
            remember you!
          </span>
        ) : deviceType == 'Android' ? (
          'We’re in the process of creating an Android app, but in the meantime, why not join our Android waitlist '
        ) : (
          <>
            <p className="mb-4">
              Be one of our earliest supporters. Scan the QR code or click the
              download button to start your meditation journey today
            </p>
          </>
        )}
      </div>

      {deviceType == 'IOS' ? (
        <div className={styles.iPhoneSection}>
          <AutoplayVideo classNames={styles.iPhoneSection__video} />
          <a
            href="https://go.momentsofspace.com/olasdl
        "
            rel="noreferrer"
            target="_blank"
          >
            <button
              className={styles.iPhoneSection__btnIOS}
              onClick={() => {
                mixpanel.track('click:download-app')
              }}
            >
              Download App
            </button>
          </a>
          <img
            src={iPhone.src}
            alt="iPhone Img"
            className={styles.iPhoneSection__iPhone}
          />
        </div>
      ) : deviceType == 'Android' ? (
        <div className={styles.iPhoneSection}>
          <AutoplayVideo classNames={styles.iPhoneSection__video} />
          <a
            href="https://fyw240grf26.typeform.com/to/HABFm12i"
            rel="noreferrer"
            target="_blank"
          >
            <button
              className={styles.iPhoneSection__btnAndroid}
              onClick={() => {
                mixpanel.track('click:android-waitlist')
              }}
            >
              Join Android Waitlist
            </button>
          </a>
          <img
            src={android.src}
            alt="iPhone Img"
            className={styles.iPhoneSection__iPhone}
          />
        </div>
      ) : (
        <div className={styles.iPhoneSection}>
          <AutoplayVideo classNames={styles.iPhoneSection__video} />
          <img
            src={qrCode.src}
            alt="qrCode Img"
            className={styles.iPhoneSection__QR}
          />
          <img
            src={iPhone.src}
            alt="iPhone Img"
            className={styles.iPhoneSection__iPhone}
          />
        </div>
      )}

      {!isMobile && (
        <div>
          <div className={styles.mobileText}>Download the MoS app to:</div>
          <div className="flex flex-row gap-0 mt-4 justify-center items-center">
            <div className={styles.mobileSubTitle}> Learn new skills </div>
            <img
              src={ellipse.src}
              alt="ellipse Img"
              className="h-2 w-auto mx-4 my-3 md:my-auto"
            />
            <div className={styles.mobileSubTitle}>Meditate on the move</div>
            <img
              src={ellipse.src}
              alt="ellipse Img"
              className="h-2 w-auto mx-4 my-3 md:my-auto"
            />
            <div className={styles.mobileSubTitle}>Find clarity and calm</div>
          </div>
          <div className={styles.iPhoneSection__actions}>
            <a
              href="https://apps.apple.com/app/moments-of-space/id1576497070"
              rel="noreferrer"
              target="_blank"
            >
              <button
                className={styles.iPhoneSection__btnIOS}
                onClick={() => {
                  mixpanel.track('click:download-app')
                }}
              >
                Download iOS App
              </button>
            </a>
            <p>Or</p>

            <a
              href="https://fyw240grf26.typeform.com/to/HABFm12i"
              rel="noreferrer"
              target="_blank"
            >
              <button
                className={styles.iPhoneSection__btnAndroid}
                onClick={() => {
                  mixpanel.track('click:android-waitlist')
                }}
              >
                Join Android Waitlist
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
export default DownloadSection
