import React, { useEffect, useState } from "react";
import startFirebase from "../firebase";
import { ref, onValue } from "firebase/database";
import Select from "react-select";
// eslint-disable-next-line
const dropDownSelection = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
];
const sortByList = [
  { value: 'ACTIVE', label: 'Alphabetical Asc. (A to Z)', order: 'ASC' },
  { value: 'INACTIVE', label: 'Alphabetical Dsc. (Z to A)', order: 'DESC' },
];
const db = startFirebase();
function CommonTable() {
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [userListData, setUserListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState({ value: "5", label: "5" });
  const [filterSortValue, setFilterSortValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const startIndex = (currentPage - 1) * filterValue.value;
  const endIndex = startIndex + filterValue.value;
  const currentData = userListData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(userListData.length / filterValue.value);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setLoadingFlag(true);
    const dbref = ref(db, "users");
    onValue(dbref, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let data = childSnapShot.val();
        records.push({ user: data });
      });
      setUserListData(records);
      setLoadingFlag(false);
    });
  }, []);
  
  // Filter the data based on the search term
useEffect(()=>{
  if(searchTerm===''){
    setLoadingFlag(true);
    const dbref = ref(db, "users");
    onValue(dbref, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let data = childSnapShot.val();
        records.push({ user: data });
      });
      setUserListData(records);
      setLoadingFlag(false);
    });
  }
  else{

    setUserListData(currentData.filter(item => 
      item.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  }
},[searchTerm])

useEffect(()=>{
  const sortedData = userListData?.slice()?.sort((a, b) => {
    const nameA = a.user.name.toLowerCase();
    const nameB = b.user.name.toLowerCase();
  
    if (filterSortValue?.order === 'ASC') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });
  setUserListData(sortedData)
},[filterSortValue])

  return (
    <div>
      <div className="font-semibold text-3xl text-gray-600 my-4">Zerostic</div>
      <div className="mx-12 p-6 border border-gray-300 rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center relative justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <label for="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
                value={searchTerm}
                onChange={(e)=>{setSearchTerm(e.target.value);}}
              />
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="!text-lg !font-medium !inter-reguler !pb-2">
                Filters:
              </div>
              <Select
                className="basic-single h-full w-[150px]"
                classNamePrefix="select"
                defaultValue="Select"
                value={filterValue}
                isSearchable={true}
                name="color"
                onChange={setFilterValue}
                selectedValue={filterValue}
                options={dropDownSelection}
                placeholder={"Number of rows"}
              />
              <Select
                className="basic-single h-full w-[250px]"
                classNamePrefix="select"
                defaultValue="Select"
                value={filterSortValue}
                isSearchable={true}
                name="color"
                onChange={setFilterSortValue}
                selectedValue={filterValue}
                options={sortByList}
                placeholder={"Sort by Alphabets"}
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
              </tr>
            </thead>
            
              {loadingFlag ? (
                <div className="w-[150px] h-[150px] text-center" >
                  <div role="status">

                  <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
                  <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <tbody>
               { currentData.map((user,index) => (
                  <tr
                    key={user.user?.name}
                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} border-b dark:border-gray-700 `}
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="">
                        <div className="text-base font-semibold capitalize">
                          {user.user?.name}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 text-blue-600 dark:text-blue-500 capitalize">
                      {user.user?.position}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">{user.user?.age}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium capitalize">
                        {user.user?.address}
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              )}
            
          </table>
        </div>
      <div className="flex flex-row justify-end mt-6 mb-3 mr-4">
        <div className="flex gap-2 items-center  justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default CommonTable;
