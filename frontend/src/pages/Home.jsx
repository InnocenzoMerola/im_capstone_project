import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = function () {
  const [guides, setGuides] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/guides`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/404");
        }
      })
      .then((data) => setGuides(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="vesuvio-home">
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
        <div className="container">
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
                <div className="d-flex justify-content-center">
                  <img src="/image/Home-murales-2.jpg" alt="" width={100} />
                </div>
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

        <div>
          {guides
            .map((guide) => (
              <div key={guide.id}>
                {/* <img src={guide.image} alt="" /> */}
                <h3>{guide.name_it}</h3>
                <p>
                  {/* {guide.stops.map((stop) => (
                    <p key={stop.id}>{stop.description_it}</p>
                  ))} */}
                </p>
              </div>
            ))
            .slice(0, 6)}
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
