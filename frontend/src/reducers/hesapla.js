//reduz toolkitten önce bu yöntemş kulanıyotruz


const hesaplaReducers=(state=0,action)=>{
    switch (action.type) {
        case 'TOPLA':
            return state+action.payload;
            //break;  return dediğimiz için break ihtiyacımız yok
        case 'CIKAR':

            return state-action.payload;
    
        default:
            return state;
    }
}

//başka dosyada kullanacağımızdan export edeceğiz

export default hesaplaReducers