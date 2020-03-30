import React ,{useState} from 'react';
import ReactDOM from 'react-dom';
import { create, all } from 'mathjs'
import GoogleLogin from 'react-google-login';





function Login() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [url,setUrl] = useState("");
  
    const responseGoogle  = (response) => {
       if(typeof response.profileObj  == 'undefined'){
         return;
       }
        setName(response.profileObj.name);
        setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl); // url for pic
    }
  
    return (
      <div className="App">
   
     
        <header className="App-header">
         
          
       
  
          <GoogleLogin
              clientId="576524152999-o3rgla4utep5t9dde2hutd1cc6d08989.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
          />
          <h1>{name}</h1>
  <h1>{email}</h1>
  <img src={url} alt={name}/>
        </header>
      </div>
    );
  }
export default Login;