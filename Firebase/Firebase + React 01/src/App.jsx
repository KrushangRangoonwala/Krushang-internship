import { useState } from 'react'
import './App.css'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebseConfig';


function App() {
  const [user, setUser] = useState(null);

  async function addUser() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: 'Kriyang',
        email: 'Kriyang@123gmail.com',
        age: 21,
      });
      console.log("User added with Id : ", docRef.id)
      console.log("docRef ", docRef);
    } catch (err) {
      console.log("Addign user Error ", err);
    }
  }

  async function readUser() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => console.log(doc.id + " " + JSON.stringify(doc.data())));
      console.log();
      console.log("QuesrySnapshot ", querySnapshot);
    } catch (err) {
      console.log("data fetching Error : ", err);
    }
  }

  async function updateUser(userId) {
    try {
      const userRef = await doc(db, "users", userId);
      await updateDoc(userRef, { name: 'Test', email: 'kush.di@gmail.com', age: 22 });
      console.log("User Updated");
      console.log("userRef ", userRef);
    } catch (err) {
      console.log("Error in upfate data : ", err);
    }
  }

  async function deleteUser(userId) {
    try {
      await deleteDoc(doc(db, "users", userId));
      console.log("user deleted..");
    } catch (err) {
      console.log("Error delete user : ", err);
    }
  }

  return (
    <>
      <button onClick={addUser}>Create</button>
      <button onClick={readUser}>Fetch</button>
      <button onClick={() => updateUser('lBAxct6XZWaK4SE8sL51')}>Update</button>
      <button onClick={() => deleteUser('lBAxct6XZWaK4SE8sL51')}>Delete</button>
    </>
  )
}

export default App
