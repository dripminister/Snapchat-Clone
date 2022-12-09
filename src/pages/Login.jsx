import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { auth, provider } from '../firebase'
import { login } from '../features/appSlice'

export default function Login() {
    const dispatch = useDispatch()

    const signIn = async () => {
        try{
            const res = await signInWithPopup(auth, provider)
            dispatch(login({
                username: res.user.displayName,
                profilePic: res.user.photoURL,
                id: res.user.uid
            }))
        }catch(err){
            alert(err.message)
        }
    }
  return (
    <div className='login'>
        <div className="login__container">
            <button className='login__button' onClick={signIn}>Sign In</button>
        </div>
    </div>
  )
}
