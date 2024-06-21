import { useEffect, useRef, useState } from "react";
import { updateProfile, updatePassword, uploadImage, update_user } from "../../redux/actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, updateProfileImage } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../traductions/LanguageContext";
import translationsIt from "../../traductions/translate-page/translation-it";
import translationsEn from "../../traductions/translate-page/translation-en";
import translationsFr from "../../traductions/translate-page/translation-fr";
import translationsSp from "../../traductions/translate-page/translation-sp";

const Profile = function ({ token }) {
  const [profileImage, setProfileImage] = useState(null);
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const [showImageBtn, setShowImageBtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    surname: "",
    phone: "",
    age: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profile_img: "",
  });

  useEffect(() => {
    const fetchUserData = () => {
      axios
        .get("/api/v1/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          setFormData({
            ...formData,
            name: userData.name || "",
            email: userData.email || "",
            surname: userData.surname || "",
            phone: userData.phone || "",
            age: userData.age || "",
          });
        })
        .catch((error) => console.log("Errore nella chiamata Api", error));
    };

    fetchUserData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { name, email, surname, phone, age } = formData;
    try {
      await updateProfile(formData, token);

      dispatch(update_user({ name, email, surname, phone, age }));

      alert("Profilo aggiornato con successo");
    } catch (error) {
      console.log(error);
      alert("Aggiornamento profilo fallito");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    try {
      await updatePassword(
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        token
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      alert("Password aggiornata con successo");
    } catch (error) {
      console.log(error);
      alert("Aggiornamento password fallito");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setShowImageBtn(true);
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile_img", profileImage);

    try {
      const response = await uploadImage(formData, token);
      const newImagePath = response.data.file_path;

      setFormData((prevState) => ({
        ...prevState,
        profile_img: newImagePath,
      }));

      dispatch(updateProfileImage(newImagePath));

      alert(`Immagine aggiunta con successo. Path: ${response.data.file_path}`);

      setProfileImage("");
      setShowImageBtn(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert("Errore durante il caricamento dell'immagine: " + error.response.data.message);
      } else {
        console.log(error);
        alert("Errore durante ls comunicazione con il server");
      }
    }
  };

  const handleCancelUpload = () => {
    setProfileImage(null);
    setShowImageBtn(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSvgClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch({ type: LOGOUT }))
      .then(() => navigate("/"))
      .catch((error) => console.log("Errore", error));
  };

  return (
    <div className="container profile-container">
      <div className="row">
        <div className="col-4 offset-4">
          <div className="d-flex justify-content-center mb-5 position-relative">
            <form onSubmit={handleUploadImage}>
              <div className="profile-page-img-flex">
                <div className="profile-page-img-rel">
                  <img
                    src={user.profile_img ? user.profile_img : "/image/profile-image.png"}
                    alt=""
                    className="profile-page-img"
                  />
                  <div className="profile-page-img-abs" onClick={handleSvgClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </div>
                </div>

                <div className="profile-page-img-rel">
                  <input
                    type="file"
                    name="profile_img"
                    onChange={handleFileChange}
                    // value={profileImage ? profileImage.name : ""}
                    className="d-none"
                    ref={fileInputRef}
                  />
                  {showImageBtn && (
                    <div className="d-flex gap-2 acp-cancl-btn-abs">
                      <div>
                        <button onClick={handleUploadImage} className="update-profile-img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-check-lg"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button onClick={handleCancelUpload} className="cancel-update-profile-img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="currentColor"
                            className="bi bi-x"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
            <div className="logout-abs">
              <button onClick={logout} className="btn-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-right text-white"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <h2 className="mb-4">{translations.profile1}</h2>
          <div>
            <form onSubmit={handleUpdateProfile}>
              <div className="input-field profile">
                <label htmlFor="name">{translations.name}</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control profile-input"
                />
              </div>

              <div className="input-field profile">
                <label htmlFor="surname">{translations.surname}</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="form-control profile-input "
                />
              </div>

              <div className="input-field profile">
                <label htmlFor="email">{translations.profileEmail}</label>
                <input
                  type="email"
                  name="email"
                  id="emial"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control profile-input"
                />
              </div>

              <div className="input-field profile">
                <label htmlFor="phone">{translations.phone}</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control profile-input"
                />
              </div>
              <div className="input-field profile">
                <label htmlFor="age">{translations.age}</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-control profile-input"
                />
              </div>
              <button type="submit" className="profile-btn">
                {translations.profile2}
              </button>
            </form>
          </div>

          <div className="upload-pass">
            <form onSubmit={handleUpdatePassword}>
              <h2 className="mb-4">{translations.profile3}</h2>
              <div className="input-field profile">
                <label htmlFor="currentPassword">{translations.profile5}</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="form-control profile-input"
                />
              </div>
              <div className="input-field profile">
                <label htmlFor="newPassword">{translations.profile6}</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="form-control profile-input"
                />
              </div>
              <div className="input-field profile">
                <label htmlFor="confirmPassword">{translations.profile7}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control profile-input"
                />
              </div>
              <button type="submit" className="profile-btn">
                {translations.profile4}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
