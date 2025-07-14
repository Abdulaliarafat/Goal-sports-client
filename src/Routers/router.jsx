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
import PendingBooking from "../Pages/DashBoard/AdminDashboard/PendingBooking";
import Forbidden from "../SharedPage/Forbedden";
import AdminRoutes from "../Context/ProtectecdRoutes/AdminRoutes";
import DeashBoardHomeMain from "../Pages/DeashBoardHome/DeashBoardHomeMain";
import UserProfile from "../Pages/DashBoard/UserDashboard/UserProfile";
import MemberProfile from "../Pages/DashBoard/MemderDashboard/MemberProfile";
import MemberRoutes from "../Context/ProtectecdRoutes/MemberRoutes";
import UserPendingBookings from "../Pages/DashBoard/UserDashboard/UserPendingBookings";
import MemberPendingBookings from "../Pages/DashBoard/MemderDashboard/MemberPendingBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    ErrorBoundary: Error,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      { index: true, Component: Home },
      {
        path: 'courtsPage',
        Component: CourtsPage
      },
      {
        path: 'forbedden',
        Component: Forbidden
      },
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
    path: '/dashboard',
    element: <PrivateRoutes>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoutes>,
    children: [
      {
        index: true,
        Component: DeashBoardHomeMain
      },
      {
        path: 'userProfile',
        Component: UserProfile
      },
      {
        path:'userPendingBookings',
        Component:UserPendingBookings
      },
      // member routes
      {
        path: 'memberProfile',
        element:<MemberRoutes><MemberProfile></MemberProfile></MemberRoutes>
      },
      {
       path:'memberPendingBookings',
       element:<MemberRoutes><MemberPendingBookings></MemberPendingBookings></MemberRoutes>
      },
      // admin routes
      {
        path: 'pendingBooking',
        element: <AdminRoutes><PendingBooking></PendingBooking></AdminRoutes>
      }
    ]
  }
]);