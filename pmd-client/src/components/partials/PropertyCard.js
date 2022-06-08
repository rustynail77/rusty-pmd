import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';

export const defaultImage = 'http://rustynail77.com/budapest-apartments/images/house.png';

const PropertyCard = (props) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        alignItems: 'bottom',
        color: theme.palette.text.secondary,
      }));

    const navigate = useNavigate();

    const { cardDisplay, setCardDisplay, 
            currProp, setCurrProp
        } = useContext(AppContext);
    
    const property = props.property;

    const [currImg,setCurrImg] = useState(property.img_src);

    const handleClick = (property) => {
        // console.log('clicked',property.p_id);
        setCurrProp(property);
        console.log('about to nav to show-prop with:', property);
        navigate('/show-prop');
    }

    const handleEditProp = () => {
        setCurrProp(property);
        navigate("/add-prop");
    }

    const handleImage = () => {
        setCurrImg(defaultImage);
    }

    return (
        <>
        {
        (props.inactive==false && property.active==false) ? <></> :    
        <div className={(cardDisplay==='cards')?'propertyCards':'propertyLines'}>
                {
                  (cardDisplay==='cards')?
                  <>
                    <Box sx={{ '& button': { m: 1 } }}>
                        <Button 
                            size="small" variant="outlined" 
                            onClick={()=>handleEditProp()}>
                            Edit Property #{property.p_id}
                        </Button>
                    </Box>
                    {/* <img src={(property.img_src)?property.img_src : defaultImage} alt="img" /> */}
                    <img src={(currImg)?currImg : defaultImage} 
                        onError={()=>handleImage()}
                        alt="img" 
                        />
                    <p><b>Address:</b> {property.street} {property.house_num}</p>
                    <p>Floor: {property.floor_num}, apt: {property.apt_num}</p>
                    <p>{property.zipcode} {property.city}, {property.country}</p>
                    <Box sx={{ '& button': { m: 2 } }}>
                        <Button 
                            size="small" variant={(cardDisplay==='cards')?"contained":"outlined"}
                            onClick={()=>handleClick(property)}>
                            See Card
                        </Button>
                    </Box>
                  </>:
                  <>
                    <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={1} md={2}><Item>
                                <Button 
                                    size="small" variant="outlined" 
                                    onClick={()=>handleEditProp()}>
                                    Edit Property #{property.p_id}
                                </Button>
                        </Item></Grid>  
                        <Grid item xs={1} md={3}><Item>{property.street} {property.house_num}</Item></Grid>
                        <Grid item xs={1} md={0.75}><Item>fl: {property.floor_num}</Item></Grid>
                        <Grid item xs={1} md={1}><Item>apt: {property.apt_num}</Item></Grid>
                        <Grid item xs={1} md={3}><Item>{property.zipcode} {property.city}, {property.country}</Item></Grid>
                        <Grid item xs={1} md={1.5}><Item>
                                <Button 
                                    size="small" variant={(cardDisplay==='cards')?"contained":"outlined"}
                                    onClick={()=>handleClick(property)}>
                                    See Card
                                </Button>
                        </Item></Grid>
                        
                        </Grid>
                    </Box>
                  </>  
                }
                
            </div>
        }
        </>
    )
}

export default PropertyCard;