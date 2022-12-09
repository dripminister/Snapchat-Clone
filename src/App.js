import React, { useEffect } from "react"
import WebcamCapture from "./pages/WebcamCapture"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Preview from "./pages/Preview"
import Chats from "./pages/Chats"
import ChatView from "./pages/ChatView"
import Login from "./pages/Login"
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "./features/appSlice"
import { auth } from "./firebase"

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(
					login({
						username: authUser.displayName,
						profilePic: authUser.photoURL,
						id: authUser.uid,
					})
				)
      }else{

        dispatch(logout())
      }
    })
  },[])

	return (
		<div className="app">
			<BrowserRouter>
				{!user ? (
					<Login />
				) : (
					<div className="app__body">
						<Routes>
							<Route
								path="/"
								element={<WebcamCapture />}
							/>
							<Route
								path="/preview"
								element={<Preview />}
							/>
							<Route
								path="/chats"
								element={<Chats />}
							/>
							<Route
								path="/chats/view"
								element={<ChatView />}
							/>
						</Routes>
					</div>
				)}
			</BrowserRouter>
		</div>
	)
}

export default App
