
const COLORS = ['info','positive', 'primary', 'negative', 'warning', 'secondary', 'dark']

const getColor = (number) => {
  return COLORS[Math.abs(number) % COLORS.length]
}

export { getColor }
