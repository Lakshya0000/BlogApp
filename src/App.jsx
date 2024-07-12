import "./App.css"
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth";
import {login, logout} from "./store/authSlice"
import { Footer, Header } from "./components";
import {Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.currentUser().then((user) => {
      if (user) {
        dispatch(login({user}))
      }
      else{
        dispatch(logout())
      }
    }).finally(() => setLoading(false))
  })
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-300">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>

    </div>
  ) : (null);
}

export default App
