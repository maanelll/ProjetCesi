/// <reference types="react-scripts" />
interface ImportMetaEnv {
  readonly REACT_APP_APP_REDIRECT_URI_OFFICE: string
  readonly REACT_APP_APP_CALL_API_URL_OFFICE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
