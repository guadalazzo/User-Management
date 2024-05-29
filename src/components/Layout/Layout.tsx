import { Outlet, Link } from 'react-router-dom';
import './Layout.scss';
import { ROUTES } from '../../utils/consts';

export default function Layout() {
  return (
    <>
      <nav>
        <h1 className="main-title">
          <Link to={ROUTES.BASE_URL}>Cultivation admin</Link>
        </h1>
      </nav>
      <div className="layout">
        <Outlet />
      </div>
    </>
  );
}
