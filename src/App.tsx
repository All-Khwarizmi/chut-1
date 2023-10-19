import "./App.css";
import * as Tone from "tone";
import { RecordComponent } from "./Meter";
import { useState } from "react";
import {
  FormControlLabel,
  FormGroup,
  Slider,
  Stack,
  Switch,
} from "@mui/material";

export function getDecibel(meter: Tone.Meter) {
  const decibel = meter.getValue();
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
  const audio = new Audio("./shhh.mp3");
  return (
    <>
      <div className="h-screen flex items-center space-x-12">
        <div className="">
          <div className="flex content-center pb-12">
            <img
              className="h-48 mx-auto"
              src="./chut-carre.png"
              alt="Chut application logo"
            />
          </div>

          <div className="card">
            <form className="pb-6">
              <FormGroup sx={{ placeItems: "center", paddingBottom: 3 }}>
                <FormControlLabel
                  control={<Switch onChange={() => setIsSound(!isSound)} />}
                  label="Sound"
                />
              </FormGroup>

              <p className="text-xl pb-2"> Threshold </p>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <Slider
                  className=""
                  aria-label="Treshold"
                  sx={{ width: 300, height: 10 }}
                  min={30}
                  max={110}
                  step={5}
                  valueLabelDisplay={"auto"}
                  value={treshold}
                  onChange={(_, val) => {
                    console.log(`Treshold is ${val}`);
                    setTreshold(Array.isArray(val) ? val[0] : val);
                  }}
                />
              </Stack>
            </form>
          </div>
          <RecordComponent
            isRecording={false}
            treshold={treshold}
            sound={audio}
            isSound={isSound}
          />
        </div>
      </div>
    </>
  );
}

export default App;
