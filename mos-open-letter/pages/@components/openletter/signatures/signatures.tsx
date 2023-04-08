/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
import styles from '../../../index.module.scss'
import line from '../../../@assets/images/longLine.svg'
import avatar from '../../../@assets/images/avatar.svg'
import ReactPaginate from 'react-paginate'
import { useState, useEffect, useRef } from 'react'
interface SignaturesProps {
  signature: string
  address: string
  signerCount: string
}
interface SignItemProps {
  address: string
  created: string
}

const headLinersJson = [
  {
    ens: 'Agnews.eth',
    createdAt: '2022-11-14T16:07:58.903Z',
  },
  {
    ens: 'Oisinkyne.eth',
    createdAt: '2022-10-14T16:07:58.903Z',
  },
  {
    ens: 'Thattallguy.eth',
    createdAt: '2022-08-14T16:07:58.903Z',
  },
  {
    ens: 'Alexfo.eth',
    createdAt: '2022-11-14T16:07:58.903Z',
  },
  {
    ens: 'David everywhere.eth',
    createdAt: '2022-11-09T16:07:58.903Z',
  },
  {
    ens: 'Leesh.eth',
    createdAt: '2022-11-04T16:07:58.903Z',
  },
  {
    ens: 'Quack.eth',
    createdAt: '2022-11-01T16:07:58.903Z',
  },
  {
    ens: 'Lawpanda.eth',
    createdAt: '2022-11-08T16:07:58.903Z',
  },
  {
    ens: 'Andrewsingh.eth',
    createdAt: '2022-11-03T16:07:58.903Z',
  },
]

const getStyledENS = (ens) => {
  const styledENS =
    ens.length > 20
      ? ens.substr(0, 4) + '...' + ens.substr(ens.length - 8, ens.length)
      : ens
  return styledENS
}

const getStyledAddr = (address) => {
  return (
    address.substr(0, 4) +
    '...' +
    address.substr(address.length - 4, address.length)
  )
}

const getStyledDate = (current) => {
  const date = new Date(current)
  const result =
    date.getHours() +
    ':' +
    date.getMinutes() +
    ' - ' +
    (date.getMonth() + 1) +
    '.' +
    date.getDate() +
    '.' +
    date.getFullYear()
  return result
}

const getDifferenceFromUTC = (created) => {
  const now = new Date().getTime()
  const start = new Date(created).getTime()
  const minutes = (now - start) / 1000 / 60

  if (minutes > 60 * 24 * 365) {
    return Math.floor(minutes / (60 * 24 * 365)) + ' years ago'
  } else if (minutes > 60 * 24 * 30) {
    return Math.floor(minutes / (60 * 24 * 30)) + ' months ago'
  } else if (minutes > 60 * 24) {
    return Math.floor(minutes / (60 * 24)) + ' days ago'
  } else if (minutes > 60) {
    return Math.floor(minutes / 60) + ' hours ago'
  }
  return Math.floor(minutes) + ' mins ago'
}

const SignItem = ({ address, created }: SignItemProps) => {
  return (
    <div className={styles.signers__content__item}>
      <img src={line.src} alt="line Img" className="h-auto w-full	" />
      <div className={styles.signers__content__item__main}>
        <div className={styles.signers__content__item__main__inf}>
          <img
            src={avatar.src}
            alt="line Img"
            className="h-8 w-auto m-1 mr-3"
          />
          <div className={styles.signers__content__item__main__address}>
            {address}
          </div>
        </div>
        <div className={styles.signers__content__item__main__created}>
          {getDifferenceFromUTC(created)}
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Signatures = ({ signature, address, signerCount }: SignaturesProps) => {
  const [pageCount, setPageCount] = useState(1)
  const [headPageCount, setHeadPageCount] = useState(1)
  const [signItems, setSignItems] = useState([])
  const [headliners, setHeadliners] = useState([])
  const [mySign, setMySign] = useState({ createdAt: '', ens: '', index: '' })
  const recentRef = useRef(null)
  const headRef = useRef(null)
  const mySignRef = useRef(null)
  const rBtnRef = useRef(null)
  const hBtnRef = useRef(null)
  const mBtnRef = useRef(null)
  const signLabelRef = useRef(null)
  const signCountRef = useRef(null)
  const sizePerPage = 10
  const [curPage, setCurPage] = useState(0)
  const [curHPage, setCurHPage] = useState(0)

  const paginationHandler = (page) => {
    setCurPage(page.selected)
  }

  const hPaginationHandler = (page) => {
    setCurHPage(page.selected)
  }

  const initPagination = () => {
    setCurPage(0)
  }

  const changeTab = (index) => {
    if (index == 0) {
      // Recent
      if (signature) {
        mySignRef.current.style.display = 'none'
        mBtnRef.current.className = mBtnRef.current.className.replace(
          styles.active,
          ''
        )
      }

      headRef.current.style.display = 'none'
      hBtnRef.current.className = hBtnRef.current.className.replace(
        styles.active,
        ''
      )

      recentRef.current.style.display = 'block'
      rBtnRef.current.className += ' ' + styles.active

      signLabelRef.current.innerHTML = 'Total signatures'
      if (signerCount) {
        signCountRef.current.innerHTML = signerCount.toLocaleString()
      }
    } else if (index == 1) {
      // Headliners

      if (signature) {
        mySignRef.current.style.display = 'none'
        mBtnRef.current.className = mBtnRef.current.className.replace(
          styles.active,
          ''
        )
      }

      recentRef.current.style.display = 'none'
      rBtnRef.current.className = rBtnRef.current.className.replace(
        styles.active,
        ''
      )

      headRef.current.style.display = 'block'
      hBtnRef.current.className += ' ' + styles.active

      signLabelRef.current.innerHTML = 'Total signatures'
      if (signerCount) {
        signCountRef.current.innerHTML = signerCount.toLocaleString()
      }
    } else if (index == 2) {
      // My signature

      headRef.current.style.display = 'none'
      hBtnRef.current.className = hBtnRef.current.className.replace(
        styles.active,
        ''
      )

      recentRef.current.style.display = 'none'
      rBtnRef.current.className = rBtnRef.current.className.replace(
        styles.active,
        ''
      )

      mySignRef.current.style.display = 'block'
      mBtnRef.current.className += ' ' + styles.active

      signLabelRef.current.innerHTML = 'Your signature number'

      signCountRef.current.innerHTML = mySign.index.toLocaleString()
    }
  }

  const onFetchSigners = async () => {
    const response = await fetch(
      `/api/signerList?pageNumber=${curPage}&pageSize=${sizePerPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.status === 200) {
      const data = await response.json()
      setSignItems(data)
    }
  }

  const onFetchHeadliners = async () => {
    const data = headLinersJson.slice(
      curHPage * sizePerPage + 1,
      curHPage * sizePerPage + 11
    )

    setHeadliners(data)
  }

  const onFetchMySign = async () => {
    if (address) {
      const response = await fetch(`/api/signers?address=${address}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        const data = await response.json()
        setMySign(data)
      }
    }
  }

  useEffect(() => {
    changeTab(0)
  }, [])

  useEffect(() => {
    onFetchSigners()
  }, [curPage])

  useEffect(() => {
    onFetchHeadliners()
  }, [curHPage])

  useEffect(() => {
    if (address) {
      onFetchMySign()
    }
  }, [address])

  useEffect(() => {
    if (signerCount) {
      setPageCount(parseInt(signerCount) / sizePerPage)
      setHeadPageCount(Math.max(headLinersJson.length / sizePerPage, 1))
      initPagination()
      onFetchSigners()
      onFetchHeadliners()
    }
  }, [signerCount])

  return (
    <div className={styles.signers}>
      <div className={styles.signers__content}>
        <div className={styles.signers__content__title}>
          <div className={styles.signers__content__title__signatures}>
            <div
              className={styles.signers__content__title__subtitle__signatures}
            >
              {signature ? 'Signatures by' : 'Signatures:'}
              <div
                className={
                  styles.signers__content__title__subtitle__signatures__actions
                }
              >
                <button
                  className={styles.buttonSignature}
                  ref={rBtnRef}
                  onClick={() => changeTab(0)}
                >
                  &nbsp;&nbsp;Recent&nbsp;&nbsp;
                </button>
                <button
                  className={styles.buttonSignature}
                  ref={hBtnRef}
                  onClick={() => changeTab(1)}
                >
                  Headliners
                </button>
                {signature ? (
                  <button
                    className={styles.buttonSignature}
                    ref={mBtnRef}
                    onClick={() => changeTab(2)}
                  >
                    Your signature
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>

          <div className={styles.signers__content__title__count}>
            <div
              ref={signCountRef}
              className={styles.signers__content__title__count__number}
            >
              {' '}
              {signerCount && signerCount.toLocaleString()}
            </div>
            <div
              className={styles.signers__content__title__count__label}
              ref={signLabelRef}
            >
              Total signatures
            </div>
          </div>
        </div>

        <div className={styles.signers__content__main}>
          <div className={styles.signers__content__recent} ref={recentRef}>
            <div className={styles.signers__content__list}>
              <ul>
                {signItems &&
                  signItems
                    .filter(
                      (signer) => signer.ens && signer.ens.includes('eth')
                    )
                    .map((signer) => (
                      <SignItem
                        address={getStyledENS(signer.ens)}
                        created={signer.createdAt}
                      />
                    ))}

                {signItems &&
                  signItems
                    .filter(
                      (signer) => !signer.ens || !signer.ens.includes('eth')
                    )
                    .map((signer) => (
                      <SignItem
                        address={getStyledAddr(signer.address)}
                        created={signer.createdAt}
                      />
                    ))}

                {signItems && (
                  <img
                    src={line.src}
                    alt="line Img"
                    className="h-auto w-full	"
                  />
                )}
              </ul>
            </div>

            <div className={styles.signers__content__footer}>
              <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                breakLabel={'...'}
                previousClassName={styles.pagination__previous}
                nextClassName={styles.pagination__next}
                breakClassName={'break-me'}
                activeClassName={styles.pagination__active}
                containerClassName={styles.pagination}
                initialPage={0}
                pageCount={pageCount}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                onPageChange={paginationHandler}
              />
            </div>
          </div>

          <div className={styles.signers__content__headliners} ref={headRef}>
            <div className={styles.signers__content__list}>
              <ul>
                {headliners &&
                  headliners
                    .filter(
                      (signer) => signer.ens && signer.ens.includes('eth')
                    )
                    .map((signer) => (
                      <SignItem
                        address={getStyledENS(signer.ens)}
                        created={signer.createdAt}
                      />
                    ))}

                {headliners &&
                  headliners
                    .filter(
                      (signer) => !signer.ens || !signer.ens.includes('eth')
                    )
                    .map((signer) => (
                      <SignItem
                        address={getStyledAddr(signer.address)}
                        created={signer.createdAt}
                      />
                    ))}

                {headliners && (
                  <img
                    src={line.src}
                    alt="line Img"
                    className="h-auto w-full	"
                  />
                )}
              </ul>
            </div>

            <div className={styles.signers__content__footer}>
              <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                breakLabel={'...'}
                previousClassName={styles.pagination__previous}
                nextClassName={styles.pagination__next}
                breakClassName={'break-me'}
                activeClassName={styles.pagination__active}
                containerClassName={styles.pagination}
                initialPage={0}
                pageCount={headPageCount}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                onPageChange={hPaginationHandler}
              />
            </div>
          </div>

          <div className={styles.signers__content__mysign} ref={mySignRef}>
            <img src={line.src} alt="line Img" className="h-auto w-full	" />
            <div className={styles.signers__content__mysign__main}>
              <div className={styles.signers__content__mysign__main__inf}>
                <img
                  src={avatar.src}
                  alt="line Img"
                  className="h-8 w-auto m-1 mr-3"
                />
                <div className={styles.signers__content__mysign__main__address}>
                  {mySign && mySign.ens && mySign.ens.includes('eth')
                    ? getStyledENS(mySign.ens)
                    : address
                    ? getStyledAddr(address)
                    : ''}
                </div>
              </div>

              <div className={styles.signers__content__mysign__main__signature}>
                {signature}
              </div>

              <div className={styles.signers__content__mysign__main__created}>
                Signed at:{' '}
                <b>
                  {mySign && mySign.createdAt
                    ? getStyledDate(mySign.createdAt)
                    : getStyledDate(Date())}
                </b>
              </div>
            </div>
            <img src={line.src} alt="line Img" className="h-auto w-full	" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signatures
