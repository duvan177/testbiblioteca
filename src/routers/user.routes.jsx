import { Route, Switch  } from "react-router-dom";
import {SignUp , Login , Home , BorrowedBooks, CreateBook} from '../pages'
import  PrivateRoute from '../middlewares/auth.component';
export default function userRoutes() {

    const ROUTES = [
        {
            auth:false,
            path:'/',
            component: Home 
        },
        {
            auth:false,
            path:'/login',
            component: Login 
        },
        {
            auth:false,
            path:'/register',
            component: SignUp
        },
        {
            auth:true,
            path:'/borrowed-books',
            component: BorrowedBooks
        },
        {
            auth:true,
            path:'/create-books',
            component: CreateBook
        }
]

    return (
        <Switch>
              {ROUTES.map((route, i) => (
        // <Route exact key={i} {...route} />
          route.auth ? (
            <PrivateRoute exact key={i} 
            path={route.path} 
            component={route.component}
            />
          ) : (<Route exact key={i} {...route} />)
        
        // 
      ))}
    
        </Switch>
    )
}
