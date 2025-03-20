// import { useEffect, useState } from "react"
// import api from "../services/api"
// import { FaUserPlus } from "react-icons/fa";
// import AddContact from "./AddContact";


// function Contacts({currentUserId}) {

//     const [contacts, setContacts] = useState([])
//     const [showForm, setShowForm] = useState(true)

//     useEffect(() => {
      
//         const fetchContacts = async () => {

//             console.log('curruent use id:', currentUserId)

//             try {
//                 const response = await api.get('/contacts', {
//                     header : {
//                         Authorization: `Bearer ${localStorage.getItem(`user_${currentUserId}`)}`
//                     }
//                 })

//                 setContacts(response.data)
//             } catch (error) {
//                 console.log(error)
//             }
//         }

//         fetchContacts()
//     }, [])

//     function showFormAddContact(){
//       setShowForm(true)
//     }

    
//   return (
//     <>
//       {showForm && <AddContact/>}
//       <div className="flex-1 overflow-y-auto py-4 p-4">
//         <div className="flex items-center justify-between pr-3">
//             <h1 className="text-2xl font-bold border-l-4 border-violet-600 text-violet-600 pl-4 py-2">Contacts</h1>
//             <p onClick={showFormAddContact}
//               className="text-violet-700 text-2xl cursor-pointer hover:text-violet-900"><FaUserPlus /></p>   
//         </div>
//         <form>
//             <input type="text" 
//                 className="outline-none bg-gray-100 my-2 px-3 py-2 rounded w-full border-2 border-gray-100 focus:border-gray-200"
//                 placeholder="search"/>
//         </form>
//           {contacts.map((contact) => (
//             <div key={contact.id} className="flex items-center p-4 hover:bg-violet-600 hover:text-white cursor-pointer">
//             <img className="w-[40px] mr-3" src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1315.jpg?ga=GA1.1.241166601.1739396509&semt=ais_hybrid" alt="" />
//               <div>
//                 <p className="font-medium">{contact.name}</p>
//                 <p className="text-sm text-gray-500">{contact.lastMessage}</p>
//               </div>
//             </div>
//           ))}
//        </div>
//     </>
    
//   )
// }


// export default Contacts


import { useEffect, useState } from "react";
import api from "../services/api";
import { FaUserPlus } from "react-icons/fa";
import AddContact from "./AddContact";

function Contacts({ currentUserId }) {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    const fetchContacts = async () => {
      console.log("current user id:", currentUserId);

      try {
        const response = await api.get("/contacts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`user_${currentUserId}`)}`,
          },
        });

        setContacts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, []);

  function showFormAddContact() {
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  return (
    <>
      {showForm && <AddContact closeForm={closeForm} contacts={contacts}/>}
      <div className="flex-1 overflow-y-auto py-4 p-4">
        <div className="flex items-center justify-between pr-3">
          <h1 className="text-2xl font-bold border-l-4 border-violet-600 text-violet-600 pl-4 py-2">
            Contacts
          </h1>
          <p
            onClick={showFormAddContact}
            className="text-violet-700 text-2xl cursor-pointer hover:text-violet-900"
          >
            <FaUserPlus />
          </p>
        </div>
        <form>
          <input
            type="text"
            className="outline-none bg-gray-100 my-2 px-3 py-2 rounded w-full border-2 border-gray-100 focus:border-gray-200"
            placeholder="search"
          />
        </form>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center p-4 hover:bg-violet-600 hover:text-white cursor-pointer"
          >
            <img
              className="w-[40px] mr-3"
              src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1315.jpg?ga=GA1.1.241166601.1739396509&semt=ais_hybrid"
              alt=""
            />
            <div>
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Contacts;
