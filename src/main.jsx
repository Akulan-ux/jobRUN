import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from "./redux/authSlice";
import axios from 'axios'
import { USER_API_END_POINT } from './components/utils/constant'


function AuthWrapper({ children }) {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/check-auth`, {
          withCredentials: true
        })
        if (res.data.success && res.data.user) {
          dispatch(setUser(res.data.user))
        }
      } catch (error) {
        console.log("Auth check failed:", error)
        dispatch(setUser(null))
      }
    }
    checkAuth()
  }, [dispatch])
  
  return children
}

const container = document.getElementById('root')


if (!window.reactRoot) {
  window.reactRoot = createRoot(container)
}

window.reactRoot.render(
  <StrictMode>
    <Provider store={store}>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </Provider>
  </StrictMode>
)