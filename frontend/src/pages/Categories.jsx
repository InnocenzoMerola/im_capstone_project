import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = function () {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/v1/categories")
      .then((response) => {
        if (!response.ok) navigate("/404");
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => {
        console.log("Errore nella chiamata api", error);
      });
  }, []);

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <li key={category.id}>
        {category.name}
        {category.children && category.children.length > 0 && <ul>{renderCategories(category.children)}</ul>}
      </li>
    ));
  };

  return (
    <div>
      <h1>Categorie</h1>
      <ul>{renderCategories(categories)}</ul>
    </div>
  );
};

export default Categories;
