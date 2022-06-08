import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const Navbar = (props) => {
    
    const navigate = useNavigate();
    const { userId, setUserId} = useContext(AppContext);   
    
    const handleLogInOut = () => {
        if (userId) {
            setUserId('');
            navigate('/');
        } else {
            navigate('/');
        }
    }

    return (
        <div className="navbar">
            <h1>Rusty's Property Management Database (PMD)</h1>
            <Box sx={{ '& button': { m: 1 } }}>
                <Button size="medium" onClick={()=>handleLogInOut()}>Log {(userId)?'out':'in'}</Button>
                {(userId)?
                <>
                    <Button size="medium" onClick={()=>navigate('/')}>Properties</Button>
                    <Button size="medium" onClick={()=>navigate('/owners')}>Owners</Button>
                </>:null}
                <p>{(userId)?`Welcome ${userId}!`:''}</p>
            </Box>
        </div>
    )
}

export default Navbar;