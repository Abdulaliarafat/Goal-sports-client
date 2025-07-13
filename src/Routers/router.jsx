import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Error from "../SharedPage/Error";
import AuthLayout from "../Layout/AuthLayout";
import LogIn from "../Authentication/Login/LogIn";
import Register from "../Authentication/Register/Register";
import Loading from "../SharedPage/Loading";
import CourtsPage from "../Pages/CourtsPage/CourtsPage";
import PrivateRoutes from "../Context/ProtectecdRoutes/PrivateRoutes";
import DashBoardLayout from "../Layout/DashBoardLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component:Root,
        ErrorBoundary:Error,
        hydrateFallbackElement:<Loading></Loading>,
        children:[
            {index:true,Component:Home},
            {
              path:'courtsPage',
              Component:CourtsPage
            }
        ]
    },
    {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: LogIn
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoutes>
      <DashBoardLayout></DashBoardLayout>
      </PrivateRoutes>,
      children:[
        {}
      ]
  }
]);