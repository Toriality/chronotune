"use client";
import { useEffect, useState } from "react";

export default function Error() {
  const [error, setError] = useState(JSON.parse(localStorage.getItem("error")));

  useEffect(() => {
    if (!error) {
      window.location = "/";
    }
  });

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex gap-4 justify-center">
        <h1 className="text-6xl font-black text-red-300">{error?.status}</h1>
        <p className="text-4xl font-bold">{error?.message}</p>
      </div>
      <p className="mx-auto text-sm mt-8 w-56 translate-x-2">
        Try again later. If you continue to see this error message please contact the
        administrator.
        <br />
        <br />
        <a href="/" className="underline text-green-300">
          Click here to return to the home page.
        </a>
      </p>
    </div>
  );
}
