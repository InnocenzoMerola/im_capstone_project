import { Link } from "react-router-dom";

const NapoliStory = function () {
  return (
    <div className="container story-cont">
      <div>
        <h1>Storia</h1>
      </div>
      <div className="row mt-5">
        <div className="col-7">
          <p>
            Nel cuore del Mediterraneo, dove le acque azzurre del Golfo di Napoli cullano le leggende antiche, sorge il
            maestoso Vesuvio, custode imponente di una terra ricca di storia e cultura. Questa è la terra delle due
            Sicilie, un regno che ha visto sorgere e cadere imperi, dove le sue città sono state testimoni di epoche
            d'oro e tempi oscuri. Napoli, secondo la leggenda, è nata dall'amore della sirena Partenope. Si racconta che
            Partenope, respinta dall'eroe Ulisse, si gettò in mare e il suo corpo venne portato dalle onde fino alle
            coste della Campania, dove i suoi resti diedero vita alla città. Questo mito simboleggia il profondo legame
            di Napoli con il mare. È una città che respira l'antico e il moderno in ogni suo angolo.{" "}
          </p>
          <div className="image-cont">
            <img src="/image/Napoli-sfondo.jpg" alt="" />
          </div>
          <p>
            Le sue strade strette e pittoresche raccontano storie di amore e di tragedie, di re e di plebei, di vittorie
            e di sconfitte. È una città che si aggrappa al passato mentre guarda fiduciosa al futuro. Il suo centro
            storico che si estende su circa 17 chilometri quadrati, nel 1995 è stato dichiarato come Patrimonio Mondiale
            dell'Umanità dall'Unesco, è un labirinto di vicoli, piazze, chiese e teatri storici come il San Carlo,
            simbolo di una tradizione artistica che ha pochi eguali al mondo.
          </p>
          <p>
            A dominare il panorama e la vita dei napoletani è il Vesuvio. Le sue eruzioni, hanno plasmato la storia
            della regione, in particolare quella di Pompei. Il golfo, con le sue isole di Capri, Ischia e Procida,
            aggiunge un tocco di magia a questo panorama.
            <span className="a-capo">
              - Capri, con i suoi Faraglioni e la Grotta Azzurra, è un gioiello di bellezza naturale che ha affascinato
              imperatori e artisti.{" "}
            </span>
            <span className="a-capo">
              - Ischia, con le sue terme e suoi giardini esuberanti, è un paradiso di relax e benessere.{" "}
            </span>
            <span className="a-capo">
              - Procida, con i suoi colori vivaci e le sue tradizioni marinare, conserva un fascino autentico e
              incontaminato.
            </span>
          </p>
          <div className="image-cont">
            <img src="/image/ischia-procida.jpg" alt="" />
          </div>

          <p>
            Ma Napoli e i suoi dintorni non sono solo storia e arte; sono anche un trionfo di suoni e sapori. La musica
            napoletana, con le sue melodie struggenti e appassionate, risuona per le strade, mentre l'odore della pizza
            appena sfornata si mescola con quello del caffè. E così' che, tra il Vesuvio e il mare, tra Pompei e Napoli,
            tra la cucina e l'arte, si snoda il racconto di una terra unica al mondo. Un racconto che celebra la
            bellezza, la storia e l'anima vibrante del Golfo di Napoli, un Patrimonio Unesco che è un tesoro prezioso da
            custodire e tramandare alle future generazioni.
          </p>
          <p>
            La sua storia e il suo vibrante presente si intrecciano per creare un luogo unico al mondo, una città che
            continua a incantare chiunque la visiti.
          </p>
        </div>

        <div className="col-4 offset-1">
          <div>
            <h2 className="ps-5">Vedi anche</h2>
          </div>

          <div className="row row-gap-4 mt-4">
            <div className="col-6 offset-1 subcategory-home-rel">
              <Link to="/partenope">
                <img src="/image/Home-mini2.jpg" alt="" className="subcategory-home-img" />
                <div className="subcategory-voice-name">
                  Partenope
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

export default NapoliStory;
