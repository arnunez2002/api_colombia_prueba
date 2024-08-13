import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PresidentsList.css'; // Asegúrate de crear este archivo CSS

function PresidentsList() {
  const [presidents, setPresidents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPresident, setSelectedPresident] = useState(null);
  const [sortedParties, setSortedParties] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' o 'desc'
  const [sortBy, setSortBy] = useState('count'); // 'count' o 'name'
  const [view, setView] = useState('list'); // 'list' o 'summary'
  const [modalData, setModalData] = useState(null); // Datos del modal de detalles
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    axios.get('https://api-colombia.com/api/v1/President') // Reemplaza con la URL correcta
      .then(response => {
        if (response.headers['content-type'].includes('application/json')) {
          const data = response.data;
          setPresidents(data);
          processPresidentsData(data);
        } else {
          throw new Error('La respuesta no es un JSON válido');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const processPresidentsData = (data) => {
    const partyGroups = data.reduce((acc, president) => {
      const party = president.politicalParty;
      if (!acc[party]) {
        acc[party] = [];
      }
      acc[party].push(president);
      return acc;
    }, {});

    const sortedPartiesArray = Object.keys(partyGroups).map(party => ({
      party,
      count: partyGroups[party].length,
      presidents: partyGroups[party],
    }));

    if (sortOrder === 'desc') {
      sortedPartiesArray.sort((a, b) => b.count - a.count);
    } else {
      sortedPartiesArray.sort((a, b) => a.count - b.count);
    }

    if (sortBy === 'name') {
      sortedPartiesArray.sort((a, b) => sortOrder === 'desc'
        ? b.party.localeCompare(a.party)
        : a.party.localeCompare(b.party)
      );
    }

    setSortedParties(sortedPartiesArray);
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sortOrder') {
      setSortOrder(value);
    } else if (name === 'sortBy') {
      setSortBy(value);
    }
    processPresidentsData(presidents);
  };

  const handleViewChange = () => {
    setView(view === 'list' ? 'summary' : 'list');
  };

  const openModal = (president) => {
    setSelectedPresident(president);
  };

  const closeModal = () => {
    setSelectedPresident(null);
    setModalData(null);
  };

  const showPresidentsByParty = (party, presidents) => {
    setModalData({ party, presidents });
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredPresidents = presidents.filter(president =>
    `${president.name} ${president.lastName}`.toLowerCase().includes(filterText.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="header">
        <h1>Presidentes de Colombia</h1>
        <button className="add-button" onClick={handleViewChange}>
          {view === 'list' ? 'Ver Agrupacion por partido' : 'Ver Lista'}
        </button>
      </div>
      {view === 'list' && (
        <>
          <div className="filter">
            <label>
              Filtrar por nombre:
              <input
                type="text"
                value={filterText}
                onChange={handleFilterChange}
                placeholder="Search name President"
              />
            </label>
          </div>
          <table className="presidents-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Partido</th>
                <th>Mandato</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {filteredPresidents.map(president => (
                <tr key={president.id}>
                  <td>
                    <img src={president.image} alt={`${president.name} ${president.lastName}`} className="president-image" />
                  </td>
                  <td>{president.name} {president.lastName}</td>
                  <td>{president.politicalParty}</td>
                  <td>{president.startPeriodDate} - {president.endPeriodDate}</td>
                  <td>
                    <button onClick={() => openModal(president)}>Ver más</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {view === 'summary' && (
        <>
          <div className="controls">
            <label>
              Ordenar por:
              <select name="sortBy" value={sortBy} onChange={handleSortChange}>
                <option value="count">Conteo</option>
                <option value="name">Nombre del Partido</option>
              </select>
            </label>
            <label>
              Orden:
              <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
                <option value="desc">Descendente</option>
                <option value="asc">Ascendente</option>
              </select>
            </label>
          </div>
          <table className="presidents-table">
            <thead>
              <tr>
                <th>Partido Político</th>
                <th>Conteo de Presidentes</th>
              </tr>
            </thead>
            <tbody>
              {sortedParties.map(({ party, count, presidents }) => (
                <tr key={party}>
                  <td>{party}</td>
                  <td onClick={() => showPresidentsByParty(party, presidents)} className="count-cell">
                    {count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {selectedPresident && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedPresident.name} {selectedPresident.lastName}</h2>
            <p><strong>Partido:</strong> {selectedPresident.politicalParty}</p>
            <p><strong>Mandato:</strong> {selectedPresident.startPeriodDate} - {selectedPresident.endPeriodDate}</p>
            <p><strong>Descripción:</strong> {selectedPresident.description}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
      {modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Presidentes del Partido {modalData.party}</h2>
            <ul>
              {modalData.presidents.map(president => (
                <li key={president.id}>{president.name} {president.lastName}</li>
              ))}
            </ul>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PresidentsList;
