import { useState, useEffect } from "react";
import api from "../services/api";
import { IoMdSend } from "react-icons/io";
import Contacts from "./Contacts";
import echo from '../services/echo'

const Chat = ({ currentUser, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    message: "",
    sender_id: currentUser.id,
    receiver_id: receiver.id,
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get("/messages");
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    console.log({
      currentUser: currentUser.id,
      receiver: receiver.id
    });
    
     // Subscribe to private channel
     const channel = echo.private(`chat.${currentUser.id}`);

     // Listen for new messages
     channel.listen('RealTimeMessage', (data) => {

      console.log('data:', data)

       setMessages(prev => [...prev, data.message]);

     });

     
    channel.subscribed(() => {
      console.log('Subscribed to channel:', `chat.${currentUser.id}`);
    }).error((error) => {
      console.error('Subscription error:', error);
    });

    //  console.log(channel)
 
     // Error handling
     echo.connector.pusher.connection.bind('error', (err) => {
       console.error("Pusher error:", err);
     });
 

     return () => {
      channel.stopListening('RealTimeMessage');
      echo.leave(`chat.${receiver.id}`);
    };
  }, [currentUser.id, receiver.id]);




  const sendMessage = async () => {
    if (newMessage.message.trim() === "") return;

    const token = localStorage.getItem("token");

    // Send the message to the backend
    await api.post(`/messages`, newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    // Update the local state
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Clear the input
    setNewMessage({
      message: "",
      sender_id: currentUser.id,
      receiver_id: receiver.id,
    });
  };

  return (
    <div className="flex h-screen pb-5">
      {<Contacts currentUserId={currentUser.id} />}
      <div className="flex flex-col p-4 w-2/3 rounded-xl shadow-xl">
        <h1>chat as {currentUser.name}</h1>
        <h2 className="text-xl p-3 border-b border-gray-300 flex items-center">
          <span className="bg-violet-600 text-white w-8 h-8 flex items-center justify-center rounded-full mr-2">
            {receiver.name.charAt(0).toUpperCase()}
          </span>
          {receiver.name}
        </h2>
        <div className="p-2 h-full overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender_id === currentUser.id ? "text-right" : "text-left"}>
              <p className={`${msg.sender_id === currentUser.id ? "bg-violet-600 text-white" : "bg-zinc-200 text-stone-900"} px-2 py-1 my-1 inline-block rounded max-w-[300px] break-words`}>
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

