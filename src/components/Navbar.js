import { Navbar } from 'react-bootstrap'
import Settings from './SettingsDropDown'

const NavigationBar = ({ user, setForecasts }) => (
  <Navbar className="navBar">
    <nav className="logo">FinSight</nav>
    <nav className="ms-auto">
      {user ? <Settings user={user} setForecasts={setForecasts} /> : null}
    </nav>
  </Navbar>
)

export default NavigationBar
