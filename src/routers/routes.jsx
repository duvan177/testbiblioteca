import { BrowserRouter, Switch } from "react-router-dom";
import { UserRouters  } from './index'
export default function Routes() {
    return (
       <BrowserRouter>
            <UserRouters/>  
       </BrowserRouter>
    )
}
