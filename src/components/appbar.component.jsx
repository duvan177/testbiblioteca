import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Logout } from '../tools'




const ButtonUser = ({push , goBack}) => {
  const userAuth = localStorage.getItem('usuarioAuth');
  return (
    <>
    {
    userAuth ? (
      <>
    <Button href={goBack ? '/' : '/borrowed-books'} color="primary" variant="outlined" className={""}>
     {
       goBack ? 'ver libros': 'mis libros prestados'
     } 
  </Button>
    <Button href="#" onClick={()=>Logout(push)} color="primary" variant="outlined" className={""}>
      Cerrar sesion
</Button>
</>
) :  <Button href="/login" color="primary" variant="outlined" className={""}>
Inciar sesion
</Button>

    }
    </>
    )
}


export default function Appbar({navigate , goBack}) {
  return (

    <AppBar position="static" color="default" elevation={0} className={""}>
      <Toolbar style={{
        justifyContent: "space-between"
      }} className={""}>
        <Typography variant="h6" color="inherit" noWrap className={""}>
          Test Biblioteca
          </Typography>

      <ButtonUser {...navigate} goBack={goBack}/>
      </Toolbar>
    </AppBar>

  )
}
