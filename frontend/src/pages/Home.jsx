const Home = function () {
  return (
    <>
      <div className="vesuvio-home">
        <div className="d-flex h-100 on-vesuvio-text">
          <div>
            <h1>La tua guida a Napoli</h1>
            <h2>Scopri la città di pizza, mafia e mandolino</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Chi siamo</h2>
          </div>
          <div className="col">
            {/* <video src="video/Napoli-drone.mp4" controls width="400" height="400" muted></video> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
