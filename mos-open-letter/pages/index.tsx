/* eslint-disable no-console */
import * as React from 'react'
import favicon from './@assets/images/fav.png'
import Head from 'next/head'
import Footer from './@components/openletter/footer'
import Header from './@components/openletter/header'
import Content from './@components/openletter/content'
import Community from './@components/openletter/community'
import Signatures from './@components/openletter/signatures'
import DownloadSection from './@components/@material/downloadSection'
import OatSection from './@components/@material/oatSection'
import styles from './index.module.scss'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Web3Modal from 'web3modal'
import { providers } from 'ethers'
import {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useMemo,
  useRef,
} from 'react'

import bounceVideo from './@assets/video/bounce.mp4'
import bellSound from './@assets/music/bell.mp4'
import stick from './@assets/images/stick.svg'
import arrow from './@assets/images/arrow.svg'
import verified from './@assets/images/Twitter-Verified.svg'
import ellipse from './@assets/images/ellipse-black.svg'
import discord from './@assets/images/discord-icon.svg'
import tvSection from './@assets/images/tvSection.svg'
import { getEnsName } from '../util/ens'
import { TwitterShareButton } from 'next-share'
import { isMobile } from 'react-device-detect'
import Script from 'next/script'
import mixpanel from 'mixpanel-browser'
import signMessages from '../lib/signMessage'
import store from '../lib/store'
import storeSign from '../lib/storeSign'
import { scroller } from 'react-scroll'

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY
const GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN

mixpanel.init(MIXPANEL_TOKEN, { debug: true })

const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'Web 3 Modal', // Required
      infuraId: INFURA_KEY, // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_KEY,
    },
  },
}

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions,
  })
}

type StateType = {
  signature?: string | null
  address?: string | null
  twtSignature?: string | null
  tweetVerified?: boolean | false
  errorMsg?: string | null
  isConnected?: boolean | false
}

type ActionType =
  | {
      type: 'SET_SIGNATURE'
      signature?: string
      address?: string
      twtSignature?: string
    }
  | {
      type: 'RESET'
    }
  | {
      type: 'TWEET_POST'
      twtSignature?: string
    }
  | {
      type: 'TWEET_VERIFIED'
      tweetVerified?: boolean
      twtSignature?: string
    }
  | {
      type: 'VERIFICATION_FAILURE'
      errorMsg?: string
    }
  | {
      type: 'WALLET_CONNECTED'
      isConnected?: boolean
    }

const initialState: StateType = {
  isConnected: false,
  signature: null,
  address: null,
  twtSignature: null,
  tweetVerified: false,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_SIGNATURE':
      return {
        ...state,
        signature: action.signature,
        address: action.address,
        twtSignature: action.twtSignature,
      }
    case 'TWEET_POST':
      return {
        ...state,
        twtSignature: action.twtSignature,
      }
    case 'TWEET_VERIFIED':
      return {
        ...state,
        tweetVerified: action.tweetVerified,
        twtSignature: action.twtSignature,
      }
    case 'VERIFICATION_FAILURE':
      return {
        ...state,
        errorMsg: action.errorMsg,
      }
    case 'WALLET_CONNECTED':
      return {
        ...state,
        isConnected: action.isConnected,
      }
    case 'RESET':
      return initialState

    default:
      throw new Error()
  }
}

const Address: React.FunctionComponent<{ address: string }> = ({
  address,
}: {
  address: string
}) => {
  const [ensName, setEnsName] = useState<string | null>(null)

  useEffect(() => {
    getEnsName(address).then((name) => {
      if (name) {
        setEnsName(name.name)
      } else {
        setEnsName(
          address.substr(0, 4) +
            '...' +
            address.substr(address.length - 4, address.length)
        )
      }
    })
  }, [address])

  return <>{ensName}</>
}

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

const playAudio = () => {
  new Audio(bellSound).play()
}

interface scrollProps {
  pendingScroll: any
  updatePendingScroll: any
}

interface signatureProps {
  signature: any
  updateSignature: any
}

export const Home = (): JSX.Element => {
  const [signerCount, setSignerCount] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  const [deviceType, setDeviceType] = useState('')
  const signRef = useRef(null)
  const signatureRef = useRef(null)
  const {
    signature,
    address,
    twtSignature,
    tweetVerified,
    errorMsg,
    isConnected,
  } = state
  const scrollTo = store((state: scrollProps) => state.pendingScroll)
  const updateScrollTo = store(
    (state: scrollProps) => state.updatePendingScroll
  )

  const updateSignature = storeSign(
    (state: signatureProps) => state.updateSignature
  )

  useEffect(() => {
    if (scrollTo !== '') {
      setTimeout(() => {
        scroller.scrollTo(scrollTo, {
          duration: 500,
          delay: 0,
          smooth: 'easeInOutQuart',
        })

        updateScrollTo('')
      }, 500)
    }
  }, [])

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

  const onFetchSignerCount = useCallback(async () => {
    const response = await fetch(`/api/signerCount`)
    const data = await response.json()
    setSignerCount(data)
  }, [])

  const onAddSigner = useCallback(async (addr, signature) => {
    const ensName = await getEnsName(addr)

    await fetch(`/api/signers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        from: 'interface',
      },
      body: JSON.stringify({
        address: addr,
        signature,
        ens: ensName ? ensName.name : null,
      }),
    }).then(
      (response) => {
        console.log('success', response)
      },
      (error) => console.log(error)
    )
  }, [])

  useEffect(() => {
    onFetchSignerCount()
  })

  const connectWallet = useCallback(async () => {
    const provider = await web3Modal.connect().catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Could not get a wallet connection', error)
      return
    })

    if (provider) {
      dispatch({
        type: 'WALLET_CONNECTED',
        isConnected: true,
      })
    }
  }, [])

  const signLetter = useCallback(
    async function () {
      const provider = await web3Modal.connect().catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Could not get a wallet connection', error)
        return
      })

      if (!provider) {
        dispatch({ type: 'RESET' })
        return
      } else {
        dispatch({
          type: 'WALLET_CONNECTED',
          isConnected: true,
        })
      }

      const web3Provider = new providers.Web3Provider(provider)

      const signer = web3Provider.getSigner()
      const addr = await signer.getAddress()

      const sign = await signer.signMessage(signMessages).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Could not sign message', error)
        return
      })

      if (!sign) {
        dispatch({ type: 'RESET' })
        return
      }

      mixpanel.people.set({
        name: addr,
      })

      mixpanel.track('click:signed', {
        addr: addr,
        signature: sign,
      })

      onAddSigner(addr, sign)

      dispatch({
        type: 'SET_SIGNATURE',
        signature: sign,
        address: addr,
      })

      signatureRef.current.scrollIntoView()

      // set cookies for signature and address
      document.cookie = `signature=${sign}`
      document.cookie = `address=${addr}`
      updateSignature(sign)
    },
    [onAddSigner, updateSignature]
  )

  const signTwitter = useCallback(async function () {
    dispatch({
      type: 'TWEET_POST',
      twtSignature: 'Verify tweet',
    })

    mixpanel.track('click:verify-tweet', {
      addr: address,
    })
  }, [])

  const onSignatureInCookies = useCallback(() => {
    const cookies = document.cookie.split(';')
    const signatureCookie = cookies.find((cookie) =>
      cookie.includes('signature')
    )
    const addressCookie = cookies.find((cookie) => cookie.includes('address'))
    if (signatureCookie && addressCookie) {
      const signature = signatureCookie.split('=')[1]
      const address = addressCookie.split('=')[1]
      dispatch({
        type: 'SET_SIGNATURE',
        signature,
        address,
      })
      return true
    }
    return false
  }, [])

  const onTwittInCookies = useCallback(() => {
    const cookies = document.cookie.split(';')
    const twittCookie = cookies.find((cookie) =>
      cookie.includes('tweetVerified')
    )
    if (twittCookie) {
      const isVerified = twittCookie.split('=')[1]
      dispatch({
        type: 'TWEET_VERIFIED',
        twtSignature: 'Verified',
        tweetVerified: isVerified == 'verified' ? true : false,
      })
      return true
    }
    return false
  }, [])

  const completeTweet = () => {
    dispatch({
      type: 'TWEET_VERIFIED',
      twtSignature: 'Verified',
      tweetVerified: true,
    })

    signatureRef.current.scrollIntoView()

    document.cookie = `tweetVerified=verified`
    mixpanel.track('action:twitter-verified', {
      addr: address,
    })
  }

  // const verifyTweet = useCallback(async (signature) => {
  //   dispatch({
  //     type: 'TWEET_POST',
  //     twtSignature: 'Verifying...',
  //   })

  //   dispatch({
  //     type: 'VERIFICATION_FAILURE',
  //     errorMsg: '',
  //   })

  //   await delay(3000)

  //   await fetch(`/api/tweet-verify?query=${signature}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(
  //     (response) => {
  //       if (response.status === 200) {
  //         response.json().then((res) => {
  //           if (res.isVerified) {
  //             dispatch({
  //               type: 'TWEET_VERIFIED',
  //               twtSignature: 'Verified',
  //               tweetVerified: res.isVerified,
  //             })

  //             signatureRef.current.scrollIntoView()

  //             document.cookie = `tweetVerified=verified`
  //             mixpanel.track('action:twitter-verified', {
  //               addr: address,
  //             })
  //           } else {
  //             dispatch({
  //               type: 'VERIFICATION_FAILURE',
  //               errorMsg:
  //                 'Verification Failed: If you haven’t shared on Twitter, please do so first.\n If you have shared on Twitter please wait 5 seconds and try again',
  //             })

  //             dispatch({
  //               type: 'TWEET_POST',
  //               twtSignature: 'Verify tweet',
  //             })
  //           }
  //         })
  //       }
  //     },
  //     // eslint-disable-next-line no-console
  //     (error) => console.log('An error occurred.', error)
  //   )
  // }, [])

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet()
    }
    if (web3Modal.cachedProvider && !signature) {
      if (!onSignatureInCookies()) {
        signLetter()
      }
      onTwittInCookies()
    }
  }, [signLetter, signature, onSignatureInCookies, onTwittInCookies])

  const twitterContent = useMemo(() => {
    const skipSigns =
      signature != null
        ? signature.substring(0, 50) +
          '...' +
          signature.substr(signature.length - 50, signature.length)
        : signature
    return (
      'I’m supporting wellbeing in web3 🤍\n\n' +
      'Join the movement & sign the open letter\n' +
      `https://openletter.momentsofspace.com\n\n` +
      '@momentsofspace\n\n' +
      `Signed: ${skipSigns}\n\n`
    )
  }, [signature])

  return (
    <>
      <Head>
        <title>Moments of Space - Open Letter</title>
        <link rel="icon" href={favicon.src} />
      </Head>
      {/* <Script
        src="https://cdn.cookie-script.com/s/e2bc69f1a589374b864686c5669ce9e9.js"
        strategy="lazyOnload"
      /> */}

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <div className={styles.signOpenLetter} ref={signRef}>
        <Header signerCount={signerCount} />
        <Content />
        <main className="max-w-7xl mx-auto pb-14 px-4">
          <div className={styles.section}>
            {signature && isConnected ? (
              <div
                className={styles.signatureSection}
                id="joinUs"
                ref={signatureRef}
              >
                <div className={styles.signatureMiniHeading}>
                  Thank you for supporting wellbeing in web3
                </div>
                <div className={styles.signatureHeading}>
                  {tweetVerified
                    ? 'Let the wellbeing revolution begin'
                    : 'Help us boost the wellbeing revolution by sharing your pledge'}
                </div>
                <div className={styles.signatureStatus}>
                  {isMobile && (
                    <div>
                      <div className={styles.round}>
                        <img
                          src={stick.src}
                          alt="MOS stick"
                          className="h-3 w-auto"
                        />
                      </div>
                      <div className={styles.signatureStickCaption}>
                        Connect wallet
                      </div>
                    </div>
                  )}

                  {isMobile && <hr className={styles.divider} />}
                  <div>
                    <div className={styles.round}>
                      <img
                        src={stick.src}
                        alt="MOS stick"
                        className="h-3 w-auto"
                      />
                    </div>
                    <div className={styles.signatureStickCaption}>
                      Sign open letter
                    </div>
                  </div>
                  <hr className={styles.divider} />
                  <div>
                    <div className={styles.round}>
                      {tweetVerified ? (
                        <img
                          src={stick.src}
                          alt="MOS stick"
                          className="h-3 w-auto"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={styles.signatureStickCaption}>
                      Share signing
                    </div>
                  </div>
                </div>

                <div className={styles.signatureSubTitle}>Your Signature</div>
                <div className={styles.signatureArea}>
                  <div className={styles.signature}>{signature}</div>
                </div>
                <div className={styles.signatureAddress}>
                  — <Address address={address} />
                </div>
                <div className={styles.signatureFooter}>
                  {tweetVerified ? (
                    <span></span>
                  ) : (
                    'Share your support on Twitter and be eligible for future surprises 👀'
                  )}
                </div>
                {!tweetVerified && errorMsg && (
                  <div className={styles.alert} role="alert">
                    {errorMsg}
                  </div>
                )}

                {tweetVerified ? (
                  isMobile ? (
                    <div className={styles.tvSection}>
                      <img
                        src={tvSection.src}
                        className="h-auto w-full mt-6 mx-auto"
                      />
                    </div>
                  ) : (
                    <div className={styles.tvSectionBottom}>
                      <img
                        src={verified.src}
                        className="h-6 w-auto my-6 mx-auto"
                      />
                    </div>
                  )
                ) : (
                  <div className="flex flex-col justify-center items-center gap-0 mt-8 sm:flex-row sm:justify-center sm:items-center">
                    <div className="mt-0">
                      <div className={styles.signatureFooter}> Step 01:</div>
                      <TwitterShareButton
                        url={
                          'https://twitter.com/momentsofspace/status/1630909109548531716'
                        }
                        title={twitterContent}
                        onShareWindowClose={() => {
                          signTwitter()
                        }}
                      >
                        <button
                          className={styles.button}
                          onClick={() => {
                            mixpanel.track('click:share-twitter', {
                              addr: address,
                            })
                          }}
                        >
                          Share on twitter
                        </button>
                      </TwitterShareButton>
                    </div>

                    <img
                      src={arrow.src}
                      alt="Arrow Img"
                      className="h-3 w-auto mx-4 mt-6 sm:mt-5 transform rotate-90 sm:rotate-0"
                    />

                    <div className="mt-8 sm:mt-0">
                      <div className={styles.signatureFooter}> Step 02:</div>
                      {twtSignature ? (
                        <button
                          className={styles.buttonPadding}
                          onClick={() => {
                            completeTweet()
                          }}
                        >
                          Complete
                        </button>
                      ) : (
                        <button disabled className={`${styles.buttonDisabled}`}>
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {tweetVerified && (
                  <>
                    <div className={styles.signatureFooterText}>
                      Thank you for signing our Open Letter!{' '}
                      {isMobile && (
                        <>
                          <br /> <br />
                        </>
                      )}{' '}
                      Follow us on Twitter or jump in our Discord to join the
                      community and stay updated.
                    </div>
                  </>
                )}
              </div>
            ) : isMobile ? (
              isConnected ? (
                <div className={styles.signatureSection} id="joinUs">
                  <div className={styles.signatureMiniHeading}>Join us</div>
                  <div className={styles.signatureHeading}>
                    You can now pledge your commitment
                  </div>
                  <div className={styles.signatureStatus}>
                    <div>
                      <div className={styles.round}>
                        <img
                          src={stick.src}
                          alt="MOS stick"
                          className="h-3 w-auto"
                        />
                      </div>
                      <div className={styles.signatureStickCaption}>
                        Connect wallet
                      </div>
                    </div>
                    <hr className={styles.divider} />
                    <div>
                      <div className={styles.round} />
                      <div className={styles.signatureStickCaption}>
                        Sign open letter
                      </div>
                    </div>
                    <hr className={styles.divider} />
                    <div>
                      <div className={styles.round} />
                      <div className={styles.signatureStickCaption}>
                        Share signing
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.signatureMiniSignHeading}`}>
                    Please below to sign the open letter
                  </div>
                  <button
                    className={styles.buttonSign}
                    onClick={() => {
                      playAudio()
                      signLetter()
                    }}
                  >
                    Sign the Open Letter
                  </button>
                </div>
              ) : (
                <div className={styles.signatureSection} id="joinUs">
                  <div className={styles.signatureMiniHeading}>Join us</div>
                  <div className={styles.signatureHeading}>
                    Pledge to revolutionise wellbeing in web3
                  </div>

                  <div className="flex justify-center items-center">
                    <AutoplayVideo classNames={styles.signatureVideo} />
                    <button
                      className={styles.buttonSignCenter}
                      onClick={() => {
                        connectWallet()
                      }}
                    >
                      Connect Wallet
                    </button>
                  </div>

                  <div className={styles.signatureMiniHeading}>
                    To sign the Open Letter please start by connecting your
                    wallet
                  </div>
                </div>
              )
            ) : (
              <div className={styles.signatureSection} id="joinUs">
                <div className={styles.signatureMiniHeading}>Join us</div>
                <div className={styles.signatureHeading}>
                  Pledge to join our supported path to presence
                </div>
                <div className="flex justify-center items-center">
                  <AutoplayVideo classNames={styles.signatureVideo} />
                  <button
                    className={styles.buttonSignCenter}
                    onClick={() => {
                      playAudio()
                      signLetter()
                    }}
                  >
                    Sign the Open Letter
                  </button>
                </div>
              </div>
            )}
          </div>
          <OatSection />
          <DownloadSection />

          {tweetVerified && (
            <div className={styles.discordSection}>
              <img
                src={discord.src}
                alt="discord Img"
                className="h-8 w-auto mb-4 mx-auto"
              />

              <div className={styles.mobileText}>
                Join our Discord community
              </div>

              <div className="flex flex-col justify-center items-center gap-0 mt-4 md:flex-row md:justify-center md:items-center">
                <div className={styles.discordSubTitle}>
                  {deviceType == 'Android'
                    ? 'Get updates for incoming rewards'
                    : 'Learn about upcoming rewards'}
                </div>
                <img
                  src={ellipse.src}
                  alt="ellipse Img"
                  className="h-2 w-auto mx-3 my-3 md:my-auto"
                />
                <div className={styles.discordSubTitle}>
                  {deviceType == 'Android'
                    ? 'Recieve special roles'
                    : 'Listen to live meditations'}
                </div>
                <img
                  src={ellipse.src}
                  alt="ellipse Img"
                  className="h-2 w-auto mx-3 my-3 md:my-auto"
                />
                <div className={styles.discordSubTitle}>
                  {deviceType == 'Android'
                    ? 'Meet other mindful co-members'
                    : 'Receive OAT’s & special roles'}
                </div>
              </div>
              <a
                href="https://discord.com/invite/CcjRumb5uv"
                rel="noreferrer"
                target="_blank"
              >
                <button
                  className={styles.buttonDiscord}
                  onClick={() => {
                    mixpanel.track('click:discord', {
                      addr: address,
                    })
                  }}
                >
                  Join Discord
                </button>
              </a>
            </div>
          )}
        </main>
        <Community />
        <Signatures
          signature={signature}
          address={address}
          signerCount={signerCount}
        />
      </div>
      <Footer />
    </>
  )
}

export default Home
