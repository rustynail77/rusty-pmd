import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const AddTransaction = (props) => {

    const navigate = useNavigate();
    const {currProp} = useContext(AppContext);
    const [activeTogg, setActiveTogg] = useState(true);
    const [formInputs, setFormInputs] = useState();

    useEffect (()=>{
        if (currProp.t_id) {
            let tracData = {
                't_date': currProp['t_date'],
                'debit_credit' : currProp['debit_credit'],
                'trans_type' : currProp['trans_type'],
                'payment_method' : currProp['payment_method'],
                'amount' : currProp['amount'],
                'active' : currProp['active'],
                'trans_reference' : currProp['trans_reference'],
                'notes' : currProp['notes']
            };
            setFormInputs(tracData);   
        }
    },[])

    const saveLogRec = async(logData) => {
        await fetch('/api/transactions/log',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(logData)
        })
        .catch(err=>{
            console.log(err);
        })      
    }

    const submitTrac = async (e) => {
        e.preventDefault();
        let formData = {...formInputs};
        formData['active'] = activeTogg;
        formData['prop_id'] = currProp.p_id;
        if (!formData['payment_method']) formData['payment_method']='';
        if (!formData['trans_reference']) formData['trans_reference']='';
        if (!formData['notes']) formData['notes']='';
        if (!formData['debit_credit']) formData['debit_credit']='2';
        try {
            const tracData = currProp.t_id
                ? await axios.put(`/api/transactions/trac/${currProp.t_id}`,formData)
                : await axios.post('/api/transactions/trac', formData);

            const logData = {
                before_edit:currProp.t_id?currProp:{'new transaction':'true'}, 
                after_edit:formData
            };
            saveLogRec(logData);
        } catch (err) {
            console.log(err);
        }
        alert('Data saved successfully');
        navigate('/show-prop');
    }

    const handleChange = (formField) => {
        if (formField.name === 'amount' && formField.value<0) {
            alert ('Amount cannot be a negative value. For expenses choose "debit" on the "Debit/Credit" field. Value is converted to positive.');
            formField.value = formField.value * -1;
        }
        let tempObj = {...formInputs};
        tempObj[formField.name] = formField.value;        
        setFormInputs(tempObj);
    }

return (
    <div className='datasheet'>          
            <h2>{(currProp.t_id)?'Edit':'Add New'} Transaction {currProp.t_id} for Property #{currProp.p_id}</h2>
            <Box
                component="form"
                method={currProp.t_id?"put":"post"}
                sx={{ '& > :not(style)': { m: 2 } }}
                noValidate
                autoComplete="off"
                onSubmit={submitTrac} className="form"
            >
                {/* <input type='hidden' name='prop_id' value={currProp.p_id || currProp.prop_id} /> */}
                <TextField variant='outlined' label='Transaction Date' 
                    onChange={(e)=>handleChange(e.target)}
                    type='date' name='t_date' className="form-date" 
                    defaultValue={currProp['t_date']?currProp['t_date']:''} 
                    required/>
                
                <TextField variant='outlined' label='Transaction Type' 
                    onChange={(e)=>handleChange(e.target)}
                    type='text' name='trans_type' 
                    defaultValue={currProp['trans_type']?currProp['trans_type']:''}
                    required/>
                
                <TextField variant='outlined' label='Payment method' 
                    onChange={(e)=>handleChange(e.target)}
                    defaultValue={currProp['payment_method']?currProp['payment_method']:''}
                    type='text' name='payment_method' />
                
                <TextField variant='outlined' label='Amount ($)' 
                    onChange={(e)=>handleChange(e.target)}
                    defaultValue={currProp['amount']?currProp['amount']:''}
                    type='number' name='amount' required/>
                <br />
                <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                    <InputLabel id='d_c-select'>Debit/Credit*:</InputLabel>
                <Select labelId='d_c-select' name='debit_credit' type='number' 
                    defaultValue={currProp['debit_credit']?currProp['debit_credit']:'2'}
                    onChange={(e)=>handleChange(e.target)} required>
                    <MenuItem value={1}> Credit (Income) </MenuItem>
                    <MenuItem value={2}> Debit (Expenses) </MenuItem>
                </Select>
                </FormControl>
                
                <Checkbox type='checkbox' name='active' checked={activeTogg} 
                        onChange={()=>setActiveTogg((activeTogg)?false:true)}/>
                Active (uncheck only if you wish to cancel this transaction)
                
                <TextField variant='outlined' label='Reference'
                    onChange={(e)=>handleChange(e.target)}
                    defaultValue={currProp['trans_reference']?currProp['trans_reference']:''}
                    type='text' name='trans_reference' />
                
                <TextareaAutosize
                    minRows={3} label='Notes'
                    onChange={(e)=>handleChange(e.target)}
                    placeholder='Notes' type='textarea' 
                    defaultValue={currProp['t_id']?currProp['notes']:''}
                    className='textArea' name='notes' />
                <br />
                
                <Button type='submit' 
                    variant="contained" 
                    size="large"
                    >
                    {(currProp.t_id)?'Save':'Add'}
                </Button>
                
            </Box>

    </div>
)
}

export default AddTransaction;
    