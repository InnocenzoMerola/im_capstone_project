import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";
import { useSelector } from "react-redux";

const ShowComment = ({ comments }) => {
  console.log("Commenti", comments);
  const { language } = useLanguage();
  const user = useSelector((state) => state.user);

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          fill="currentColor"
          className="bi bi-star-fill "
          viewBox="0 0 16 16"
          color={i <= rating ? "#ffc107" : "#e4e5e9"}
          size={25}
          style={{ marginRight: "2px" }}
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div>
      <h2>{translations.comments}</h2>
      {user ? (
        <>
          {comments && comments > 0 ? (
            <ul className="p-0">
              {comments.map((comment) => (
                <li key={comment.id} className="comments">
                  <div className="d-flex justify-content-between">
                    <div className="comment-img-cont">
                      <img src={comment.profile_img} alt="" />
                      <p className="m-0">{comment.username}</p>
                    </div>
                    <div className="d-flex align-items-start">
                      <div>{renderStars(comment.rate)}</div>
                    </div>
                  </div>
                  <div className="comment-comment-cont">
                    <div>
                      <p className="m-0">{comment.comment}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4">
              <h5>{translations.notComment}</h5>
            </div>
          )}
        </>
      ) : (
        <p>{translations.commentAccess}</p>
      )}
    </div>
  );
};

export default ShowComment;
