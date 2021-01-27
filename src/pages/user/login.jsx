import React, {useEffect} from 'react';
import {Avatar, Button, CssBaseline , TextField , Grid , Paper , Typography, Link} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import  {useForm ,  Controller}  from "react-hook-form";

import { ValidateUser } from '../../tools';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
},  
}));  



export default function Login({history}) {
    const { register, handleSubmit, watch, errors ,  control } = useForm();
const onSubmit =  (data) => {

  const response = ValidateUser(data);
  console.log('login' , response , data);
  !(response.status) ? alert(response.message) : history.push('/');

};
useEffect(() => {
  console.log(history);
}, [])

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesion
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid 
          item 
        style={{display:"flex" , justifyContent:"center"}}
          xs={12}>
          
              <Grid item xs={6} >
        <Controller
          rules={{ required: true }}
        name="alias"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => 
        <TextField
        variant="outlined"
        margin="normal"
        onChange={onChange}
         value={value}
        fullWidth
        label="nombre de usuario"
        autoComplete="email"
        autoFocus

        />}
      />
      {errors.alias?.type == "required" && <span style={{color:"red"}}>valor requerido</span>}


                 <Controller
          rules={{ required: true }}
        name="contrasena"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => 
         
        <TextField
        variant="outlined"
        margin="normal"
        onChange={onChange}
        value={value}
        fullWidth
     
        label="contraseña"
        type="password"
        id="password"
        autoComplete="current-password"
      
      />    
    }
      />
     {/* {errors.contrasena?.type == "minLength" && <span style={{color:"red"}}>Debe contener mas de 6 carácteres</span>} */}
     {errors.contrasena?.type == "required" && <span style={{color:"red"}}>valor requerido</span>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Identificarme
            </Button>
            <Button
            fullWidth
               className={classes.submit}
            href="/register" color="primary" variant="outlined" className={""}>
            Registrarme
          </Button>
          <Link href="/" variant="body2">
                            Seguir viendo libros
              </Link>
              </Grid>
      
              </Grid>
         
          
           
          </form>
        </div>
      </Grid>
    </Grid>
  );
}