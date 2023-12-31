import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../index.css';

const BottomBar = ({handleChange, value}) => {
    return(
        <BottomNavigation
            className='bottomNav displayNavBott'
            value={value} onChange={handleChange}
        >
            <BottomNavigationAction className='displayNavBott' label="Session" value="code" icon={<img src="./images/code_route.png"alt='' style={{width:40}}/>} />
            <BottomNavigationAction  className='displayNavBott' label="Profil" value="profil" icon={<AccountCircleIcon  sx={{ fontSize: 30}} />} />
            
        </BottomNavigation>
    )
}
export default BottomBar;