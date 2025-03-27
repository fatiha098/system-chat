import { useState, useEffect } from "react";
// import api from "../services/api";
import { IoMdSend } from "react-icons/io";
import Contacts from "./Contacts";
// import echo from '../services/echo'
import Echo from 'laravel-echo';
import axios from "axios";


const Chat = ({ currentUser, receiver }) => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    message: "",
    sender_id: currentUser.data.id,
    receiver_id: receiver.data.id,
  });

  useEffect( () => {

    console.log('token', currentUser.token)
      const echoInstance = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        encrypted: true,
        authEndpoint: `http://localhost:8000/api/broadcasting/auth`,
        auth: {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
      });

      //fetch messags 
      const fetchMessages = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/messages", {
            headers : {
              'Authorization': `Bearer ${currentUser.token}`,
            }
          });
          setMessages(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMessages();
  
      console.log({
        currentUser: currentUser.data,
        receiver: receiver?.data
      });


      // setup channel 
    const channel = echoInstance.private(`chat.${receiver?.data?.id}`);

     channel.listen('RealTimeMessage', (data) => {
      console.log("message sent : ", data)
       setMessages(prev => [...prev, data.message]);
     });

     channel.subscribed(() => {
      console.log('Subscribed to channel:', channel);
    }).error((error) => {
      console.error('Subscription error:', error);
    });

    echoInstance.connector.pusher.connection.bind('error', (err) => {
      console.error("Pusher error:", err);
    });


    return () => {
      if (channel) {
        channel.stopListening('RealTimeMessage');
        echoInstance.leave(`chat.${receiver.data.id}`);
      }
      // echoInstance.disconnect();
      // pusherClient.disconnect();
    };
    
  }, [currentUser.token, currentUser.data.id, receiver?.data?.id]);



  const sendMessage = async () => {
    if (newMessage.message.trim() === "") return;

    const token = currentUser.token;

    // Send the message to the backend
    // await api.post(`/messages`, newMessage, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },

      await axios.post("http://localhost:8000/api/messages", newMessage, {
        headers : {
          'Authorization': `Bearer ${token}`,
        }
      });
    

    
    // Update the local state
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Clear the input
    setNewMessage({
      message: "",
      sender_id: currentUser.data.id,
      receiver_id: receiver?.data?.id,
    });
  };

  return (
    <div className="flex h-screen pb-5">
      {<Contacts currentUserId={currentUser.data.id} />}
      <div className="flex flex-col p-4 w-2/3 rounded-xl shadow-xl">
        <h1>chat as {currentUser.data.name}</h1>
        <h2 className="text-xl p-3 border-b border-gray-300 flex items-center">
          <span className="bg-violet-600 text-white w-8 h-8 flex items-center justify-center rounded-full mr-2">
            {receiver?.data?.name.charAt(0).toUpperCase()}
          </span>
          {receiver?.data?.name}
        </h2>
        <div className="p-2 h-full overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender_id === currentUser.data.id ? "text-right" : "text-left"}>
              <p className={`${msg.sender_id === currentUser.data.id ? "bg-violet-600 text-white" : "bg-zinc-200 text-stone-900"} px-2 py-1 my-1 inline-block rounded max-w-[300px] break-words`}>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="border p-2 w-full mt-2 border-gray-400 rounded-xl mr-2 outline-stone-900"
            placeholder="Type your message..."
            value={newMessage?.message || ""}
            onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="mt-2 bg-stone-700 text-white p-2 px-3 rounded-xl hover:bg-violet-600 cursor-pointer">
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

