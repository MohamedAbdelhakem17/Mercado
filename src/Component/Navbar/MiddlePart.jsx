import { Link } from "react-router-dom"
import useLocalization from "../../hooks/useLocalization"
import useLocalizationContext from "../../Context/Localization/LocalizationContext"

const MiddlePart = () => {
  const { language, changeLanguage } = useLocalizationContext()
  const content = useLocalization("middle_nav")

  const handleChange = (event) => {
    const languageSelected = event.target.value
    changeLanguage(languageSelected)
  }

  return (
    <div className="py-1 border-b-2 border-gray-400 flex items-center justify-between">
      {/* top links */}
      <ul>
        <li className="inline  text-[14px]"><Link><i className="fa-solid fa-shop text-main px-1"></i> <span> {content("sellOnMercado")}</span></Link></li>
        <li className="inline px-1 text-[14px]"><Link><i className="fa-solid fa-bag-shopping text-main px-1"></i> <span> {content("orderTracking")}</span></Link></li>
        <li className="inline px-1 text-[14px]"><Link><i className="fa-solid fa-eye text-main px-1"></i> <span> {content("recentlyViewed")} </span></Link></li>
      </ul>

      {/* language Select  */}
      <select name="language" value={language}  onChange={handleChange} className="font-normal text-slate-600 p-1 text-center focus:outline-none">
        <option value="ar">Ar</option>
        <option value="en">En</option>
      </select>
    </div >
  )
}

export default MiddlePart


