import Chat from "../components/Chat";

function User2Chat()
{
  
  const sender = JSON.parse(localStorage.getItem(`user_1`));
  const receiver = JSON.parse(localStorage.getItem(`user_2`));

  // const receiver = {"id":28,"name":"fatiha","email":"fatiha@gmail.com","email_verified_at":null,"created_at":"2025-03-15T15:21:28.000000Z","updated_at":"2025-03-15T15:21:28.000000Z"}
  // const sender = {"id":29,"name":"nezha","email":"nezha@gmail.com","email_verified_at":null,"created_at":"2025-03-15T15:21:40.000000Z","updated_at":"2025-03-15T15:21:40.000000Z"}
  
  return <Chat currentUser={sender} receiver={receiver} />;

};

export default User2Chat;

