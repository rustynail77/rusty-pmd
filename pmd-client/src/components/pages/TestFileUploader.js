import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';

const TestFileUploader = (props) => {

    const navigate = useNavigate();
    const {currProp, setCurrProp} = useContext(AppContext);
    const [activeTogg, setActiveTogg] = useState(true);
    const [owners, setOwners] = useState([]);

    useEffect (()=>{
        const setInfo = () => {
            if (currProp.p_id) {
                console.log('I found data:', currProp)
                for (let element in currProp) {
                    // console.log(element, currProp[element]);
                    (document.getElementsByName(element)[0]) ? 
                        (element!=='active') ? document.getElementsByName(element)[0].defaultValue=currProp[element]:
                        document.getElementsByName(element)[0].checked=currProp[element] : 
                        console.log('none')
                }
            } else {
                console.log('I have NO data')
            }
        }
        
        const getOwners = async() => {
            try {
                const res = await fetch('http://localhost:5000/api/owners/all-owners');
                const data = await res.json();
                console.log('data =',data);
                setOwners(data);
            }  
            catch(err){
                console.log(err);
            }
        }
        getOwners();
        setInfo();
    },[])

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e);
        e.target.form.submit();
        navigate('/main');
    }

    return (
        <div>
            <form 
                action={
                    (currProp.p_id)?
                    `/api/properties/upload/${currProp.p_id}`:
                    '/api/properties/upload'
                }
                method={(currProp.p_id)?'put':'post'}
                encType="multipart/form-data">
                <h2>{(currProp.p_id)?'Edit':'Add New'} Property test</h2>
                    Country: <input type='text' name="country" />
                    City: <input type='text' name="city" />
                    Street name: <input type='text' name="street" />
                    House number: <input type='text' name="house_num" />
                    Zip code: <input type='text' name="zipcode" />
                    Floor: <input type='text' name="floor_num" />
                    Apartment number: <input type='text' name="apt_num" />
                    Apartment size: <input type='number' name="apt_size" />
                    Plot size: <input type='number' name="plot_size" />
                    Bedrooms: <input type='number' name="bedrooms" />
                    Active property: <input type='checkbox' name="active" checked={activeTogg} 
                            onChange={()=>setActiveTogg((activeTogg)?false:true)}/>
                    Notes: <input type='textarea' name="notes" />
                    <br />
                    {/* Owner/s: <select name='owners' multiple>
                        {
                        (!owners) ? <></> : owners.map((owner,i)=>{
                            return (
                                <option value={owner.o_id}>{owner.fname} {owner.lname}</option>
                            )
                            
                        })
                        }
                    </select> */}

                    <input type="file" name="image" />

                    <input type='submit' value={(currProp.p_id)?'Save':'Add'} onClick={(e)=>handleClick(e)}/>
                    {/* <input type="submit" value="Upload File" onClick={(e)=>handleClick(e)}/> */}
            </form>
        </div>
    )
}

export default TestFileUploader;