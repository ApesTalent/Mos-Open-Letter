import create from 'zustand'
import produce from 'immer'

const storeSign = create((set) => ({
  signature: '',
  updateSignature: (signs) =>
    set(
      produce((state) => {
        state.signature = signs
      })
    ),
}))

export default storeSign
