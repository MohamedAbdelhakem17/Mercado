import { useMemo } from "react";
import { useTranslation } from 'react-i18next';

const useLocalization = (superKey) => {
    const { t } = useTranslation();

    const setContent = useMemo(() => {
        return (key) => {
            if (superKey) {
                return t(`${superKey}.${key}`);
            }
            return t(key);
        };
    }, [superKey, t]);

    return setContent;
};

export default useLocalization;
