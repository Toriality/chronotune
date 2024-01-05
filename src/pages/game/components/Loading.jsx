import { useState, useEffect } from "react";

export function Loading(props) {
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [msgIndex, setMsgIndex] = useState();
  const [showItsLoading, setShowItsLoading] = useState(false);

  const messages = [
    [
      "Put your records on...",
      "Tell me your favorite song...",
      "Just relax, just relax...",
    ],
    [
      "I've been waiting too long...",
      "Sometimes I don't know what I will find...",
      "I only know it's a matter of time...",
    ],
    [
      "Are you bored yet?",
      "And if you're feeling lonely, you should tell me...",
      "Before this ends up as another memory...",
    ],
  ];
  // Eu vivo no aguardo, de ver você voltando, cruzando a porta, parararara

  useEffect(() => {
    if (msgIndex === undefined) {
      setMsgIndex(Math.floor(Math.random() * messages.length));
    }

    const interval = setInterval(() => {
      setLoadingMessage(() => {
        const random = messages[msgIndex];
        const index = random.indexOf(loadingMessage) || 0;
        return random[(index + 1) % random.length];
      });
      setShowItsLoading(true);
      console.log("Loading...");
    }, 3000);

    return () => clearInterval(interval);
  }, [msgIndex, loadingMessage, messages]);

  return (
    <>
      <div className={`m-auto py-2 px-4`}>
        <p className={`mb-1 py-2 px-4 text-3xl font-black  bg-${props.color}-500`}>
          <span className="mix-blend-difference">{loadingMessage}</span>
        </p>
        {showItsLoading && <p className="text-xs">(It&apos;s loading)</p>}
      </div>
    </>
  );
}
