export default function GuessButton(props) {
  return (
    <button
      className={`basis-1/5 bg-${props.color}-700 text-white p-2 disabled:bg-gray-500`}
      onClick={props.isGuessing ? props.makeGuess : props.next}
      disabled={!props.isGuessValid()}
    >
      {props.isGuessing ? "Guess" : "Next"}
    </button>
  );
}
