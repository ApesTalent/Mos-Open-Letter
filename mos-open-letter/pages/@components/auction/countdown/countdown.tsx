/* eslint-disable no-console */
import { FunctionComponent, useEffect } from 'react'
import styles from '../../../index.module.scss'
import { useState, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import telegram from '../../../@assets/images/telegram.svg'
import greyTick from '../../../@assets/images/greyTick.svg'
import { preAuction } from '../../../../lib/auctionDate'

const Countdown: FunctionComponent = () => {
  const onAddEmail = async () => {
    if (isValidEmail(email)) {
      setErrorMsg('')
      emailRef.current.style.borderColor = '#c0c0c0'

      await fetch(`/api/proposals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          from: 'interface',
        },
        body: JSON.stringify({
          address: email,
        }),
      }).then(
        (response) => {
          console.log('success', response)
          emailRef.current.style.color = '#c0c0c0'
          setIsSent(true)
        },
        (error) => console.log(error)
      )
    } else {
      setErrorMsg(
        'Incorrect email format: Please update email with the correct format'
      )
      emailRef.current.style.borderColor = '#EE0F27'
    }
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const useCountdown = () => {
    const countDownDate = new Date(preAuction).getTime()

    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    )

    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime())
      }, 1000)

      return () => clearInterval(interval)
    }, [countDownDate])

    return getReturnValues(countDown)
  }

  const getReturnValues = (countDown) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

    return [days, hours, minutes, seconds]
  }

  const [days, hours, minutes, seconds] = useCountdown()
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const emailRef = useRef(null)
  return (
    <div className={`${styles.content} max-w-7xl mx-auto`}>
      <div className={styles.countdownSection}>
        <p className={styles.countdownSection__title}> The countdown is on</p>
        <p className={styles.countdownSection__subtitle}> Auction open in...</p>

        <div className={styles.countdownSection__counter}>
          <div className={styles.countdownSection__counter__days}>
            <div className={styles.countdownSection__counter__number}>
              {days}
            </div>
            <div
              className={`${styles.countdownSection__counter__caption} text-right lg:pr-2 pr-1`}
            >
              Days
            </div>
          </div>
          <div className={styles.countdownSection__counter__divider}> | </div>

          <div className={styles.countdownSection__counter__hours}>
            <div className={styles.countdownSection__counter__number}>
              {hours}
            </div>
            <div
              className={`${styles.countdownSection__counter__caption} text-right lg:pr-2 pr-1`}
            >
              Hours
            </div>
          </div>
          <div className={styles.countdownSection__counter__divider}> | </div>
          <div className={styles.countdownSection__counter__mins}>
            <div className={styles.countdownSection__counter__number}>
              {minutes}
            </div>
            <div
              className={`${styles.countdownSection__counter__caption} text-right lg:pr-2 pr-1`}
            >
              Mins
            </div>
          </div>
          <div className={styles.countdownSection__counter__divider}> | </div>
          <div className={styles.countdownSection__counter__secs}>
            <div className={styles.countdownSection__counter__number}>
              {seconds}
            </div>
            <div
              className={`${styles.countdownSection__counter__caption} text-right lg:pr-2 pr-1`}
            >
              Secs
            </div>
          </div>
        </div>

        <p className={styles.countdownSection__text}>
          {isSent ? (
            <>
              <b>Thank you for submitting your email.</b> We will send you
              reminders so you can be ready to join the auction and keep up to
              date with proposal submission and voting details.
            </>
          ) : (
            'Drop your email below and we’ll send you a reminder when the proposal page and voting opens'
          )}
        </p>
        <div className={styles.countdownSection__email}>
          <div
            className={
              isSent
                ? styles.countdownSection__email__title__disable
                : styles.countdownSection__email__title
            }
          >
            Email:
          </div>
          <div className={styles.countdownSection__email__section}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-4 pt-1 pb-1"
              placeholder="name@example.com"
              ref={emailRef}
              disabled={isSent}
            />
            {isSent ? (
              <div className={styles.buttonTelegram__disabled}>
                <img
                  src={greyTick.src}
                  alt="telegram icon"
                  className="h-8 w-auto"
                />
              </div>
            ) : (
              <div
                className={styles.buttonTelegram}
                onClick={() => onAddEmail()}
              >
                {isMobile ? (
                  'Send email'
                ) : (
                  <img
                    src={telegram.src}
                    alt="telegram icon"
                    className="h-4 w-auto"
                  />
                )}
              </div>
            )}
          </div>

          {errorMsg && (
            <div className={styles.alert__mail} role="alert">
              {errorMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Countdown
