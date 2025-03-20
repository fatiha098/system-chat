import { useState } from "react";

function AddContact({ closeForm, contacts }) {

  const [formData, setFormData] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Adding contact:", formData);
    closeForm();
  }

  console.log("vvv", contacts)



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={closeForm}
        >
          &times;
        </button>
        <h1 className="text-xl font-bold mb-4 text-center text-stone-900">Add Contact</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              select in your contacts
            </label>
            <select name="email" id="email" 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none">
            <option value="">Select an email</option>
            {
                contacts.map((c, index) => (
                    <option key={index} value={c.email}>{c.email}</option>
                ))
            }
  </select>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
          >
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddContact;
