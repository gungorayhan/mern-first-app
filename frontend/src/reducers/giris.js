//redux createSlice öncesi bu yöntemş kulanıyotruz

const girisReducer = (state=false,action)=>{

    switch (action.type){
        case 'SIGN_IN':
            
            return !state;
    
        default:
            return state;
    }
}

export default girisReducer