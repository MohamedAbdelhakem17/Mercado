import useLocalizationContext from '../../Context/Localization/LocalizationContext';

const Number = () => {
    const { otp, setOtp } = useLocalizationContext()

    const handleInputChange = (e) => {
        setOtp(e.target.value);
      };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className=' flex items-center justify-center mb-16 gap-2'>
                <img src='public/logo.png' alt='' className=' w-10' />
                <h2 className='prata-regular text-red-600 font-medium text-xl italic'>Mercado</h2>

            </div>

            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg border border-gray-300">

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-5">Verif mobile number</h2>
                    <p className="text-gray-600 mb-3 text-sm">
                        A text with a One Time Password (OTP) has been sent to your mobile number : 01056885202 <span className="text-red-500 cursor-pointer font-medium text-md">Change</span>
                    </p>
                </div>
                <div>

                    <div className=' flex justify-between items-center'>
                        <label htmlFor="otp" className="block text-md font-medium text-gray-700">Enter OTP</label>
                        <div className="flex justify-end mt-1 text-md text-red-500 cursor-pointer font-medium">Resend OTP</div>
                    </div>

                    <input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={handleInputChange}
                        className="shadow-md w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />

                </div>
                <button className="w-full px-4 py-3 font-semibold text-white bg-red-500 rounded-lg hover:bg-white hover:text-red-500 border">Create your account</button>
                <p className="text-xs text-center text-gray-600">
                    By creating an account, you agree to Mercado <span className="text-red-500 cursor-pointer">Conditions of Use</span> and <span className="text-red-600 cursor-pointer">Privacy Notice</span>
                </p>
            </div>
        </div>
    )
}

export default Number


