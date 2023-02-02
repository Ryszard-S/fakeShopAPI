const constants = require('./diceBearAdventurerConstans')

function getArrayRandomElement(arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}

function genrateAdventurerURL() {
  const eyebrow = getArrayRandomElement(constants.eyebrows)
  const hairStyle = getArrayRandomElement(constants.hair)
  const eye = getArrayRandomElement(constants.eyes)
  const feature = getArrayRandomElement(constants.features)
  const glass = getArrayRandomElement(constants.glasses)
  const hairCol = getArrayRandomElement(constants.hairColor)
  const skinCol = getArrayRandomElement(constants.skinColor)
  const mouthStyle = getArrayRandomElement(constants.mouth)

  return `https://api.dicebear.com/5.x/adventurer/svg?&eyebrow=${eyebrow}&hair=${hairStyle}&eye=${eye}&feature=${feature}&glass=${glass}&hairColor=${hairCol}&skinColor=${skinCol}&mouth=${mouthStyle}`
}

module.exports = { genrateAdventurerURL }
