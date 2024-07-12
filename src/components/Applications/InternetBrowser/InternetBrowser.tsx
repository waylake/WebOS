import React, { useState } from "react";
import BrowserControls from "./BrowserControls";

const InternetBrowser: React.FC = () => {
  const [url, setUrl] = useState("https://www.google.com");

  return (
    <div className="h-full flex flex-col bg-appBackgroundLight dark:bg-appBackgroundDark text-appTextLight dark:text-appTextDark">
      <BrowserControls url={url} onUrlChange={setUrl} />
      <iframe
        src={url}
        className="flex-grow w-full bg-appBackgroundLight dark:bg-appBackgroundDark text-appTextLight dark:text-appTextDark"
        title="Web Browser"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default InternetBrowser;
