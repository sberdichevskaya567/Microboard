import './App.css'
import MainPage from "./page/main";
import {receivingData} from "./app/entities/slice";


const App = () => {

    const {data} = receivingData()

    return (
        data ? <MainPage /> : <div style={{textAlign: "center"}}>нет данных</div>


  )
}

export default App
