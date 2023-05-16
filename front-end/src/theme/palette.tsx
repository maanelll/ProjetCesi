//Main colors
const ORANGE = {
  contrastText: "#ffffff",
  main: "#FDA42A",
}

const BLUE = {
  main: "#1C84C6",
  hover: "#00558B",
}

const RED = {
  main: "#E83535",
}

const GREEN = {
  main: "#2ECC71",
}

const GREY = {
  50: "#FAFAFA",
  100: "#E6E8E9",
  200: "#CCCFD3",
  300: "#B4B8BD",
  400: "#9AA0A7",
  500: "#808790",
  600: "#67707B",
  700: "#4E5965",
  800: "#35414F",
  900: "#1C2939",
}

const BROWN = {
  main: " #4E4E4EBF",
}
// Black color
const BLACK = "#021123"

// White color
const WHITE = "#fff"

const ORANGE_GRADIENT = "linear-gradient(183.6deg, #FDA42A 0%, #F08303 73.17%);"
const BLUE_GRADIENT = "linear-gradient(183.6deg, #007bff 0%, #0056b3 73.17%);"


const palette = {
  primary: ORANGE,
  blue: BLUE,
  red: RED,
  green: GREEN,
  grey: GREY,
  brown: BROWN,
  success: {
    dark: "#0E573C",
    main: "#1E8960",
    light: "#8EC2AF",
  },
  error: {
    dark: "#B63333",
    main: "#F44B4B",
    light: "#F9A4A4",
  },
  info: {
    dark: "#005B9F",
    main: "#0288D1",
    light: "#5EB8FF",
  },
  warning: {
    dark: "#B33D00",
    main: "#ED6C02",
    light: "#FF9C3F",
  },
  common: {
    black: BLACK,
    white: WHITE,
  },
  gradient: {
    orange: ORANGE_GRADIENT,
    blue:BLUE_GRADIENT,
  },
}

export default palette
