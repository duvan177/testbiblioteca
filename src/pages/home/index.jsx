import {useEffect } from 'react'

import Container from '@material-ui/core/Container';
import { AppBar, Title } from '../../components';
import { Books } from './components'

export default function Index(props) {
    const { history} = props;
    useEffect(() => {
        console.log(props);
    }, [])
    return (
        <>
          <AppBar navigate={history} goBack={false}  />
            <Container >
          
            <Title text={'Libros'} />
            <Books />
        </Container>
        </>
    )
}

