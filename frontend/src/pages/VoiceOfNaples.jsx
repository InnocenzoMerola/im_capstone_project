import { Link } from "react-router-dom";
import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it.json";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";

const VoiceOfNaples = function () {
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
        <h1>{translations.voicesOfNaples}</h1>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-lg-7">
          <p className="margin-person">{translations.voicesText}</p>

          <div className="margin-person">
            <h4 className="mb-3 bold-text">Pino Daniele</h4>
            <p>
              {translations.pinoDanieleText1}
              <span className="bold-text">{translations.boldTextPinoDaniele[0].text1}</span>{" "}
              {translations.pinoDanieleText2}
              <span className="bold-text">{translations.boldTextPinoDaniele[0].text2}</span>
              {translations.pinoDanieleText3}
            </p>
            <div className="image-cont">
              <img src="/image/person/Pinodaniele.jpg" alt="" />
            </div>
            <p>
              {translations.pinoDanieleText4}
              <span className="bold-text">{translations.boldTextPinoDaniele[0].text3}</span>{" "}
              {translations.pinoDanieleText5}
              <span className="bold-text">{translations.boldTextPinoDaniele[0].text4}</span>{" "}
              {translations.pinoDanieleText6}
              <span className="bold-text">{translations.boldTextPinoDaniele[0].text5}</span>{" "}
              {translations.pinoDanieleText7}
              <span className="bold-text">{translations.boldTextPinoDaniele[0].text6}</span>
            </p>

            <div className="image-cont">
              <img src="/image/person/Pino-daniele.webp" alt="" />
            </div>
          </div>

          <div className="margin-person">
            <h4 className="mb-3 bold-text">Massimo Troisi</h4>
            <p>
              {translations.massimoTroisiText1}{" "}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text1}</span>{" "}
              {translations.massimoTroisiText2}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text2}</span>{" "}
              {translations.massimoTroisiText3}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text3}</span>{" "}
              {translations.massimoTroisiText4}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text4}</span>,{" "}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text5}</span>,{" "}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text6}</span> e{" "}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text7}</span>.
            </p>
            <div className="image-cont">
              <img src="/image/person/Smorfia.webp" alt="" />
            </div>
            <p>
              {translations.massimoTroisiText5}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text8}</span>
              {translations.massimoTroisiText6}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text9}</span>
              {translations.massimoTroisiText7}
            </p>

            <p>
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text10}</span>
              {translations.massimoTroisiText8}
              <span className="bold-text">{translations.boldTextMassimoTroisi[0].text11}</span>{" "}
              {translations.massimoTroisiText9}
            </p>

            <div className="image-cont">
              <img src="/image/person/Massimotroisi.jpg" alt="" />
            </div>
            <div className="image-cont">
              <img src="/image/person/Massimo-troisi.jpg" alt="" />
            </div>
          </div>

          <div className="margin-person">
            <h4 className="mb-3 bold-text">Edoardo De Filippo</h4>
            <p>
              {translations.deFilippoText1}
              <span className="bold-text">{translations.boldTextDeFilippo[0].text1}</span>,{" "}
              <span className="bold-text">{translations.boldTextDeFilippo[0].text2}</span> e{" "}
              <span className="bold-text">{translations.boldTextDeFilippo[0].text3}</span>
              {translations.deFilippoText2}
            </p>
            <div className="image-cont">
              <img src="/image/person/Eduardo-de-filippo.jpg" alt="" />
            </div>
            <p>
              {translations.deFilippoText3}
              <span className="bold-text">{translations.boldTextDeFilippo[0].text4}</span> {translations.deFilippoText4}
              <span className="bold-text">{translations.boldTextDeFilippo[0].text5}</span> {translations.deFilippoText5}
              <span className="bold-text">{translations.boldTextDeFilippo[0].text6}</span> {translations.deFilippoText6}
            </p>

            <div className="image-cont">
              <img src="/image/person/Eduardodefilippo.gif" alt="" />
            </div>
          </div>

          <div className="margin-person">
            <h4 className="mb-3 bold-text">Antonio De Curtis</h4>
            <p>
              {translations.deCurtisText1} <span className="bold-text">{translations.boldTextDeCurtis[0].text1}</span>
              {translations.deCurtisText2}
              <span className="bold-text">{translations.boldTextDeCurtis[0].text2}</span>,
              <span className="bold-text">{translations.boldTextDeCurtis[0].text3}</span> e{" "}
              <span className="bold-text">{translations.boldTextDeCurtis[0].text4}</span>
              {translations.deCurtisText3}
            </p>
            <div className="image-cont">
              <img src="/image/person/Toto-2.jpg" alt="" />
            </div>
            <p>
              {translations.deCurtisText4} <span className="bold-text">{translations.boldTextDeCurtis[0].text5}</span>
              {translations.deCurtisText5}
              <span className="bold-text">{translations.boldTextDeCurtis[0].text6}</span>
              {translations.deCurtisText6}
              <span className="bold-text">{translations.boldTextDeCurtis[0].text7}</span>
              {translations.deCurtisText7}
              <span className="bold-text">{translations.boldTextDeCurtis[0].text8}</span>
              {translations.deCurtisText8}
            </p>

            <div className="image-cont">
              <img src="/image/person/Toto.webp" alt="" />
            </div>
          </div>

          <div>
            <h4 className="mb-3 bold-text">Sophia Loren</h4>
            <p>
              {translations.sophiaLorenText1}{" "}
              <span className="bold-text">{translations.boldTextSophiaLoren[0].text1}</span>.
              {translations.sophiaLorenText2}{" "}
              <span className="bold-text">{translations.boldTextSophiaLoren[0].text2}</span>
              {translations.sophiaLorenText3}
              <span className="bold-text">{translations.boldTextSophiaLoren[0].text3}</span> e{" "}
              <span className="bold-text">{translations.boldTextSophiaLoren[0].text4}</span>.
            </p>

            <div className="image-cont">
              <img src="/image/person/Sophialoren.jpg" alt="" />
            </div>
            <p>
              {translations.sophiaLorenText4}{" "}
              <span className="bold-text">{translations.boldTextSophiaLoren[0].text5}</span>,
              {translations.sophiaLorenText5}{" "}
              <span className="bold-text">{translations.boldTextSophiaLoren[0].text6}</span>
              {translations.sophiaLorenText6}
              <span className="bold-text">{translations.boldTextSophiaLoren[0].text7}</span>
              {translations.sophiaLorenText7}
            </p>

            <div className="image-cont">
              <img src="/image/person/Sophia-loren.jpg" alt="" />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 offset-lg-1">
          <div>
            <h2 className="ps-lg-5">Vedi anche</h2>
          </div>

          <div className="row row-gap-4 mt-4">
            <div className="col-4 offset-4 col-lg-8   offset-sm-0 offset-lg-1  subcategory-home-rel">
              <Link to="/story">
                <img src="/image/Home-mini2.jpg" alt="" className="subcategory-home-img" />
                <div className="subcategory-voice-name">
                  Storia
                  <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="col-4 offset-4  col-lg-8   offset-sm-0 offset-lg-1 subcategory-home-rel">
              <Link to="/partenope">
                <img src="/image/Home-mini.jpg" alt="" className="subcategory-home-img" />
                <div className="subcategory-voice-name">
                  Partenope
                  <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="col-4 offset-4  col-lg-8  offset-sm-0 offset-lg-1 subcategory-home-rel">
              <Link to="/vesuvio">
                <img src="/image/Home-mini3.jpg" alt="" className="subcategory-home-img" />
                <div className="subcategory-voice-name">
                  Vesuvio
                  <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* <video src="https://www.youtube.com/watch?v=ZDPJxMiIJeU" controls width="400" height="400" muted></video> */}
        </div>
      </div>
    </div>
  );
};

export default VoiceOfNaples;
