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
            navigate('/main');
        }
        },[])

    return (
            <div className="login">

                <h2>Please log in</h2>

                <p>
                    This web app was built by Liron S. Levi as a part of a software development portfolio.<br />
                    It was built with React.js/Node.js and PostgreSQL.<br />
                    This page is for demonstration purposes only.<br />
                    There is currently no authentication process, no encryption and no registration form.<br />
                    To log in, please type in username: 'Rusty' and password: 'Nail77'.<br />
                    Thank you for taking the time to review this application.<br />
                </p>
                <br />
                Username: <input type="text" name="username" />
                <br />
                Password: <input type="password" name="password" />
                <br />
                <input type="submit" value="Login" onClick={(e)=>handleSubmit(e)} />
            </div>
    )    
}

export default Login;