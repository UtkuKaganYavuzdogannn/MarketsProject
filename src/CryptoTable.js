import React, { useState, useEffect } from "react";
import './CryptoTable.css';



const CryptoTable = () => {
  const [coins, setCoins] = useState([]); // API'den gelen verileri saklamak için

  useEffect(() => {
    fetch("https://localhost:7215/api/investment/prices") // .NET Core API'yi çağır
      .then((response) => response.json()) // JSON formatına çevir
      .then((data) => {
        const transformedData = Object.entries(data).map(([name, details]) => ({
          name,
          price: details.usd, // "usd" değerini al
        }));
        setCoins(transformedData); // State'e kaydet
      });
  }, []); // Boş array, sadece 1 kez çalışmasını sağlar

  return (
    <div>
      <h2>Cryptos and gold-silver etc.</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.name}>
              <td>{coin.name}</td>
              <td>${coin.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default CryptoTable;
