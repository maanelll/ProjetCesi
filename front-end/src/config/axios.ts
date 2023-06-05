import axios from "axios"
import { AuthContextType } from "./authContext"

function setBaseUrl() {
  axios.defaults.baseURL = `http://localhost:8080/api`
}

export function initAxios(authContext: AuthContextType) {
    setBaseUrl()
    console.log(axios.defaults.baseURL)
    axios.interceptors.request.use(
        async function (config) {
            const token = await authContext.token;
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`
                config.headers["Accept"] = "application/json"
            }
            return config
        },
        function (error) {
            return Promise.reject(error)
        }
    )
    axios.interceptors.response.use(undefined, async (error) => {
        if (error.response) {
            console.error("API responded with an error", error.response)
        }else if (error.request) {
      console.error("API call failed for request", error.request)
    } else {
      console.error("An error occurred while setting up an API request")
    }
    console.error(error.config)

    return Promise.reject(error)

    })
}