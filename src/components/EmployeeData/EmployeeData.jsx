import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

const EmployeeData = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchApiData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      const userList = data.users;
      const uniqueCountries = [
        ...new Set(userList.map((user) => user.address.country)),
      ];
      const uniqueGenders = [...new Set(userList.map((user) => user.gender))];

      setCountries(uniqueCountries);
      setGenders(uniqueGenders);
      setUsers(userList);
      setFilteredUsers(userList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  useEffect(() => {
    let filtered = [...users];
    if (selectedCountry) {
      filtered = filtered.filter(
        (user) => user.address.country === selectedCountry
      );
    }
    if (selectedGender) {
      filtered = filtered.filter((user) => user.gender === selectedGender);
    }
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [selectedCountry, selectedGender, users]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <>
      <div className="p-6 border border-gray-200 ">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Employees</h1>
          </div>
          <div className="flex items-center space-x-4">
            <FaFilter
              className="text-red-500"
              style={{ width: "77px", height: "24px" }}
            />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <option value="">Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <option value="">Gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Image</th>
                <th className="p-2 border-b">First Name</th>
                <th className="p-2 border-b">Email</th>
                <th className="p-2 border-b">Blood Group</th>
                <th className="p-2 border-b">Phone</th>
                <th className="p-2 border-b">BirthDate</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id}>
                  <td className="p-2 border-b border-r text-center">
                    {user.id}
                  </td>
                  <td className="p-2 border-b border-r text-center">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="p-2 border-b border-r text-center">
                    {user.firstName}
                  </td>
                  <td className="p-2 border-b border-r text-center">
                    {user.email}
                  </td>
                  <td className="p-2 border-b border-r text-center">
                    {user.bloodGroup || "N/A"}
                  </td>
                  <td className="p-2 border-b border-r text-center">
                    {user.phone}
                  </td>
                  <td className="p-2 border-b text-center">{user.birthDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mr-2 rounded ${
              currentPage === 1 ? "bg-gray-300" : "bg-red-500 text-white"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 ml-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-red-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeData;
