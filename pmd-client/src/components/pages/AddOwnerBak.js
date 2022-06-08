import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import dateFormat from '../../modules/dateFormat';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

const AddOwner = (props) => {

    const navigate = useNavigate();
    const {currProp, setCurrProp} = useContext(AppContext);
    const [activeTogg,setActiveTogg] = useState(true);
    const [formInputs, setFormInputs] = useState();

    useEffect (()=>{
        if (currProp.o_id) {
            setFormInputs(currProp);
            console.log('currProp:', currProp)
        }
    },[])

    const handleChange = (formField) => {
        let tempObj = {...formInputs};
        tempObj[formField.name] = formField.value;
        setFormInputs(tempObj);
    }

    const submitOwner = async (e) => {
        e.preventDefault();
        const formData = new FormData();
                    
        for (let input in formInputs) {
            if (input!=='active') {
                formData.append(input,formInputs[input])
            }
        }
        formData.append('active',activeTogg);

        console.log("formData(all):", ...formData);
    
        try {
            const ownerData = currProp.o_id
                ? await axios.put(`/api/owners/ownr/${currProp.o_id}`, formData)
                : await axios.post('/api/owners/ownr', formData);
            // const res = await ownerData;
            // console.log(res);
        } catch (err) {
            console.log(err);
        }  
        // navigate('/owners');
    }

return (
        <>
            <h2>{(currProp.o_id)?'Edit':'Add New'} Owner</h2>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 2 } }}
                noValidate
                autoComplete="off"
                onSubmit={submitOwner} className="form"
            >
                <TextField defaultValue={currProp['personal_id']?currProp['personal_id']:''} 
                    variant='outlined' label='Id/Passport number' type='text' name='personal_id' required
                    onChange={(e)=>handleChange(e.target)} />
                <TextField defaultValue={currProp['fname']?currProp['fname']:''}
                    variant='outlined' label='First name' type='text' name='fname' required
                    onChange={(e)=>handleChange(e.target)} />
                <TextField defaultValue={currProp['lname']?currProp['lname']:''}
                    variant='outlined' label='Last name' type='text' name='lname' required
                    onChange={(e)=>handleChange(e.target)} />
                <TextField defaultValue={currProp['dob']?dateFormat(currProp['dob'],'yyyy-MM-dd'):''}
                    variant='outlined' id='dob' label='Date of birth' type='date' name='dob' required
                    onChange={(e)=>handleChange(e.target)} />
                <TextField defaultValue={currProp['phone_num']?currProp['phone_num']:''}
                    variant='outlined' label='Phone number' type='text' name='phone_num' required 
                    onChange={(e)=>handleChange(e.target)}/>
                <TextField defaultValue={currProp['email']?currProp['email']:''}
                    variant='outlined' label='Email address' type='email' name='email' required
                    onChange={(e)=>handleChange(e.target)}/>
                <Checkbox type='checkbox' name='active' checked={activeTogg} 
                        onChange={()=>setActiveTogg((activeTogg)?false:true)}/>
                        Active client
                <br />
                <TextareaAutosize minRows={3} label='Notes' placeholder='Notes' 
                    type='textarea' className='textArea' name='notes' 
                    onChange={(e)=>handleChange(e.target)} />
                <br /><br />
                <Button type='submit' 
                    variant="contained" 
                    size="large"
                    >
                    {(currProp.o_id)?'Save':'Add'}
                </Button>
    </Box>
    </>
)
}

export default AddOwner;