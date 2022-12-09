import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
import { useEffect, useState } from "react"
import { db, auth } from "../firebase"
import { onSnapshot, collection, query, orderBy } from "firebase/firestore"
import Chat from "../components/Chat"
import { selectUser } from "../features/appSlice"
import { useSelector } from "react-redux"
import { signOut } from "firebase/auth"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetCameraImage } from "../features/cameraSlice"

export default function Chats() {
	const [posts, setPosts] = useState([])
	const collectionRef = collection(db, "posts")
	const q = query(collectionRef, orderBy("timestamp", "desc"))
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

	useEffect(() => {
		onSnapshot(q, (snapshot) => {
			setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		})
	}, [q])

    const takeSnap = () => {
        dispatch(resetCameraImage())
        navigate("/")
    }

	return (
		<div className="chats">
			<div className="chats__header">
				<img
                    onClick={() => signOut(auth)}
					src={user.profilePic}
					alt="profile"
					className="chats__avatar"
				/>
				<div className="chats__search">
					<SearchIcon className="chats__searchIcon"/>
					<input
						type="text"
						placeholder="Friends"
					/>
				</div>
				<ChatBubbleIcon className="chats__chatIcon" />
			</div>
			<div className="chats__posts">
				{posts.map((post) => (
					<Chat
						key={post.id}
						id={post.id}
						profilePic={post.profilePic}
						read={post.read}
						timestamp={post.timestamp}
						imageUrl={post.imageUrl}
						username={post.username}
					/>
				))}
			</div>
            <RadioButtonUncheckedIcon className="chats__takePicIcon" onClick={takeSnap}/>
		</div>
	)
}
