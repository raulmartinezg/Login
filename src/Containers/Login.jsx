import React,{useEffect,useRef,useState} from 'react';
import '../Styles/Login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const baseUrl ='http://200.52.73.110:8085/NSNAPI/api/User';
const cookies = new Cookies();

const Login = () => {

    const classes = useStyles();

    const[usr,setUser] = useState('');
    const[pwd,setPwd] = useState('');
    const [open, setOpen] = React.useState(false);

    useEffect(()=>{
        if(!cookies.get('name')){
            window.location.href='http://200.52.73.110:8085/EdsNew/'
        }
    
        },[]);
    

    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };

    const us = useRef(null);
    const pass = useRef(null);

    const handleUser = () => {
        setUser(us.current.value)
    }

    const handlePass = () => {
        setPwd(pass.current.value)
    }

    const handleSubmit = async () => {
        handleToggle();
        await axios.get(baseUrl,{params:{usr:usr,pwd:pwd}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response){
                cookies.set('name',response.name,{path:'/'});
                handleClose();
                window.location.href='http://200.52.73.110:8085/EdsNew/';
            }else{
                handleClose();
                alert('El usuario o la contraseña son incorrectos');
            }
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return(
        <div className='login_bg'>
            <div className='login_container'>
                <div className='login_base'>
                    <span id='title'>Iniciar sesión</span>
                    <span className='login_title'>Usuario</span>
                    <input className='login_input' value={usr} ref={us} onChange={handleUser}></input>
                    <span className='login_title'>Contraseña</span>
                    <input className='login_input' value={pwd} ref={pass} onChange={handlePass} type='password'></input>
                    <button className='login_btn' onClick={handleSubmit} type='button'>Login</button>
                    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </div>
        </div>
    )
}

export default Login;