import React from 'react'

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

import { AppBar, Title } from '../../components';
const deleteBookBorrowed = (id ) => {

    const booksByUser = JSON.parse(localStorage.getItem('prestados'));
    const books = JSON.parse(localStorage.getItem('libros'));
    const newBoks = books.map(item => {
       if(item.id == id)item.estado = 1
        return item;
    })
    localStorage.setItem('libros' , JSON.stringify(newBoks));
    const newBooksByUser = booksByUser.filter(item =>  item.libro_id != id);
    localStorage.setItem('prestados' , JSON.stringify(newBooksByUser));
    alert('Libro devuelto')
}
const RenderBook = ({ index, id, nombre, director, clasificacion, img , estado  , setBooks}) => {
  const userAuth = localStorage.getItem('usuarioAuth');
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
            
        <Button onClick={()=>{
            deleteBookBorrowed(id)
            setBooks() 
            }} href="#" size="small" color="secondary">
            Devolver libro
          </Button> 
            
        </CardActions>
      </Card>
    </Grid>
  )
}

export default function BorrowedBooks(props) {
    const {history } = props;
  const [books, setBooks] = useState([])
  const getBooks = () => {
    const booksByUser = JSON.parse(localStorage.getItem('prestados'));
    const booksLocal = JSON.parse(localStorage.getItem('libros'));
    const user = JSON.parse(localStorage.getItem('usuarioAuth'));
    

        const newBookByUser =  booksByUser.filter(item => item.user_id == user.id);
        console.log(newBookByUser , books);
        let booksData = []
        newBookByUser.map(item =>{
            let book = booksLocal.filter(obj => obj.id == item.libro_id);
            booksData.push(book[0]);
        })
        console.log('entre', booksData);
        setBooks(booksData)
    
  
}
  

  useEffect(() => {
    getBooks();
    console.log(typeof (books));
  }, [])

  return (
   <>
   <AppBar navigate={history} goBack={true}/>

    <Container maxWidth="md">
    <Title text={'Mis libros'} />
        <Grid container spacing={4}>
          {
            books.length > 0 ? (
              books.map((item, index) => <RenderBook key={index} {...item} setBooks={getBooks} />)
            ) : <Typography gutterBottom variant="h5" component="h2">
                Sin libros que mostrar
        </Typography>
          }
        </Grid>
      </Container>
   
   </>

  )
}


