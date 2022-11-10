import React,{useState,useContext} from 'react'
import { taskContext } from './taskContext';

function Register() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [result, setResult] = useState('')
    // const [regButton, setRegButton] = useState(false)
    const { regLog,setRegLog,regComplete,loginLog,setLoginLog, setRegComplete, login, setLogin,regButton,setRegButton,signButton,setSignButton } = useContext(taskContext)


    const regstate = () => { setRegComplete(true) }
    
    const registration = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access-control-allow-origin': 'https://node-auth-seven.vercel.app',
                'accept': '*/*'
            },
            body: JSON.stringify({ 'username': username, 'password': password })
        };
        console.log(username,password)
        fetch('https://node-auth-seven.vercel.app/api/registration', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // setResult(JSON.stringify(data.message));
                if (data.success) regstate(); setRegLog(<h3>Registation successful, sign in below</h3>)
                // if (data.message) regstate(); setRegLog(<h3>{data.message}</h3>)
                if (data.error) ; setRegLog(<h3>`${data.message}`</h3>)
                // if (data.exists) ; setRegLog(<h3>user already exists</h3>)
            })
            
        // .then(data => this.setState({ postId: data.id }))
           
    }
    const handleSubmit = () => {

        // console.log(username, password)
        console.log('handlesubmit')
        registration()
        // e.preventdefault();
    }

    const regButt = () => {
        setRegButton(true)
        setSignButton(false)
        setLoginLog(<></>)
    }


    return (
       <> {!login?<>
            {!regComplete && !login ? <>{regButton ?
                <>
                    <form id='myform2' onSubmit={handleSubmit}>
                        <label htmlFor='login'>Username</label>
                        <input value={username} onChange={((e) => setUsername(e.target.value))} type='login' placeholder='enter username' id='login' name='login'></input>
                        <label htmlFor='password'>password</label>
                        <input value={password} onChange={((e) => setPassword(e.target.value))} type='password' placeholder='enter password (5-12 symbols)' id='password' name='password'></input>
                        <button id='myform2' type='submit'>Register</button>
                
                    </form>

                </> :
                <><button className='signbut' onClick={regButt}>Sign Up</button></>
            }
                <>{regLog}</>
            </> : <>{regLog}</>}
        </>:<></>}
        </>

    )
}

export default Register