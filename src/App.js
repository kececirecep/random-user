import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://randomuser.me/api/?page=${page}&results=12`
      );
      setUsers(response.data.results);
      setTotalPages(10);
    };
    fetchData();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Rastgele Kullanıcılar
              </h2>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-300 rounded-md"
                  >
                    <img
                      src={user.picture.large}
                      alt={`${user.name.first} ${user.name.last}`}
                      className="w-full h-auto rounded-full"
                    />
                    <div className="mt-2 text-sm">
                      <p className="font-medium">
                        {user.name.first} {user.name.last}
                      </p>
                      <p className="text-gray-600 truncate">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                    page === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Önceki Sayfa
                </button>
                <div>
                  Sayfa {page} / {totalPages}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                    page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Sonraki Sayfa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
