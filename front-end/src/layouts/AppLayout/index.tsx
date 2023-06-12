import { useContext } from "react"
import Navbar from "../../components/Navbar"
import AuthContext from "../../config/authContext"
import Header from "../../components/Header"
import { Box } from "@mui/system"
type AppLayoutPropsType = {
  children: JSX.Element
}

const AppLayout = ({ children }: AppLayoutPropsType) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      
        
    <div style={{ display: "flex", minHeight: "100vh" ,marginTop: 0}}>
      {isAuthenticated && (
        <div style={{ flex: "0 0 220px" }}>
          <Navbar />
        </div>
      )}
      <div style={{ flexGrow: 1}}>
        {isAuthenticated &&(
          <Box sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",}}>
          <Header/>
        </Box>
        )}
        
        {children}
        </div>
      </div>
      </div>
  )
}

export default AppLayout
