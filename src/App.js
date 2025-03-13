import React, { useState } from 'react';
import './App.css';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isIntersecting = (circle1, circle2) => {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (circle1.size + circle2.size) / 2;
};

const App = () => {
  const [circles, setCircles] = useState([]);
  const [bgColor, setBgColor] = useState('white');

  const handleClick = (e) => {
    if (circles.length === 2) {
      setCircles([]);
      setBgColor('white');
      return;
    }

    const newCircle = {
      id: circles.length,
      x: e.clientX,
      y: e.clientY,
      size: getRandomInt(20, 200),
    };

    const newCircles = [...circles, newCircle];
    setCircles(newCircles);

    if (newCircles.length === 2 && isIntersecting(newCircles[0], newCircles[1])) {
      setBgColor('red');
    }
  };

  return (
    <div className="App" onClick={handleClick} style={{ backgroundColor: bgColor }}>
      {circles.map(circle => (
        <div
          key={circle.id}
          className="circle"
          style={{
            width: circle.size,
            height: circle.size,
            left: circle.x - circle.size / 2,
            top: circle.y - circle.size / 2,
          }}
        />
      ))}
    </div>
  );
};

export default App;