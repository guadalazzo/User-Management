import { useEffect, useState } from 'react';
import { getCultivationUsers, deleteUserFromCultivation } from '../../services';
import { useParams } from 'react-router-dom';
import { cultivationUsers } from '../../types/index';
import Table from './../../components/Table/Table';
import UserView from '../../components/UserView/UserView';
import UserAddition from '../../components/UserAddition/UserAddition';
import { ROLES } from '../../utils/consts';

import './style.scss';

export default function EditCultivation() {
  const { id } = useParams();

  const [cultivationUsers, setCultivationUsers] = useState<cultivationUsers[]>([]);
  const [toggleUserAddition, setToggleUserAddition] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Load cultivation by id
  const loadCultivationUsers = async (id: string) => {
    try {
      const data = await getCultivationUsers(id);
      setCultivationUsers(data);
    } catch (e) {
      console.error('Failed to load cultivation:', e);
    }
  };

  const handleAddTeamMember = () => {
    setToggleUserAddition(true);
  };
  const handleClose = () => {
    setToggleUserAddition(false);
  };

  const handleAdd = (usersList: cultivationUsers[]) => {
    // Update with the new users
    setCultivationUsers((prevCultivationUsers) => [...prevCultivationUsers, ...usersList]);
    setToggleUserAddition(false);
  };

  const handleDelete = async (userId: number) => {
    try {
      setLoading(true);
      if (id) {
        await deleteUserFromCultivation(id, userId);

        const filterCultivationUsers = cultivationUsers.filter((cultivationUser) => cultivationUser.user.id !== userId);
        setCultivationUsers([...filterCultivationUsers]);
      }
    } catch (e) {
      console.error('Error deleting user:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadCultivationUsers(id);
    }
    return () => {
      // on unmount
    };
  }, []);

  return (
    <article className="main-content">
      <section className="card">
        <h2>Cultivation team</h2>
        <div className="content">
          {loading && <span>Loading</span>}
          {!cultivationUsers.length ? (
            <> No cultivation Users</>
          ) : (
            <Table columns={['Name', 'Cultivation role', '']}>
              {cultivationUsers.map(({ user, role }, index) => {
                const hasUserAndRole = user.name?.length && role.name?.length;
                return hasUserAndRole ? (
                  <tr key={`${user.name}-${index}`} className="cultivations-table_row">
                    <td>
                      <UserView name={user.name} role={role.name} />
                      {/* Head grower has the (you) and is not removable */}
                    </td>
                    {/* this should be a role selector with options */}
                    <td>{role.name}</td>
                    <td className="edit">
                      {role.name !== ROLES.HEAD_GROWER && (
                        <button onClick={() => handleDelete(user.id)} disabled={loading}>
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ) : null;
              })}
            </Table>
          )}
          <button onClick={handleAddTeamMember} className="btn">
            + Add new teammember
          </button>
        </div>
      </section>
      {toggleUserAddition && <UserAddition currentUsers={cultivationUsers} onClose={handleClose} onAdd={handleAdd} />}
    </article>
  );
}
