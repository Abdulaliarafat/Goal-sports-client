import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Error from "../SharedPage/Error";
import AuthLayout from "../Layout/AuthLayout";
import LogIn from "../Authentication/Login/LogIn";
import Register from "../Authentication/Register/Register";
import Loading from "../SharedPage/Loading";

export const router = createBrowserRouter([
    {
        path: "/",
        Component:Root,
        ErrorBoundary:Error,
        hydrateFallbackElement:<Loading></Loading>,
        children:[
            {index:true,Component:Home}
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
  }
]);