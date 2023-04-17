import React from 'react'
import ReactDOM from 'react-dom' // react 18. sürümden itibaren react-dom/client
import './index.css'
import App from './App'

// redux-toolkitten önce burada stroe oluşturuyorduk import {createStore} from "redux" // tüm reducerlarımızı componentlerimizde de kullanabilir halde olması bir mağaza oluşturacağız

//her iki yöntemde provider a ihtiyacımız oluyor
import {Provider} from "react-redux" // kullanacağımız <App/> compenentinde provider ile store tanımlaması yapacağız


//redux toolkitten önce kullandığımız yöntem
//import butunReducerlar from "./reducers/index" // reducer kalasöründe bir araya topladığımız reducerlarımızı bu dosyadan çağırıyoruz. mağazaya ekleyeceğiz

//let store=createStore(butunReducerlar); // store oluşturduk.Mağaza dan alıp reducer kullanabiliriz // redux toolkitten önce



//redux toolkit sonrası

import {store} from './app/store'  //redux-toolkit kullanmaya başladık. store umuzu başka bir js doyasında oluştuuyoruz


// provider içerisine oluşturduğumuz store u gönderiyoruz.
// artık app componenti sayesinde tüm sayfa ve diğer componentler bu store a ulaşabiliecek.
// store içerisinde yayınladığımız reducerlar ve reducerların müdahale ettiği state lere de ulaşacağız
ReactDOM.render(
  
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById('root')
)