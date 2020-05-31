import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function CPForm() {
  // states
  const [ageGroup, setAgeGroup] = useState("lf");
  const [gender, setGender] = useState("male");
  const [nationality, setNationality] = useState("ind");
  const [cityzone, setCityZone] = useState("r");
  const [education, setEducation] = useState("lhs");
  const [bwcp, setBWCP] = useState(false);
  const [hcb, setHCB] = useState(false);
  const [fever, setFever] = useState(false);
  const [dryCough, setDryCough] = useState(false);
  const [diffInBreath, setDiffInBreath] = useState(false);
  const [fatigue, setFatigue] = useState(false);
  const [predictedRes, setPredictedRes] = useState("");

  const handleAgeGroup = (e) => {
    setAgeGroup(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleNationality = (e) => {
    setNationality(e.target.value);
  };
  const handleCityZone = (e) => {
    setCityZone(e.target.value);
  };
  const handleEducation = (e) => {
    setEducation(e.target.value);
  };
  const handleBWCP = (e) => {
    setBWCP(!bwcp);
  };
  const handleHCB = (e) => {
    setHCB(!hcb);
  };
  const handleFever = (e) => {
    setFever(!fever);
  };
  const handleDryCough = (e) => {
    setDryCough(!dryCough);
  };
  const handleDiffInBreath = (e) => {
    setDiffInBreath(!diffInBreath);
  };
  const handleFatigue = (e) => {
    setFatigue(!fatigue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("Age Group", ageGroup);
    formdata.append("Gender", gender);
    formdata.append("Nationality", nationality);
    formdata.append("City Zone", cityzone);
    formdata.append("Education", education);
    formdata.append("BWCP", bwcp);
    formdata.append("HCB", hcb);
    formdata.append("Fever", fever);
    formdata.append("Dry Cough", dryCough);
    formdata.append("Diff In Breathing", diffInBreath);
    formdata.append("Fatigue", fatigue);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict",
        formdata,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setPredictedRes(response.data.res);
      console.log("hello", response.data.res);
      // setMedia(prevState => {
      //   let a = [];
      //   a = response.data.res.map(r => r);
      //   return a;
      // });
    } catch (e) {
      console.log(e);
    }
    console.log(`${ageGroup}`);
    console.log(`${gender}`);
    console.log(`${nationality}`);
    console.log(`${cityzone}`);
    console.log(`${education}`);
    console.log(`${bwcp}`);
    console.log(`${hcb}`);
    console.log(`${fever}`);
    console.log(`${dryCough}`);
    console.log(`${diffInBreath}`);
    console.log(`${fatigue}`);
  };

  return (
    <FilterWrapper>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <p
          style={{
            marginTop: "50px",
            color: "#f9355f",
            fontSize: "45px",
          }}
          className = "form-title"
        >
          <strong>Corona Prediction</strong>
        </p>
        <div className="form-center">
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="optimizeAlgo">Age Group</label>
            </div>
            <div className="field-value">
              <select
                className="form-control selcss"
                value={ageGroup}
                onChange={handleAgeGroup}
                style={{ width: "auto" }}
              >
                <option className="optcss" value="lf">
                  Less than 40
                </option>
                <option className="optcss" value="gfls">
                  Greater than 40 less than 60
                </option>
                <option className="optcss" value="gs">
                  Greater than 60
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="gender">Gender</label>
            </div>
            <div className="field-value gender-v">
              <div value={gender} onChange={handleGender} className="radio-grp">
                <input
                  className="radio-field"
                  type="radio"
                  value="male"
                  name="male"
                  checked={gender === "male"}
                />
                <label className="radio-label">Male</label>
                <input
                  className="radio-field"
                  type="radio"
                  value="female"
                  name="female"
                  style={{ marginLeft: "5px" }}
                  checked={gender === "female"}
                />
                <label className="radio-label">Female</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="optimizeAlgo">Nationality</label>
            </div>
            <div className="field-value">
              <select
                className="form-control selcss"
                value={nationality}
                onChange={handleNationality}
                style={{ width: "239px" }}
              >
                <option className="optcss" value="ind">
                  Indian
                </option>
                <option className="optcss" value="oth">
                  Other
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="optimizeAlgo">City Zone</label>
            </div>
            <div className="field-value">
              <select
                className="form-control selcss"
                value={cityzone}
                onChange={handleCityZone}
                style={{ width: "239px", marginLeft: "7px" }}
              >
                <option className="optcss" value="r">
                  Red
                </option>
                <option className="optcss" value="o">
                  Orange
                </option>
                <option className="optcss" value="g">
                  Green
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="optimizeAlgo">Education</label>
            </div>
            <div className="field-value">
              <select
                className="form-control selcss"
                value={education}
                onChange={handleEducation}
                style={{ width: "239px", marginLeft: "5px" }}
              >
                <option className="optcss" value="lhs">
                  Less than high school
                </option>
                <option className="optcss" value="hs">
                  High School
                </option>
                <option className="optcss" value="sclg">
                  Some College
                </option>
                <option className="optcss" value="bdeg">
                  Bachelor degree or Higher
                </option>
                <option className="optcss" value="none">
                  None
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="batchSize">
                Been with corona patient before ?
              </label>
            </div>
            <div className="field-value checkbox-value">
              <div value={bwcp} onChange={handleBWCP} className="radio-grp">
                <input
                  className="radio-field"
                  type="checkbox"
                  value="32"
                  name="32"
                  checked={bwcp}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="batchSize">Had corona before ?</label>
            </div>
            <div className="field-value checkbox-value hcb-val">
              <div value={hcb} onChange={handleHCB} className="radio-grp">
                <input
                  className="radio-field"
                  type="checkbox"
                  value="32"
                  name="32"
                  checked={hcb}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="batchSize">Fever</label>
            </div>
            <div className="field-value checkbox-value f-val">
              <div value={fever} onChange={handleFever} className="radio-grp">
                <input
                  className="radio-field"
                  type="checkbox"
                  value="32"
                  name="32"
                  checked={fever}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="batchSize">Dry Cough</label>
            </div>
            <div className="field-value checkbox-value dc-val">
              <div
                value={dryCough}
                onChange={handleDryCough}
                className="radio-grp"
              >
                <input
                  className="radio-field"
                  type="checkbox"
                  value="32"
                  name="32"
                  checked={dryCough}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="batchSize">Difficulty in Breathing</label>
            </div>
            <div className="field-value checkbox-value dib-val">
              <div
                value={diffInBreath}
                onChange={handleDiffInBreath}
                className="radio-grp"
              >
                <input
                  className="radio-field"
                  type="checkbox"
                  value="32"
                  name="32"
                  checked={diffInBreath}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="field-label">
              <label htmlFor="batchSize">Fatigue</label>
            </div>
            <div className="field-value checkbox-value fg-val">
              <div
                value={fatigue}
                onChange={handleFatigue}
                className="radio-grp"
              >
                <input
                  className="radio-field"
                  type="checkbox"
                  value="32"
                  name="32"
                  checked={fatigue}
                />
              </div>
            </div>
          </div>
          <div className="submit-btn">
            <button className="btn" type="Submit" style={{ width: "180px" }}>
              Submit
            </button>
          </div>
        </div>
      </form>
      <p
        style={{
          color: "#59b3aa",
          marginTop: "70px",
          marginBottom: "70px",
          fontSize: "30px",
        }}
      >
        Your Corona Prediction is {predictedRes}%
      </p>
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  .form-title {
    font-family: "Dancing Script", cursive;
    font-size: 40px;
  }
  .field-label {
    color: #6236fe;
  }
  .form-control {
    background-color: transparent;
    border: 1px solid #808080;
    border-radius: 0;
    outline: none;
    height: 30px;
    text-align: center;
    width: 100px;
    font-size: 16px;
    margin: 8px 0;
    padding: 0;
  }
  .form-center {
    padding: 0 1rem;
  }
  .form-group {
    padding: 1rem 0.75rem;
    margin: 50px;
  }
  .btn {
    text-decoration: none;
    background-color: #2ece89;
    color: #fff;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    height: 35px;
    padding: 0 16px;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    margin-bottom: 50px;
    margin-top: 50px;
  }
  .btn:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  .slider {
    -webkit-appearance: none;
    // width: 100%;
    height: 3px;
    border-radius: 5px;
    background: #13c6e9;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }
  .slider:hover {
    opacity: 1;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: solid 2px #13c6e9;
    background: #fff;
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: solid 2px #13c6e9;
    background: #fff;
    cursor: pointer;
  }
  .range-val {
    padding: 15px;
    font-size: 10px;
    color: #9a9a9a;
  }
  .optcss {
  }
  .selcss {
    height: 40px;
    text-align: center;
    padding: 6px;
  }
  .radio-btn {
    color: #13c6e9;
  }
  .radio-label {
    padding: 10px;
  }
  .selcss {
    margin: auto;
  }
  option:focus {
    background-color: #fff;
    outline: none;
    box-shadow: none;
  }
  select:focus {
    background-color: #fff;
    outline: none;
    box-shadow: none;
  }
  .field-label {
    float: left;
    margin-right: 100px;
    margin-top: 8px;
  }
  .field-value {
    float: left;
  }
  .gender-v {
    margin-left: 50px;
  }
  .checkbox-value {
    margin-top: 10px;
  }
  .radio-field {
    width: 17px;
    height: 17px;
  }
  .hcb-val {
    margin-left: 94px;
  }
  .f-val {
    margin-left: 199px;
  }
  .dc-val {
    margin-left: 163px;
  }
  .dib-val {
    margin-left: 90px;
  }
  .fg-val {
    margin-left: 186px;
  }
  .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default CPForm;
