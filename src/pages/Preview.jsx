import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCameraImage, selectCameraImage } from '../features/cameraSlice'
import CloseIcon from "@mui/icons-material/Close"
import { useDispatch } from "react-redux"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import CropIcon from "@mui/icons-material/Crop"
import SendIcon from "@mui/icons-material/Send"
import { v4 as uuid} from "uuid"
import { db, storage } from "../firebase"
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { selectUser } from '../features/appSlice'

export default function Preview() {

    const cameraImage = useSelector(selectCameraImage)
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const collectionRef = collection(db, "posts")
    const user = useSelector(selectUser)

    const closePreview = () => {
        dispatch(resetCameraImage())
    }

    useEffect(() => {
        if(!cameraImage){
            navigate("/")
        }
    },[cameraImage, navigate])

    const sendPost = () => {
        const id = uuid()
        const storageRef = ref(storage, `posts/${id}`)
        uploadString(storageRef, cameraImage, "data_url").then((snapshot) => {
			getDownloadURL(snapshot.ref).then((downloadURL) => {
				addDoc(collectionRef, {
                    imageUrl: downloadURL,
                    username: user.username,
                    read: false,
                    timestamp: serverTimestamp(),
                    profilePic: user.profilePic
                })
                navigate("/chats")
			})
		})
    }

  return (
    <div className='preview'>
        <CloseIcon onClick={closePreview} className='preview__close'/>
        <div className='preview__toolbarRight'>
            <MusicNoteIcon />
            <CropIcon />
            <TextFieldsIcon />
        </div>
        <img src={cameraImage} alt="content"/>
        <div className="preview__footer" onClick={sendPost}>
            <h2>Send Now</h2>
            <SendIcon />
        </div>
    </div>
  )
}
