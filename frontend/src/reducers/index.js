import girisReducer from "./giris";
import hesaplaReducers from "./hesapla";

import {combineReducers} from "redux" // reducerları paket yapmak adına kullanacağınız

const butunReducerlar = combineReducers({
    hesapla:hesaplaReducers,
    giris:girisReducer

})

export default butunReducerlar