import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Footer from "./components/Footer";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import './styles/app.css'


const Layout = () => {
  return (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
     children: [
      {
        path: ("/"),
        element: (<Home />)
      },
      {
        path: ("/post/:id"),
        element: (<Post />)
      },
      {
        path: ("/write"),
        element: (<Write />)
      },
      {
        path: "/profile/:uid",
        element: <Profile />,
      },
      ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  )
}



export default App


