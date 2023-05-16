import {
  alertClasses,
  darken,
  lighten,
  svgIconClasses,
  switchClasses,
  touchRippleClasses,
} from "@mui/material"
import { Interpolation, Theme, createTheme } from "@mui/material/styles"
import React from "react"
import palette from "../theme/palette"
import typography from "../theme/typography"

declare module "@mui/material/styles" {
  interface Palette {
    red: Palette["primary"]
    blue: Palette["primary"]
    green: Palette["primary"]
    brown: Palette["primary"]
    gradient: { [key: string]: string }
  }

  interface PaletteOptions {
    red: PaletteOptions["primary"]
    blue: PaletteOptions["primary"]
    green: PaletteOptions["primary"]
    brown: PaletteOptions["primary"]
  }

  // eslint-disable-next-line no-unused-vars
  interface TypographyVariants {
    paragraph: React.CSSProperties
    paragraph_bold: React.CSSProperties
  }

  // eslint-disable-next-line no-unused-vars
  interface TypographyVariantsOptions {
    paragraph?: React.CSSProperties
    paragraph_bold: React.CSSProperties
  }
}

declare module "@mui/material/Button" {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsVariantOverrides {
    containedGradientSmall: true
    containedGradientMedium: true
    containedGradientLarge: true
    outlinedGradientSmall: true
    outlinedGradientMedium: true
    outlinedGradientLarge: true
    textSmall: true
    textMedium: true
    textLarge: true
  }

  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsColorOverrides {
    ceruleanBlue: true
    charmPink: true
    mint: true
  }
}

declare module "@mui/material/CircularProgress" {
  // eslint-disable-next-line no-unused-vars
  interface CircularProgressPropsColorOverrides {
    black: true
    white: true
  }
}

declare module "@mui/material/Typography" {
  // eslint-disable-next-line no-unused-vars
  interface TypographyPropsVariantOverrides {
    paragraph: true
    paragraph_bold: true
    paragraph_small: true
    paragraph_big: true
    paragraph_big_bold: true
    link_small: true
    link_medium: true
    link_large: true
  }
}

const BUTTON_LINK_TYPO_S = {
  fontSize: 12,
  fontWeight: 700,
  height: 51,
  lineHeight: "15px",
}

const BUTTON_LINK_TYPO_M = {
  fontSize: 16,
  fontWeight: 600,
  height: 40,
  lineHeight: "24px",
}

const BUTTON_LINK_TYPO_L = {
  fontSize: 12,
  fontWeight: 500,
  height: 51,
  lineHeight: "15px",
}

const CONTAINED_BUTTON_PRIMARY: Interpolation<Theme> = {
  backgroundColor: palette.blue.main,
  minWidth: "25px",
  color: palette.primary.contrastText,
  textTransform: "none",
  transition: "backgroundImage 1s",
  "&:hover": {
    backgroundImage: "none",
    backgroundColor: palette.blue.hover,
  },
  "&:disabled": {
    backgroundImage: "none",
    backgroundColor: palette.grey[100],
    color: palette.grey[500],
  },
}
const CONTAINED_BUTTON_SECONDARY: Interpolation<Theme> = {
  backgroundColor: palette.primary.main,
  color: palette.primary.contrastText,
  minWidth: "25px",

  textTransform: "none",
  transition: "backgroundImage 1s",
  "&:hover": {
    backgroundImage: "none",
    backgroundColor: palette.brown.main,
  },
  "&after": {
    backgroundImage: "none",
    backgroundColor: palette.brown.main,
    textTransform: "bold",
  },
  "&:disabled": {
    backgroundImage: "none",
    backgroundColor: palette.grey[100],
    color: palette.grey[500],
  },
}
const CONTAINED_BUTTON_TERTIARY: Interpolation<Theme> = {
  backgroundColor: palette.red.main,
  color: palette.primary.contrastText,
  minWidth: "25px",

  textTransform: "none",
  transition: "backgroundImage 1s",
}

const OUTLINED_BUTTON: Interpolation<Theme> = {
  backgroundClip: "padding-box",
  border: "1.6px solid transparent",
  borderRadius: "2px",
  color: palette.primary.main,
  position: "relative",
  textTransform: "none",
  transition: "border",
  zIndex: 2,

  "&:hover": {
    color: palette.blue.hover,
    "&:after": {
      background: palette.blue.hover,
    },
  },

  "&:disabled": {
    "&:after": {
      background: palette.common.white,
      border: `2px solid ${palette.grey[300]}`,
      borderRadius: "4px",
      color: palette.grey[500],
    },
  },

  [`& .${touchRippleClasses.root}`]: {
    background: "#fff",
    zIndex: -1,
  },

  "&:after": {
    background: palette.blue.hover,
    borderRadius: "4px",
    bottom: -1.6,
    content: '""',
    left: -2,
    position: "absolute",
    right: -2,
    top: -1.6,
    zIndex: -2,
    "&:hover": {
      background: palette.blue.hover,
    },
  },
}

const TEXT_BUTTON: Interpolation<Theme> = {
  color: palette.blue.main,
  textTransform: "none",
  "&:hover": {
    color: palette.blue.hover,
    background: "none",
  },
  "&:focus": {
    textDecoration: "underline",
  },
  "&:active": {
    color: palette.blue.hover,
    background: "none",
  },
}

const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: palette.success.main,
          color: "white",
          [`& .${alertClasses.icon}`]: {
            color: "white",
          },
        },
        standardError: {
          backgroundColor: palette.error.main,
          color: "white",
          [`& .${alertClasses.icon}`]: {
            color: "white",
          },
        },
        standardWarning: {
          backgroundColor: palette.warning.main,
          color: "white",
          [`& .${alertClasses.icon}`]: {
            color: "white",
          },
        },
        standardInfo: {
          backgroundColor: palette.info.main,
          color: "white",
          [`& .${alertClasses.icon}`]: {
            color: "white",
          },
        },
      },
    },

    MuiButton: {
      variants: [
        {
          props: { variant: "containedGradientSmall", color: "primary" },
          style: {
            ...CONTAINED_BUTTON_PRIMARY,
            ...BUTTON_LINK_TYPO_S,
          },
        },
        {
          props: { variant: "containedGradientMedium", color: "primary" },
          style: {
            ...CONTAINED_BUTTON_PRIMARY,
            ...BUTTON_LINK_TYPO_M,
          },
        },
        {
          props: { variant: "containedGradientLarge", color: "primary" },
          style: {
            ...CONTAINED_BUTTON_PRIMARY,
            ...BUTTON_LINK_TYPO_L,
          },
        },
        {
          props: { variant: "containedGradientSmall", color: "secondary" },
          style: {
            ...CONTAINED_BUTTON_SECONDARY,
            ...BUTTON_LINK_TYPO_S,
          },
        },
        {
          props: { variant: "containedGradientMedium", color: "secondary" },
          style: {
            ...CONTAINED_BUTTON_SECONDARY,
            ...BUTTON_LINK_TYPO_M,
          },
        },
        {
          props: { variant: "containedGradientLarge", color: "secondary" },
          style: {
            ...CONTAINED_BUTTON_SECONDARY,
            ...BUTTON_LINK_TYPO_L,
          },
        },
        {
          props: { variant: "containedGradientLarge", color: "error" },
          style: {
            ...CONTAINED_BUTTON_TERTIARY,
            ...BUTTON_LINK_TYPO_L,
          },
        },
        {
          props: { variant: "outlinedGradientSmall" },
          style: {
            ...OUTLINED_BUTTON,
            ...BUTTON_LINK_TYPO_S,
          },
        },
        {
          props: { variant: "outlinedGradientMedium" },
          style: {
            ...OUTLINED_BUTTON,
            ...BUTTON_LINK_TYPO_M,
          },
        },
        {
          props: { variant: "outlinedGradientLarge" },
          style: {
            ...OUTLINED_BUTTON,
            ...BUTTON_LINK_TYPO_L,
          },
        },
        {
          props: { variant: "textSmall" },
          style: {
            ...TEXT_BUTTON,
            ...BUTTON_LINK_TYPO_S,
          },
        },
        {
          props: { variant: "textMedium" },
          style: {
            ...TEXT_BUTTON,
            ...BUTTON_LINK_TYPO_M,
          },
        },
        {
          props: { variant: "textLarge" },
          style: {
            ...TEXT_BUTTON,
            ...BUTTON_LINK_TYPO_L,
          },
        },
      ],
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          [`& .${svgIconClasses.root}`]: {
            fontSize: 24,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: lighten(palette.primary.main, 0.9),
          color: palette.primary.main,
        },
        deleteIcon: {
          color: palette.primary.main,
          height: 20,
          width: 20,
          "&:hover": {
            color: darken(palette.primary.main, 0.2),
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: palette.common.white,
          borderColor: palette.grey[300],
          color: palette.grey[600],
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "13px 12px",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          [`& .${switchClasses.input}`]: {
            left: "-150% !important",
            width: "120px !important",
          },
        },
      },
    },
  },
  palette,
  typography,
})

export default theme
