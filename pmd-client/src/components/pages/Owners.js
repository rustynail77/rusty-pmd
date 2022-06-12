import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {useNavigate} from 'react-router-dom';
import OwnerCard from '../partials/OwnerCard';
import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';

const Owners = (props) => {
    
    const navigate = useNavigate();
    const [owners, setOwners] = useState([]);
    const [showInactive, setShowInactive] = useState(false);
    const {userId, currProp, setCurrProp} = useContext(AppContext);

    if (!userId) {navigate('/')}
    
    useEffect(()=> {
        const getOwners = async() => {
            try {
                const res = await fetch('/api/owners/all-owners');
                const data = await res.json();
                setOwners(data);
            }  
            catch(err){
                console.log(err);
            }
        }
        getOwners()
        setCurrProp({});
    },[]);
   
    return(
        <>
        <div className="secondary-bar">
            <Box sx={{ '& button': { m: 2 } }}>
                <Button 
                    size="medium" variant="contained" 
                    onClick={()=>navigate("/add-owner")}>Add Owner</Button>
                <Button 
                    size="medium" variant="contained" 
                    onClick={()=>setShowInactive((showInactive)?false:true)}>
                    {(showInactive)?'Hide':'Show'} inactive
                </Button>
            </Box>
            * Click on row to view/edit
        </div>
        <div className='lines'>
            
            {
                (!owners) ? <></>:
                    owners.map(owner => {
                    return (
                        <div key={owner.o_id}>
                            <OwnerCard inactive={showInactive} owner={owner}/>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default Owners;