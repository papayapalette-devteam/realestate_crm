
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { toast } from 'react-toastify';
function Login() {
const navigate=useNavigate()
const handle=()=>
  {
    if(document.getElementById("email").value=="admin" && document.getElementById("pass").value=="admin123")
    {
      navigate('/dashboard')
    }
    else
    {
      toast.error("plz enter correct email and password")
    }
    
  }
 
  
    return (
      <div className="App" style={{paddingTop:"50px"}}>
        <div className="container" id="container">
    <div className="form-container log-in-container">
      <form action="">
        <input 
          type="hidden"
          name="_token"
          defaultValue="ugkMCfXw6p5TvJrpXQIObRPgLB86ER8m9829A38W"
          autoComplete="off"
        />{" "}
        <h1 className='h1'>User Login</h1>
        <br />
        {/* <div class="social-container">
                      <a href="#" class="social"><i class="fa fa-facebook fa-2x"></i></a>
                      <a href="#" class="social"><i class="fab fa fa-twitter fa-2x"></i></a>
                  </div> */}
    
        <br />
        <input id='email' className='logininput' type="email" name="email" placeholder="Email"  required/>
        <input id='pass' className='logininput'type="password" name="password" placeholder="Password" required/>
        <br />
        {/* <a href="#">Forgot your password?</a> */}
        <button className='button' type="submit" name="submit" value="submit" onClick={handle}>
          Log In
        </button>
      </form>
    </div>
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-right">
          <h2>Please Enter Login Details</h2>
          <p className='p'>
            Kindly enter your username and password for logging into the portal
          </p>
        </div>
      </div>
    </div>
  </div>
      </div>
    );
  }
  export default Login;