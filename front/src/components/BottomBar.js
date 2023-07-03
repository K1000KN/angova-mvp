import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import '../index.css';

const BottomBar = ({handleChange, value}) => {
    return(
        <BottomNavigation
            className='bottomNav displayNavBott'
            value={value} onChange={handleChange}
        >
            <BottomNavigationAction className='displayNavBott' label="Session" value="code" icon={<img src='./home.png'alt='' style={{width:40}}/>} />
            <BottomNavigationAction  className='displayNavBott' label="Profil" value="profil" icon={<AccountCircleIcon  sx={{ fontSize: 30}} />} />
            
        </BottomNavigation>
    )
}
export default BottomBar;