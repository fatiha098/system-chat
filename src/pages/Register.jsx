import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../services/api.js"

function Register() {

  const [formData, setFormData] = useState({
    name: null,
    email: null,
    password: null
  });
  const Navigate = useNavigate()

  async function handleSubmit(e){
  e.preventDefault();
  try {
      const response = await api.post("/login", formData);
      localStorage.setItem(`user_${response.data.userLoggedIn.id}`, JSON.stringify(response.data.userLoggedIn));

      Navigate("/user1");
  } catch (error) {
  console.log(error)
  }

  }

  useEffect(() => {
  
  
  }, [])

  return (
    <section className="bg-gray-50">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-stone-900 md:text-2xl">
              Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="name" 
                        className="block mb-2 text-sm font-medium text-gray-600">
                          Your name
                  </label>
                  <input type="text" 
                        name="name" 
                        id="name" 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="name" 
                        required=""
                  />
              </div>
              <div>
                  <label htmlFor="email" 
                        className="block mb-2 text-sm font-medium text-gray-600">
                          Your email
                  </label>
                  <input type="email" 
                        name="email" 
                        id="email" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="name@company.com" 
                        required=""
                  />
              </div>
              <div>
                  <label htmlFor="password" 
                        className="block mb-2 text-sm font-medium text-gray-600">
                          Password
                  </label>
                  <input type="password" 
                        name="password" 
                        id="password" 
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="••••••••" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required=""
                  />
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" 
                              aria-describedby="remember" 
                              type="checkbox" 
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                              required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" 
                              className="text-gray-500 dark:text-gray-300">
                                Remember me
                        </label>
                      </div>
                  </div>
                  <a href="#" 
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Forgot password?
                  </a>
              </div>
              <button type="submit" 
                      className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center">
                        Sign Up
              </button>
          </form>
      </div>
  </div>
</div>
</section>
  )
}

export default Register