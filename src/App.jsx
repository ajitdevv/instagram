import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';

function App() {
  const path = window.location.pathname;

  return <main>{path === '/admin' ? <AdminPage /> : <LoginPage />}</main>;
}

export default App;
