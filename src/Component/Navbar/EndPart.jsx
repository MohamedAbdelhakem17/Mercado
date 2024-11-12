import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import useLocalizationContext from "../../Context/Localization/LocalizationContext"
import logo from "./logo.svg"
import logoAr from "./logo_ar.svg"
import useLocalization from "../../hooks/useLocalization"

const EndPart = () => {
  const { isEnglish } = useLocalizationContext()
  const searchKeyword = useRef()
  const [toggleNavbar, setToggleNavbar] = useState(false)
  const content = useLocalization()

  const activeLineStyle = "font-bold border-b-2 border-solid border-main"
  const hoverLinkStyle = "hover:font-bold hover:border-b-2 hover:border-solid hover:border-main ease-linear duration-300"

  const handelToggleNavbar = () => {
    setToggleNavbar(prev => !prev)
    alert(toggleNavbar)
  }

  const handelSearch = () => {
    alert(searchKeyword.current.value)
  }

  return (
    <div className="py-2 flex items-center sm:justify-between md:justify-between gap-x-16">
      {/* logo */}
      <div className="w-[200px]">
        <img src={isEnglish ? logo : logoAr} alt={content("logo_alt")} />
      </div>

      {/* nav btn */}
      <button onClick={handelToggleNavbar} className=" text-white px-2 py-1  bg-main rounded w-[40px] h-[40px] text-[17px] hover:bg-white hover:text-main hover:border-main hover:border-2 sm:flex sm:items-center md:justify-center lg:hidden">
        <i className={`fa-solid fa-${toggleNavbar ? "x" : "bars"}`}></i>
      </button>

      <div className="md:hidden lg:flex items-center gap-x-10 ">
        {/* links */}
        <ul>
          <li className="px-2 inline-block"><Link className={`text-center py-1 ${hoverLinkStyle} ${activeLineStyle}`}>{content("links.home")}</Link></li>
          <li className="px-2 inline-block"><Link className={`text-center py-1 ${hoverLinkStyle}`}>{content("links.products")}</Link></li>
          <li className="px-2 inline-block"><Link className={`text-center py-1 ${hoverLinkStyle}`}>{content("links.about")}</Link></li>
          <li className="px-2 inline-block"><Link className={`text-center py-1 ${hoverLinkStyle}`}>{content("links.contact")}</Link></li>
        </ul>

        {/* search */}
        <div className="flex items-center rounded-[70px] overflow-hidden py-2 h-[70px]">
          <select name="category" className="p-3 bg-gray-100 text-center focus:outline-none font-light h-full w-[180px]">
            <option value="all">{content("search.all_categories")}</option>
            <option value="tech">{content("search.tech")}</option>
            <option value="clothe">{content("search.clothe")}</option>
          </select>
          <div className="border-[2px] border-gray-200 p-2 h-full flex items-center rounded-e-[70px]">
            <input type="text" placeholder={content("search.placeholder")} className="h-full focus:outline-none w-[350px]" ref={searchKeyword} />
            <i className="fa-solid fa-magnifying-glass w-[40px] h-[40px] rounded-full flex items-center justify-center text-main bg-gray-200 cursor-pointer" onClick={handelSearch}></i>
          </div>
        </div>

        {/* Location */}
        <div className="bg-gray-100 rounded-full px-6 py-4 space-x-2 text-[14px]">
          <i className="fa-solid fa-location-dot px-2"></i>
          <span>{content("location.deliver_to")}</span>
          <span className="font-bold">{content("location.country")}</span>
        </div>

        {/* User */}
        <div className="flex items-center gap-x-8">
          <div className="flex items-center gap-x-3">
            <i className="fa-regular fa-user text-main text-[20px]"></i>
            <Link><span>{content("user.sign_in")}</span><br /><span className="font-bold p-0">{content("user.account")}</span></Link>
          </div>
          <i className="text-main cursor-pointer text-[20px] fa-regular fa-heart"></i>
          <i className="text-main cursor-pointer text-[20px] fa-solid fa-bag-shopping"></i>
        </div>
      </div>
    </div>
  )
}

export default EndPart