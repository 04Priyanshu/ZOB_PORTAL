import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/ui/auth/login'
import Signup from './components/ui/auth/signup'
import Home from './components/ui/home'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Signup',
    element: <Signup />,
  },

])

function App() {

  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
