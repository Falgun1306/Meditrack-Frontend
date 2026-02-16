import { useState } from "react";
import { GiMedicines } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { FaUsers, FaCapsules, FaBell } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import AuthStore from "../Store/Auth.store";
import { useNavigate, useLocation } from "react-router-dom";
import useFamilyStore from "../Store/FamilyMembers.store";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const logout = AuthStore((state) => state.logout);
    const setMembers = useFamilyStore((state) => state.setMembers);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        setMembers([]);
        navigate("/login");
    };

    const navItems = [
        { name: "Family", path: "/family", icon: <FaUsers /> },
        { name: "Medicines", path: "/all-medicines", icon: <FaCapsules /> },
        { name: "Notifications", path: "/all-notifications", icon: <FaBell /> },
    ];

    return (
        <div className="bg-blue-200 px-6 py-4 rounded-xl shadow-md mb-6">

            {/* Top Section */}
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 text-blue-700 cursor-pointer font-semibold text-xl"
                    onClick={() => navigate("/")}
                >
                    <GiMedicines className="text-3xl" />
                    MediTrack
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6 items-center">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition duration-200
                                ${
                                    location.pathname === item.path
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-blue-600 hover:bg-blue-200"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-medium transition duration-200"
                    >
                        Logout <IoIosLogOut />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="flex flex-col gap-4 mt-4 md:hidden">

                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => {
                                navigate(item.path);
                                setIsOpen(false);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-200
                                ${
                                    location.pathname === item.path
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-blue-600"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    ))}

                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white"
                    >
                        Logout <IoIosLogOut />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
