import { CURRENT_YEAR } from "../utils";
import GuessInput from "./GuessInput";
import GuessButton from "./GuessButton";

export default function GuessWrapper(props) {
  const isGuessValid = () => {
    return props.guess >= 1920 && props.guess <= CURRENT_YEAR;
  };

  return (
    <div className="h-20 lg:h-fit z-10 flex shadow-md border-t-2 border-black/25">
      <GuessInput
        guess={props.guess}
        setGuess={props.setGuess}
        isGuessValid={isGuessValid}
        isGuessing={props.isGuessing}
        songScore={props.songScore}
        usingSlider={props.usingSlider}
      />
      <GuessButton
        makeGuess={props.makeGuess}
        isGuessValid={isGuessValid}
        isGuessing={props.isGuessing}
        next={props.next}
        color={props.color}
      />
    </div>
  );
}
