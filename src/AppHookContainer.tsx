
import App from './App'
import { AppRouter } from './AppRouter'
import { ToastProvider } from './components/Toast/ToastProvider'

export default function AppHookContainer() {
  return (
    <ToastProvider>
      <App>
        <AppRouter/>
      </App>
    </ToastProvider>
  )
}
