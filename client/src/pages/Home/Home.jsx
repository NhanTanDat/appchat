import React, { useState, useEffect } from 'react';
import Feed from "./components/Feed";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import { Stack } from 'react-bootstrap';

const Home = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
      <div style={{display: 'flex'}}>
        {windowWidth >= 1100 ? <LeftBar/> : null}
        <Feed />
        {windowWidth >= 890 ? <RightBar /> : null}
      </div>

    )
}

export default Home;