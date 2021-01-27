
import React, { useEffect } from 'react';
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

export default function Books({ history }) {
    const { handleSubmit, errors, control } = useForm();
    const onSubmit = data =>  registerBook(data);
    const registerBook = (data) => {
        const books = JSON.parse(localStorage.getItem('libros'));

        const maxId = Math.max.apply(Math, books.map(function(obj) { return obj.id; }));

        const newBook = Object.assign({}, { 
            ...data,
             estado: 1, 
             id:maxId + 1
             });
             books.push(newBook);
        localStorage.setItem('libros', JSON.stringify(books));
        // console.log('nuevo user', Users);
        history.push('/')
        // console.log(newBook);
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
                    Registro de libro
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
                                        label="nombre"
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
                                name="director"
                                control={control}
                                defaultValue=""
                                render={({ onChange, value }) =>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        onChange={onChange}
                                        value={value}
                                        fullWidth
                                        label="Nombre director"
                                        autoFocus

                                    />}
                            />
                            {errors.director?.type == "required" && <span style={{ color: "red" }}>valor requerido</span>}


                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <Controller
                                rules={{
                                    required: true,
                                }}
                                name="clasificacion"
                                control={control}
                                defaultValue=""
                                render={({ onChange, value }) =>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        onChange={onChange}
                                        value={value}
                                        fullWidth
                                        label="clasificacion"
                                        autoFocus

                                    />}
                            />
                            {errors.clasificacion?.type == "required" && <span style={{ color: "red" }}>valor requerido</span>}


                        </Grid>

                        <Grid item xs={12} sm={12}>

                            <Controller
                                rules={{
                                    required: true,
                                }}
                                name="img"
                                control={control}
                                defaultValue=""
                                render={({ onChange, value }) =>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        onChange={onChange}
                                        value={value}
                                        fullWidth
                                        label="url imagen"
                                        autoFocus

                                    />}
                            />
                            {errors.img?.type == "required" && <span style={{ color: "red" }}>valor requerido</span>}


                        </Grid>


                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Registrar Libro
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                               ver libros
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}