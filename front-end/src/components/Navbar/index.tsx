import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Button, Typography } from "@mui/material"

import { routes } from "../../config/constants"
import profileImage from "../../assets/img/aymenImg.jpg";
import AuthContext from "../../config/authContext";


const Navbar = () => {
  const [openedLink, setOpenedLink] = useState<string>()
  const navigate = useNavigate()
  const { logout, role } = useContext(AuthContext);
  const isAdmin = role === "ROLE_ADMIN";
  const isPilot = role === "ROLE_PILOTE";

  const handleClick = (link: string) => {
      setOpenedLink(link === openedLink ? "" : link)
    if (
      link &&
      link !== "/admin" 
    ) {
      navigate(link)
    }
  }

  const handleSignOut = () => {
    logout();
  };
  return (
    <Box
      sx={{
        backgroundImage: (theme) => theme.palette.gradient.purple,
        borderRadius: "0px 0px 60px 0px",
        height: "100%",
        width: "265px",

      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "225px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        <Box
          sx={{
            width: "80px",
            height: "80px",
            backgroundImage: `url(${profileImage})`,
            backgroundSize: "cover",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
          }}
        >
          Aymen KALLEL
          </Typography>
          <Button
            variant="contained"
            onClick={handleSignOut}
            sx={{
              marginTop: "12px",
              padding: "10px 25px",
              
              "&:hover": {
          boxShadow: "3px 3px #Fafad4",
          transition: ".2s",
        },
            }}
          >
            <Typography sx={{color:"black",fontFamily:"arial",fontSize: "14px"}}>deconnexion</Typography>
          </Button>
          </Box>
      </Box>
      <Box
            sx={{
              width: "100%",
              borderBottom: "1px solid #ffffff",
              marginTop: "5px",
              marginBottom:"15px"
            }}
          />
      
      <Box>
        {Object.keys(routes).map((key) => {
          const { route, text, subLinks, icon } = routes[key]
          // Skip rendering the administration route if the user is not an admin
          if (!isAdmin && !isPilot && key === "admin") {
            return null;
          } 
          return (
            <Box
              key={key}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="containedGradientLarge"
                  onClick={() => handleClick(route)}
                  color="primary"
                  sx={{
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor:
                      openedLink === route ? "brown.main" : "transparent",
                    display: "flex",
                    fontWeight: openedLink === route ? 750 : 600,
                    justifyContent: "flex-start",
                    position: "relative",
                    fontSize: "17px",
                    fontFamily: "Arial",
                    width: "100%",
                    "&:after":
                      openedLink === route && subLinks
                        ? {
                            border: "6px solid rgba(0,0,0,0)",
                            borderTop: "6px solid",
                            borderTopColor: "brown.main",
                            content: '" "',
                            display: "block",
                            left: "12%",
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
                          height: "50px",
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
                            fontSize:"16px",
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
