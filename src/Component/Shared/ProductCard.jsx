import PropTypes from 'prop-types';
import useGenerateStars from "../../hooks/useGenerateStars";
import ima from "./pro.png";
import useLocalizationContext from '../../Context/Localization/LocalizationContext';

const ProductCard = ({ title = "Apple Watch Series 8 GPS + Cellular Stainless Steel Case with Milanese Loop" }) => {
    const { isEnglish } = useLocalizationContext()

    const EnglishStyle = "border-r-transparent border-b-transparent -rotate-[10deg]"
    const ArabicStyle = "border-l-transparent border-t-transparent rotate-[277deg]"

    return (
        <div className='sm:w-10/12 md:w-6/12 lg:w-3/12 py-4 px-6 mx-auto max-[10240px]:w-4/12'>
            <div className=" relative rounded-md border-gray-300 border-2 py-3 inverted-radius">

                {/* Top section with Installment button and favorite icon */}
                <div className="flex items-center justify-between absolute top-2 left-0 w-full p-2 z-10">
                    <button className='border-main border-[1px] rounded-3xl py-1 px-4 text-main text-[14px]'>0 % Installment</button>
                    <i className="fa-regular fa-heart w-[40px] h-[40px] p-1 bg-white cursor-pointer text-main text-xl grid place-items-center border-gray-300 border-[3px] rounded-full 
                    hover:bg-main hover:text-white hover:border-main
                    "></i>
                </div>

                {/* Product Image */}
                <img src={ima} alt={title} className='w-[150px] h-[200px] mx-auto my-4' />

                {/* Product Details */}

                <div className='  border-t-2 py-3 rounded-3xl p-3 '>
                    {/* Discount Tag */}
                    <button className='rounded-3xl py-1 px-4 bg-red-600 text-white text-[14px]'>24% OFF</button>

                    {/* Product Title */}
                    <h3 className='py-2 font-bold text-lg leading-tight'>{title}</h3>

                    {/* Rating */}
                    <div className="flex items-center">
                        <span>{useGenerateStars(4.8)}</span>
                        <span className='font-bold ml-1 px-2'>(4.8)</span>
                    </div>

                    {/* Price */}
                    <h5 className="text-lg font-semibold mt-2">
                        EGP <strong className='text-red-500'>167</strong>
                        <span className='text-gray-500 line-through ml-2 font-normal'>Was: EGP 220</span>
                    </h5>
                </div>

                {/* Add to Cart Button */}

                <div className={`absolute -end-4 -bottom-2 bg-white flex-center border-gray-300 border-[2px] rounded-full p-2 ${isEnglish ? EnglishStyle : ArabicStyle}`}>
                    <i className={`fa-solid fa-cart-shopping w-[60px] h-[60px] p-1 bg-main cursor-pointer text-white text-3xl grid place-items-center rounded-full border-2 ${isEnglish ? "rotate-[8deg]" : "rotate-[80deg]"}`}></i>
                </div>

            </div>
        </div>
    );
};

ProductCard.propTypes = {
    title: PropTypes.string.isRequired
};

export default ProductCard;






