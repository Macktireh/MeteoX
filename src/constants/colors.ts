export const colors = {
  white: (opacity: number = 1) => `rgba(255,255,255, ${opacity})`,
  black: (opacity: number = 1) => `rgba(0,0,0, ${opacity})`,
  red: (opacity: number = 1) => `rgba(255,0,0, ${opacity})`,
  green: (opacity: number = 1) => `rgba(0,255,0, ${opacity})`,
  blue: (opacity: number = 1) => `rgba(0,0,255, ${opacity})`,
  yellow: (opacity: number = 1) => `rgba(255,255,0, ${opacity})`,
  gray: (opacity: number = 1) => `rgba(128,128,128, ${opacity})`,
  bg: (opacity: number = 1) => `rgba(70,71,53, ${opacity})`,
}
