import { useState, useEffect, useCallback } from "react";
import { getHashParams, login, STATE_KEY } from "./utils";
import { getUserInfo, fetchRandomSongs, mockup } from "./api";
import GuessWrapper from "./components/GuessWrapper";
import SongDisplay from "./components/SongDisplay";
import SongInfo from "./components/SongInfo";
import EndScreen from "./components/EndScreen";
import { Loading } from "./components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKeyboard,
  faSliders,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [response, setResponse] = useState({});
  const [params, setParams] = useState({});
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(0);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guess, setGuess] = useState(1960);
  const [score, setScore] = useState(0);
  const [songScore, setSongScore] = useState(0);
  const [isGuessing, setIsGuessing] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [color, setColor] = useState("green");
  const [usingSlider, setUsingSlider] = useState(false);

  const useMockup = window.location.search.includes("mockup");
  const storedState = localStorage.getItem(STATE_KEY);
  const numOfSongs = localStorage.getItem("numOfSongs") || 5;

  const authenticate = useCallback(() => {
    if (params.access_token) {
      getUserInfo(params.access_token).then((res) => {
        setResponse(res);
      });
    }
  }, [params]);

  async function generateRandomSongs() {
    setLoading(true);

    try {
      const fetched_songs = await fetchRandomSongs(params.access_token, numOfSongs);
      setSongs(fetched_songs);
      audio.src = fetched_songs[currentSong].preview_url;
      setLoading(false);
      setIsGuessing(true);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    setParams(getHashParams());
    setColor(randomColor());
    setUsingSlider(JSON.parse(localStorage.getItem("usingSlider")));
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });
  }, []);

  useEffect(() => {
    if (!window.location.hash && !useMockup) {
      login();
    }
    if (params.access_token && params.state != null && params.state === storedState) {
      authenticate();
      generateRandomSongs();
    }
    if (useMockup) {
      setSongs(mockup);
      audio.src = mockup[currentSong].preview_url;
      setIsGuessing(true);
    }
  }, [params, storedState, authenticate]);

  useEffect(() => {
    if (response.error) {
      localStorage.setItem("error", JSON.stringify(response.error));
      window.location = "/error";
    }
    if (window.location.search.includes("error")) {
      localStorage.setItem("error", JSON.stringify({ message: "Access denied" }));
      window.location = "/error";
    }
  });

  function randomColor() {
    const colors = ["green", "red", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function makeGuess(e) {
    e.preventDefault();
    calculateScore();
    setIsGuessing(false);
  }

  function next(e) {
    e.preventDefault();
    setColor(randomColor());
    if (currentSong >= songs.length - 1) {
      finish();
      audio.pause();
      setIsPlaying(false);
      setIsGuessing(false);
    } else {
      setCurrentSong(currentSong + 1);
      audio.pause();
      audio.src = songs[currentSong + 1].preview_url;
      setIsPlaying(false);
      setIsGuessing(true);
    }
  }

  function calculateScore() {
    const yearInput = parseInt(guess);
    const yearCorrect = parseInt(songs[currentSong].album.release_date.slice(0, 4));
    const yearDifference = Math.abs(yearInput - yearCorrect);
    const thisScore = 100 - Math.min(yearDifference * 2, 100);
    setSongScore(thisScore);
    setScore(score + thisScore);
    console.log("This score: " + thisScore);
    console.log("Score: " + (thisScore + score));
  }

  function finish() {
    setIsPlaying(false);
    console.log(`Final Score: ${score}`);
    setHasFinished(true);
  }

  function play(e) {
    e.preventDefault();
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  }

  function toggleMute() {
    setIsMuted(!isMuted);
    if (audio) audio.muted = !audio.muted;
  }

  function toggleSliders() {
    setUsingSlider(!usingSlider);
    localStorage.setItem("usingSlider", JSON.stringify(!usingSlider));
  }

  return (
    <div className="flex flex-col items-middle text-center h-screen lg:w-1/2 lg:m-auto bg-black">
      {loading ? (
        <Loading color={color} />
      ) : (
        <>
          {songs.length > 0 && (
            <div
              className={`lg:m-4 flex bg-${color}-500  flex-col flex-grow relative overflow-hidden`}
            >
              {!hasFinished ? (
                <>
                  {isGuessing ? (
                    <div className="z-10 flex justify-between p-2">
                      <FontAwesomeIcon
                        icon={isMuted ? faVolumeUp : faVolumeMute}
                        size="xl"
                        onClick={toggleMute}
                        className="cursor-pointer"
                      />
                      <FontAwesomeIcon
                        icon={usingSlider ? faKeyboard : faSliders}
                        size="xl"
                        onClick={toggleSliders}
                        className="cursor-pointer"
                      />
                    </div>
                  ) : (
                    <SongInfo song={songs[currentSong]} color={color} />
                  )}

                  <SongDisplay
                    song={songs[currentSong]}
                    isPlaying={isPlaying}
                    isGuessing={isGuessing}
                    play={play}
                  />
                  <GuessWrapper
                    guess={guess}
                    setGuess={setGuess}
                    makeGuess={makeGuess}
                    isGuessing={isGuessing}
                    next={next}
                    color={color}
                    songScore={songScore}
                    usingSlider={usingSlider}
                  />
                </>
              ) : (
                <EndScreen score={score} songs={songs} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
