import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const auth=[{user:"rusty",pass:"Nail77"},{user:"admin",pass:"admin"}];

    const navigate = useNavigate();
    const {userId, setUserId} = useContext(AppContext);
    const [loginAttempts,setLoginAttemts] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputUser = document.getElementsByName('username')[0].value;
        const inputPass = document.getElementsByName('password')[0].value;
        document.getElementsByName('username')[0].value = '';
        document.getElementsByName('password')[0].value = '';
        let authenticated = false;
        if (inputUser && inputPass) {
            if (auth.filter(cred=>cred.user.toLowerCase()===inputUser.toLowerCase()).length>0) {
                if (auth.filter(item=>item.user.toLowerCase()===inputUser.toLowerCase())[0].pass===inputPass) {
                    authenticated = true;
                    setUserId(inputUser);
                    navigate('/main');
                }
            }
        }
        setLoginAttemts(loginAttempts+1);
        (authenticated)?console.log('redirected'):alert(`Either username or password are incorrect. You have ${5-loginAttempts} attempts left.`);
        if (loginAttempts>4) {
            navigate('/404');
        }
    }

    useEffect(()=> {
        if (userId) {
            console.log('got a username');
            navigate('/main');
        }
        },[])

    return (
            <div className="login">
                Username: <input type="text" name="username" />
                <br />
                Password: <input type="password" name="password" />
                <br />
                <input type="submit" value="Login" onClick={(e)=>handleSubmit(e)} />
            </div>
    )    
}

export default Login;