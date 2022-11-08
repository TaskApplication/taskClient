import { Link } from 'react-router-dom';
import React from 'react';

// server https://taskapp-serv.herokuapp.com/

function Home() {
  return (
    <div>
      <h1>Task App</h1>

      <ul>
        {
          [1, 2, 3].map((item) => (
            <li key={item}>
              <Link to={`/v${item}`}>Version {item}</Link></li>
          ))
        }
      </ul>

    </div>
  );
}

export default Home;
