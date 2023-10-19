import { useState } from "react";
import * as Tone from "tone";
import { getDecibel } from "./App";

interface RecordProps {
  isRecording: boolean;
  treshold: number;
  sound: HTMLAudioElement;
  isSound: boolean;
}

export function RequestPermission({ treshold, sound, isSound }: RecordProps) {
  const meter = new Tone.Meter();

  const mic = new Tone.UserMedia();
  mic.open();
  // connect mic to the meter
  mic.connect(meter);
  return (
    <>
      <Meter
        meter={meter}
        sound={sound}
        treshold={treshold}
        isSound={isSound}
      />
    </>
  );
}
export function RecordComponent({
  isRecording,
  treshold,
  sound,
  isSound,
}: RecordProps) {
  const [recording, setRecording] = useState<boolean>(isRecording);

  //   const meter = new Tone.Meter();

  //   const mic = new Tone.UserMedia();
  //   mic.open();
  //   // connect mic to the meter
  //   mic.connect(meter);

  return (
    <>
      {recording ? (
        <div>
          <RequestPermission
            isRecording={isRecording}
            sound={sound}
            treshold={treshold}
            isSound={isSound}
          />
          <button onClick={() => setRecording(!recording)}>Stop</button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setRecording(!recording);
            }}
          >
            Start
          </button>
        </div>
      )}
    </>
  );
}
export interface MeterProps {
  meter: Tone.Meter;
  treshold: number;
  sound: HTMLAudioElement;
  isSound: boolean;
}

export default function Meter({ meter, treshold, sound, isSound }: MeterProps) {
  const [decibel, setDecibel] = useState(getDecibel(meter) + 100);
  setInterval(() => {
    let val = getDecibel(meter) + 100;
    setDecibel(val);
  }, 2000);

  return (
    <div>
      <h3>
        <DisplayEmoji
          decibel={decibel}
          sound={sound}
          treshold={treshold}
          isSound={isSound}
        />
        Decibel: {decibel == -Infinity ? "..." : decibel}
      </h3>
    </div>
  );
}

export interface DisplayEmojiProps {
  decibel: number;
  treshold: number;
  sound: HTMLAudioElement;
  isSound: boolean;
}
function DisplayEmoji({
  decibel,
  treshold,
  sound,
  isSound,
}: DisplayEmojiProps) {
  const emoji = getEmojiAndSound(decibel, treshold);
  getSound(decibel, treshold, sound, isSound);
  return <div className="emoji">{emoji}</div>;
}

function getEmojiAndSound(decibel: number, treshold: number) {
  if (decibel >= treshold) {
    return "🤫";
  } else {
    return "🤓";
  }
}
function getSound(
  decibel: number,
  treshold: number,
  audio: HTMLAudioElement,
  isSound: boolean
) {
  if (decibel >= treshold && isSound) {
    displaySound(audio);
  }
}

export function displaySound(audio: HTMLAudioElement) {
  audio.play().then(() => console.log(audio));
}
