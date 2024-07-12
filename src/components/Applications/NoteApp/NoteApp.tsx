import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { updateAppState } from "../../../store/desktopSlice";

interface NoteAppProps {
  id: string;
}

const NoteApp: React.FC<NoteAppProps> = ({ id }) => {
  const app = useSelector((state: RootState) =>
    state.desktop.apps.find((app) => app.id === id),
  );
  const [content, setContent] = useState((app?.state.content as string) || "");
  const dispatch = useDispatch();

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      dispatch(updateAppState({ id, newState: { content } }));
    }, 500);

    return () => clearTimeout(saveTimer);
  }, [content, id, dispatch]);

  return (
    <div className="h-full flex flex-col p-4 bg-appBackgroundLight dark:bg-appBackgroundDark text-appTextLight dark:text-appTextDark">
      <textarea
        className="flex-grow p-2 resize-none focus:outline-none bg-appBackgroundLight dark:bg-appBackgroundDark text-appTextLight dark:text-appTextDark"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your note here..."
      />
    </div>
  );
};

export default NoteApp;
