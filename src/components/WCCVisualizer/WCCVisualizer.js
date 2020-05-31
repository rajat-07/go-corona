import React, { useState, useEffect } from "react";
import { parse } from "date-fns";
import Header from "../Header/Header";
import AllStatesChart from "../../Charts/allstates";
import India from "../../Charts/india";
import axios from "axios";
import "./WCCVisualizer.css";

function WCCVisualizer() {
  const [statesTimeSeries, setStatesTimeSeries] = useState([]);
  const [indiaTimeSeries, setIndiaTimeSeries] = useState({});
  const [ic, setIc] = useState("");
  const [ir, setIr] = useState("");
  const [id, setId] = useState("");
  const [wc, setWc] = useState("");
  const [wr, setWr] = useState("");
  const [wd, setWd] = useState("");

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const [
      stateDailyResponse,
      indiaDaily,
      worldDaily,
    ] = await Promise.all([
      axios.get("https://api.covid19india.org/states_daily.json"),
      axios.get("https://api.covid19api.com/total/country/india"),
      axios.get("https://api.covid19api.com/world/total"),
    ]);
    setStatesTimeSeries(stateDailyResponse.data.states_daily);
    setIndiaTimeSeries(indiaDaily);
    let arr = indiaDaily.data;
    setIc(arr[arr.length - 1].Confirmed);
    setIr(arr[arr.length - 1].Recovered);
    setId(arr[arr.length - 1].Deaths);
    setWc(worldDaily.data.TotalConfirmed);
    setWr(worldDaily.data.TotalRecovered);
    setWd(worldDaily.data.TotalDeaths);
  };

  // confirmed
  const dates = [];
  const statesDataC = new Map();

  statesTimeSeries.forEach((data) => {
    if (data.status !== "Confirmed") {
      return;
    }

    Object.keys(data).forEach((key) => {
      if (key === "date") {
        const date = parse(data.date, "dd-MMM-yy", new Date());
        dates.push(date);
      }

      if (key === "status" || key === "date") {
        return;
      }

      if (!statesDataC.has(key)) {
        statesDataC.set(key, []);
      }
      const previousValue =
        statesDataC.get(key).length > 0
          ? parseInt(statesDataC.get(key)[statesDataC.get(key).length - 1])
          : 0;
      const currentValue = data[key] !== "" ? parseInt(data[key]) : 0;
      statesDataC.get(key).push(previousValue + currentValue);
    });
  });

  // recovered
  const statesDataR = new Map();

  statesTimeSeries.forEach((data) => {
    if (data.status !== "Recovered") {
      return;
    }

    Object.keys(data).forEach((key) => {
      if (key === "status" || key === "date") {
        return;
      }

      if (!statesDataR.has(key)) {
        statesDataR.set(key, []);
      }
      const previousValue =
        statesDataR.get(key).length > 0
          ? parseInt(statesDataR.get(key)[statesDataR.get(key).length - 1])
          : 0;
      const currentValue = data[key] !== "" ? parseInt(data[key]) : 0;
      statesDataR.get(key).push(previousValue + currentValue);
    });
  });

  // death
  const statesDataD = new Map();

  statesTimeSeries.forEach((data) => {
    if (data.status !== "Deceased") {
      return;
    }

    Object.keys(data).forEach((key) => {
      if (key === "status" || key === "date") {
        return;
      }

      if (!statesDataD.has(key)) {
        statesDataD.set(key, []);
      }
      const previousValue =
        statesDataD.get(key).length > 0
          ? parseInt(statesDataD.get(key)[statesDataD.get(key).length - 1])
          : 0;
      const currentValue = data[key] !== "" ? parseInt(data[key]) : 0;
      statesDataD.get(key).push(previousValue + currentValue);
    });
  });

  const dataCheck = () => {
    let dc = Array.from(statesDataC.get("mh"));
    console.log(`statesData ${dc[dc.length - 1]}`);
    let dr = Array.from(statesDataR.get("mh"));
    console.log(`statesData ${dr[dr.length - 1]}`);
    let dd = Array.from(statesDataD.get("mh"));
    console.log(`statesData ${dd[dd.length - 1]}`);
    console.log(dates);
  };

  return (
    <div>
      <div className="header-wrap">
        <Header confirmed={wc} recovered={wr} death={wd} />
      </div>
      <div>
        <div className="cards-container">
          <section className="cards">
            <div
              className="card card-big fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <India
                title="Confirmed Cases In India"
                data={indiaTimeSeries.data}
                status="Confirmed"
              />
            </div>
            <div
              className="card card-big fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <India
                title="Recovered Cases In India"
                data={indiaTimeSeries.data}
                status="Recovered"
              />
            </div>
            <div
              className="card card-big fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <India
                title="Death Cases In India"
                data={indiaTimeSeries.data}
                status="Deaths"
              />
            </div>
          </section>
        </div>
      </div>
      <div className="header-wrap">
        <Header confirmed={ic} recovered={ir} death={id} />
      </div>
      <div>
        <div className="cards-container">
          <section className="cards">
            <div
              className="card card-big fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <AllStatesChart
                title="Confirmed Cases by State"
                data={statesTimeSeries}
                status="Confirmed"
              />
              {/* <button onClick={dataCheck}>Check</button> */}
            </div>
            <div
              className="card card-big fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <AllStatesChart
                title="Recovered Cases by State"
                data={statesTimeSeries}
                status="Recovered"
              />
            </div>
            <div
              className="card card-big fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <AllStatesChart
                title="Death Cases by State"
                data={statesTimeSeries}
                status="Deceased"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default WCCVisualizer;
