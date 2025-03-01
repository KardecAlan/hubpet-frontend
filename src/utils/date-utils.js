const DATE = new Date()
const getCurrentYear = () => DATE.getFullYear()

const getCurrentTrimester = () => Math.floor( DATE.getMonth() / 3) + 1


export {
  getCurrentYear,
  getCurrentTrimester
}
