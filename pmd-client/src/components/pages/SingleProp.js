import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import Balancesheet from '../partials/Balancesheet';

const SingleProp = (props) => {
    
    const { currProp, setCurrProp } = useContext(AppContext);
    const [propSheet, setPropSheet] = useState({});
    const prop_id = currProp.p_id || currProp.prop_id;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    useEffect(()=> {
        const getSinglePropertySheet = async() => {
            
            try {
                const res = await fetch(`/api/properties/prop/${prop_id}`);
                const data = await res.json();
                const resOwners = await fetch('/api/owners/all-owners');
                const dataAllOwners = await resOwners.json() || [];
                const tracs = await fetch(`/api/transactions/trac/${prop_id}`);
                const tracsData = await tracs.json();
                data[0].ownership = (!data[0].ownership) ? [] : data[0].ownership;

                const dataOwners = dataAllOwners.filter(dataOwner=>data[0].ownership.includes(dataOwner.o_id));
                const propertySheet = {
                    property : data,
                    owners: dataOwners,
                    tracs: tracsData
                }
                setPropSheet(propertySheet);
            }  
            catch(err){
                console.log(err);
            }
        }
        getSinglePropertySheet();
        
    },[]);
    
    return (
        <div className="container">
            <h2>Property #{prop_id}</h2>
            {
                (propSheet.owners) ?
                <>
                    <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={1} md={3}><Item>
                            {currProp.country}, {currProp.zipcode} {currProp.city}
                        </Item></Grid>
                        <Grid item xs={1} md={2}><Item>{currProp.street} {currProp.house_num}</Item></Grid>
                        <Grid item xs={1} md={1}><Item><b>Floor:</b> {currProp.floor_num}</Item></Grid>
                        <Grid item xs={1} md={1}><Item><b>Apt:</b> {currProp.apt_num}</Item></Grid>
                        <Grid item xs={1} md={2}><Item><b>Size:</b> {currProp.apt_size}sqm</Item></Grid>
                        <Grid item xs={1} md={1.5}><Item><b>Plot size:</b> {currProp.plot_size}sqm</Item></Grid>
                        <Grid item xs={1} md={1.5}><Item><b>Bedrooms:</b> {currProp.bedrooms}</Item></Grid>
                        <Grid item xs={1} md={12}><Item>{currProp.notes || '---'}</Item></Grid>
                        <Grid item xs={1} md={1}><Item><b>Owner{(propSheet.owners.length>1)?'s':''}</b>:</Item>
                        </Grid>
                        {
                        propSheet.owners.map((owner,i)=>
                            <Grid item xs={1} md={2} key={i}>
                                <Item key={i}>{owner.fname} {owner.lname}</Item>
                            </Grid>
                        )
                        }
                        
                    </Grid>
                        
                    </Box>
                    {/* <Balancesheet data={propSheet.property} /> */}
                    <Balancesheet data={propSheet.tracsData} />
                </> : <></>
            }
        </div>
    )
}

export default SingleProp;