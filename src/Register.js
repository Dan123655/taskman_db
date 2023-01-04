import React,{useState,useContext} from 'react'
import { taskContext } from './taskContext';

function Register() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [regButton, setRegButton] = useState(false)
    const { regLog,setRegLog,regComplete,setLoginLog, setRegComplete, login, regButton,setRegButton,setSignButton } = useContext(taskContext)


    const regstate = () => { setRegComplete(true) }
    
    const registration = async () => {

        const requestOptions =  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access-control-allow-origin': 'https://node-auth-seven.vercel.app',
               
      
            },
            // credentials:'include',
            body:  JSON.stringify({ 'username': username, 'password': password })
        };
        console.log(username,password)
    //    await fetch("http://localhost:3500/api/registration", requestOptions)
       await fetch('https://node-auth-seven.vercel.app/api/registration', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // console.log((JSON.stringify(data.message)));
                if (data.success) { regstate(); setRegLog(<h3>Registation successful, sign in below</h3>) }
                // if (data.message) regstate(); setRegLog(<h3>{data.message}</h3>)
                else if (data.incorrect) { setRegLog(<h3>Please enter correct email and password to sign up</h3>) }
                else if (data.exists) { setRegLog(<h3>Username already exists</h3>) }
                //else if(data.e)console.log(data.e)
                else if(data.regerror) { setRegLog(<h3>Registration error. Try again error</h3>) }
                else if(data.error) { setRegLog(<h3>`${data.e}`</h3>) }
            })
            
        // .then(data => this.setState({ postId: data.id }))
        .catch((err)=>console.log(err))
           
    }
    const handleSubmit =  (event) => {
        event.preventDefault()
        // console.log(username, password)
        console.log('handlesubmit')
         registration()

    }

    const regButt = () => {
        setRegButton(true)
        setSignButton(false)
        setLoginLog(<></>)
    }


    return (
        <>
            {!login ? <>
            {!regComplete && !login ? <>{regButton ?
                <>
                    <form id='myform2' onSubmit={(event)=>handleSubmit(event)}>
                        <label htmlFor='login'></label>
                        <input value={username} onChange={((e) => setUsername(e.target.value))} type='login' placeholder='enter username' id='login' name='login'></input>
                        <label htmlFor='password'></label>
                        <input value={password} onChange={((e) => setPassword(e.target.value))} type='password' placeholder='enter password (5-12 symbols)' id='password' name='password'></input>
                        <button id='myform2' type='submit'>Ok</button>
                
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