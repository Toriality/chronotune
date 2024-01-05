import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function SongDisplay(props) {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${props.song.album.images[1].url})`,
        }}
        className={`absolute ${
          props.isGuessing && "blur-md"
        } bg-center bg-contain bg-no-repeat top-0 bottom-0 left-0 right-0 m-auto`}
      ></div>
      <button className="z-10 p-4 h-full" onClick={props.play}>
        {props.isGuessing && (
          <FontAwesomeIcon
            icon={props.isPlaying ? faPause : faPlay}
            size="5x"
            opacity={0.4}
            style={{
              stroke: "black",
              strokeWidth: "8px",
            }}
          />
        )}
      </button>
    </>
  );
}
