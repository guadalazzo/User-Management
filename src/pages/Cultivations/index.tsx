import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCultivations } from '../../services';
import { cultivation } from '../../types';
import './styles.scss';

export default function Cultivations() {
  const [cultivations, setCultivations] = useState<cultivation[]>([]);

  // Load Cultivations, updates local an global state
  const loadCultivations = async () => {
    try {
      // Get cultivations list
      const data = await getCultivations();
      setCultivations(data);
    } catch (e) {
      console.error('Failed to load Cultivations:', e);
    }
  };

  useEffect(() => {
    loadCultivations();
  }, []);

  return (
    <div className="main-content">
      <div className="">
        <h2>Cultivations</h2>
        <table className="cultivations-table">
          <thead>
            <tr>
              <th>Cultivation name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!cultivations.length ? (
              <li>No available results</li>
            ) : (
              cultivations.map((cultivation) => {
                return (
                  <tr className="cultivations-table_row">
                    <td>{cultivation?.name}</td>
                    <td className="edit">
                      <Link to={`/edit/${cultivation?.id}`}>Edit</Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
