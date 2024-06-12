// import axios from "axios";
// import { useEffect, useState } from "react";

// const CreateGuide = function () {
//   const [formData, setFormData] = useState({
//     name_it: "",
//     name_en: "",
//     name_fr: "",
//     time: "",
//     price: "",
//     mobility: "",
//     duration: "",
//     stops: [],
//   });
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/v1/categories")
//       .then((response) => setCategories(response.data))
//       .catch((error) => console.log("Errore durante il recupero delle categorie ", error));

//     axios.get("/api/v1/stops");
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/v1/guides", formData);
//       setFormData({
//         name_it: "",
//         name_en: "",
//         name_fr: "",
//         name_na: "",
//         date: "",
//         price: "",
//         mobility: "",
//         duration: "",
//       });
//     } catch (error) {
//       console.log("ERRORE", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="input-field">
//         <label>
//           Name (Italian):
//           <input type="text" name="name_it" value={formData.name_it} onChange={handleInputChange} />
//         </label>
//       </div>
//       <div className="input-field">
//         <label>
//           Name (English):
//           <input type="text" name="name_en" value={formData.name_en} onChange={handleInputChange} />
//         </label>
//       </div>
//       <div className="input-field">
//         <label>
//           Name (French):
//           <input type="text" name="name_fr" value={formData.name_fr} onChange={handleInputChange} />
//         </label>
//       </div>
//       <div className="input-field">
//         <label>
//           Name (Napolitan):
//           <input type="text" name="name_na" value={formData.name_na} onChange={handleInputChange} />
//         </label>
//       </div>

//       <div className="d-flex justify-content-center">
//         <button type="submit" className="login-btn">
//           CREA
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CreateGuide;
