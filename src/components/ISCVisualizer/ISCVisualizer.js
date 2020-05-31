import React, { useState, useEffect } from "react";
import axios from 'axios';
import AgeChart from '../../Charts/agechart';
import GenderChart from '../../Charts/genderchart';
import NationalityChart from '../../Charts/nationalitychart';
import "./ISCVisualizer.css";

function ISCVisualizer() {
  const [rawData, setRawData] = useState([]);

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched === false) {
      initData();
    }
  }, [fetched]);

  const initData = async () => {
    try {
      const [
        response,
        rawDataResponse,
        stateDailyResponse,
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/raw_data.json'),
        axios.get('https://api.covid19india.org/states_daily.json'),
      ]);
      setRawData(rawDataResponse.data.raw_data);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* <section className="cards">

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <GenderChart title="Patient Gender" data={rawData} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <AgeChart title="Patients by Age" data={rawData} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <NationalityChart title="Patients by  Nationality" data={rawData} />
        </div>

      </section> */}
      <div className="cards-container">
          <section className="cards">
            <div
              className="card card-big fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <GenderChart title="Patient Gender" data={rawData} />
              {/* <button onClick={dataCheck}>Check</button> */}
            </div>
            <div
              className="card card-big fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <AgeChart title="Patients by Age" data={rawData} />
            </div>
            <div
              className="card card-big fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <NationalityChart title="Patients by  Nationality" data={rawData} />
            </div>
          </section>
        </div>
    </div>
  );
}

export default ISCVisualizer;
