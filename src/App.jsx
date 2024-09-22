import './App.css'
import Navigation from './components/navigation/Navigation'
import RoutesController from './routes'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();

  const shouldHideNavigation = location.pathname.includes('/details') || location.pathname.includes('/create');
  return (
    <>
      {!shouldHideNavigation && <Navigation />}
      <RoutesController/>
    </>
  )
}

export default App
