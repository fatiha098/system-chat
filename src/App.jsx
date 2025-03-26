import { BrowserRouter, Route, Routes } from "react-router-dom"
import User1Chat from "./pages/User1Chat"
import User2Chat from "./pages/User2Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user1" element={<User1Chat />} />
          <Route path="/user2" element={<User2Chat />} />
        </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
