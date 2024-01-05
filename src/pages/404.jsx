export default function NotFound() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex gap-8 items-start">
        <h1 className="text-6xl font-black text-red-300">404</h1>
        <p className="text-4xl font-bold">Page not found</p>
      </div>
      <div>
        <a href="/" className="underline text-green-300">
          Return to home
        </a>
      </div>
    </div>
  );
}
