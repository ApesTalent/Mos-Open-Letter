/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const pre2Auction = '2022-12-16T00:00:00'
export const preAuction = '2022-12-16T16:00:00'
export const auction = '2022-12-18T16:00:00'
export const proposal = '2023-01-05T00:00:00'

export const checkIfPre2Auction = () => {
  const pre2AuctionDate = new Date(pre2Auction).getTime()
  const preAuctionDate = new Date(preAuction).getTime()
  if (
    pre2AuctionDate < new Date().getTime() &&
    preAuctionDate > new Date().getTime()
  ) {
    return true
  }
  return false
}

export const checkIfAuction = () => {
  const preAuctionDate = new Date(preAuction).getTime()
  const AuctionDate = new Date(auction).getTime()
  if (
    preAuctionDate < new Date().getTime() &&
    AuctionDate > new Date().getTime()
  ) {
    return true
  }
  return false
}

export const checkIfAuctionFinished = () => {
  const AuctionDate = new Date(auction).getTime()
  if (AuctionDate < new Date().getTime()) {
    return true
  }
  return false
}
