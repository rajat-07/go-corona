import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import WCCVisualizer from "./components/WCCVisualizer/WCCVisualizer";
import ISCVisualizer from "./components/ISCVisualizer/ISCVisualizer";
import CPForm from "./components/CPForm/CPForm";
import Info from "./components/Info/Info";
import $ from "jquery";
import "./App.css";
import './App.scss';

function App() {
  let history = useHistory();

  const [display, setDisplay] = useState("wccvisualizer");
  let currPage;

  useEffect(() => {
    history.push(`/world`);
    $("#wcc").addClass("active");
  }, []);

  const handleWCC = () => {
    history.push(`/world`);
  };

  const handleISC = () => {
    history.push(`/india`);
  };

  const handleCP = () => {
    history.push(`/prediction-form`);
  };

  const handleInfo = () => {
    history.push(`/info`);
  };

  if (display === "iscvisualizer") {
    currPage = <ISCVisualizer />;
    $("*").removeClass("active");
    $("#isc").addClass("active");
  } else if (display === "cpform") {
    currPage = <CPForm />;
    $("*").removeClass("active");
    $("#cp").addClass("active");
  } else if (display === "info") {
    currPage = <Info />;
    $("*").removeClass("active");
    $("#info").addClass("active");
  } else {
    currPage = <WCCVisualizer />;
    $("*").removeClass("active");
    $("#wcc").addClass("active");
  }

  return (
    <div className="App">
      <section class="nav">
        <div class="vertical-menu">
          <div class="menu-container">
            <button
              onClick={() => {
                handleWCC();
                setDisplay("wccvisualizer");
              }}
            >
              <i id="wcc" class="fas fa-home"></i>
            </button>
            <button
              onClick={() => {
                handleISC();
                setDisplay("iscvisualizer");
              }}
            >
              <i id="isc" class="fas fa-users"></i>
            </button>
            <button
              onClick={() => {
                handleCP();
                setDisplay("cpform");
              }}
            >
              <i id="cp" class="fa fa-wpforms"></i>
            </button>
            <button
              onClick={() => {
                handleInfo();
                setDisplay("info");
              }}
            >
              <i id="info" class="fas fa-info-circle"></i>
            </button>
          </div>
        </div>
      </section>
      <div className="curr-page-wrap">
      {currPage}
      </div>
    </div>
  );
}

export default App;
