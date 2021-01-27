import React, {useEffect} from 'react';
import { Controller, useForm } from "react-hook-form";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Container, makeStyles, Typography, Box, Grid, Link, TextField,
    CssBaseline, Button, Avatar
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        // Fix IE 11 issue.
        marginTop: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp({history}) {
    const {  handleSubmit, errors, control } = useForm();
    const onSubmit = data => {
        registerUser(data);
    }; //

    const registerUser  = ( data )=> {
        const Users = JSON.parse(localStorage.getItem('usuarios'));
        const newUser = Object.assign({} , {...data , rol:2, id:Users.length + 1});
        Users.push(newUser);
        localStorage.setItem('usuarios' , JSON.stringify(Users));
        console.log('nuevo user' ,Users);
        history.push('/login')
    }


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                   Registro usuario
        </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                        <Controller
                                rules={{
                                    required: true,
                                }}
                                name="nombre"
                                control={control}
                                defaultValue=""
                                render={({ onChange, value }) =>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        onChange={onChange}
                                        value={value}
                                        fullWidth
                                        label="nombre y apellido"
                                        autoComplete="firstname"
                                        autoFocus

                                    />}
                            />
                            {errors.nombre?.type == "required" && <span style={{ color: "red" }}>valor requerido</span>}
                      

                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <Controller
                                rules={{
                                    required: true,
                                }}
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
                                        label="Nombre usuario"
                                        autoFocus

                                    />}
                            />
                            {errors.alias?.type == "required" && <span style={{ color: "red" }}>valor requerido</span>}
                      

                        </Grid>
                 
                        <Grid item xs={12}>
                        <Controller
                                rules={{
                                    required: true,
                                    minLength:6
                                }}
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ onChange, value }) =>
                                    <TextField
                                    type="password"
                                        variant="outlined"
                                        margin="normal"
                                        onChange={onChange}
                                        value={value}
                                        fullWidth
                                        label="Contraseña"
                                        autoComplete="password"
                                        autoFocus

                                    />}
                            />
                            {errors.password?.type == "required" && <span style={{ color: "red" }}>valor requerido</span>}
                            {errors.password?.type == "minLength" && <span style={{ color: "red" }}>debe contener minimo 6 carácteres</span>}
                      
                        </Grid>


                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                    Registrarme
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                              ya tengo cuenta, inicar sesion.
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
       
        </Container>
    );
}