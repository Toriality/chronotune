export default function SongInfo(props) {
  return (
    <div
      className={`z-10 h-18 bg-${props.color}-700 p-2 shadow-sm border-b-2 border-black/25`}
    >
      <h3 className="text-8xl lg:text-4xl font-black drop-shadow">
        {props.song.album.release_date.substring(0, 4)}
      </h3>
      <p className="opacity-75">
        <span className="font-bold">{props.song.name}</span> -{" "}
        {props.song.artists[0].name}
      </p>
    </div>
  );
}
