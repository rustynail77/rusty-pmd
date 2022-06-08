import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import dateFormat from '../../modules/dateFormat';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

const AddOwner = (props) => {
    console.log('dsasddadsadfsdfasfdsafsdfs');
    const navigate = useNavigate();
    const {currProp, setCurrProp} = useContext(AppContext);
    const [activeTogg,setActiveTogg] = useState(true);
    
    useEffect (()=>{
        if (currProp.o_id) {
            console.log('I found data:', currProp)
            for (let element in currProp) {
                console.log(element);
                if (document.getElementsByName(element)[0]) {
                    switch(element) {
                        case 'active':
                            setActiveTogg((currProp[element]===false) ? false : true)
                            break;
                        case 'dob':
                            let date = dateFormat(currProp[element],'yyyy-MM-dd');
                            document.getElementsByName(element)[0].value=date;
                            break;
                        default:
                            document.getElementsByName(element)[0].value=currProp[element];
                    }
                } else {
                    console.log('element has no corresponding field:',element);
                } 
            }
        } else {
            console.log('I have NO data')
        }
    },[])

    const add = async (e) => {
        e.preventDefault();
        const myForm = e.target.children;        
        let formData = {};
        for (let i=0; i<myForm.length-1; i++) {
            let field = myForm[i];
            if ((field.tagName !== 'input') && (field.tagName !=='textarea')) {
                if (field.tagName==='SPAN') {
                    field = field.children[0];
                } else {
                    if (field.hasChildNodes()) {
                        field = field.children[1].children[0];
                    }
                }
            } 
        if (field.name === 'active') {
                console.log('checked =',field.checked)
                field.value = field.checked;
        }
        if (field.name) {formData[field.name] = field.value};            
        }
        // console.log('item to be saved:',formData);
        
        let fetchOptions = '';
        if (currProp.o_id) {
            fetchOptions={
                api:`/api/owners/ownr/${currProp.o_id}`,
                method: 'PUT'
            }
        } else {
            fetchOptions={
                api:'/api/owners/ownr',
                method: 'POST'
            }
        }
        await fetch(fetchOptions.api,{
            method: fetchOptions.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            alert('Data saved successfully');
        })
        .then(navigate('/'))
        .catch(err=>{
            console.log(err);
        })          
    }

return (
        <>
            <h2>{(currProp.o_id)?'Edit':'Add New'} Owner</h2>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 2 } }}
                noValidate
                autoComplete="off"
                onSubmit={(e)=>add(e)} className="form"
            >
                <TextField variant='filled' label='Id/Passport number' type='text' name='personal_id' required/>
                <TextField variant='filled' label='First name' type='text' name='fname' required/>
                <TextField variant='filled' label='Last name' type='text' name='lname' required/>
                <TextField variant='filled' id='dob' label='Date of birth' type='date' name='dob' required/>
                <TextField variant='filled' label='Phone number' type='text' name='phone_num' required />
                <TextField variant='filled' label='Email address' type='email' name='email' required/>
                <Checkbox type='checkbox' name='active' checked={activeTogg} 
                        onChange={()=>setActiveTogg((activeTogg)?false:true)}/>
                        Active client
                <br />
                <TextareaAutosize
                    minRows={3}
                    label='Notes'
                    placeholder='Notes' 
                    type='textarea' 
                    className='textArea'
                    name='notes' />
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