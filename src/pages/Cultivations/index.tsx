import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCultivations } from '../../services';
import { cultivation } from '../../types';
import Table from './../../components/Table/Table';
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
    <article className="main-content">
      <div className="card">
        <h2>Cultivations</h2>
        {!cultivations.length ? (
          <div>No available results</div>
        ) : (
          <Table columns={['Cultivation name', '']}>
            {cultivations.map((cultivation) => {
              return (
                <tr className="cultivations-table_row">
                  <td>{cultivation?.name}</td>
                  <td className="edit">
                    <Link to={`/edit/${cultivation?.id}`}>Edit</Link>
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </div>
    </article>
  );
}
