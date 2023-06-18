import { Alert, AlertColor, Snackbar } from "@mui/material"
import {
  SyntheticEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type MessageType = {
  key: number
  text: string
  severity: AlertColor
}

type StateType = {
  message?: MessageType
  open: boolean
}

type ShowFunctionType = (severity: AlertColor, message: string) => void

const initialState = {
  message: undefined,
  open: false,
}

const SnackbarContext = createContext<ShowFunctionType>(() => {
  throw new Error("useSnackbar must be used within a SnackbarProvider")
})
type SnackbarPropsType = {
  children: JSX.Element
}
function SnackbarProvider({ children }: SnackbarPropsType) {
  const [pack, setPack] = useState<MessageType[]>([])
  const [state, setState] = useState<StateType>(initialState)

  useEffect(() => {
    if (pack.length && !state.message) {
      setPack((prev) => prev.slice(1))
      setState({ message: { ...pack[0] }, open: true })
    } else if (pack.length && state.message && state.open) {
      setState((prev) => ({ ...prev, open: false }))
    }
  }, [pack, state.message, state.open])

  const showSnackbar: ShowFunctionType = useCallback((severity, message) => {
    setPack((prev) => [
      ...prev,
      { key: new Date().getTime(), text: message, severity },
    ])
  }, [])

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return
    setState((prev) => ({ ...prev, open: false }))
  }

  const handleExited = () => {
    setState((prev) => ({ ...prev, message: undefined }))
  }

  const value = useMemo(() => showSnackbar, [showSnackbar])

  return (
    <SnackbarContext.Provider value={value}>
      <Snackbar
        key={state.message?.key}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
        open={state.open}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert onClose={handleClose} severity={state.message?.severity}>
          {state.message?.text}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  )
}

function useSnackbar(): ShowFunctionType {
  const value = useContext(SnackbarContext)
  if (!value) {
    throw new Error(
      "useSnackbar cannot be used outside of a SnackbarProvider component"
    )
  }

  return value
}

export { SnackbarProvider, useSnackbar }
