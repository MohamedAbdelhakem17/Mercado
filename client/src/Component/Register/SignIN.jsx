import { Link } from 'react-router-dom';
import useLocalizationContext from '../../Context/Localization/LocalizationContext';
import { useState } from "react";
const SignIN = () => {

  const { login } = useLocalizationContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white w-full">
      <div className="flex items-center flex-col lg:flex-row bg-white  p-8 rounded-lg w-full ">
        {/* قسم تسجيل الدخول */}


        <div className="w-full lg:w-1/2  p-8 space-y-6 flex flex-col items-center">

          <div className=' flex items-center justify-center mb-6 gap-2'>
            <img src='public/logo.png' alt='' className=' w-10' />
            <h2 className='prata-regular text-red-600 font-medium text-xl italic'>Mercado</h2>

          </div>

          <h2 className="text-3xl font-medium text-center text-red-500">WELCOME BACK!</h2>
          <p className=' text-sm text-gray-400 italic'>Access Your personal account logging in</p>
          <form onSubmit={handleSubmit} className="space-y-4 w-[70%]">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email or mobile number</label>
              <input
                type="text"
                className="shadow-md w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=' relative'>
              <label className="block text-sm font-medium text-gray-700 mb-2">password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="shadow-md mt-1 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500"
              >
                <img
                  src={showPassword ? "public/SVGRepo_iconCarrier.svg" : "public/Vector.png"}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="w-5 h-5"
                />
              </button>
            </div>

            {/* placeholder="Enter your password" */}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-sm text-gray-500 hover:text-red-500">Forgot password</a>
            </div>
            <button type="submit" className="w-full px-4 py-3 text-white font-medium text-md bg-red-500 rounded-lg hover:bg-white hover:text-red-500 hover:border hover:border-gray-300">
              Sign in
            </button>
          </form>
          <button className="w-[70%] px-4 py-3 mt-4 border font-medium text-md border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="mr-2" />
            Sign in with Google
          </button>
          <p className="text-center text-gray-500">
            Don’t have an account? <Link to="/register" className="text-red-500 hover:underline font-medium text-md">Sign Up</Link>
          </p>

          <p className="text-center text-gray-500 mt-4 text-xs">
            By creating an account, you agree to Mercado <a href="#" className="text-red-600">Conditions of Use</a> and <a href="#" className="text-red-600">Privacy Notice</a>.
          </p>
        </div>

        {/* قسم الصورة */}
        <div className="hidden w-1/2 lg:flex items-center justify-center">
          <img src="public/Frame 72.png" alt="Shopping bags" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  )
}

export default SignIN
