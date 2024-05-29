import { Outlet } from 'react-router-dom';
import './Layout.scss';

export default function Layout() {
  return (
    <>
      <nav>
        <h1 className="main-title">Cultivation admin</h1>
      </nav>
      <div className="layout">
        <Outlet />
      </div>
    </>
  );
}
