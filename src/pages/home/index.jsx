import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [numOfSongs, setNumOfSongs] = useState(5);
  const options = [3, 5, 10];

  useEffect(() => {
    setNumOfSongs(localStorage.getItem("numOfSongs") || 5);
  }, []);

  function changeNumOfSongs() {
    setNumOfSongs((prev) => {
      const options = [3, 5, 10];
      const index = options.indexOf(prev);
      const newNum = options[(index + 1) % options.length];
      localStorage.setItem("numOfSongs", newNum);
      return newNum;
    });
    const index = options.indexOf(numOfSongs);
    setNumOfSongs(options[(index + 1) % options.length]);
    localStorage.setItem("numOfSongs", numOfSongs);
  }

  return (
    <div className="flex flex-col h-screen justify-center text-center">
      <h1 className="text-4xl font-bold">Chronotune</h1>
      <p className="mb-4">Guess the release date of random songs!</p>
      <button
        className="rounded-xl bg-gray-700 mx-auto py-1 px-4 text-gray-400 hover:text-gray-200"
        onClick={changeNumOfSongs}
      >
        {numOfSongs} songs
      </button>
      <Link
        className="bg-green-700 text-white px-4 py-2 rounded-lg mx-auto mt-8"
        to={"/game"}
      >
        Continue with <span className="font-bold">Spotify</span>
      </Link>
    </div>
  );
}
