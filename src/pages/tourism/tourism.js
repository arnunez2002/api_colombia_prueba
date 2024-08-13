import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart'; // Asegúrate de que la ruta sea correcta

function TouristAttractionsList() {
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [groupedData, setGroupedData] = useState(null);

  useEffect(() => {
    axios.get('https://api-colombia.com/api/v1/TouristicAttraction')
      .then(response => {
        if (response.headers['content-type'].includes('application/json')) {
          setAttractions(response.data);
        } else {
          throw new Error('La respuesta no es un JSON válido');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const openModal = (attraction) => {
    setModalData(attraction);
  };

  const closeModal = () => {
    setModalData(null);
    setShowMore(false); // Resetear el estado de showMore al cerrar el modal
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const groupAttractions = () => {
    const grouped = attractions.reduce((acc, attraction) => {
      const department = attraction.city?.department?.name || 'Sin departamento';
      const city = attraction.city?.name || 'Sin ciudad';

      if (!acc[department]) {
        acc[department] = {};
      }

      if (!acc[department][city]) {
        acc[department][city] = {
          count: 0,
        };
      }

      acc[department][city].count += 1;

      return acc;
    }, {});

    setGroupedData(grouped);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Atracciones Turísticas de Colombia</h1>
      <button onClick={groupAttractions}>Agrupar por Departamento y Ciudad</button>
      {groupedData && <Chart data={groupedData} />}
      <table className="attractions-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Departamento</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {attractions.map(attraction => (
            <tr key={attraction.id}>
              <td>
                {attraction.images && attraction.images.length > 0 ? (
                  <img src={attraction.images[0]} alt={attraction.name} className="attraction-image" />
                ) : (
                  'Sin imagen'
                )}
              </td>
              <td>{attraction.name || 'Sin nombre'}</td>
              <td>{attraction.city?.name || 'Sin ciudad'}</td>
              <td>{attraction.city?.department?.name || 'Sin departamento'}</td>
              <td>
                <button onClick={() => openModal(attraction)}>Ver descripción</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{modalData.name}</h2>
            <p>
              {showMore ? modalData.description : modalData.description.slice(0, 100) + '...'}
              {modalData.description.length > 100 && (
                <button className="show-more-button" onClick={toggleShowMore}>
                  {showMore ? 'Ver menos' : 'Ver más'}
                </button>
              )}
            </p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      <style>{`
        .attractions-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 18px;
          text-align: left;
        }
        .attractions-table th,
        .attractions-table td {
          padding: 12px 15px;
          border: 1px solid #ddd;
        }
        .attractions-table th {
          background-color: #f2f2f2;
        }
        .attraction-image {
          width: 100px;
          height: auto;
          border-radius: 5px;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 500px;
          width: 80%;
          text-align: center;
        }
        .modal-content h2 {
          margin-bottom: 20px;
        }
        .modal-content p {
          margin-bottom: 20px;
          text-align: justify;
        }
        .modal-content button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .modal-content button:hover {
          background-color: #45a049;
        }
        .show-more-button {
          display: block;
          margin: 10px 0;
          background: none;
          border: none;
          color: #007BFF;
          cursor: pointer;
        }
        .show-more-button:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default TouristAttractionsList;
