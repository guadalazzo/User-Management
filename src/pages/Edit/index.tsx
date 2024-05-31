import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCultivationUsers, deleteUserFromCultivation, getCultivationRoles } from '@/services';
import { useParams } from 'react-router-dom';
import { Cultivation, CultivationUser, reducer } from '@/types/index';
import Table from '@/components/Table/Table';
import UserView from '@/components/UserView/UserView';
import UserAddition from '@/components/UserAddition/UserAddition';
import RoleSelector from '@/components/RoleSelector/RoleSelector';
import { ROLES } from '@/utils/consts';
import { setRoles } from '@/store/cultivation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { racePromises } from '@/utils';

import './style.scss';

export default function EditCultivation() {
  const { id } = useParams();

  const [cultivationUsers, setCultivationUsers] = useState<CultivationUser[]>([]);
  const [toggleUserAddition, setToggleUserAddition] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const currentCultivation = useSelector<reducer>((state) => state.cultivations.currentCultivation) as Cultivation;

  const dispatch = useDispatch();

  // Load cultivation by id
  const loadCultivationUsers = async (id: string) => {
    try {
      const data = await getCultivationUsers(id);
      setCultivationUsers(data);
    } catch (e) {
      console.error('Failed to load cultivation:', e);
    }
  };

  const getRoles = async () => {
    try {
      const data = await getCultivationRoles();
      dispatch(setRoles(data));
    } catch (e) {
      console.error('Failed to load Roles:', e);
    }
  };

  const handleClose = () => {
    setToggleUserAddition(false);
  };
  const reset = () => {
    setToggleUserAddition(false);
    setErrorMessage('');
  };
  const handleAdd = (usersList: CultivationUser[]) => {
    // Update with the new users
    setCultivationUsers((prevCultivationUsers) => [...prevCultivationUsers, ...usersList]);
    reset();
  };

  const handleDelete = async (userId: number) => {
    try {
      setErrorMessage('');
      if (id) {
        const deletePromise = deleteUserFromCultivation(id, userId);
        // Only show loading when exceeds 300ms
        await racePromises(setLoading, [deletePromise], 300);

        const resolvedResponse = await deletePromise;

        if (resolvedResponse && resolvedResponse.message) {
          const filterCultivationUsers = cultivationUsers.filter(
            (cultivationUser) => cultivationUser.user.id !== userId,
          );
          setCultivationUsers([...filterCultivationUsers]);
        } else if (resolvedResponse && resolvedResponse.error && resolvedResponse.error.message) {
          setErrorMessage(resolvedResponse.error.message);
        }
      }
    } catch (e) {
      setErrorMessage('Error deleting user.');
      console.error('Error deleting user:', e);
    }
  };

  const handleChange = (message?: string) => {
    setErrorMessage('');
    if (message) {
      setErrorMessage(message);
    }
    if (id) {
      loadCultivationUsers(id);
    }
  };

  useEffect(() => {
    if (id) {
      loadCultivationUsers(id);
    }
    getRoles();
    return () => {
      // on unmount
      reset();
    };
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="main-content">
      <Breadcrumbs name={'Edit'} />
      <section className="card">
        <h2>
          Cultivation team: <span className="card-name">{currentCultivation.name}</span>
        </h2>
        <div className="content">
          {loading && <span>Deleting User</span>}
          {errorMessage && <span className="error-message">{errorMessage}</span>}
          {!cultivationUsers.length ? (
            <div className="empty"> No cultivation Users</div>
          ) : (
            <Table columns={['Name', 'Cultivation role', '']}>
              {cultivationUsers.map(({ user, role }, index) => {
                const hasUserAndRole = user.name?.length && role.name?.length;
                return hasUserAndRole ? (
                  <tr key={`${user.name}-${index}`} className="cultivations-table_row">
                    <td>
                      <UserView name={user.name} role={role.name} />
                    </td>
                    {/* this should be a role selector with options */}

                    <td className="role" key={`${user.name}-${index}-role`}>
                      <RoleSelector name={role.name} userId={user.id} onChange={handleChange} />
                    </td>
                    <td className="edit" key={`${user.name}-${index}-edit`}>
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
          <button onClick={() => setToggleUserAddition(true)} className="btn">
            + Add new teammember
          </button>
        </div>
      </section>
      {toggleUserAddition && <UserAddition currentUsers={cultivationUsers} onClose={handleClose} onAdd={handleAdd} />}
    </article>
  );
}
