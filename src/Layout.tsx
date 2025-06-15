import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: "rgb(252, 252, 252)" }}>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;