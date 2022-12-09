import React from "react"
import StopIcon from '@mui/icons-material/Stop'
import ReactTimeago from "react-timeago"
import { selectImage } from "../features/appSlice"
import { db } from "../firebase"
import { doc, updateDoc } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Chat({
	id,
	profilePic,
	read,
	timestamp,
	imageUrl,
	username,
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const open = async () => {
        if(!read){
            dispatch(selectImage(imageUrl))
            const docRef = await doc(db, "posts", id)
            updateDoc(docRef,{
                read: true
            })
            navigate("/chats/view")
        }
    }


	return (
		<div className="chat" onClick={open}>
			<img
				src={profilePic}
				alt={username + "profilePic"}
				className="chat__avatar"
			/>
			<div className="chat__info">
				<h4>{username}</h4>
				<p>{!read && "Tap to view - "}<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
			</div>
            {!read && <StopIcon className="chat__readIcon"/>}
		</div>
	)
}
