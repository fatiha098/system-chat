import Chat from "../components/Chat";

function User1Chat()
{

  // const user = JSON.parse(localStorage.getItem("user"));
  
  const sender = JSON.parse(localStorage.getItem(`user_28`));
  const receiver = JSON.parse(localStorage.getItem(`user_29`));

  return <Chat currentUser={sender} receiver={receiver} />;

};

export default User1Chat;
