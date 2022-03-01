const isEmail = (val: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
    return true
  }
  return false
}

export default {
  isEmail
}
