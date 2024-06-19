import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";

const Home = function () {
  const [subcategories, setSubcategories] = useState([]);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  useEffect(() => {
    fetch(`/api/v1/categories`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/404");
        }
      })
      .then((data) => {
        const selectedSubcategoryIds = [7, 9, 8, 3, 5, 4];
        const filteredSubcategories = data
          .map((category) => category.children.filter((child) => selectedSubcategoryIds.includes(child.id)))
          .flat();
        setSubcategories(filteredSubcategories);
      })
      .catch((error) => console.log("Errore", error));
  }, [navigate]);

  const subcategoryImage = {
    3: "/image/Home-mini.jpg",
    5: "/image/Home-mini2.jpg",
    7: "/image/Home-mini3.jpg",
    9: "/image/Home-mini4.jpg",
    8: "/image/Home-mini5.jpg",
    4: "/image/Home-mini6.jpg",
  };

  return (
    <>
      <div className="vesuvio-home" id="home">
        <div className="d-flex h-100 on-vesuvio-text">
          <div>
            <h1>{translations.headerTitle}</h1>
            <h2>{translations.headerSubtitle}</h2>
          </div>
        </div>
      </div>

      <div>
        <div className="container" id="about">
          <div className="row">
            <div className="col">
              <h2 className="about-us-title">{translations.aboutTitle}</h2>
              <p className="about-us-desc">
                {translations.aboutText1}

                <span>{translations.aboutText2}</span>
                <span className="d-flex justify-content-center">
                  <img src="/image/Home-murales-2.jpg" alt="" className="about-us-img" />
                </span>
                <span>{translations.aboutText3}</span>
                <span>{translations.aboutText4}</span>
                {translations.aboutText5}
              </p>
            </div>
            <div className="col">
              {/* <video src="video/Napoli-drone.mp4" controls width="400" height="400" muted></video> */}
            </div>
          </div>
        </div>

        <div className="container what-see">
          <div className="row justify-content-between align-items-center">
            <div className="col-5">
              <h2>{translations.whatToSeeTitle}</h2>
              <p>{translations.whatToSee1}</p>
              <p>{translations.whatToSee2}</p>
              <p>{translations.whatToSee2}</p>
            </div>
            <div className="col-5 d-flex justify-content-center">
              <div className="row row-gap-4">
                {subcategories.slice(0, 6).map((subcategory) => (
                  <div key={subcategory.id} className="col-4 subcategory-home-rel">
                    <Link to={`/categories/${subcategory.id}`}>
                      <img src={subcategoryImage[subcategory.id]} alt="" className="subcategory-home-img" />
                      <div className="subcategory-home-name">
                        {language === "it" && subcategory.name_it}
                        {language === "en" && subcategory.name_en}
                        {language === "fr" && subcategory.name_fr}
                        {language === "sp" && subcategory.name_sp}
                        <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 320 512">
                          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
