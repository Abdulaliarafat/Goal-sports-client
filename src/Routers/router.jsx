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
import ApprovedBookings from "../Pages/DashBoard/MemderDashboard/ApprovedBookings";
import Payment from "../Pages/Payment/Payment";
import ConfirmedBookings from "../Pages/DashBoard/MemderDashboard/ConfirmedBookings";
import PaymentHistory from "../Pages/DashBoard/MemderDashboard/PaymentHistory";
import AdminProfile from "../Pages/DashBoard/AdminDashboard/AdminProfile";
import ManageAllMembers from "../Pages/DashBoard/AdminDashboard/ManageAllMembers";
import ManageAllUser from "../Pages/DashBoard/AdminDashboard/ManageAllUser";
import ManageCourts from "../Pages/DashBoard/AdminDashboard/ManageCourts";
import ManageBookings from "../Pages/DashBoard/AdminDashboard/ManageBookings";
import ManageCoupons from "../Pages/DashBoard/AdminDashboard/ManageCoupons";
import MakeAnnouncement from "../Pages/DashBoard/AdminDashboard/MakeAnnouncement";
import Announcements from "../Pages/DashBoard/MemderDashboard/Announcements";
import AnnouncementsUser from "../Pages/DashBoard/UserDashboard/AnnouncementsUser";

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
    hydrateFallbackElement:<Loading></Loading>,
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
      {
      path:'announcementUser',
      Component:AnnouncementsUser
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
      {
        path:'approvedBookings',
        element:<MemberRoutes><ApprovedBookings></ApprovedBookings></MemberRoutes>,
      },
      {
      path:'confirmedBookings',
      element:<MemberRoutes><ConfirmedBookings></ConfirmedBookings></MemberRoutes>
      },
      {
       path:'payment/:id',
       element:<MemberRoutes><Payment></Payment></MemberRoutes>
      },
      {
        path:'paymentHistory',
        element:<MemberRoutes><PaymentHistory></PaymentHistory></MemberRoutes>
      },
      {
        path:'announcement',
        element:<MemberRoutes><Announcements></Announcements></MemberRoutes>
      },
      // admin routes
      {
       path:'adminProfile',
       element:<AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>
      },
      {
        path: 'pendingBooking',
        element: <AdminRoutes><PendingBooking></PendingBooking></AdminRoutes>
      },
      {
      path:'manageAllMembers',
      element:<AdminRoutes><ManageAllMembers></ManageAllMembers></AdminRoutes>
      },
      {
      path:'manageAllUser',
      element:<AdminRoutes><ManageAllUser></ManageAllUser></AdminRoutes>
      },
      {
        path:'manageCourts',
        element:<AdminRoutes><ManageCourts></ManageCourts></AdminRoutes>
      },
      {
        path:'manageBookings',
        element:<AdminRoutes><ManageBookings></ManageBookings></AdminRoutes>
      },
      {
        path:'manageCoupons',
        element:<AdminRoutes><ManageCoupons></ManageCoupons></AdminRoutes>
      },
      {
        path:'makeAnnouncement',
        element:<AdminRoutes><MakeAnnouncement></MakeAnnouncement></AdminRoutes>
      }
    ]
  }
]);