import React, { useState, useEffect } from "react";

const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-30 text-white p-1 flex justify-between items-center">
      <div>Web OS</div>
      <div>{currentTime.toLocaleTimeString()}</div>
    </div>
  );
};

export default MenuBar;
