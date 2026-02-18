import { GiMedicines } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utilities/axiosInstance.js";
import AuthStore from "../../Store/Auth.store.js";
import useFamilyStore from "../../Store/FamilyMembers.store.js";
import useMedicineStore from "../../Store/Medicine.store.js";
import useNotificationStore from "../../Store/Notification.store.js";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const inputStyle =
        "w-full px-4 py-3 mb-3 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400";

    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = AuthStore();
    const fetchMember = useFamilyStore(state => state.fetchMember);
    const fetchAllMedicines = useMedicineStore(state => state.fetchAllMedicines);
    const fetchAllNotifications = useNotificationStore(state => state.fetchAllNotifications);

    // const login = AuthStore((state) => state.login);


    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    // console.log(loginData);

    const handleInputChange = (e) => {
        setLoginData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/user/login', {
                email: loginData.email,
                password: loginData.password
            })

            fetchMember();
            fetchAllMedicines();
            fetchAllNotifications();
            setIsAuthenticated(true);
            toast.success(response.data.message || "Login Successfull");
            navigate('/');
        } catch (error) {
            console.log("something went wrong: ", error.message);
            toast.error("email or password is wrong");
        }
    }


    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-blue-100">

            {/* LEFT SECTION */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-blue-200 px-12">
                <h2 className="text-3xl font-semibold text-blue-700 mb-4">
                    New here?
                </h2>

                <p className="text-center text-gray-600 max-w-md mb-6">
                    Welcome to MediTrack! Create an account and
                    manage medicines easily.
                </p>

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition"
                    onClick={() => navigate("/register")}
                >
                    SIGN UP
                </button>

                <img
                    src="/login_signUp.png"
                    alt=""
                    className="w-64 mt-10"
                />
            </div>

            {/* RIGHT SECTION */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 min-h-screen md:min-h-0">


                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-2 text-blue-600 font-semibold text-xl">
                            <GiMedicines className="text-4xl" />
                            MediTrack
                        </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center">
                        Sign in
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            placeholder="Email"
                            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            onChange={handleInputChange}
                        />

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={loginData.password}
                                placeholder="Password"
                                onChange={handleInputChange}
                                className="w-full px-5 py-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition"
                        >
                            LOGIN
                        </button>

                    </form>

                    {/* Bottom Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                </div>

            </div >
        </div >
    );

}

export default Login
