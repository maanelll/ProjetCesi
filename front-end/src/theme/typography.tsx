import { createTheme } from "@mui/system"

const { breakpoints } = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1250,
      xl: 1536,
    },
  },
})

const typography = {
  fontFamily: "Montserrat",
  body1: {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "17.07px",
    [breakpoints.down("lg")]: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "17.07px",
    },
    [breakpoints.down("sm")]: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "17.07px",
    },
  },
  body2: {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "17.07px",
  },
  h1: {
    fontSize: 30,
    fontWeight: 650,
    lineHeight: "36px",
    [breakpoints.down("lg")]: {
      fontSize: 30,
      fontWeight: 650,
      lineHeight: "36px",
    },
    [breakpoints.down("sm")]: {
      fontSize: 30,
      fontWeight: 650,
      lineHeight: "36px",
    },
  },
  buttons: {
    textTransform: "none",
  },

  paragraph: {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "17.07px",
    [breakpoints.down("lg")]: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "17.07px",
    },
    [breakpoints.down("sm")]: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "17.07px",
    },
  },
  paragraph_bold: {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "21px",
    [breakpoints.down("lg")]: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "21px",
    },
    [breakpoints.down("sm")]: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "21px",
    },
  },
}

export default typography
