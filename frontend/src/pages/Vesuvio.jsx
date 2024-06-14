import { Link } from "react-router-dom";

const Vesuvio = function () {
  return (
    <div className="container story-cont">
      <div>
        <h1>Vesuvio</h1>
      </div>
      <div className="row mt-5">
        <div className="col-7">
          <p>
            Il Vesuvio è uno dei vulcani più famosi e studiati al mondo, situato sulla costa occidentale d'Italia vicino
            a Napoli. La sua storia è ricca di eventi geologici e culturali che hanno avuto un impatto significativo
            sulla regione circostante. Il Vesuvio è un vulcano di tipo strato, caratterizzato da una struttura a cono
            composta da strati alternati di lava, cenere e rocce vulcaniche. È uno dei vulcani più pericolosi al mondo a
            causa della sua vicinanza a zone densamente popolate. Il Vesuvio ha un cratere sommitale a forma di caldera,
            formatosi a seguito di varie eruzioni esplosive. Il cono attuale, chiamato Gran Cono, si trova all'interno
            di una caldera più ampia, chiamata Monte Somma, che è il risultato di una precedente eruzione.
          </p>
          <div className="image-cont">
            <img src="/image/vesuvio.jpg" alt="" />
          </div>
          <p>
            L'eruzione più famosa del Vesuvio avvenne il 24 agosto del 79 d.C., quando una violenta esplosione seppellì
            le città romane di Pompei, Ercolano, Stabia e Oplonti sotto una coltre di cenere e pomice. Questa eruzione è
            ben documentata grazie alle lettere di Plinio il Giovane, che descrissero l'evento in dettaglio. I suoi
            scritti hanno portato a definire questo tipo di eruzione come “eruzione pliniana”. Dopo l'eruzione del 79
            d.C., il Vesuvio ha continuato ad eruttare periodicamente. Altre eruzioni significative includono quelle del
            1631, che causarono numerose vittime e devastazioni, e quelle del 1906 e 1944, che furono le ultime eruzioni
            importanti del XX secolo.
          </p>
          <p>
            È uno dei vulcani più monitorati al mondo. Nel 1995, è stato istituito il Parco Nazionale del Vesuvio per
            proteggere e valorizzare l'area intorno al vulcano. Il parco offre numerosi sentieri escursionistici che ne
            permettono di esplorare i diversi aspetti geologici e naturali. Una delle attività più popolari è
            l'escursione fino al cratere del Gran Cono. I visitatori possono camminare fino al bordo del cratere e
            osservare la straordinaria vista del golfo di Napoli e delle aree circostanti.
          </p>
          <div className="image-cont">
            <img src="/image/vesuvio-escursioni.jpg" alt="" />
          </div>

          <p>
            Data la sua pericolosità e la densità di popolazione dell'area circostante, nel 1996 è stato sviluppato un
            piano di emergenza per l'evacuazione rapida in caso di eruzione. Questo piano prevede la collaborazione tra
            varie agenzie governative e l'educazione della popolazione sui rischi e le procedure di evacuazione.
          </p>
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
            <div className="col-6 offset-1 subcategory-home-rel">
              <Link to="/voci-di-napoli">
                <img src="/image/Home-mini3.jpg" alt="" className="subcategory-home-img" />
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

export default Vesuvio;
