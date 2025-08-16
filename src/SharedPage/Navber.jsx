import { Link, NavLink } from 'react-router';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import logo from '.././assets/download.jpeg'
import useAuth from '../Hook/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth(); // ✅ 1. Destructure user and logout from auth
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // ✅ 2. Local state for dropdown

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // ✅ 3. Toggle dropdown
    const handleLogout = () => {
        logOut()
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="bg-green-200 shadow-md py-1">
            <div className="navbar max-w-6xl mx-auto px-4 py-3 justify-between items-center">

                {/* ✅ 4. Logo + Site Name */}
                <Link to="/" className="flex items-center gap-2 text-green-800 font-bold text-xl">
                    <img src={logo} alt="Goal" className="w-13 h-13 rounded-full" />
                    <span className='hidden md:inline text-lg md:text-3xl'>Goal</span>
                </Link>

                {/* ✅ 5. Nav Links */}
                <div className="flex items-center gap-2">
                    <div className='md:mr-10 '>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `font-medium px-3 ${isActive ? 'bg-green-600 text-white p-1.5 rounded' : ''}`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/courtsPage"
                            className={({ isActive }) =>
                                `font-medium px-3  ${isActive ? 'bg-green-600 text-white p-1.5 rounded' : ''}`
                            }
                        >
                            Courts
                        </NavLink>
                        <NavLink
                            to="/reviwe"
                            className={({ isActive }) =>
                                `font-medium px-3  ${isActive ? 'bg-green-600 text-white p-1.5 rounded' : ''}`
                            }
                        >
                            Feedback
                        </NavLink>

                    </div>

                    {/* ✅ 6. Show profile if logged in */}
                    {user ? (
                        <div className="relative">
                            {/* ✅ 7. Profile picture button */}
                            <button
                                onClick={toggleDropdown}
                                className="rounded-full w-13 h-13 border border-green-300 overflow-hidden"
                            >
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="profile" className="w-full h-full object-cover border-2 border-green-700 hover:bg-green-300 hover:border-3 rounded-full" />
                                ) : (
                                    <FaUserCircle className="text-2xl text-green-600 mx-auto" />
                                )}
                            </button>

                            {/* ✅ 8. Dropdown menu */}
                            {isDropdownOpen && (
                                <div className="absolute -right-18 mt-2 w-62 bg-white rounded-lg shadow-md border border-green-200 z-50">
                                    <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                                        {user.displayName || user.email}
                                    </div>
                                    <ul className="menu menu-sm">
                                        <li>
                                            <NavLink
                                              to="/dashboard"
                                                className={({ isActive }) =>
                                                    `font-medium ${isActive ? 'bg-green-600 text-green-500 p-1.5 rounded' : 'hover:bg-green-600 hover:text-white'}`
                                                }
                                            >
                                                Dashboard
                                            </NavLink>
                                           
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="hover:bg-green-600 w-full text-left hover:text-white font-bold text-red-600 text-md">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        // ✅ 9. Login link for guests
                        <NavLink to="/login" className="btn font-bold   btn-md bg-green-700 text-white hover:bg-green-800">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
