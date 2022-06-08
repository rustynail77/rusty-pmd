import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import dateFormat from '../../modules/dateFormat';

const AddTransaction = (props) => {

    const navigate = useNavigate();
    const {currProp, setCurrProp} = useContext(AppContext);
    const [activeTogg, setActiveTogg] = useState(true);
        
    // console.log('entered Transaction with currProp:',currProp);
    useEffect (()=>{
        if (currProp.t_id) {
            console.log('I found data:', currProp)
            for (let element in currProp) {
                if (document.getElementsByName(element)[0]) {
                    switch(element) {
                        case 'active':
                            document.getElementsByName(element)[0].checked=currProp[element];
                            break;
                        case 't_date':
                            let date = dateFormat(currProp[element],'yyyy-MM-dd');
                            document.getElementsByName(element)[0].defaultValue=date;
                            break;
                        case 'debit_credit':
                            document.getElementsByName(element)[0].value=currProp[element];
                            break;
                        default:
                            document.getElementsByName(element)[0].defaultValue=
                            (currProp[element])?currProp[element]:'';
                    }
                } 
            }
        } else {
            console.log('I have NO data')
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

    const add = async (e) => {
        e.preventDefault();
        
        const myForm = e.target.children;
        let formData = {};

        for (let i=0; i<myForm.length-1; i++) {
            if (myForm[i].name === 'active') {
                myForm[i].value = myForm[i].checked;
            }
            if (myForm[i].type === 'date') {
                myForm[i].value=dateFormat(myForm[i].value,'yyyy-MM-dd');
            }
            formData[myForm[i].name] = myForm[i].value;
        }
        
        let fetchOptions = '';
        if (currProp.t_id) {
            fetchOptions={
                api:`/api/transactions/trac/${currProp.t_id}`,
                method: 'PUT'
            }
        } else {
            fetchOptions={
                api:'/api/transactions/trac',
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
        .then(data=>console.log(data))
        .then(smth=>{
            if (fetchOptions.method='PUT') {
                const logData = {
                    before_edit:currProp, 
                    after_edit:formData
                };
                // console.log('logData:',logData);
                saveLogRec(logData);
            }
        })
        .then(alert('Data saved successfully'))
        .then(navigate('/show-prop'))
        .catch(err=>{
            console.log(err);
        })          
    }

return (
    <div className='datasheet'>          
            <h2>{(currProp.t_id)?'Edit':'Add New'} Transaction {currProp.t_id} for Property #{currProp.p_id}</h2>
            <form onSubmit={(e)=>add(e)}>
                <input type='hidden' name='prop_id' value={currProp.p_id || currProp.prop_id} />
                <b>Transaction Date: </b><input type='date' name='t_date' required/>
                <br />
                <b>Debit/Credit*: </b>
                <select name='debit_credit' onChange={(e)=>console.log(e.target.value)} required>
                    <option disabled selected value=''> -- Select an option -- </option>
                    <option value={1}> Credit (Income) </option>
                    <option value={2}> Debit (Expenses) </option>
                </select>
                <br />
                * Pay close attention to this field. The amount must be positive.<br/>
                If you wish to input a negative value (expenses) - set this field's value to "Debit".<br/>
                <br /><b>Transaction Type: </b><input type='text' name='trans_type' />
                <br /><b>Payment method: </b><input type='text' name='payment_method' />
                <br /><b>Amount: </b> $<input type='number' name='amount' required/>
                <br />Active (uncheck only if you wish to cancel this transaction)<input type='checkbox' name='active' checked={activeTogg} 
                        onChange={()=>setActiveTogg((activeTogg)?false:true)} />
                <br /><b>Reference: </b><input type='text' name='trans_reference' />
                <br /><b>Notes: </b><input type='textarea' name='notes' />
                <br /><br />          
                <input type='submit' value={(currProp.t_id)?'Save':'Add'} />
            </form>

    </div>
)
}

export default AddTransaction;
    