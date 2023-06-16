import Home from "../components/icons/Home"
import AdminIcon from "../components/icons/Admin"



type RouteType = {
  [key: string]: {
    icon: typeof Home
    route: string
    text: string
    subLinks?: {
      route: string
      text: string
    }[]
  }
}

export const routes: RouteType = {
    board: {
        icon: Home,
        route: "/",
        text: "Tableau de bord",
  },
  admin: {
        icon: AdminIcon,
        route: "/admin",
        text: "Administration",
        subLinks: [
          {
            route: "/admin/entreprises",
            text: "Gestion des entreprises"
          },
          {
            route: "/admin/users",
            text: "Gestion des utilisateurs"
          }
        ]

    }
}