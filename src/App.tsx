import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';
import { ROUTES } from './utils/consts';
import Layout from './components/Layout/Layout';
import Cultivations from './pages/Cultivations';
import EditCultivation from './pages/Cultivations/Edit';
function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.BASE_URL} element={<Layout />}>
          <Route index element={<Cultivations />} />
          <Route path={ROUTES.CULTIVATION_EDIT} element={<EditCultivation />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
