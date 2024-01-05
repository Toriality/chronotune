import { document } from "postcss";
import { CURRENT_YEAR } from "../utils";
import { useState, useRef, useEffect, useCallback } from "react";

export default function GuessInput(props) {
  const [sliderPosition, setSliderPosition] = useState();

  const colors = {
    veryBad: "bg-red-400",
    bad: "bg-red-300",
    okay: "bg-yellow-200",
    good: "bg-green-300",
    veryGood: "bg-green-400",
  };

  function getColor() {
    if (props.songScore < 25) return colors.veryBad;
    if (props.songScore < 50) return colors.bad;
    if (props.songScore < 75) return colors.okay;
    if (props.songScore < 100) return colors.good;
    if (props.songScore == 100) return colors.veryGood;
  }

  const sliderRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (props.usingSlider && timelineRef.current) {
      setSliderPosition(() => {
        const sizeOfTimeline = timelineRef.current.offsetWidth;
        const centerOfTimeline = sizeOfTimeline / 2;

        return centerOfTimeline;
      });
    }
  }, [timelineRef, props.usingSlider]);

  function handleSliderStart(e) {
    if (e.type == "touchstart") {
      timelineRef.current.addEventListener("touchmove", (e) => {
        handleSliderMove(e.touches[0]);
      });
      timelineRef.current.addEventListener("touchend", (e) => {
        handleSliderStop(e.touches[0]);
      });
    } else {
      window.document.addEventListener("mousemove", handleSliderMove);
      window.document.addEventListener("mouseup", handleSliderStop);
    }
  }

  function handleSliderStop(e) {
    window.document.removeEventListener("mousemove", handleSliderMove);
    window.document.removeEventListener("mouseup", handleSliderStop);
    timelineRef.current.removeEventListener("touchmove", handleSliderMove);
    timelineRef.current.removeEventListener("touchend", handleSliderStop);
  }

  function handleSliderMove(e) {
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const sliderWidth = sliderRect.width;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const minX = timelineRect.left - sliderWidth / 2;
    const maxX = timelineRect.width - sliderWidth / 2;

    const pos = e.clientX - minX - sliderWidth;
    const clampedPos = Math.max(0, Math.min(maxX, pos));

    const year = Math.round(((CURRENT_YEAR - 1920) * clampedPos) / maxX) + 1920;
    const clampedYear = Math.max(1920, Math.min(CURRENT_YEAR, year));

    setSliderPosition(clampedPos);
    props.setGuess(clampedYear);
  }

  return (
    <>
      {props.isGuessing ? (
        props.usingSlider ? (
          <div
            className="flex justify-center align-middle flex-grow bg-white p-2"
            style={{ touchAction: "none" }}
          >
            <div
              ref={timelineRef}
              className="m-auto flex-grow h-4 bg-gray-400 relative"
              onMouseDown={handleSliderStart}
              onTouchStart={(e) => {
                e.preventDefault();
                handleSliderStart(e);
              }}
            >
              <div
                ref={sliderRef}
                className="absolute bg-black h-8 w-8 left-1/2 -top-1/2 rounded-full"
                style={{ left: `${sliderPosition}px` }}
              >
                <div
                  className="absolute bg-black p-2 text-sm"
                  style={{ transform: "translate(-20%, -125%)" }}
                >
                  {props.guess}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <input
            key="input"
            placeholder={props.guess}
            onChange={(e) => props.setGuess(e.target.value)}
            className={
              `text-black text-center flex-grow` +
              (props.isGuessValid() ? " " : " text-red-500")
            }
          />
        )
      ) : (
        <div className={`flex text-center flex-grow ${getColor()}`}>
          <p className="m-auto font-black text-black/40">{props.songScore} pts.</p>
        </div>
      )}
    </>
  );
}
