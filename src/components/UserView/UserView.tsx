import { ROLES } from '../../utils/consts';

import './style.scss';

export default function UserView({ name, role }: { name: string; role?: string }) {
  const getInitial = (name: string) => {
    return name[0].toUpperCase();
  };
  return (
    <div>
      <p>
        <span className="avatar">{getInitial(name)}</span>
        {name}
        {role === ROLES.HEAD_GROWER ? <span className="you">(you)</span> : null}
      </p>
    </div>
  );
}
