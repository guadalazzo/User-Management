import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers, addCultivationUsers } from '@/services';
import { debounce } from '@/utils';
import { Role, User, CultivationUser, reducer } from '@/types/index';
import UserView from '@/components/UserView/UserView';
import './style.scss';
import { ROLES } from '@/utils/consts';
import { useSelector } from 'react-redux';

export default function UserAddition({
  currentUsers,
  onClose,
  onAdd,
}: {
  currentUsers: CultivationUser[];
  onClose: () => void;
  onAdd: (_: CultivationUser[]) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const roles = useSelector<reducer>((state) => state.cultivations.roles) as Role[];
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const { id } = useParams();

  const excludeCurrentUsers = (allUsers: User[]) => {
    // get all users and exclude the current ones
    const currentIds = currentUsers.map(({ user: AuxUser }) => AuxUser.id);
    const filteredUsers = allUsers.filter(({ id: UserId }) => !currentIds.includes(UserId));

    setUsers(filteredUsers);
    setUsersFiltered(filteredUsers);
  };

  // Load all users
  const loadAllUsers = async () => {
    try {
      setLoading(true);
      // Bring all the users
      const data = await getUsers();
      // Remove the ones are already in the cultivation
      excludeCurrentUsers(data);
    } catch (e) {
      console.error('Failed to load users:', e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAllUsers();
    document.body.style.overflow = 'hidden';
    document.body.scrollTop = 0;
    return () => {
      document.body.style.overflow = '';
      setCheckedItems({});
    };
    // on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const filterUsers = useCallback(
    (name: string) => {
      const lowerCaseName = name.toLowerCase();
      const filteredUsers = users.filter((user) => {
        const lowerCaseMissionName = user.name.toLowerCase();
        return lowerCaseMissionName.includes(lowerCaseName);
      });
      setUsersFiltered(filteredUsers);
    },
    [users],
  );

  // Delays the new filter call 400ms
  const debouncedFilterUsers = useMemo(() => debounce(filterUsers, 400), [filterUsers]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e.target.value === 'string') {
      setUserName(e.target.value);
      debouncedFilterUsers(e.target.value);
    }
  };

  const handleAdd = async () => {
    try {
      setLoading(true);

      const Observer: Role | undefined = roles.find((role: Role) => role.name === ROLES.OBSERVER);

      // Get list of user IDs checked
      const filteredCheckedUsers = Object.keys(checkedItems).filter((user) => checkedItems[user]);

      // Prepare the payload for each user
      if (Observer) {
        const payloads = filteredCheckedUsers.map((userId: string) => ({
          role: { id: Observer.id },
          user: { id: Number(userId) },
        }));

        // Map over payloads and use Promise.all to wait for all async calls to complete
        // As there is no way to send an array of users, we have to add them individually
        const usersList = await Promise.all(
          payloads.map(async (payload) => {
            if (id) {
              try {
                // add each user to the cultivation
                const userAdded = await addCultivationUsers(id, payload);
                if (userAdded.cultivation_id) {
                  return userAdded;
                } else {
                  if (userAdded?.error?.message) {
                    setErrorMessage(`${userAdded.error.message}`);
                  }
                }
              } catch (e) {
                setErrorMessage(`${e}`);
                console.error('Error adding the user:', e);
              }
            }
          }),
        );
        // Update list to update edit page
        const validUsersList = usersList.filter(Boolean) as CultivationUser[];

        if (validUsersList.length) {
          onAdd(validUsersList);
        }
      }
    } catch (e) {
      setLoading(false);
      setErrorMessage(`${e}`);
      console.error('Error adding the user:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <button className="close" onClick={onClose}>
          X
        </button>
        <div className="header">
          <h3>Add teammember</h3>
        </div>
        <label className="search">
          <input
            onChange={handleInput}
            value={userName}
            type="text"
            name="name"
            id="name-search"
            placeholder="Search teammember"
          />
          <button type="submit">
            <img src="/assets/search.svg" alt="search"></img>
          </button>
        </label>
        <div className="content">
          <ul>
            {loading ? (
              <>Loading</>
            ) : usersFiltered.length ? (
              usersFiltered.map((user, index) => {
                const id = user.id.toString();
                return (
                  <li className="select-user" key={`${user.name}-${index}`}>
                    <input type="checkbox" name={id} checked={checkedItems[id]} onChange={handleChange} />
                    <UserView name={user.name} />
                  </li>
                );
              })
            ) : (
              <li>User not found</li>
            )}
          </ul>
        </div>
        <span className="error-message bottom-err">{errorMessage}</span>
        <button onClick={handleAdd} className="btn" disabled={loading}>
          Add to cultivation
        </button>
      </div>
    </div>
  );
}
