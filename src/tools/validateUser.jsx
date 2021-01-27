export const ValidateUser = ({ alias, contrasena }) => {
    try {
        
        const users = JSON.parse(localStorage.getItem('usuarios'));
        const user = users.filter(item => item.alias == alias);
        if (!user.length > 0) return {status:false , message:"Usuario no encontrado"}
        
        if (!(user[0].password == contrasena)) return {status:false , message:"Contraseña incorrecta"}
        
        localStorage.setItem('usuarioAuth' , JSON.stringify(user[0]));
        return {
            status:true ,
            message: 'usuario valido'
        }
    } catch (error) {
        console.log(error);   
    }
}


export const Logout =  (push) => {
    // console.log('entre' , push);
    localStorage.removeItem('usuarioAuth');
    push('/');
}