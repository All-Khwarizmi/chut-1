import { useState } from "react";
import * as Tone from "tone";
import { getDecibel } from "./App";

interface RecordProps {
  isRecording: boolean;
  treshold: number;
  sound: HTMLAudioElement;
  isSound: boolean;
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
          <button
            className="w-48 bg-red-500"
            onClick={() => setRecording(!recording)}
          >
            Stop
          </button>
        </div>
      ) : (
        <div>
          <button
            className="w-48 bg-green-400"
            onClick={() => {
              setRecording(!recording);
            }}
          >
            Start Recording
          </button>
        </div>
      )}
    </>
  );
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
    console.log(val);
    setDecibel(val);
  }, 2000);

  return (
    <div>
      <DisplayEmoji
        decibel={decibel}
        sound={sound}
        treshold={treshold}
        isSound={isSound}
      />
      <p className="py-5 text-lg font-bold">
        Decibel: {decibel == -Infinity ? "..." : decibel}
      </p>
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
  return <div className="text-9xl">{emoji}</div>;
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
