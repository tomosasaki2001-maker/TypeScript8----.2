
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Compornents/Home'
import Login from './Compornents/Setup/Login'
import Signup from './Compornents/Setup/Signup'
import SetName from './Compornents/Setup/SetName'
import Quiz from './Compornents/Quiz'
import ResultPage from './Compornents/Result/ResultPage'
import Rank from './Compornents/Result/Rank'




export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/signup'element={<Signup/>}/>
        <Route path='/setname'element={<SetName/>}/>
        <Route path='/quiz'element={<Quiz/>}/>
        <Route path='/resultPage'element={<ResultPage/>}/>
        <Route path='/rank' element={<Rank/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  )
}

