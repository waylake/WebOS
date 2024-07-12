import React, { useState } from "react";

interface BrowserControlsProps {
  url: string;
  onUrlChange: (url: string) => void;
}

const BrowserControls: React.FC<BrowserControlsProps> = ({
  url,
  onUrlChange,
}) => {
  const [inputUrl, setInputUrl] = useState(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUrlChange(inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex p-2 bg-appBackgroundLight dark:bg-appBackgroundDark text-appTextLight dark:text-appTextDark"
    >
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        className="flex-grow px-2 py-1 border rounded-l bg-appBackgroundLight dark:bg-appBackgroundDark text-appTextLight dark:text-appTextDark"
      />
      <button
        type="submit"
        className="px-4 py-1 bg-blue-500 text-white rounded-r"
      >
        Go
      </button>
    </form>
  );
};

export default BrowserControls;
