
import { useState, useEffect } from 'react'

import {
  Button, Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import ButtonUpdate from './formUpdateBook'
import { LocalSee } from '@material-ui/icons';

const CardConfirmBorrowedBook = (nombre, id, userAuth, setBooks) => {
  const user = JSON.parse(userAuth);
  const response = window.confirm(`desea prestar libro ${nombre}`);
  if (!response) return;

  const Books = JSON.parse(localStorage.getItem('libros'));
  const newBooks = Books.map(item => {
    item.id == id && (item.estado = 2);
    return item
  });
  localStorage.setItem('libros', JSON.stringify(newBooks));
  setBooks(newBooks)
  const BorrowedBookData = JSON.parse(localStorage.getItem('prestados'));

  if (BorrowedBookData.filter(item => item.libro_id == id).length > 0) return alert('libro ya agregado')
  const BorrowedBook = {
    id: BorrowedBookData.length + 1,
    libro_id: id,
    user_id: user.id
  }
  BorrowedBookData.push(BorrowedBook);
  localStorage.setItem('prestados', JSON.stringify(BorrowedBookData));

}

const ButtonCard = (props) => {
  const {navigate, id, nombre, director, clasificacion, img, estado, setBooks } = props.data
  const userAuth = localStorage.getItem('usuarioAuth');
  const user = JSON.parse(userAuth);
  const deleteBook = () =>{
      const books = JSON.parse(localStorage.getItem('libros'));
      const newBooks = books.filter(item => item.id != id);
      localStorage.setItem('libros' , JSON.stringify(newBooks))
      setBooks(newBooks)
  }
  return (
    <>
      {
        userAuth ? (
          <>

            {
              estado == 2 ? <Button href="#" size="small" color="secondary">
                prestado
                </Button> : <Button onClick={() => CardConfirmBorrowedBook(nombre, id, userAuth, setBooks)} size="small" color="primary">
                  Prestar
            </Button>
            }
            {

              user.rol == 1 && ( <>
                <ButtonUpdate setBooks={setBooks} navigate={navigate} data={{id, nombre, director, clasificacion, img, estado }}/>
                <Button href="#" onClick={()=>window.confirm(`Desea eliminar: ${nombre}`) &&  deleteBook()} size="small" color="secondary">
                Eliminar
                </Button> 
              </>)
            
            }
          </>
        ) : (
            <>
      
              {
                estado == 2 ?  <Button href="#" size="small" color="secondary">
                  Libro prestado
           </Button> : <Button href="/login" size="small" color="primary">
                Prestar
            </Button>
              }
            </>
          )

      }

    </>

  )
}

const RenderBook = (props) => {
  const {navigate,  index, id, nombre, director, clasificacion, img, estado, setBooks } = props
  const userAuth = localStorage.getItem('usuarioAuth');
  const user = JSON.parse(userAuth);
  return (
    <Grid key={`${index}`} item xs={12} sm={6} md={4}>
      <Card style={{
        maxWidth: 345,
        background: estado == 2 && " #efefef"
      }}>
        <CardActionArea>
          <CardMedia
            style={{
              height: 140
            }}
            image={img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {nombre}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Director: {director}

            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">

              Clasificacion: {clasificacion}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: "space-between" }}>
          <ButtonCard data={props} />
        </CardActions>
      </Card>
    </Grid>
  )
}

export default function Books({navigate}) {
  const [books, setBooks] = useState([])
  const getBooks = () => {
    const books = localStorage.getItem('libros');
    if(books) {
      const ordenBooks = JSON.parse(books).sort((a,b)=>a.id - b.id);
      setBooks(ordenBooks)
    }
  }
  useEffect(() => {
    getBooks();
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {
          books.length > 0 ? (
            books.map((item, index) => <RenderBook  navigate={navigate} key={index} {...item} setBooks={setBooks} />)
          ) : <Typography gutterBottom variant="h5" component="h2">
              Sin libros que mostrar
      </Typography>
        }
      </Grid>
    </Container>

  )
}


