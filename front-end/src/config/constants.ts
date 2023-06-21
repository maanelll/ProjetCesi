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
            route: "/admin/etudiants",
            text: "Gestion des etudiants"
          },
          {
            route: "/admin/offreStages",
            text: "Gestion offres de stages"
          }

        ]

    }
}
export const SNACKBAR_MESSAGES = {
  error: {
    default: "Une erreur est survenue",
    login: "Une erreur est survenu lors de la connexion",
    axios: {
      get: "Une erreur est survenue lors de la récupération des données",
      post: "Une erreur est survenue lors de l'envoi des données",
      patch: "Une erreur est survenue lors de la modification des données",
      delete: "Une erreur est survenue lors de la suppression des données",
      activeExpression: "Une expression est déjà active",
      date: "La date de début est ppostérieur à la date de fin",
    },
  },
  success: {
    axios: {
      post: "L'entité a été crée",
      patch: "L'entité a été modifiée",
      delete: "L'entité a été supprimée",
    },
  },
}

export const ALERTDIALOG_MESSAGES = {
  delete: {
    title: "Suppression de l'élément",
    description: "Etes-vous sûr de vouloir supprimer cet élément ?",
  },
}
