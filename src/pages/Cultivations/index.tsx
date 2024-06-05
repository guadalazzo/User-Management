import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCultivations } from '@/services';
import { Cultivation } from '@/types';
import Table from '@/components/Table/Table';
import { setCultivationsList, setCurrentCultivation } from '@/store/cultivation';

import './styles.scss';

export default function Cultivations() {
  const [cultivations, setCultivations] = useState<Cultivation[]>([]);
  const dispatch = useDispatch();

  // Load Cultivations, updates local and global state
  const loadCultivations = async () => {
    try {
      // Get cultivations list
      const data = await getCultivations();
      setCultivations(data);
      dispatch(setCultivationsList(data));
    } catch (e) {
      console.error('Failed to load Cultivations:', e);
    }
  };

  useEffect(() => {
    loadCultivations();
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (currentCultivation: Cultivation) => {
    dispatch(setCurrentCultivation(currentCultivation));
  };
  return (
    <article className="main-content">
      <div className="card">
        <h2>Cultivations</h2>
        <div className="content">
          {!cultivations.length ? (
            <div className="empty">No available results</div>
          ) : (
            <Table columns={['Cultivation name', '']}>
              {cultivations.map((cultivation, index) => {
                return (
                  <tr key={`${cultivation.name}-${index}`} className="cultivations-table_row">
                    <td>{cultivation?.name}</td>
                    <td className="edit">
                      <Link to={`/edit/${cultivation?.id}`} onClick={() => handleClick(cultivation)}>
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </Table>
          )}
        </div>
      </div>
    </article>
  );
}
