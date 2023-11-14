import { useRef, useState,useEffect } from 'react'// It provides a way to access and interact with the underlying DOM elements or React elements.
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'

const Profile = () => {
  const { currentUser } = useSelector(state => state.user);
  const fileRef = useRef(null);//for selecting image
  const [image,setImage]=useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const[formData,setFormData]=useState({});
  useEffect(()=>{
    if(image){
      handleFileUpload(image);//the handleFileUpload(image) is used to upload the image
    }
  },[image]);
  const handleFileUpload=async(image)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime() +image.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,image);
    console.log(uploadTask);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };


  return (
    <div>
      <div className="container max-w-lg mx-auto items-center justify-center ">
        <div className="bg-white flex flex-col px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl font-extralight text-center">Profile</h1>
          <input type='file' accept="image/*" ref={fileRef} hidden 
          onChange={(e)=>setImage(e.target.files[0])}//e.target.files[0] means to choose the first selected image 
          />

          <img alt='profile pic' className='self-center cursor-pointer mb-5 w-24 h-24 rounded-full object-cover' onClick={() => fileRef.current.click()} src={currentUser.profilePic}></img>
          {/* 
            firebase rules to be set on storage
            allow read;
            allow write: if 
            request.resource.size<2*1024*1024 &&
            request.resource.contentType.matches('image/.*'); 
          */}
          <p className='text-center'>{imageError ? (
            <span className="text-red-500">File size must be less than 2MB</span>
          ): imagePercent>0 && imagePercent<100 ? (
            <span className="text-green-500">{imagePercent}% uploaded</span>
          ):imagePercent===100 ? <span className="text-green-500">Image uploaded</span>:'' }</p>

          <input
            type="text"
            className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
            defaultValue={currentUser.username}
            placeholder="username"
          />

          <input
            type="text"
            className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
            defaultValue={currentUser.email}
            placeholder="email"
          />

          <input
            type="password"
            className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
            id="password"
            placeholder="password"
          />
          <button
            type="submit"
            className="w-full text-center text-sm py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1"
          >Update</button>
          <div className='flex justify-between'>
            <button
              type="submit"
              className="text-red-500 pt-5 "
            >Delete</button>
            <button
              type="submit"
              className="text-red-500 pt-5 "
            >Sign out</button>


          </div>
        </div>



      </div>
    </div>
  )
}

export default Profile