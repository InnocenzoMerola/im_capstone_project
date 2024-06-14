import { Link } from "react-router-dom";

const Partenope = function () {
  return (
    <div className="container story-cont">
      <div>
        <h1>Partenope</h1>
      </div>
      <div className="row mt-5">
        <div className="col-7">
          <p>
            Partenope era una delle sirene della mitologia greca. Le sirene erano creature mitologiche metà donna e metà
            pesce, note per il loro canto ammaliante che attirava i marinari verso la distruzione. Secondo il mito più
            famoso, Ulisse riuscì a sfuggire al canto delle sirene durante il suo viaggio di ritorno a Itaca.
          </p>
          <div className="image-cont">
            <img src="/image/partenope.jpeg" alt="" />
          </div>
          <p>
            Ulisse, ordinò ai suoi uomini di tapparsi le orecchie con cera e si fece legare all'albero della nave per
            poter ascoltare il canto senza esserne tratto in inganno. Le sirene, furiose per il fallimento, si
            suicidarono gettandosi in mare. Partenope fu trasportata dalle onde fino alle coste del Golfo di Napoli,
            dove il suo corpo giacque e si dissolse, dando origine alla città che prese il suo nome.
          </p>

          <p>
            La figura di Partenope ha ispirato numerose opere d'arte, poesie e canzoni. La sua leggenda è stata
            tramandata attraverso i secoli, diventando il simbolo di Napoli stessa. È spesso vista come simbolo di
            bellezza e pericolo, riflettendo il carattere della città, con la sua bellezza naturale ma anche con le sue
            complessità sociali e storiche.
          </p>

          <div className="image-cont">
            <img src="/image/partenope-2.jpg" alt="" />
          </div>
        </div>

        <div className="col-4 offset-1">
          <div>
            <h2 className="ps-5">Vedi anche</h2>
          </div>

          <div className="row row-gap-4 mt-4">
            <div className="col-6 offset-1 subcategory-home-rel">
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
            <div className="col-6 offset-1 subcategory-home-rel">
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
            <div className="col-6 offset-1 subcategory-home-rel">
              <Link to="/voci-di-napoli">
                <img src="/image/Home-mini.jpg" alt="" className="subcategory-home-img" />
                <div className="subcategory-voice-name">
                  Voci di Napoli
                  <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partenope;
