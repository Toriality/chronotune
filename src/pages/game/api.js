import { generate } from "random-words";
import { getRandomYear, getRandomOffset } from "./utils";

export async function getUserInfo(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.json();
}

export async function search(accessToken, query) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query.word} year:${query.year}&type=track&limit=50&offset=${query.offset}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const songs = await response.json();

  return songs.tracks.items;
}

export async function fetchRandomSongs(
  accessToken,
  numberOfSongs = 5,
  minPopularity = 10
) {
  const MAX_RETRIES = 30;
  const randomSongs = [];

  for (let i = 0; i < numberOfSongs; i++) {
    let retryCount = 0;
    let randomSong;

    console.log(`Fetching song ${i + 1} of ${numberOfSongs}`);

    while (retryCount < MAX_RETRIES) {
      const query = {
        word: generate(),
        year: getRandomYear(),
        offset: getRandomOffset(),
      };

      const songs = await search(accessToken, query);

      const filteredSongs = songs.filter(
        (song) => song.popularity > minPopularity && song.preview_url != null
      );

      if (filteredSongs.length) {
        randomSong = filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
        randomSongs.push(randomSong);
        console.log(`Found song ${i + 1} of ${numberOfSongs}`);
        break;
      } else {
        console.log(`No songs found for this query, retrying...`);
        retryCount++;
      }
    }
  }

  console.log(`Returning ${randomSongs.length} songs`);
  return randomSongs;
}

export const mockup = [
  {
    album: {
      album_type: "album",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/3jiBDfjnWIdLQEEOdKqZex",
          },
          href: "https://api.spotify.com/v1/artists/3jiBDfjnWIdLQEEOdKqZex",
          id: "3jiBDfjnWIdLQEEOdKqZex",
          name: "Doris Troy",
          type: "artist",
          uri: "spotify:artist:3jiBDfjnWIdLQEEOdKqZex",
        },
      ],
      available_markets: [],
      external_urls: {
        spotify: "https://open.spotify.com/album/2CLiFy7JO1bmkNV6LFEMix",
      },
      href: "https://api.spotify.com/v1/albums/2CLiFy7JO1bmkNV6LFEMix",
      id: "2CLiFy7JO1bmkNV6LFEMix",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b2737eb9c0868fe80bcd235c6d64",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e027eb9c0868fe80bcd235c6d64",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d000048517eb9c0868fe80bcd235c6d64",
          width: 64,
        },
      ],
      name: "Sings Just One Look And Other Memorable Selections",
      release_date: "1963",
      release_date_precision: "year",
      total_tracks: 12,
      type: "album",
      uri: "spotify:album:2CLiFy7JO1bmkNV6LFEMix",
    },
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/3jiBDfjnWIdLQEEOdKqZex",
        },
        href: "https://api.spotify.com/v1/artists/3jiBDfjnWIdLQEEOdKqZex",
        id: "3jiBDfjnWIdLQEEOdKqZex",
        name: "Doris Troy",
        type: "artist",
        uri: "spotify:artist:3jiBDfjnWIdLQEEOdKqZex",
      },
    ],
    available_markets: [],
    disc_number: 1,
    duration_ms: 175333,
    explicit: false,
    external_ids: {
      isrc: "USAT20402002",
    },
    external_urls: {
      spotify: "https://open.spotify.com/track/3nhOpRSmBU2j8cgnvQQxqB",
    },
    href: "https://api.spotify.com/v1/tracks/3nhOpRSmBU2j8cgnvQQxqB",
    id: "3nhOpRSmBU2j8cgnvQQxqB",
    is_local: false,
    name: "Lazy Days (When Are You Coming Home)",
    popularity: 17,
    preview_url:
      "https://p.scdn.co/mp3-preview/70a467995182a52f3dfaad46a28c9baa5a1544e5?cid=8ecffb9d750f40bdbee34807494346fb",
    track_number: 5,
    type: "track",
    uri: "spotify:track:3nhOpRSmBU2j8cgnvQQxqB",
  },
  {
    album: {
      album_type: "compilation",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of",
          },
          href: "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
          id: "0LyfQWJT6nXafLPZqxe9Of",
          name: "Vários intérpretes",
          type: "artist",
          uri: "spotify:artist:0LyfQWJT6nXafLPZqxe9Of",
        },
      ],
      available_markets: [],
      external_urls: {
        spotify: "https://open.spotify.com/album/0KtWSWHsL4CLKeIT8woUKC",
      },
      href: "https://api.spotify.com/v1/albums/0KtWSWHsL4CLKeIT8woUKC",
      id: "0KtWSWHsL4CLKeIT8woUKC",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b273e4842e0b87d4d7358f37ada1",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e02e4842e0b87d4d7358f37ada1",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d00004851e4842e0b87d4d7358f37ada1",
          width: 64,
        },
      ],
      name: "Clockers (Original Motion Picture Soundtrack)",
      release_date: "1995-08-29",
      release_date_precision: "day",
      total_tracks: 12,
      type: "album",
      uri: "spotify:album:0KtWSWHsL4CLKeIT8woUKC",
    },
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/7A9mIAVm7NGceBFJkbb612",
        },
        href: "https://api.spotify.com/v1/artists/7A9mIAVm7NGceBFJkbb612",
        id: "7A9mIAVm7NGceBFJkbb612",
        name: "Marc Dorsey",
        type: "artist",
        uri: "spotify:artist:7A9mIAVm7NGceBFJkbb612",
      },
    ],
    available_markets: [],
    disc_number: 1,
    duration_ms: 373280,
    explicit: false,
    external_ids: {
      isrc: "CA5KR0036271",
    },
    external_urls: {
      spotify: "https://open.spotify.com/track/0CWbCs8te79w9IRaZFWsib",
    },
    href: "https://api.spotify.com/v1/tracks/0CWbCs8te79w9IRaZFWsib",
    id: "0CWbCs8te79w9IRaZFWsib",
    is_local: false,
    name: "People In Search of a Life",
    popularity: 20,
    preview_url:
      "https://p.scdn.co/mp3-preview/acf46f7d9c5a40a7a03f402672c0a1b281f66d15?cid=8ecffb9d750f40bdbee34807494346fb",
    track_number: 1,
    type: "track",
    uri: "spotify:track:0CWbCs8te79w9IRaZFWsib",
  },
  {
    album: {
      album_type: "album",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/4trFlc6c04qfpnCGvlqFCV",
          },
          href: "https://api.spotify.com/v1/artists/4trFlc6c04qfpnCGvlqFCV",
          id: "4trFlc6c04qfpnCGvlqFCV",
          name: "Organized Konfusion",
          type: "artist",
          uri: "spotify:artist:4trFlc6c04qfpnCGvlqFCV",
        },
      ],
      available_markets: [],
      external_urls: {
        spotify: "https://open.spotify.com/album/2LAQyF9yT1coZjEmld0NNe",
      },
      href: "https://api.spotify.com/v1/albums/2LAQyF9yT1coZjEmld0NNe",
      id: "2LAQyF9yT1coZjEmld0NNe",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b273ae1b243d689372088c1c712e",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e02ae1b243d689372088c1c712e",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d00004851ae1b243d689372088c1c712e",
          width: 64,
        },
      ],
      name: "The Equinox",
      release_date: "1997-01-01",
      release_date_precision: "day",
      total_tracks: 21,
      type: "album",
      uri: "spotify:album:2LAQyF9yT1coZjEmld0NNe",
    },
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/4trFlc6c04qfpnCGvlqFCV",
        },
        href: "https://api.spotify.com/v1/artists/4trFlc6c04qfpnCGvlqFCV",
        id: "4trFlc6c04qfpnCGvlqFCV",
        name: "Organized Konfusion",
        type: "artist",
        uri: "spotify:artist:4trFlc6c04qfpnCGvlqFCV",
      },
    ],
    available_markets: [],
    disc_number: 1,
    duration_ms: 271533,
    explicit: true,
    external_ids: {
      isrc: "USPO10900317",
    },
    external_urls: {
      spotify: "https://open.spotify.com/track/2LsWUo2kzTDoIKstXNkcJw",
    },
    href: "https://api.spotify.com/v1/tracks/2LsWUo2kzTDoIKstXNkcJw",
    id: "2LsWUo2kzTDoIKstXNkcJw",
    is_local: false,
    name: "Invetro",
    popularity: 14,
    preview_url: null,
    track_number: 13,
    type: "track",
    uri: "spotify:track:2LsWUo2kzTDoIKstXNkcJw",
  },
  {
    album: {
      album_type: "album",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/4pW9Jt3ZonuoMpQIjkhJOF",
          },
          href: "https://api.spotify.com/v1/artists/4pW9Jt3ZonuoMpQIjkhJOF",
          id: "4pW9Jt3ZonuoMpQIjkhJOF",
          name: "Roberto Bovo",
          type: "artist",
          uri: "spotify:artist:4pW9Jt3ZonuoMpQIjkhJOF",
        },
      ],
      available_markets: [],
      external_urls: {
        spotify: "https://open.spotify.com/album/1hIz3duZDjMnzDGRm5vNfG",
      },
      href: "https://api.spotify.com/v1/albums/1hIz3duZDjMnzDGRm5vNfG",
      id: "1hIz3duZDjMnzDGRm5vNfG",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b273b9190579768affbb5f95acf7",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e02b9190579768affbb5f95acf7",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d00004851b9190579768affbb5f95acf7",
          width: 64,
        },
      ],
      name: "As 15 Mais Italianas: Vol. 2",
      release_date: "1999",
      release_date_precision: "year",
      total_tracks: 15,
      type: "album",
      uri: "spotify:album:1hIz3duZDjMnzDGRm5vNfG",
    },
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/4pW9Jt3ZonuoMpQIjkhJOF",
        },
        href: "https://api.spotify.com/v1/artists/4pW9Jt3ZonuoMpQIjkhJOF",
        id: "4pW9Jt3ZonuoMpQIjkhJOF",
        name: "Roberto Bovo",
        type: "artist",
        uri: "spotify:artist:4pW9Jt3ZonuoMpQIjkhJOF",
      },
    ],
    available_markets: [],
    disc_number: 1,
    duration_ms: 222706,
    explicit: false,
    external_ids: {
      isrc: "BRMVP0401130",
    },
    external_urls: {
      spotify: "https://open.spotify.com/track/7DdAgN0XeeKH0zhjWZTcgN",
    },
    href: "https://api.spotify.com/v1/tracks/7DdAgN0XeeKH0zhjWZTcgN",
    id: "7DdAgN0XeeKH0zhjWZTcgN",
    is_local: false,
    name: "Torna A Surriento",
    popularity: 11,
    preview_url:
      "https://p.scdn.co/mp3-preview/4cb3988382443a7a1a1ef73e30ef9d56eb98f49b?cid=8ecffb9d750f40bdbee34807494346fb",
    track_number: 13,
    type: "track",
    uri: "spotify:track:7DdAgN0XeeKH0zhjWZTcgN",
  },
  {
    album: {
      album_type: "album",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/3qtcbDvdIgQOXkPbtRvBaQ",
          },
          href: "https://api.spotify.com/v1/artists/3qtcbDvdIgQOXkPbtRvBaQ",
          id: "3qtcbDvdIgQOXkPbtRvBaQ",
          name: "The Kingston Trio",
          type: "artist",
          uri: "spotify:artist:3qtcbDvdIgQOXkPbtRvBaQ",
        },
      ],
      available_markets: [],
      external_urls: {
        spotify: "https://open.spotify.com/album/5jSwmPrat1yHiNdF4CETSH",
      },
      href: "https://api.spotify.com/v1/albums/5jSwmPrat1yHiNdF4CETSH",
      id: "5jSwmPrat1yHiNdF4CETSH",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b2739de42ca36a0de9f1de61dfbe",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e029de42ca36a0de9f1de61dfbe",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d000048519de42ca36a0de9f1de61dfbe",
          width: 64,
        },
      ],
      name: "Last Month Of The Year",
      release_date: "1960-10-03",
      release_date_precision: "day",
      total_tracks: 12,
      type: "album",
      uri: "spotify:album:5jSwmPrat1yHiNdF4CETSH",
    },
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/3qtcbDvdIgQOXkPbtRvBaQ",
        },
        href: "https://api.spotify.com/v1/artists/3qtcbDvdIgQOXkPbtRvBaQ",
        id: "3qtcbDvdIgQOXkPbtRvBaQ",
        name: "The Kingston Trio",
        type: "artist",
        uri: "spotify:artist:3qtcbDvdIgQOXkPbtRvBaQ",
      },
    ],
    available_markets: [],
    disc_number: 1,
    duration_ms: 94560,
    explicit: false,
    external_ids: {
      isrc: "USCA28900826",
    },
    external_urls: {
      spotify: "https://open.spotify.com/track/3DuaJd2F6Vnm4vlo6U0rC6",
    },
    href: "https://api.spotify.com/v1/tracks/3DuaJd2F6Vnm4vlo6U0rC6",
    id: "3DuaJd2F6Vnm4vlo6U0rC6",
    is_local: false,
    name: "A Round About Christmas",
    popularity: 26,
    preview_url: null,
    track_number: 10,
    type: "track",
    uri: "spotify:track:3DuaJd2F6Vnm4vlo6U0rC6",
  },
];
