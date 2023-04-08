/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ThreeDots } from 'react-loader-spinner'

export const Spinner = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#25262B"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      visible={true}
    />
  )
}

export default Spinner
