import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';

const OwnerCard = (props) => {

    const navigate = useNavigate();
    const {currProp, setCurrProp} = useContext(AppContext);   
    const owner = props.owner;

    const handleClick = (owner) => {
        console.log('clicked',owner.o_id);
        setCurrProp(owner);
        navigate('/add-owner');
    }
    
    return(
        <>
        {
        (props.inactive===false && owner.active===false) ? <></> :
            <div className='propertyLines owners'>
                <Button 
                    variant="outlined" 
                    size="small"
                    onClick={()=>handleClick(owner)}>
                    Edit
                </Button>
                <h3>{owner.fname} {owner.lname} </h3>
                <div> Contact info: </div>
                <p><b> email: </b> {owner.email} </p>
                <p><b> Phone: </b> {owner.phone_num} </p>
            </div>
        }
        </>
    )
    
}

export default OwnerCard;