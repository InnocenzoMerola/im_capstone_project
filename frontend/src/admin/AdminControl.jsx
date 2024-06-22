import { Link } from "react-router-dom";
import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";

const AdminControl = function () {
  const { language } = useLanguage();

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];
  return (
    <div className="container admin-expand">
      <div className="row ">
        <div className="col">
          <Link to="/create-stops">{translations.createStop}</Link>
        </div>

        <div className="col">
          <Link to="/create-itineraries">{translations.createItinerary}</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
