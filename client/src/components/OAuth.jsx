import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';


const OAuth = () => {
  const dispatch=useDispatch();
    const handleGoogleClick =async () => {
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth,provider);
          const res=await fetch('http://localhost:3000/api/auth/google',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              name:result.user.displayName,
              email:result.user.email,
              photo:result.user.photoURL
            })
          })
          const data = await res.json();
  console.log(data);
  dispatch(signInSuccess(data));
          }catch(err){
            console.log("Something went wrong with Google Sign In",err);
        }
    }
  return (
    <div>
        <button type='button' 
        onClick={handleGoogleClick}
        className='w-full bg-red-700 text-white text-sm py-3 px-4 rounded-sm'>SIGN IN WITH GOOGLE</button>
    </div>
  )
}

export default OAuth