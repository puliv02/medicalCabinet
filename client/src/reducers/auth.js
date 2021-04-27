const user = JSON.parse(window.localStorage.getItem('user'));
const initialUserState = user 
? {isLoggedIn : true , user : user.user}
: { isLoggedIn : false, user : null} ;
export const authReducer = (state = initialUserState, action) =>{
    const {type, payload} = action ;
    switch(type){
        case 'LOGIN_USER':
            return{
                ...state,
                isLoggedIn : true,
                user : payload
            };
        case 'LOG_OUT':
            return{
                ...state,
                isLoggedIn : false,
                user : null
            };
        default:
            return state ;
    }
}