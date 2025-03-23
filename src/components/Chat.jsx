import { useState, useEffect } from "react";
import api from "../services/api";
import { IoMdSend } from "react-icons/io";
import Contacts from "./Contacts";
import Pusher from 'pusher-js';

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
  }, []);

  // const pusher = new Pusher('0d0f12e8b8fceffd0879', {
  //   cluster: 'eu',
  //   forceTLS: true,
  // });

  const pusher = new Pusher('0d0f12e8b8fceffd0879', {
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: "application/json",
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    },
  });

  console.log('token:', localStorage.getItem('token'));

  useEffect(() => {

    Pusher.logToConsole = true;

    // const channel = pusher.subscribe('chat');

    const channel = pusher.subscribe(`private-chat.${receiver.id}`);

    channel.bind('pusher_internal:subscription_succeeded', () => {
      console.log("Subscription succeeded. Ready to trigger events.");
    });

    channel.bind('client-RealTimeMessage', (data) => {

      console.log("Data received:", data);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
        },
      ]);
    });

    return () => {
      pusher.unsubscribe(`private-chat.${receiver.id}`);
      pusher.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (newMessage.message.trim() === "") return;

    const token = localStorage.getItem("token");

    // Send the message to the backend
    await api.post(`/messages`, newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Trigger the Pusher event
    const channel = pusher.subscribe(`private-chat.${receiver.id}`);
    channel.trigger('client-RealTimeMessage', {
      message: newMessage.message,
      sender_id: newMessage.sender_id,
      receiver_id: newMessage.receiver_id,
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







