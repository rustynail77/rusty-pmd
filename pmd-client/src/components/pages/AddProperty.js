import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import defaultImage from '../partials/PropertyCard';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

const AddProperty = (props) => {

    const navigate = useNavigate();
    const {currProp} = useContext(AppContext);
    const [activeTogg, setActiveTogg] = useState(currProp.active);
    const [image,setImage] = useState();
    const [formInputs, setFormInputs] = useState();
    const [propOwners, setPropOwners] = useState([]);
    const [owners, setOwners] = useState([]);

    useEffect (()=>{
        if (currProp.p_id) {
            currProp.ownership =
            currProp.ownership ? currProp.ownership : [];
            console.log('OWNERSHIP:', currProp.ownership);
            setFormInputs(currProp);
            console.log('currProp:', currProp)
        }
    },[])
    
    useEffect (()=> {
        const getOwners = async() => {
            try {
                const res = await fetch('http://localhost:5000/api/owners/all-owners');
                const data = await res.json();
                console.log('owners:',data);
                setOwners(data);
            }  
            catch(err){
                console.log(err);
            }
        }
        getOwners();
    },[])

    const handleChange = (formField) => {
            let tempObj = {...formInputs};
            tempObj[formField.name] = formField.value;
            setFormInputs(tempObj);
    }

    const handleOwnersChange = (formField) => {
        // console.log('click:',formField.target.selectedOptions);
        let tempValues = [...formField.target.selectedOptions];
        let valuesToSave = [];
        for (let i=0; i<tempValues.length; i++) {
            let itemVal = tempValues[i].attributes[0].nodeValue;
            if (valuesToSave.includes(itemVal)) {
                let index = valuesToSave.indexOf(itemVal);
                valuesToSave.splice(index, 1);
            } else {
                valuesToSave.push(itemVal);
            }
            console.log(valuesToSave);
        }    
        setPropOwners(valuesToSave);
    }
    
    const submitProperty = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('active',activeTogg);
        
        for (var x=0; x<propOwners.length;x++){
            formData.append('ownership[]',propOwners[x]);
        }

        for (let input in formInputs) {
            if (input!=='active' && input!=='ownership') formData.append(input,formInputs[input]);
        }
        
        if (currProp.img_src) {
            image ? formData.append('img_src',image) : formData['img_src'] = currProp.img_src;
        } else {
            image ? formData.append('img_src',image) : formData.append('img_src',defaultImage);
        }
        console.log('formData(all):', ...formData);
        try {
            const propData = currProp.p_id
                ? await axios.put(`/api/properties/prop/${currProp.p_id}`,formData)
                : await axios.post('/api/properties/prop', formData);

        } catch (err) {
            console.log(err);
        }
        navigate('/main');
    }


    return (
        <div>
            <h2>{currProp.p_id?'Edit':'Add New'} Property</h2>
            <Box
                component="form"
                method={currProp.p_id?"put":"post"}
                sx={{ '& > :not(style)': { m: 2 } }}
                noValidate
                autoComplete="off"
                onSubmit={submitProperty} 
                className="form">

                <TextField  variant='outlined' 
                            label='Country' 
                            type='text' 
                            name='country' 
                            defaultValue={currProp['country']?currProp['country']:''} 
                            onChange={(e)=>handleChange(e.target)} 
                            required/>

                <TextField  variant='outlined' label='City' type='text' 
                    name='city' defaultValue={currProp['city']?currProp['city']:''}
                    onChange={(e)=>handleChange(e.target)} required/>
                    
                <TextField  variant='outlined' label='Street name' type='text' 
                    name='street' defaultValue={currProp['street']?currProp['street']:''}
                    onChange={(e)=>handleChange(e.target)} required/>
                    
                <TextField  variant='outlined' label='House number' type='text' 
                    name='house_num' defaultValue={currProp['house_num']?currProp['house_num']:''}
                    onChange={(e)=>handleChange(e.target)} required/>
                    
                <TextField  variant='outlined' label='Zip code' type='text' 
                    name='zipcode' defaultValue={currProp['zipcode']?currProp['zipcode']:''}
                    onChange={(e)=>handleChange(e.target)} required/>
                    
                <TextField  variant='outlined' label='Floor' type='text' 
                    name='floor_num' defaultValue={currProp['floor_num']?currProp['floor_num']:''}
                    onChange={(e)=>handleChange(e.target)} required/>
                    
                <TextField  variant='outlined' label='Apartment number' type='text' 
                    name='apt_num' defaultValue={currProp['apt_num']?currProp['apt_num']:''}
                    onChange={(e)=>handleChange(e.target)} required/>
                    
                <TextField  variant='outlined' label='Apartment size (sqm)' type='number' 
                    name='apt_size' defaultValue={(currProp['apt_size']||currProp['apt_size']===0)?currProp['apt_size']:''}
                    onChange={(e)=>handleChange(e.target)} required/>
                    
                <TextField  variant='outlined' label='Plot size (sqm)' type='number' 
                    name='plot_size' defaultValue={(currProp['plot_size']||currProp['plot_size']===0)?currProp['plot_size']:''}
                    onChange={(e)=>handleChange(e.target)} required/>                    
                    
                <TextField  variant='outlined' label='Bedrooms' type='number' 
                    name='bedrooms' defaultValue={(currProp['bedrooms']||currProp['bedrooms']===0)?currProp['bedrooms']:''}
                    onChange={(e)=>handleChange(e.target)} required/>
                    
                <Checkbox type='checkbox' name='active' checked={activeTogg} value={activeTogg}
                        onChange={()=>setActiveTogg((activeTogg)?false:true)}/> Active property
                
                <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Owner/s
                    </InputLabel>
                    <Select multiple native name="ownership[]" type="text"
                        onChange={(e)=>handleOwnersChange(e)} label="Owner/s"
                        inputProps={{ id: 'select-multiple-native',}} >
                            {
                            (!owners) ? <></> :
                            owners.map((owner,i)=>
                                <option key={i}
                                    selected={
                                        !currProp.ownership ? false 
                                        : currProp.ownership.includes(owner.o_id) 
                                        ? true : false
                                    }
                                    value={owner.o_id}>{owner.fname} {owner.lname}
                                </option>
                            )
                            }
                    </Select>
                </FormControl>

                <TextareaAutosize minRows={3} label='Notes' placeholder='Notes' 
                    type='textarea' className='textArea' name='notes' 
                    defaultValue={currProp['notes']?currProp['notes']:''} 
                    onChange={(e)=>handleChange(e.target)}/> 
                    
                <Button variant="contained" component="label">
                    Upload Image
                    <input className="inner-button" type="file" name="img_src" onChange={(e)=>setImage(e.target.files[0])} />
                </Button>
                    
                <Button type='submit' 
                    variant="contained" 
                    size="large"
                    >
                    {(currProp.p_id)?'Save':'Add'}
                </Button>
                
            </Box>
        </div>
    )
}

export default AddProperty;
    