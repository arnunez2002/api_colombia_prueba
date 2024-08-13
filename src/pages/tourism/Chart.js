import React from 'react';

function Chart({ data }) {
  const maxCount = Math.max(
    ...Object.values(data).flatMap(department => 
      Object.values(department).map(city => city.count)
    )
  );

  return (
    <div className="chart-container">
      <h2>Barras de Atracciones Turísticas</h2>
      <div className="chart">
        {Object.entries(data).map(([department, cities]) => (
          <div key={department} className="department">
            <h3>{department}</h3>
            <div className="cities">
              {Object.entries(cities).map(([city, info]) => (
                <div key={city} className="bar-container">
                  <div 
                    className="bar" 
                    style={{ height: `${(info.count / maxCount) * 100}%` }}
                    title={`Ciudad: ${city}\nConteo: ${info.count}`}
                  />
                  <div className="city-label">
                    {city}<br />
                    <span className="count">{info.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .chart-container {
          margin: 20px;
          padding: 20px;
        }
        .chart {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .department {
          margin-bottom: 30px;
        }
        .cities {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .bar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .bar {
          width: 40px;
          background-color: #4CAF50;
          border-radius: 5px;
          transition: height 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .city-label {
          text-align: center;
          font-size: 14px;
        }
        .count {
          font-weight: bold;
          color: #333;
        }
      `}</style>
    </div>
  );
}

export default Chart;
