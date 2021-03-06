import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {useNavigate} from 'react-router-dom';
import PropertyCard from '../partials/PropertyCard';
import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';

const Properties = (props) => {
    
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const {userId, currProp, setCurrProp, cardDisplay, setCardDisplay} = useContext(AppContext);
    const [showInactive, setShowInactive] = useState(false);

    if (!userId) {navigate('/')}

    const handleClick = () => {
        setCardDisplay((cardDisplay==="cards")?"lines":"cards");
    }

    useEffect(()=> {
        const getProperties = async() => {
            try {
                const res = await fetch('/api/properties/all-props');
                const data = await res.json();
                setProperties(data);
            }  
            catch(err){
                console.log(err);
            }
        }
        getProperties();
        setCurrProp({});
    },[]);

    return(
        <>
            <div className="secondary-bar">
                <Box sx={{ '& button': { m: 2 } }}>
                    <Button 
                        variant="contained" 
                        size="small"
                        onClick={()=>navigate("/add-prop")}>
                        Add Property
                    </Button>
                    <Button 
                        variant="contained" 
                        size="small"
                        onClick={()=>setShowInactive((showInactive)?false:true)}>
                        {(showInactive)?'Hide':'Show'} inactive
                    </Button>
                    <Button 
                        variant="contained" 
                        size="small"
                        onClick={()=>handleClick()}>
                        Display {(cardDisplay==="cards")?'table':'gallery'}
                    </Button>
                </Box>
            </div>
            
            <div className={cardDisplay}>
                {
                (!properties)?<></>:
                    (cardDisplay==="cards")?
                        properties.map(property => {
                            return (
                                <div key={property.p_id}>
                                    <PropertyCard inactive={showInactive} property={property} />
                                </div>
                            )
                        }):<>  
                            {
                            properties.map(property => {
                                    return (
                                        <div key={property.p_id}>
                                            <PropertyCard inactive={showInactive} property={property} />
                                        </div>
                                    )
                                }) 
                            }                                 
                        </>
                    }                    
            </div>
        </>
    )
}

export default Properties;