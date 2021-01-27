
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


const CardConfirmBorrowedBook = (nombre, id , userAuth, setBooks) => {
  const user = JSON.parse(userAuth);
  const response = window.confirm(`desea prestar libro ${nombre}`);
  if (!response) return; 

  const Books  = JSON.parse(localStorage.getItem('libros'));
  const newBooks = Books.map(item => {
    item.id == id &&(item.estado = 2);
    return item
  });
  localStorage.setItem('libros' , JSON.stringify(newBooks));
  setBooks(newBooks)
  const BorrowedBookData  = JSON.parse(localStorage.getItem('prestados'));

  if(BorrowedBookData.filter(item => item.libro_id == id).length > 0) return alert('libro ya agregado')
  const BorrowedBook = {
      id:BorrowedBookData.length + 1,
      libro_id : id,
      user_id : user.id 
     }
  BorrowedBookData.push(BorrowedBook);
  localStorage.setItem('prestados' , JSON.stringify(BorrowedBookData));
  
}


const RenderBook = ({ index, id, nombre, director, clasificacion, img , estado  , setBooks}) => {
  const userAuth = localStorage.getItem('usuarioAuth');

  const ButtonCard = () => {
    return (
      <>
      {
        userAuth ? (
          <Button onClick={() => CardConfirmBorrowedBook(nombre , id , userAuth, setBooks)} size="small" color="primary">
          Prestar
        </Button>
        ) :(
          <Button href="/login" size="small" color="primary">
          Prestar
        </Button>
        )
      }
       
      </>

    )
  }
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
        <CardActions>
          {
            estado == 1 ?      <ButtonCard/> :  <Button href="#" size="small" color="secondary">
            Libro prestado
          </Button> 
          }
    
            
        </CardActions>
      </Card>
    </Grid>
  )
}

export default function Books() {
  const [books, setBooks] = useState([])
  const getBooks = () => {
    const books = localStorage.getItem('libros');
    books && setBooks(JSON.parse(books))
  }
  useEffect(() => {
    getBooks();
    console.log(typeof (books));
  }, [])

  return (
    <Container maxWidth="md">

      <Grid container spacing={4}>
        {
          books.length > 0 ? (
            books.map((item, index) => <RenderBook key={index} {...item} setBooks={setBooks} />)
          ) : <Typography gutterBottom variant="h5" component="h2">
              Sin libros que mostrar
      </Typography>
        }
      </Grid>
    </Container>

  )
}


