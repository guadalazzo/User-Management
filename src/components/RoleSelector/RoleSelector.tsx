import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateRole } from '../../services';
import { Role, reducer } from '../../types/index';

import './style.scss';

export default function RoleSelector({
  name,
  userId,
  onChange,
}: {
  name: string;
  userId: number;
  onChange: () => void;
}) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [cultivationRoles, setcultivationRoles] = useState<Role[]>([]);
  const [selectedItem, setSelectedItem] = useState<Role | null>(null);
  const { id: cultivationId } = useParams();

  const roles = useSelector<reducer>((state) => state.cultivations.roles) as Role[];

  useEffect(() => {
    if (roles) {
      setcultivationRoles(roles);
      const currentRole = roles.find((role) => role.name === name);
      if (currentRole) {
        setSelectedItem(currentRole);
      }
    }
  }, []);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleDropdownClick = async (id: number) => {
    const currentRole = cultivationRoles.find((role) => role.id === id);
    if (currentRole) {
      selectedItem?.id === id ? setSelectedItem(null) : setSelectedItem(currentRole);
      try {
        if (cultivationId) {
          await updateRole(cultivationId, { role: { id: currentRole.id } }, userId);
          onChange();
        }
      } catch (e) {
        console.error('Error with Role upate', e);
      } finally {
        setOpen(false);
      }
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem !== null
          ? cultivationRoles.find((cultivationRole) => cultivationRole.id === selectedItem.id)?.name
          : name}
        <span className={`icon ${isOpen && 'open'}`}> ⌃ </span>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {cultivationRoles.map((cultivationRole) => (
          <div
            className={`dropdown-item ${cultivationRole.id === selectedItem?.id && 'selected'}`}
            key={cultivationRole.id}
            onClick={() => handleDropdownClick(cultivationRole.id)}
          >
            <p className="title">{cultivationRole.name}</p>
            <p className="sub">{cultivationRole.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
