import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { useNavigate } from 'react-router'

const auth = getAuth(app)

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if(user){
                console.log("user ",user);
                setUser(user);
            }else{
                console.log("Not Signed In");
                navigate('/signin');
            }
        })
    },[])
    return (
        <div>
            <h2> Home Page </h2>
            <h4>Hello {user?.email} </h4>
            <button onClick={() => signOut(auth)}> Logout </button>
        </div>
    )
}

export default Home
