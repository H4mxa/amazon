import { sampleProducts } from './app/data';
import React from 'react';
import './App.css';

function App() {
  return (
    <>
      <div>
        <header>TS Amazon</header>
        <main>
          <ul>
            {sampleProducts.map((product) => (
              <li key={product._id}>
                <img
                  src={product.image}
                  alt="image"
                  className="product-image"
                />
                <h2>{product.name}</h2>
                <p>${product.price}</p>
              </li>
            ))}
          </ul>
        </main>
        <footer>All rights reserved</footer>
      </div>
    </>
  );
}

export default App;
