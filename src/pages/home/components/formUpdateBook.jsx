import React , {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function FormUpdateBook({data, setBooks }) {
    const {nombre} = data;
    const [open, setOpen] = React.useState(false);
    const [dataBook, setDataBook] = React.useState({...data});

    const handleSend = () => {
        const books = JSON.parse(localStorage.getItem('libros'));
        const newBooks = books.filter(item => item.id != dataBook.id);
        newBooks.push(dataBook)
        const orderBooks = newBooks.sort((a , b ) => a.id - b.id);
        localStorage.setItem('libros', JSON.stringify(newBooks));
        setOpen(!open);
        setBooks(orderBooks)
        alert('libro actualizado')
    }
    const handleClickOpen = () => {
        setOpen(!open);
      };
 
      const setValues = (event)=> {
        //   const { name , value} = event.target;
        setDataBook((prevState) => ({...prevState,  [event.target.name]: event.target.value}))
        console.log(event.target.name , dataBook);
      }
    return (
        <>
        <Button onClick={handleClickOpen} size="small" color="secondary">
        Editar
         </Button>


 
      <Dialog    maxWidth={"xs"} open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Libro: {nombre}</DialogTitle>
        <DialogContent>
       
          <TextField
           name="nombre"
            value={dataBook.nombre}
            autoFocus
            margin="dense"
            id="name"
            label="nombre"
            type="text"
            fullWidth
            onChange={setValues}
          />
               <TextField
               name="director"
            value={dataBook.director}
            autoFocus
            margin="dense"
            id="director"
            label="director"
            type="text"
            fullWidth
            onChange={setValues}
          />
            <TextField
            name="clasificacion"
            value={dataBook.clasificacion}
            autoFocus
            margin="dense"
            id="clasificacion"
            label="clasificacion"
            type="text"
            fullWidth
            onChange={setValues}
          />

<RadioGroup aria-label="estado" name="estado" value={parseInt(dataBook.estado)} onChange={setValues}>
    <FormControlLabel value={2} control={<Radio />} label="prestado" />
    <FormControlLabel value={1} control={<Radio />} label="libre" />
  </RadioGroup>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpen} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSend} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

         </>
    )
}
