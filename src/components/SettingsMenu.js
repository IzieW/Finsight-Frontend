import LogoutButton from './LogoutButton'
import AllowanceForm from './AllowanceForm'
import { BsFillPencilFill} from 'react-icons/bs'

const SettingsMenu = ({
  user,
  editAllowance,
  setEditAllowance,
  setForecasts,
}) => {

  return (
    <div className="settings">
      <div>{user.name}</div>
      <div style={{display: 'flex', alignItems:'center'}}>
        Daily Budget: £
        {editAllowance ? (<div>
          <AllowanceForm user={user} editAllowance={editAllowance} setEditAllowance={setEditAllowance} setForecasts={setForecasts}/>
        </div>)
          :( <div> {user.allowance}
            <BsFillPencilFill
              style={{ fontSize: '10px', marginLeft: '5px' }}
              onClick={() => setEditAllowance(true)}
            />
          </div>)
        }
      </div>
      <LogoutButton />
    </div>
  )
}

export default SettingsMenu
