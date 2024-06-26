import axios from "axios";
import { useState } from "react";
import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";

const AddComment = ({ stopId, onAddComment }) => {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);
  const { language } = useLanguage();

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];
  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = { comment, rate };

    axios
      .post(`/api/v1/stops/${stopId}/comments`, newComment)
      .then((response) => {
        onAddComment(response.data);
        setComment("");
        setRate(1);
      })
      .catch((error) => console.log("Errore nell'aggiunta del commento", error));
  };

  const handleStarClick = (selectedRate) => {
    setRate(selectedRate);
  };

  return (
    <div className="container comment-container">
      <div className="row">
        <div className="col-sm-10 offset-sm-1 col-lg-6 offset-lg-3">
          <div className="card stops-form">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">{translations.addComment}</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <label htmlFor="comment" className="form-floating">
                    {translations.comment}
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    className="form-control comment-textarea-descript"
                    style={{ height: "15vh" }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rate" className="form-label">
                    {translations.stars}
                  </label>

                  <div>
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="rate"
                            value={ratingValue}
                            onClick={() => handleStarClick(ratingValue)}
                            style={{ display: "none" }}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-star-fill "
                            viewBox="0 0 16 16"
                            color={ratingValue <= rate ? "#ffc107" : "#e4e5e9"}
                            size={25}
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </label>
                      );
                    })}
                  </div>

                  {/* <select
                    className="form-control stops-input"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    id="rate"
                    name="rate"
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4 </option>
                    <option value="5">5 </option>
                  </select> */}
                </div>
                <div className="my-4">
                  <button type="submit" className="create-edit-btn">
                    {translations.add}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
