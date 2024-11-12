import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import { LocalizationContext } from "./LocalizationContext";



const LocalizationProvider = ({ children }) => {
    const isEnglish = useRef(true)
    const [language, setLanguage] = useState("");
    const { i18n } = useTranslation();

    // Function to change the language
    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);

        const isArabic = lang === "ar";
        isEnglish.current = !isArabic

        const rootElement = document.documentElement;
        const body = document.body;

        rootElement.setAttribute("dir", isArabic ? "rtl" : "ltr");
        rootElement.setAttribute("lang", isArabic ? "ar" : "en");
        body.setAttribute("class", isArabic ? "font-main-ar" : "font-main");

        i18n.changeLanguage(lang);
    };

    const initializeLanguage = (lang) => {
        const currentLanguage = localStorage.getItem("language") || lang;
        changeLanguage(currentLanguage);
    };

    useEffect(() => {
        initializeLanguage("en");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);



      // إنشاء حالة user
  const [user, setUser] = useState({
    name: '',
    number: '',
    password: '',
  });

  // دالة handleChange لتحديث القيم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const [otp, setOtp] = useState('');

    return (
        <LocalizationContext.Provider value={{ changeLanguage, language, isEnglish: isEnglish.current, user , handleChange ,otp, setOtp  }}>
            {children}
        </LocalizationContext.Provider>
    );
};

LocalizationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LocalizationProvider;
