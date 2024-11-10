import { Link } from "react-router-dom";
import useLocalization from "../../hooks/useLocalization";

const TopPart = () => {
  const setContent = useLocalization("top_nav");

  return (
    <div className="w-full bg-main text-white flex-center gap-x-3 p-2 text-center">
      <button className="bg-white rounded-3xl py-1 px-4 text-black font-bold text-[14px]">
        {setContent("special_button")}
      </button>
      <p >
        {setContent("get")} <strong className="px-1">{setContent("discount_percentage")}</strong> {setContent("first_order")}
      </p>
      <Link to="/register" className="font-thin italic underline ">
        {setContent("register_link_text")}
      </Link>
    </div>
  );
};

export default TopPart;
