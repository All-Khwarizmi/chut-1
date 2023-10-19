import "./App.css";
import * as Tone from "tone";
import { RecordComponent } from "./Meter";
import { useState } from "react";

export function getDecibel(meter: Tone.Meter) {
  const decibel = meter.getValue();
  // console.log(meter.getValue())
  if (Array.isArray(decibel)) {
    return decibel[0] + 18;
  }
  return Math.floor(decibel) + 18;
}

export function decibelConverter(decibel: number) {
  return decibel - decibel;
}
function App() {
  const [isSound, setIsSound] = useState(false);
  const [treshold, setTreshold] = useState(80);
  const audio = new Audio("./src/assets/shhh.mp3");
  return (
    <>
      <h1 className="main-title">Chut</h1>
      <div className="card">
        <form>
          <label className="title" htmlFor="sound">
            Sound
          </label>
          <input
            type="checkbox"
            name="sound"
            id="sound"
            onChange={() => setIsSound(!isSound)}
          />
          <p>The checkbox is {isSound ? "checked" : "unchecked"}</p>{" "}
          <h3 className="">Treshold</h3>
          <div className="treshold-radio">
            <label htmlFor="whisper"> 😴 70dB</label>
            <input
              type="radio"
              name="treshold"
              id="whisper"
              onChange={() => setTreshold(70)}
            />
          </div>
          <div className="treshold-radio">
            <label htmlFor="noisy"> 💬 80db</label>
            <input
              type="radio"
              name="treshold"
              id="noisy"
              checked={treshold == 80 ? true : false}
              onChange={() => setTreshold(80)}
            />
          </div>
          <div className="treshold-radio">
            <label className="" htmlFor="loud">
              💥 90db
            </label>
            <input
              type="radio"
              name="treshold"
              id="loud"
              onChange={() => setTreshold(90)}
            />
          </div>
          <p>The treshold is {treshold}</p>{" "}
        </form>
        <RecordComponent
          isRecording={false}
          treshold={treshold}
          sound={audio}
          isSound={isSound}
        />
      </div>
    </>
  );
}

export default App;
