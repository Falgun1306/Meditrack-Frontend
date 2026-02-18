import { GiMedicines } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../utilities/axiosInstance";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
    const nevigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const inputStyle =
        "w-full px-4 py-3 mb-3 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400";
    const navigate = useNavigate();

    const [signUpData, setsignUpData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    // console.log(signUpData);


    const handleInputChange = (e) => {
        setsignUpData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/user/register', {
                name: signUpData.name,
                phoneNum: Number(signUpData.phoneNumber),
                email: signUpData.email,
                password: signUpData.password,
                confirmPassword: signUpData.confirmPassword
            });
            // console.log(response);

            toast.success(response.data.message || "Registration successful");
            navigate('/login');

        } catch (error) {
            console.log("something went wrong: ", error.message);
            toast.error("please check details");
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-blue-100">

            {/* LEFT SECTION */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-blue-200 px-12">
                <h2 className="text-3xl font-semibold text-blue-700 mb-4">
                    Already a member?
                </h2>

                <p className="text-center text-gray-600 max-w-md mb-6">
                    Login and manage your medicines easily.
                </p>

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition"
                    onClick={() => navigate("/login")}
                >
                    SIGN IN
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
                        Sign Up
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            name="name"
                            value={signUpData.name}
                            placeholder="Full Name"
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />

                        <input
                            type="tel"
                            name="phoneNumber"
                            value={signUpData.phoneNumber}
                            placeholder="Phone Number"
                            maxLength={10}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,10}$/.test(value)) {
                                    setsignUpData((prev) => ({
                                        ...prev,
                                        phoneNumber: value,
                                    }));
                                }
                            }}
                            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />

                        <input
                            type="email"
                            name="email"
                            value={signUpData.email}
                            placeholder="Email"
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={signUpData.password}
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

                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={signUpData.confirmPassword}
                                placeholder="Confirm Password"
                                onChange={handleInputChange}
                                className="w-full px-5 py-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? (
                                    <FiEyeOff size={20} />
                                ) : (
                                    <FiEye size={20} />
                                )}
                            </button>
                        </div>


                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition"
                        >
                            Sign Up
                        </button>

                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>

            </div >
        </div >
    );
}

export default SignUp
