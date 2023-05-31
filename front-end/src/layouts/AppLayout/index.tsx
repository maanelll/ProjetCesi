import { useContext } from "react"
import Navbar from "../../components/Navbar"
import AuthContext from "../../config/AuthContext"

type AppLayoutPropsType = {
  children: JSX.Element
}

const AppLayout = ({ children }: AppLayoutPropsType) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div style={{ display: "flex", minHeight: "100vh", margin: 0 }}>
      {isAuthenticated && (
        <div style={{ flex: "0 0 200px" }}>
          <Navbar />
        </div>
      )}
      <div style={{ flexGrow: 1 }}>
        {children}
      </div>
    </div>
  )
}

export default AppLayout
