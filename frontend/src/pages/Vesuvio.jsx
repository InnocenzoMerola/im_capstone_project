import { Link } from "react-router-dom";
import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it.json";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";

const Vesuvio = function () {
  const { language } = useLanguage();

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  return (
    <div className="container story-cont">
      <div>
        <h1>{translations.vesuvio}</h1>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-lg-7">
          <p>{translations.vesuvioText}</p>
          <div className="image-cont">
            <img src="/image/vesuvio.jpg" alt="" />
          </div>
          <p>{translations.vesuvioText2}</p>
          <p>{translations.vesuvioText3}</p>
          <div className="image-cont">
            <img src="/image/vesuvio-escursioni.jpg" alt="" />
          </div>

          <p>{translations.vesuvioText4}</p>
        </div>

        <div className="col-12 col-lg-4 offset-lg-1">
          <div>
            <h2 className="ps-lg-5">{translations.viewOther}</h2>
          </div>

          <div className="row row-gap-4 mt-4">
            <div className="col-6 offset-3 col-sm-4  col-lg-8  offset-sm-0 offset-lg-1  subcategory-home-rel">
              <Link to="/story">
                <img src="/image/Home-mini2.jpg" alt="" className="subcategory-home-img" />
                <div className="subcategory-voice-name">
                  {translations.history}
                  <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="col-6 offset-3 col-sm-4  col-lg-8  offset-sm-0 offset-lg-1 subcategory-home-rel">
              <Link to="/partenope">
                <img src="/image/Home-mini.jpg" alt="" className="subcategory-home-img" />
                <div className="subcategory-voice-name">
                  {translations.partenope}
                  <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="col-6 offset-3 col-sm-4  col-lg-8  offset-sm-0 offset-lg-1 subcategory-home-rel">
              <Link to="/voci-di-napoli">
                <img src="/image/Home-mini3.jpg" alt="" className="subcategory-home-img" />
                <div className="subcategory-voice-name">
                  {translations.voicesOfNaples}
                  <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vesuvio;
