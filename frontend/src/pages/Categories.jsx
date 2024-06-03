// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/categories")
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   }, []);

//   const renderCategories = (categories) => {
//     return categories.map((category) => (
//       <li key={category.id}>
//         {category.name}
//         {category.children && category.children.length > 0 && <ul>{renderCategories(category.children)}</ul>}
//       </li>
//     ));
//   };

//   return (
//     <div>
//       <h1>Category List</h1>
//       <ul>{renderCategories(categories)}</ul>
//     </div>
//   );
// };

// export default Categories;
