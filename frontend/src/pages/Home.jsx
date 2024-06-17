import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = function () {
  const [subcategories, setSubcategories] = useState([]);

  const navigate = useNavigate();

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
        const selectedSubcategoryIds = [7, 9, 15, 3, 5, 8];
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
    8: "/image/Home-mini4.jpg",
    9: "/image/Home-mini5.jpg",
    15: "/image/Home-mini6.jpg",
  };

  return (
    <>
      <div className="vesuvio-home" id="home">
        <div className="d-flex h-100 on-vesuvio-text">
          <div>
            <h1>La tua guida a Napoli</h1>
            <h2>
              Esplora Napoli con Passione e Autenticità: Le Nostre Guide Ti Portano alla Scoperta dei Tesori Nascosti
              della Città
            </h2>
          </div>
        </div>
      </div>

      <div>
        <div className="container" id="about">
          <div className="row">
            <div className="col">
              <h2 className="about-us-title">Chi siamo</h2>
              <p className="about-us-desc">
                Benvenuti in I&M, il punto di riferimento per un'esperienza turistica indimenticabile a Napoli! Siamo un
                team appassionato e competente di guide turistiche locali, dedicato a mostrare ai visitatori il meglio
                che questa meravigliosa città ha da offrire.
                <span>
                  Guidiamo i nostri ospiti attraverso le strade ricche di storia, arte e cultura di Napoli, svelando
                  segreti nascosti e raccontando storie affascinanti che rendono ogni angolo della città un tesoro da
                  scoprire. Ogni guida del nostro team è un esperto del territorio, dotato di conoscenze approfondite e
                  un amore sincero per la nostra città.{" "}
                </span>
                <span className="d-flex justify-content-center">
                  <img src="/image/Home-murales-2.jpg" alt="" className="about-us-img" />
                </span>
                <span>
                  Siamo qui per rendere il vostro viaggio a Napoli un'esperienza autentica e memorabile. Che si tratti
                  di una passeggiata tra i vicoli del centro storico, una visita ai siti archeologici più famosi o una
                  degustazione dei piatti tipici della cucina napoletana, saremo al vostro fianco per garantirvi
                  un'avventura indimenticabile.
                </span>
                <span>
                  {" "}
                  Unisciti a noi e lasciati ispirare dalla bellezza e dalla vivacità di Napoli, mentre esplori le sue
                  meraviglie con una guida che conosce ogni segreto e ogni curiosità di questa straordinaria città.
                  Siamo qui per rendere il tuo viaggio a Napoli un'esperienza autentica, ricca di scoperte e di
                  emozioni.
                </span>{" "}
                Siamo I&M - la tua guida personale per Napoli.
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
              <h2>Cosa vedere a Napoli?</h2>
              <p>Stai pendando di organizzare le tue vacanze a Napoli?</p>
              <p>
                Sei nel posto giusto. In questo sito abbiamo racchiuso tutti i nostri anni d'esperienza per fornirti
                tutte le informazioni di cui hai bisogno per un soggiorno indimenticabile. Troverai preziosi consigli su
                cosa visitare, dove mangiare a Napoli, i piatti tipici e le attrazioni da non perdere.
              </p>
              <p>Scopri con noi tutto ciò che questa meravigliosa città ha da offrire!</p>
            </div>
            <div className="col-5 d-flex justify-content-center">
              <div className="row row-gap-4">
                {subcategories.slice(0, 6).map((subcategory) => (
                  <div key={subcategory.id} className="col-4 subcategory-home-rel">
                    <Link to={`/categories/${subcategory.id}`}>
                      <img
                        src={subcategoryImage[subcategory.id]}
                        alt={subcategory.name}
                        className="subcategory-home-img"
                      />
                      <div className="subcategory-home-name">
                        {subcategory.name}
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
