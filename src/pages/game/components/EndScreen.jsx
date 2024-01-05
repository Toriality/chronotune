import { useCallback, useEffect } from "react";

export default function EndScreen(props) {
  const numOfSongs = localStorage.getItem("numOfSongs") || 5;
  const bestScore = localStorage.getItem(`bestScore-${numOfSongs}`);

  const saveBestScore = useCallback(() => {
    if (props.score > bestScore) {
      localStorage.setItem(`bestScore-${numOfSongs}`, props.score);
    }
  }, [bestScore, props.score, numOfSongs]);

  useEffect(() => {
    saveBestScore();
  }, [saveBestScore]);

  const messages = {
    veryBad: "You can do better. Keep playing!",
    bad: "Not bad. Keep guessing!",
    okay: "Congratulations!",
    good: "Your music knowledge is off the charts!",
    perfect: "PERFECT!",
  };

  function getMessage() {
    const maxScore = numOfSongs * 100;
    if (props.score < maxScore * 0.25) return messages.veryBad;
    if (props.score < maxScore * 0.5) return messages.bad;
    if (props.score < maxScore * 0.9) return messages.okay;
    if (props.score < maxScore) return messages.good;
    if (props.score == maxScore) return messages.perfect;
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col justify-center m-2 md:m-auto flex-grow">
        <h3 className="font-black text-2xl drop-shadow mb-2">{getMessage()}</h3>
        <h4 className="text-2xl bg-black px-4 py-2">
          You scored
          <span className="font-black"> {props.score} </span>points
        </h4>
        {bestScore && (
          <p className="bg-stone-800 text-sm p-1">
            Last Best Score: <span className="font-black">{bestScore}</span>
          </p>
        )}
        <div className="mt-8">
          <p className="text-xs border-b-2 border-black/20 opacity-50">
            Songs played in this session:
          </p>
          <ul className="border-b-2 border-black/10 h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-black/25 scrollbar-track-black/0 cursor-pointer">
            {props.songs.map((song) => (
              <li
                key={song.id}
                className="flex gap-2 text-xs text-left hover:bg-black/50 p-1"
                onClick={() => window.open(song.external_urls.spotify)}
              >
                <div
                  className="w-16 h-16 bg-cover bg-center"
                  style={{ backgroundImage: `url(${song.album.images[0].url})` }}
                ></div>
                <div className="w-64">
                  <p className="font-black">
                    {song.name.substring(0, 30)}
                    {song.name.length > 30 ? "..." : ""}
                  </p>
                  <p>{song.artists[0].name}</p>
                </div>
                <div className="ml-auto">
                  <p>{song.album.release_date.substring(0, 4)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="bg-white m-auto mix-blend-difference mb-2 py-2 px-4 text-2xl rounded-xl"
        onClick={() => (window.location = "/")}
      >
        <p className="text-black font-black">Play again</p>
      </button>
    </div>
  );
}
