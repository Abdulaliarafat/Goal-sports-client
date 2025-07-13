import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import useUserRole from '../Hook/useUserRole';
import { FaHome, FaHourglassHalf } from 'react-icons/fa';
import logo from '.././assets/download.jpeg'

const DashBoardLayout = () => {
    const { roleLoading, role } = useUserRole()

    return (
        <div className="drawer lg:drawer-open">
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
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <Link to="/" className="flex items-center gap-2 text-green-800 font-bold text-3xl mx-auto ">
                        <img src={logo} alt="Goal" className="w-15 h-15 border-3 border-green-500 rounded-full mb-3" />
                        <span>Goal</span>
                    </Link>
                    <div className='border-2  bg-green-500 mb-5'></div>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-2 font-medium transition-all text-green-600 text-lg duration-300 ${isActive
                                ? 'text-green-600 underline underline-offset-4'
                                : 'hover:text-green-600'
                            }`
                        }
                    >
                        <FaHome size={25} className="text-green-500" />
                        Home
                    </NavLink>

                    {!roleLoading && role === "admin" &&
                        <>
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
                                Pending Booking
                            </NavLink>

                        </>
                    }

                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;