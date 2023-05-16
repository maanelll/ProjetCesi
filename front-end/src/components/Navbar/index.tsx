import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Button, Typography } from "@mui/material"

import { routes } from "../../config/constants"

const Navbar = () => {
  const [openedLink, setOpenedLink] = useState<string>()
  const navigate = useNavigate()

  const handleClick = (link: string) => {
      setOpenedLink(link === openedLink ? "" : link)
    if (
      link &&
      link !== "/admin" 
    ) {
      navigate(link)
    }
  }
  return (
    <Box
      sx={{
        backgroundImage: (theme) => theme.palette.gradient.blue,
        borderRadius: "0px 0px 60px 0px",
        height: "100%",
        px: "10px",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "175px",
          justifyContent: "center",
        }}
      >
        {/* {isAuthenticated && <SignOutButton />} */}
      </Box>
      <Box>
        {Object.keys(routes).map((key) => {
          const { route, text, subLinks, icon } = routes[key]
          return (
            <Box
              key={key}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center " }}>
                <Button
                  variant="containedGradientLarge"
                  onClick={() => handleClick(route)}
                  color="secondary"
                  sx={{
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor:
                      openedLink === route ? "brown.main" : "transparent",
                    display: "flex",
                    fontWeight: openedLink === route ? 800 : 600,
                    justifyContent: "flex-start",
                    position: "relative",
                    width: "100%",
                    "&:after":
                      openedLink === route && subLinks
                        ? {
                            border: "6px solid rgba(0,0,0,0)",
                            borderTop: "6px solid",
                            borderTopColor: "brown.main",
                            content: '" "',
                            display: "block",
                            left: "20%",
                            position: "absolute",
                            top: "100%",
                          }
                        : {},
                  }}
                >
                  {React.createElement(icon)}

                  {text}
                </Button>
              </Box>
              {subLinks &&
                subLinks.length > 0 &&
                openedLink === route &&
                subLinks.map(({ route, text }) => {
                  return (
                    <Box
                      key={text}
                      onClick={() => handleClick(route)}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Button
                        variant="containedGradientLarge"
                        onClick={() => handleClick(route)}
                        color="secondary"
                        sx={{
                          backgroundColor: "transparent",
                          display: "flex",
                          height: "35px",
                          justifyContent: "flex-start",
                          pl: "40px",
                          width: "100%",
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            "&:hover": { fontWeight: 700 },
                          }}
                        >
                          {text}
                        </Typography>
                      </Button>
                    </Box>
                  )
                })}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Navbar
