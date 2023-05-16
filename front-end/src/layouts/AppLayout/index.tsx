import Navbar from "../../components/Navbar"

type AppLayoutPropsType = {
  children: JSX.Element
}

const AppLayout = ({ children }: AppLayoutPropsType) => {
    const isAuthenticated = true;
  return (
    <div style={{ display: "flex", minHeight: "100vh", margin: 0 }}>
      {isAuthenticated && (
        <div style={{ flex: "0 0 200px" }}>
          <Navbar />
        </div>
      )}
      <div style={{ flexGrow: 1 }}>{children}</div>
    </div>
  )
}

export default AppLayout
