import { useState } from "react";
import { Link } from "react-router-dom";


const SignUP = () => {


    const [user, setUser] = useState({
        name: '',
        password: ""
    })


    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>

            <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full ">
                <div className="flex flex-col lg:flex-row bg-white  p-8 rounded-lg w-full">


                    {/* Right Side: Form */}
                    <div className="w-full lg:w-1/2 p-6">

                        <div className=' flex items-center justify-center mb-6 gap-2'>
                            <img src='public/logo.png' alt='' className=' w-10' />
                            <h2 className='prata-regular text-red-600 font-medium text-xl italic'>Mercado</h2>

                        </div>

                        <h2 className="text-center text-3xl font-semibold text-red-600 mb-4">Create account</h2>
                        <p className="text-gray-600 mb-6 text-center">Enter your details to create your account and get started</p>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Your name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={() => setUser("")}
                                    placeholder="First and Last name"
                                    className="shadow-md mt-1 px-4 py-3 border border-gray-300 rounded-lg w-11/12 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <div className="flex items-center gap-2 w-11/12">
                                    {/* حقل اختيار الدولة */}
                                    <select
                                        name="countryCode"
                                        className="shadow-md px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="EG">EG +20</option>
                                        <option value="US">US +1</option>
                                        <option value="SA">SA +966</option>
                                        {/* أضف المزيد من الدول حسب الحاجة */}
                                    </select>

                                    {/* حقل إدخال رقم الهاتف */}
                                    <input
                                        type="text"
                                        name="mobile"
                                        placeholder="Mobile number"
                                        className="shadow-md px-4 py-3 border border-gray-300 rounded-lg w-11/12  focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>



                            <div className=' relative'>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={user.password}
                                    placeholder="At Least 8 characters"
                                    className="shadow-md mt-1 px-4 py-3 border border-gray-300 rounded-lg w-11/12 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-20 top-2/3 transform -translate-y-1/2 text-gray-500"
                                >
                                    <img
                                        src={showPassword ? "public/SVGRepo_iconCarrier.svg" : "public/Vector.png"}
                                        alt={showPassword ? "Hide password" : "Show password"}
                                        className="w-5 h-5"
                                    />
                                </button>
                            </div>

                            <div className=' relative'>
                                <label className="block text-sm font-medium text-gray-700">Re-enter password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={user.password}
                                    placeholder="At Least 8 characters"
                                    className="shadow-md mt-1 px-4 py-3 border border-gray-300 rounded-lg w-11/12 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-20 top-2/3 transform -translate-y-1/2 text-gray-500"
                                >
                                    <img
                                        src={showPassword ? "public/SVGRepo_iconCarrier.svg" : "public/Vector.png"}
                                        alt={showPassword ? "Hide password" : "Show password"}
                                        className="w-5 h-5"
                                    />
                                </button>
                            </div>

                            <button className="w-11/12 mt-6 bg-red-500 text-white py-3 rounded-lg hover:bg-white hover:text-red-600 hover:border">
                                Verify mobile number
                            </button>

                            <div className="flex items-center  mt-4">
                                <button className="bg-white border border-gray-300 rounded-lg hover:bg-gray-100 px-4 py-2 w-11/12 flex items-center justify-center text-red-600 font-medium text-lg">
                                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Icon" className="h-5 w-5 mr-2" />
                                    Sign in with Google
                                </button>
                            </div>

                        </form>

                        <p className="text-center mt-4 text-gray-600">
                            Already have an account? <Link to="/login" className=" font-medium text-lg">Sign in</Link>
                        </p>

                        <p className="text-center text-gray-500 mt-4 text-xs">
                            By creating an account, you agree to Mercado <a href="#" className="text-red-600">Conditions of Use</a> and <a href="#" className="text-red-600">Privacy Notice</a>.
                        </p>
                    </div>

                    {/* Left Side: Image */}
                    <div className="hidden lg:block lg:w-1/2">
                        <img src='public/Frame 72.png' alt="Shopping Bags" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUP