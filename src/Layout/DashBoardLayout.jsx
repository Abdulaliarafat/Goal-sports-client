import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import useUserRole from '../Hook/useUserRole';
import { FaCheckCircle, FaClipboardCheck, FaHome, FaHourglassHalf, FaMoneyCheckAlt, FaTools, FaUserCircle, FaUserFriends, FaUsers } from 'react-icons/fa';
import logo from '.././assets/download.jpeg'

const DashBoardLayout = () => {
    const { roleLoading, role } = useUserRole()

    return (
        <div className="drawer lg:drawer-open bg-green-50">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* navber */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Deshboard</div>
                </div>
                {/* Page content here */}
                <div>
                    <Outlet></Outlet>
                </div>

            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-green-100 text-base-content min-h-full w-80 p-4 space-y-2">
                    <Link to="/" className="flex items-center gap-2 text-green-800 font-bold text-3xl mx-auto ">
                        <img src={logo} alt="Goal" className="w-15 h-15 border-3 border-green-500 rounded-full mb-3" />
                        <span>Goal</span>
                    </Link>
                    <div className='border-2  bg-green-500 mb-5'></div>
                    {/* Public  */}
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-2 mb-1 font-medium transition-all text-green-600 text-lg duration-300 ${isActive
                                ? 'text-green-600 underline underline-offset-4'
                                : 'hover:text-green-600'
                            }`
                        }
                    >
                        <FaHome size={25} className="text-green-500" />
                        Back to home
                    </NavLink>
                    {!roleLoading && role === "user" &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/userProfile"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all duration-300 text-lg ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600 text-green-600'
                                        }`
                                    }
                                >
                                    <FaUserCircle size={24} className="text-green-500" />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/userPendingBookings"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all text-lg text-green-600 text-md duration-300 ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600'
                                        }`
                                    }
                                >
                                    <FaHourglassHalf size={25} className="text-orange-500" />
                                    Pending Booking
                                </NavLink>
                            </li>

                        </>
                    }

                    {!roleLoading && role === "member" &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/memberProfile"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all duration-300 text-lg ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600 text-green-600'
                                        }`
                                    }
                                >
                                    <FaUserCircle size={24} className="text-green-500" />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/confirmedBookings"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all duration-300 text-lg ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600 text-green-600'
                                        }`
                                    }
                                >
                                    <FaCheckCircle size={24} className="text-green-500" />
                                    Confirmed Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/memberPendingBookings"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all text-lg text-green-600 text-md duration-300 ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600'
                                        }`
                                    }
                                >
                                    <FaHourglassHalf size={25} className="text-orange-500" />
                                    Pending Booking
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/approvedBookings"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all duration-300 text-lg ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600 text-green-600'
                                        }`
                                    }
                                >
                                    <FaClipboardCheck size={24} className="text-green-500" />
                                    Approved Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/paymentHistory"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all duration-300 text-lg ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600 text-green-600'
                                        }`
                                    }
                                >
                                    <FaMoneyCheckAlt size={24} className="text-green-600" />
                                    Payment History
                                </NavLink>

                            </li>
                        </>
                    }


                    {!roleLoading && role === "admin" &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/adminProfile"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all duration-300 text-lg ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600 text-green-600'
                                        }`
                                    }
                                >
                                    <FaUserCircle size={24} className="text-green-500" />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/pendingBooking"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all text-lg text-green-600 text-md duration-300 ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600'
                                        }`
                                    }
                                >
                                    <FaHourglassHalf size={25} className="text-orange-500" />
                                    Booking approval
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/manageAllMembers"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all duration-300 text-lg ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600 text-green-600'
                                        }`
                                    }
                                >
                                    <FaUsers size={24} className="text-green-500" />
                                    All Members
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/manageAllUser"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all duration-300 text-lg ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600 text-green-600'
                                        }`
                                    }
                                >
                                    <FaUserFriends size={24} className="text-green-500" />
                                    All Users
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/manageCourts"
                                    className={({ isActive }) =>
                                        `flex items-center mt-2 gap-2 font-medium transition-all duration-300 text-lg ${isActive
                                            ? 'text-green-600 underline underline-offset-4'
                                            : 'hover:text-green-600 text-green-600'
                                        }`
                                    }
                                >
                                    <FaTools size={22} className="text-green-500" />
                                    Manage Courts
                                </NavLink>

                            </li>
                        </>
                    }

                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;