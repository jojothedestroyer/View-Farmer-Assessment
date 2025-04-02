// import { useState, useEffect } from "react";
// import { database, ref, onValue } from "./firebase";

// function App() {
//   const [farmers, setFarmers] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [selectedFarmer, setSelectedFarmer] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(""); // New state for search term
//   const [dataLoaded, setDataLoaded] = useState(false); // Added missing state

//   useEffect(() => {
//     const usersRef = ref(database);
//     onValue(usersRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const userNames = Object.keys(data);
//         setUsers(userNames);
//         if (!selectedUser && userNames.length > 0) {
//           setSelectedUser(userNames[0]);
//         }
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedUser) return;
//     const farmersRef = ref(database, `${selectedUser}/farmers`);

//     onValue(farmersRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const farmersArray = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setFarmers(farmersArray);
//       } else {
//         setFarmers([]);
//       }
//     });
//   }, [selectedUser]);

//   const filteredFarmers = farmers.filter(
//     (farmer) =>
//       farmer.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       farmer.farmer_id.includes(searchTerm) ||
//       farmer.nutmeg_card_number.includes(searchTerm)
//   );


//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Farmer Assessment Data</h1>

//         <div className="mb-6">
//           <label className="underline font-bold">Fields Officer</label>
//           <select
//             onChange={(e) => setSelectedUser(e.target.value)}
//             value={selectedUser}
//             className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             {users.map((user) => (
//               <option key={user} value={user}>{user}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-6">
//           <label className=" font-bold">Filter</label>
//           <input
//             type="text"
//             placeholder="Enter name, farmer ID, or card number"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         {/* 
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">Farmers List</h2>
//             <ul className="space-y-2">
//               {farmers.map((farmer) => (
//                 <li
//                   key={farmer.id}
//                   onClick={() => setSelectedFarmer(farmer)}
//                   className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedFarmer?.id === farmer.id
//                     ? 'bg-blue-50 border border-blue-200'
//                     : 'hover:bg-gray-50'
//                     }`}
//                 >
//                   <p className="font-medium text-gray-900">{farmer.farmer_name}</p>
//                   <p className="text-sm text-gray-500">Farmer ID: {farmer.farmer_id}</p>
//                   <p className="text-sm text-gray-500">Card Number: {farmer.nutmeg_card_number}</p>
//                 </li>
//               ))}
//             </ul>
//           </div> */}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">Farmers List</h2>
//             {!dataLoaded ? (
//               "Loading..."
//             ) : (
//               `${filteredFarmers
//                 .filter(farmer => !farmer.flagged &&
//                   !farmer.farmer_name.toLowerCase().includes("flagged"))
//                 .length} entries`
//             )}
//             <ul className="space-y-2">
//               {filteredFarmers
//                 .filter((farmer) => !farmer.flagged &&
//                   !farmer.farmer_name.toLowerCase().includes("flagged"))
//                 .sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated))
//                 .map((farmer) => (
//                   <li
//                     key={farmer.id}
//                     onClick={() => setSelectedFarmer(farmer)}
//                     className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedFarmer?.id === farmer.id
//                       ? "bg-blue-50 border border-blue-200"
//                       : "hover:bg-gray-50"
//                       }`}
//                   >
//                     <p className="font-medium text-gray-900">{farmer.farmer_name}</p>
//                     <p className="text-sm text-gray-500">Farmer ID: {farmer.farmer_id}</p>
//                     <p className="text-sm text-gray-500">Card Number: {farmer.nutmeg_card_number}</p>
//                   </li>
//                 ))}
//             </ul>
//           </div>

//           {selectedFarmer && !selectedFarmer.flagged && (
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-lg shadow p-6">


//                 <h2 className="text-2xl font-semibold mb-6">Farmer Details</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="space-y-2">
//                     <p className="text-gray-600">Name: <span className="font-medium text-gray-900">{selectedFarmer.farmer_name}</span></p>
//                     <p className="text-gray-600">ID: <span className="font-medium text-gray-900">{selectedFarmer.farmer_id}</span></p>
//                     <p className="text-gray-600">Nutmeg Card: <span className="font-medium text-gray-900">{selectedFarmer.nutmeg_card_number}</span></p>
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-gray-600">Phone: <span className="font-medium text-gray-900">{selectedFarmer.phone_number}</span></p>
//                     <p className="text-gray-600">Sex: <span className="font-medium text-gray-900">{selectedFarmer.sex}</span></p>
//                     <p className="text-gray-600">Age Range: <span className="font-medium text-gray-900">{selectedFarmer.age}</span></p>
//                   </div>
//                 </div>


//                 {selectedFarmer.verify && (
//                   <div>
//                     <h3 className="text-xl font-semibold mb-4">Plots</h3>
//                     <div className="grid gap-4">
//                       {selectedFarmer.verify
//                         .filter((v) => !v.flagged)

//                         .map((v, index) => (
//                           <div key={index} className="bg-gray-50 rounded-lg p-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <p className="text-gray-600">Condition: <span className="font-medium text-gray-900">{v.condition}</span></p>
//                               <p className="text-gray-600">Overall Acreage: <span className="font-medium text-gray-900">{v.overall_acreage}</span></p>
//                               <p className="text-gray-600">Labour: <span className="font-medium text-gray-900">{v.labour}</span></p>
//                               <p className="text-gray-600">Shade: <span className="font-medium text-gray-900">{v.shade}</span></p>
//                               <p className="text-gray-600">Date: <span className="font-medium text-gray-900">{new Date(v.date ?? Date.now()).toDateString()}</span></p>
//                               <p className="text-gray-600">Location: <span className="font-medium text-gray-900">{v.location ?? "Not Available"}</span></p>
//                               <p className="text-gray-600">Acreage Rehabilitated: <span className="font-medium text-gray-900">{v.acreage_rehabilitated ?? "Not Available"}</span></p>
//                               <p className="text-gray-600">Tenure: <span className="font-medium text-gray-900">{v.newtenure ?? "Not Available"}</span></p>
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 )}


//                 <div className="space-y-8">
//                   {selectedFarmer.assessment && (
//                     <div>
//                       <h3 className="text-xl font-semibold mb-4">Assessments</h3>
//                       <div className="grid gap-4">
//                         {selectedFarmer.assessment
//                           .filter((a) => !a.flagged)

//                           .map((a, index) => (
//                             <div key={index} className="bg-gray-50 rounded-lg p-4">
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <p className="text-gray-600">Plot: <span className="font-medium text-gray-900">{a.plot_num}</span></p>
//                                 <p className="text-gray-600">Production 2023: <span className="font-medium text-gray-900">{a.production_2023}</span></p>
//                                 <p className="text-gray-600">Drainage: <span className="font-medium text-gray-900">{a.drainage}</span></p>
//                                 <p className="text-gray-600">Spices: <span className="font-medium text-gray-900">{a.spices}</span></p>

//                                 <p className="text-gray-600">
//                                   Nutmeg Card Number: <span className="font-medium text-gray-900">{a.nutmeg_card_number}</span>
//                                 </p>


//                                 {/* 
//                               <p className="text-gray-600">
//                                 Date of Land Clearing: <span className="font-medium text-gray-900">{a.land_clearing_date}</span>
//                               </p> */}
//                                 <p className="text-gray-600">
//                                   Land Clearing Remarks: <span className="font-medium text-gray-900">{a.land_clearing}</span>
//                                 </p>


//                                 {/* <p className="text-gray-600">
//                                 Date of Drainage: <span className="font-medium text-gray-900">{a.drainage_date}</span>
//                               </p> */}
//                                 <p className="text-gray-600">
//                                   Drainage Remarks: <span className="font-medium text-gray-900">{a.drainage}</span>
//                                 </p>

//                                 {/* <p className="text-gray-600">
//                                 Date of Shade Crops: <span className="font-medium text-gray-900">{a.shade_crops_date}</span>
//                               </p> */}
//                                 <p className="text-gray-600">
//                                   Shade Crops Remarks: <span className="font-medium text-gray-900">{a.shade_crops}</span>
//                                 </p>

//                                 {/* 
//                               <p className="text-gray-600">
//                                 Date of Spices: <span className="font-medium text-gray-900">{a.spices_date}</span>
//                               </p> */}
//                                 <p className="text-gray-600">
//                                   Spices Remarks: <span className="font-medium text-gray-900">{a.spices}</span>
//                                 </p>

//                                 {/* 
//                               <p className="text-gray-600">
//                                 Date of Fertilizing: <span className="font-medium text-gray-900">{a.fertilizing_date}</span>
//                               </p> */}
//                                 <p className="text-gray-600">
//                                   Fertilizing Remarks: <span className="font-medium text-gray-900">{a.fertilizing}</span>
//                                 </p>

//                                 <p className="text-gray-600">
//                                   Comments: <span className="font-medium text-gray-900">{a.comments}</span>
//                                 </p>






//                               </div>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   )}

//                   {selectedFarmer.workplan && (
//                     <div>
//                       <h3 className="text-xl font-semibold mb-4">Workplans</h3>
//                       <div className="grid gap-4">
//                         {selectedFarmer.workplan
//                           .filter((w) => !w.flagged)

//                           .map((w, index) => (
//                             <div key={index} className="bg-gray-50 rounded-lg p-4">
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <p className="text-gray-600">Work Plan: <span className="font-medium text-gray-900">{w.work_plan}</span></p>
//                                 <p className="text-gray-600">Base Crop: <span className="font-medium text-gray-900">{w.base_crop}</span></p>
//                                 <p className="text-gray-600">Farmer Date: <span className="font-medium text-gray-900">{w.farmer_date}</span></p>
//                                 <p className="text-gray-600">Officer Date: <span className="font-medium text-gray-900">{w.officer_date}</span></p>
//                               </div>

//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 {/* <p className="text-gray-600">Work Plan: <span className="font-medium text-gray-900">{w.activities}</span></p> */}
//                                 {/* <p className="text-gray-600">Base Crop: <span className="font-medium text-gray-900">{w.base_crop}</span></p>
//                               <p className="text-gray-600">Farmer Date: <span className="font-medium text-gray-900">{w.farmer_date}</span></p>
//                               <p className="text-gray-600">Officer Date: <span className="font-medium text-gray-900">{w.officer_date}</span></p> */}
//                               </div>
//                               {/* {console.log("Activities Data:", w?.activities)} */}
//                               {/* Debugging: Check if activities exist */}
//                               {/* {console.log("Activities Data:", w?.activities)} */}

//                               {/* Activities Section */}
//                               {/* <p>Activities</p>
//                             {w && w.activities && Object.keys(w.activities).length > 0 ? (
//                               Object.entries(w.activities).map(([activity, details], activityIndex) => {
//                                 // Ensure details exist and are valid
//                                 if (!details || typeof details !== "object") return null;

//                                 // Check if at least one week is true
//                                 const hasActiveWeeks = details.weeks.some(week => week);

//                                 // Skip if manDays is empty and no weeks are selected
//                                 if (!details.manDays.trim() && !hasActiveWeeks) return null;

//                                 return (
//                                   <div key={activityIndex}>
//                                     <p>{activity.replace(/([A-Z])/g, " $1").trim()}</p> {/* Formats names */}
//                               {/* <p>Man Days: {details.manDays.trim() ? details.manDays : "N/A"}</p>
//                                     <div>
//                                       {hasActiveWeeks ? (
//                                         details.weeks.map((week, weekIndex) => (
//                                           <p key={weekIndex}>
//                                             Week {weekIndex + 1}: {week ? "✔" : "❌"}
//                                           </p>
//                                         ))
//                                       ) : (
//                                         <p>No weeks available</p>
//                                       )}
//                                     </div>
//                                   </div>
//                                 );
//                               })
//                             ) : (
//                               <p>No activities available</p>
//                             )} */}

//                               {w && w.activities ? (
//                                 (() => {
//                                   let activities;
//                                   try {
//                                     activities = JSON.parse(w.activities); // Parse the string into a JSON object
//                                   } catch (error) {
//                                     console.error("Failed to parse activities:", error);
//                                     return <p>Invalid activities data</p>;
//                                   }

//                                   return (
//                                     <div>
//                                       <h4 className="text-lg font-medium mb-2">Activities</h4>
//                                       <div className="overflow-x-auto">
//                                         <table className="table-auto border-collapse border border-gray-300 w-full text-left">
//                                           <thead>
//                                             <tr className="bg-gray-100">
//                                               <th className="border border-gray-300 px-4 py-2">Activity</th>
//                                               <th className="border border-gray-300 px-4 py-2">Man Days</th>
//                                               <th className="border border-gray-300 px-4 py-2">Weeks</th>
//                                             </tr>
//                                           </thead>
//                                           <tbody>
//                                             {Object.entries(activities).map(([activity, details], activityIndex) => (
//                                               <tr key={activityIndex} className="even:bg-gray-50">
//                                                 <td className="border border-gray-300 px-4 py-2">{activity}</td>
//                                                 <td className="border border-gray-300 px-4 py-2">{details.manDays || "N/A"}</td>
//                                                 <td className="border border-gray-300 px-4 py-2">
//                                                   <div className="flex space-x-2">
//                                                     {details.weeks.map((isActive, weekIndex) => (
//                                                       <div
//                                                         key={weekIndex}
//                                                         className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold ${isActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
//                                                           }`}
//                                                       >
//                                                         {weekIndex + 1}
//                                                       </div>
//                                                     ))}
//                                                   </div>
//                                                 </td>
//                                               </tr>
//                                             ))}
//                                           </tbody>
//                                         </table>
//                                       </div>
//                                     </div>
//                                   );
//                                 })()
//                               ) : (
//                                 <p>No activities available</p>
//                               )}

//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {w.farmer_signature && (
//                                   <div>
//                                     <p className="text-sm text-gray-500 mb-2">Farmer Signature</p>
//                                     <img src={w.farmer_signature} alt="Farmer Signature" className="max-w-[200px] border rounded p-2" />
//                                   </div>
//                                 )}
//                                 {w.officer_signature && (
//                                   <div>
//                                     <p className="text-sm text-gray-500 mb-2">Officer Signature</p>
//                                     <img src={w.officer_signature} alt="Officer Signature" className="max-w-[200px] border rounded p-2" />
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   )}


//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




// // "use client"

// // import { useState, useEffect } from "react"
// // import { database, ref, onValue } from "./firebase"

// // function App() {
// //   const [farmers, setFarmers] = useState([])
// //   const [users, setUsers] = useState([])
// //   const [selectedUser, setSelectedUser] = useState("")
// //   const [selectedFarmer, setSelectedFarmer] = useState(null)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [dataLoaded, setDataLoaded] = useState(false)

// //   useEffect(() => {
// //     // Check if we have data in localStorage first
// //     const localData = localStorage.getItem("farmersAppData")

// //     if (localData) {
// //       // If we have local data, use it
// //       const parsedData = JSON.parse(localData)
// //       setUsers(parsedData.users || [])

// //       // Set selected user if available
// //       if (parsedData.users && parsedData.users.length > 0 && !selectedUser) {
// //         setSelectedUser(parsedData.users[0])
// //       }

// //       // Set farmers data if available for the selected user
// //       if (parsedData.farmersData && parsedData.farmersData[selectedUser || parsedData.users[0]]) {
// //         setFarmers(parsedData.farmersData[selectedUser || parsedData.users[0]])
// //       }

// //       setDataLoaded(true)
// //     } else {
// //       // If no local data, fetch from Firebase
// //       const usersRef = ref(database)
// //       onValue(usersRef, (snapshot) => {
// //         const data = snapshot.val()
// //         if (data) {
// //           const userNames = Object.keys(data)
// //           setUsers(userNames)

// //           if (!selectedUser && userNames.length > 0) {
// //             setSelectedUser(userNames[0])
// //           }

// //           // Create an object to store all farmers data by user
// //           const farmersData = {}

// //           // For each user, get their farmers data
// //           userNames.forEach((userName) => {
// //             if (data[userName] && data[userName].farmers) {
// //               const farmersArray = Object.keys(data[userName].farmers).map((key) => ({
// //                 id: key,
// //                 ...data[userName].farmers[key],
// //               }))
// //               farmersData[userName] = farmersArray
// //             } else {
// //               farmersData[userName] = []
// //             }
// //           })

// //           // Save all data to localStorage
// //           localStorage.setItem(
// //             "farmersAppData",
// //             JSON.stringify({
// //               users: userNames,
// //               farmersData: farmersData,
// //             }),
// //           )

// //           // Set initial farmers data for the first user
// //           if (userNames.length > 0) {
// //             setFarmers(farmersData[userNames[0]] || [])
// //           }

// //           setDataLoaded(true)
// //         }
// //       })
// //     }
// //   }, [])

// //   useEffect(() => {
// //     if (!selectedUser || !dataLoaded) return

// //     // Get farmers data from localStorage
// //     const localData = localStorage.getItem("farmersAppData")
// //     if (localData) {
// //       const parsedData = JSON.parse(localData)
// //       if (parsedData.farmersData && parsedData.farmersData[selectedUser]) {
// //         setFarmers(parsedData.farmersData[selectedUser])
// //         return
// //       }
// //     }

// //     // If we don't have the data locally for this user, fetch from Firebase
// //     const farmersRef = ref(database, `${selectedUser}/farmers`)
// //     onValue(farmersRef, (snapshot) => {
// //       const data = snapshot.val()
// //       if (data) {
// //         const farmersArray = Object.keys(data).map((key) => ({
// //           id: key,
// //           ...data[key],
// //         }))
// //         setFarmers(farmersArray)

// //         // Update localStorage with this user's farmers data
// //         const localData = localStorage.getItem("farmersAppData")
// //         if (localData) {
// //           const parsedData = JSON.parse(localData)
// //           parsedData.farmersData[selectedUser] = farmersArray
// //           localStorage.setItem("farmersAppData", JSON.stringify(parsedData))
// //         }
// //       } else {
// //         setFarmers([])
// //       }
// //     })
// //   }, [selectedUser, dataLoaded])

// //   const filteredFarmers = farmers.filter(
// //     (farmer) =>
// //       farmer.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       farmer.farmer_id.includes(searchTerm) ||
// //       farmer.nutmeg_card_number.includes(searchTerm),
// //   )

// //   // Function to refresh data from Firebase
// //   const refreshData = () => {
// //     setDataLoaded(false)
// //     localStorage.removeItem("farmersAppData")

// //     const usersRef = ref(database)
// //     onValue(usersRef, (snapshot) => {
// //       const data = snapshot.val()
// //       if (data) {
// //         const userNames = Object.keys(data)
// //         setUsers(userNames)

// //         if (!selectedUser && userNames.length > 0) {
// //           setSelectedUser(userNames[0])
// //         }

// //         // Create an object to store all farmers data by user
// //         const farmersData = {}

// //         // For each user, get their farmers data
// //         userNames.forEach((userName) => {
// //           if (data[userName] && data[userName].farmers) {
// //             const farmersArray = Object.keys(data[userName].farmers).map((key) => ({
// //               id: key,
// //               ...data[userName].farmers[key],
// //             }))
// //             farmersData[userName] = farmersArray
// //           } else {
// //             farmersData[userName] = []
// //           }
// //         })

// //         // Save all data to localStorage
// //         localStorage.setItem(
// //           "farmersAppData",
// //           JSON.stringify({
// //             users: userNames,
// //             farmersData: farmersData,
// //           }),
// //         )

// //         // Set initial farmers data for the first user
// //         if (userNames.length > 0) {
// //           setFarmers(farmersData[userNames[0]] || [])
// //         }

// //         setDataLoaded(true)
// //         window.location.reload
// //       }
// //     })
// //   }






// //   return (
// //     <div className="min-h-screen bg-gray-50 p-8">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="flex justify-between items-center mb-8">
// //           <h1 className="text-3xl font-bold text-gray-900">Farmer Data</h1>
// //           <button
// //             onClick={refreshData}
// //             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
// //           >
// //             Refresh Data
// //           </button>
// //         </div>

// //         <div className="mb-6">
// //           <label className="underline font-bold">Fields Officer</label>
// //           <select
// //             onChange={(e) => setSelectedUser(e.target.value)}
// //             value={selectedUser}
// //             className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //           >
// //             {users.map((user) => (
// //               <option key={user} value={user}>
// //                 {user}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="mb-6">
// //           <label className=" font-bold">Filter</label>
// //           <input
// //             type="text"
// //             placeholder="Enter name, farmer ID, or card number"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //           />
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           <div className="bg-white rounded-lg shadow p-6">
// //             <h2 className="text-xl font-semibold mb-4">Farmers List</h2>
// //             {!dataLoaded ? (
// //               <p className="text-gray-500">Loading data...</p>
// //             ) : filteredFarmers.length === 0 ? (
// //               <p className="text-gray-500">No farmers found</p>
// //             ) : (
// //               <ul className="space-y-2">
// //                 {filteredFarmers.map((farmer) => (
// //                   <li
// //                     key={farmer.id}
// //                     onClick={() => setSelectedFarmer(farmer)}
// //                     className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedFarmer?.id === farmer.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
// //                       }`}
// //                   >
// //                     <p className="font-medium text-gray-900">{farmer.farmer_name}</p>
// //                     <p className="text-sm text-gray-500">Farmer ID: {farmer.farmer_id}</p>
// //                     <p className="text-sm text-gray-500">Card Number: {farmer.nutmeg_card_number}</p>
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>

// //           {selectedFarmer && (
// //             <div className="lg:col-span-2">
// //               <div className="bg-white rounded-lg shadow p-6">
// //                 <h2 className="text-2xl font-semibold mb-6">Farmer Details</h2>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //                   <div className="space-y-2">
// //                     <p className="text-gray-600">
// //                       Name: <span className="font-medium text-gray-900">{selectedFarmer.farmer_name}</span>
// //                     </p>
// //                     <p className="text-gray-600">
// //                       ID: <span className="font-medium text-gray-900">{selectedFarmer.farmer_id}</span>
// //                     </p>
// //                     <p className="text-gray-600">
// //                       Nutmeg Card:{" "}
// //                       <span className="font-medium text-gray-900">{selectedFarmer.nutmeg_card_number}</span>
// //                     </p>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <p className="text-gray-600">
// //                       Phone: <span className="font-medium text-gray-900">{selectedFarmer.phone_number}</span>
// //                     </p>
// //                     <p className="text-gray-600">
// //                       Sex: <span className="font-medium text-gray-900">{selectedFarmer.sex}</span>
// //                     </p>
// //                     <p className="text-gray-600">
// //                       Age Range: <span className="font-medium text-gray-900">{selectedFarmer.age}</span>
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {selectedFarmer.verify && (
// //                   <div>
// //                     <h3 className="text-xl font-semibold mb-4">Plots</h3>
// //                     <div className="grid gap-4">
// //                       {selectedFarmer.verify.map((v, index) => (
// //                         <div key={index} className="bg-gray-50 rounded-lg p-4">
// //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                             <p className="text-gray-600">
// //                               Condition: <span className="font-medium text-gray-900">{v.condition}</span>
// //                             </p>
// //                             <p className="text-gray-600">
// //                               Overall Acreage: <span className="font-medium text-gray-900">{v.overall_acreage}</span>
// //                             </p>
// //                             <p className="text-gray-600">
// //                               Labour: <span className="font-medium text-gray-900">{v.labour}</span>
// //                             </p>
// //                             <p className="text-gray-600">
// //                               Shade: <span className="font-medium text-gray-900">{v.shade}</span>
// //                             </p>
// //                             <p className="text-gray-600">
// //                               Date:{" "}
// //                               <span className="font-medium text-gray-900">
// //                                 {new Date(v.date ?? Date.now()).toDateString()}
// //                               </span>
// //                             </p>
// //                             <p className="text-gray-600">
// //                               Location:{" "}
// //                               <span className="font-medium text-gray-900">{v.location ?? "Not Available"}</span>
// //                             </p>
// //                             <p className="text-gray-600">
// //                               Acreage Rehabilitated:{" "}
// //                               <span className="font-medium text-gray-900">
// //                                 {v.acreage_rehabilitated ?? "Not Available"}
// //                               </span>
// //                             </p>
// //                             <p className="text-gray-600">
// //                               Tenure:{" "}
// //                               <span className="font-medium text-gray-900">{v.newtenure ?? "Not Available"}</span>
// //                             </p>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div className="space-y-8">
// //                   {selectedFarmer.assessment && (
// //                     <div>
// //                       <h3 className="text-xl font-semibold mb-4">Assessments</h3>
// //                       <div className="grid gap-4">
// //                         {selectedFarmer.assessment.map((a, index) => (
// //                           <div key={index} className="bg-gray-50 rounded-lg p-4">
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                               <p className="text-gray-600">
// //                                 Plot: <span className="font-medium text-gray-900">{a.plot_num}</span>
// //                               </p>
// //                               <p className="text-gray-600">
// //                                 Production 2023: <span className="font-medium text-gray-900">{a.production_2023}</span>
// //                               </p>
// //                               <p className="text-gray-600">
// //                                 Drainage: <span className="font-medium text-gray-900">{a.drainage}</span>
// //                               </p>
// //                               <p className="text-gray-600">
// //                                 Spices: <span className="font-medium text-gray-900">{a.spices}</span>
// //                               </p>

// //                               <p className="text-gray-600">
// //                                 Nutmeg Card Number:{" "}
// //                                 <span className="font-medium text-gray-900">{a.nutmeg_card_number}</span>
// //                               </p>

// //                               <p className="text-gray-600">
// //                                 Land Clearing Remarks:{" "}
// //                                 <span className="font-medium text-gray-900">{a.land_clearing}</span>
// //                               </p>

// //                               <p className="text-gray-600">
// //                                 Drainage Remarks: <span className="font-medium text-gray-900">{a.drainage}</span>
// //                               </p>

// //                               <p className="text-gray-600">
// //                                 Shade Crops Remarks: <span className="font-medium text-gray-900">{a.shade_crops}</span>
// //                               </p>

// //                               <p className="text-gray-600">
// //                                 Spices Remarks: <span className="font-medium text-gray-900">{a.spices}</span>
// //                               </p>

// //                               <p className="text-gray-600">
// //                                 Fertilizing Remarks: <span className="font-medium text-gray-900">{a.fertilizing}</span>
// //                               </p>

// //                               <p className="text-gray-600">
// //                                 Comments: <span className="font-medium text-gray-900">{a.comments}</span>
// //                               </p>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   )}

// //                   {selectedFarmer.workplan && (
// //                     <div>
// //                       <h3 className="text-xl font-semibold mb-4">Workplans</h3>
// //                       <div className="grid gap-4">
// //                         {selectedFarmer.workplan.map((w, index) => (
// //                           <div key={index} className="bg-gray-50 rounded-lg p-4">
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                               <p className="text-gray-600">
// //                                 Work Plan: <span className="font-medium text-gray-900">{w.work_plan}</span>
// //                               </p>
// //                               <p className="text-gray-600">
// //                                 Base Crop: <span className="font-medium text-gray-900">{w.base_crop}</span>
// //                               </p>
// //                               <p className="text-gray-600">
// //                                 Farmer Date: <span className="font-medium text-gray-900">{w.farmer_date}</span>
// //                               </p>
// //                               <p className="text-gray-600">
// //                                 Officer Date: <span className="font-medium text-gray-900">{w.officer_date}</span>
// //                               </p>
// //                             </div>

// //                             {w && w.activities ? (
// //                               (() => {
// //                                 let activities
// //                                 try {
// //                                   activities = JSON.parse(w.activities) // Parse the string into a JSON object
// //                                 } catch (error) {
// //                                   console.error("Failed to parse activities:", error)
// //                                   return <p>Invalid activities data</p>
// //                                 }

// //                                 return (
// //                                   <div>
// //                                     <h4 className="text-lg font-medium mb-2">Activities</h4>
// //                                     <div className="overflow-x-auto">
// //                                       <table className="table-auto border-collapse border border-gray-300 w-full text-left">
// //                                         <thead>
// //                                           <tr className="bg-gray-100">
// //                                             <th className="border border-gray-300 px-4 py-2">Activity</th>
// //                                             <th className="border border-gray-300 px-4 py-2">Man Days</th>
// //                                             <th className="border border-gray-300 px-4 py-2">Weeks</th>
// //                                           </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                           {Object.entries(activities).map(([activity, details], activityIndex) => (
// //                                             <tr key={activityIndex} className="even:bg-gray-50">
// //                                               <td className="border border-gray-300 px-4 py-2">{activity}</td>
// //                                               <td className="border border-gray-300 px-4 py-2">
// //                                                 {details.manDays || "N/A"}
// //                                               </td>
// //                                               <td className="border border-gray-300 px-4 py-2">
// //                                                 <div className="flex space-x-2">
// //                                                   {details.weeks.map((isActive, weekIndex) => (
// //                                                     <div
// //                                                       key={weekIndex}
// //                                                       className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold ${isActive
// //                                                         ? "bg-green-500 text-white"
// //                                                         : "bg-gray-300 text-gray-600"
// //                                                         }`}
// //                                                     >
// //                                                       {weekIndex + 1}
// //                                                     </div>
// //                                                   ))}
// //                                                 </div>
// //                                               </td>
// //                                             </tr>
// //                                           ))}
// //                                         </tbody>
// //                                       </table>
// //                                     </div>
// //                                   </div>
// //                                 )
// //                               })()
// //                             ) : (
// //                               <p>No activities available</p>
// //                             )}

// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                               {w.farmer_signature && (
// //                                 <div>
// //                                   <p className="text-sm text-gray-500 mb-2">Farmer Signature</p>
// //                                   <img
// //                                     src={w.farmer_signature || "/placeholder.svg"}
// //                                     alt="Farmer Signature"
// //                                     className="max-w-[200px] border rounded p-2"
// //                                   />
// //                                 </div>
// //                               )}
// //                               {w.officer_signature && (
// //                                 <div>
// //                                   <p className="text-sm text-gray-500 mb-2">Officer Signature</p>
// //                                   <img
// //                                     src={w.officer_signature || "/placeholder.svg"}
// //                                     alt="Officer Signature"
// //                                     className="max-w-[200px] border rounded p-2"
// //                                   />
// //                                 </div>
// //                               )}
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default App

// "use client"

// import { useState, useEffect } from "react"
// import { database, ref, onValue } from "./firebase"
// // import { jsPDF } from "jspdf"
// // import autoTable from "jspdf-autotable"
// // import Chart from "chart.js/auto"
// import { openDB } from "idb"

// // Initialize IndexedDB
// const initDB = async () => {
//   return openDB("farmersDB", 1, {
//     upgrade(db) {
//       // Create stores for different data types
//       if (!db.objectStoreNames.contains("users")) {
//         db.createObjectStore("users")
//       }
//       if (!db.objectStoreNames.contains("farmers")) {
//         const farmerStore = db.createObjectStore("farmers", { keyPath: "id" })
//         // Create an index for userId to query farmers by user
//         farmerStore.createIndex("userId", "userId", { unique: false })
//       }
//       if (!db.objectStoreNames.contains("metadata")) {
//         db.createObjectStore("metadata")
//       }
//     },
//   })
// }

// // Helper functions for IndexedDB operations
// const dbHelpers = {
//   async saveUsers(users) {
//     const db = await initDB()
//     const tx = db.transaction("users", "readwrite")
//     await tx.store.put(users, "usersList")
//     await tx.done
//   },

//   async getUsers() {
//     try {
//       const db = await initDB()
//       return (await db.get("users", "usersList")) || []
//     } catch (error) {
//       console.error("Error getting users from IndexedDB:", error)
//       return []
//     }
//   },

//   async saveFarmers(user, farmers) {
//     const db = await initDB()
//     const tx = db.transaction("farmers", "readwrite")

//     // Store each farmer with a compound key
//     for (const farmer of farmers) {
//       await tx.store.put({
//         ...farmer,
//         userId: user, // Add user reference for querying
//       })
//     }

//     // Save the list of farmer IDs for this user
//     const metadataTx = db.transaction("metadata", "readwrite")
//     await metadataTx.store.put(
//       farmers.map((f) => f.id),
//       `${user}_farmerIds`,
//     )

//     await tx.done
//     await metadataTx.done
//   },

//   async getFarmers(user) {
//     try {
//       const db = await initDB()

//       // Get all farmers for this user
//       const tx = db.transaction("farmers", "readonly")
//       let farmers = []

//       try {
//         // Try to use the index if it exists
//         const index = tx.store.index("userId")
//         farmers = await index.getAll(user)
//       } catch (error) {
//         console.warn("Index not found, falling back to manual filtering")
//         // Fallback: get all farmers and filter manually
//         const allFarmers = await tx.store.getAll()
//         farmers = allFarmers.filter((farmer) => farmer.userId === user)
//       }

//       await tx.done
//       return farmers || []
//     } catch (error) {
//       console.error(`Error getting farmers for user ${user} from IndexedDB:`, error)
//       return []
//     }
//   },

//   async getFarmersByIds(ids) {
//     try {
//       const db = await initDB()
//       const tx = db.transaction("farmers", "readonly")

//       const farmers = []
//       for (const id of ids) {
//         const farmer = await tx.store.get(id)
//         if (farmer) farmers.push(farmer)
//       }

//       await tx.done
//       return farmers
//     } catch (error) {
//       console.error("Error getting farmers by IDs from IndexedDB:", error)
//       return []
//     }
//   },

//   async getAllData() {
//     try {
//       const db = await initDB()
//       const users = (await db.get("users", "usersList")) || []

//       const farmersData = {}
//       for (const user of users) {
//         const farmerIds = (await db.get("metadata", `${user}_farmerIds`)) || []
//         const farmers = await this.getFarmersByIds(farmerIds)
//         farmersData[user] = farmers
//       }

//       return { users, farmersData }
//     } catch (error) {
//       console.error("Error getting all data from IndexedDB:", error)
//       return { users: [], farmersData: {} }
//     }
//   },
// }

// const App = () => {
//   const [farmers, setFarmers] = useState([])
//   const [users, setUsers] = useState([])
//   const [selectedUser, setSelectedUser] = useState("")
//   const [selectedFarmer, setSelectedFarmer] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [dataLoaded, setDataLoaded] = useState(false)
//   const [syncModalOpen, setSyncModalOpen] = useState(false)
//   const [syncData, setSyncData] = useState(null)
//   const [syncResults, setSyncResults] = useState(null)
//   const [disputedFieldChoices, setDisputedFieldChoices] = useState({})

//   useEffect(() => {
//     const loadInitialData = async () => {
//       try {
//         // Try to load data from IndexedDB first
//         const users = await dbHelpers.getUsers()
//         setUsers(users || [])

//         if (users.length > 0 && !selectedUser) {
//           setSelectedUser(users[0])
//           const userFarmers = await dbHelpers.getFarmers(users[0])
//           setFarmers(userFarmers || [])
//         }

//         setDataLoaded(true)

//         // Fetch data from Firebase
//         const usersRef = ref(database)
//         onValue(usersRef, async (snapshot) => {
//           const data = snapshot.val()
//           if (data) {
//             const userNames = Object.keys(data)
//             setUsers(userNames)

//             // Save users to IndexedDB
//             await dbHelpers.saveUsers(userNames)

//             if (!selectedUser && userNames.length > 0) {
//               setSelectedUser(userNames[0])
//             }

//             // Process farmers data for each user
//             for (const userName of userNames) {
//               if (data[userName] && data[userName].farmers) {
//                 const newFarmersArray = Object.keys(data[userName].farmers).map((key) => ({
//                   id: key,
//                   ...data[userName].farmers[key],
//                 }))

//                 // Get existing farmers from IndexedDB
//                 const existingFarmers = await dbHelpers.getFarmers(userName)

//                 let updatedFarmers = []

//                 if (existingFarmers.length > 0) {
//                   // Merge existing and new farmers
//                   updatedFarmers = existingFarmers.map((existingFarmer) => {
//                     const newEntry = newFarmersArray.find((f) => f.id === existingFarmer.id)
//                     if (newEntry) {
//                       return {
//                         ...existingFarmer,
//                         verify: mergeArray(existingFarmer.verify),
//                         assessment: mergeArray(existingFarmer.assessment),
//                         workplan: newEntry.workplan, // Always replace workplan with latest data
//                       }
//                     }
//                     return existingFarmer
//                   })

//                   // Add new farmers that don't exist yet
//                   newFarmersArray.forEach((newFarmer) => {
//                     if (!updatedFarmers.some((f) => f.id === newFarmer.id)) {
//                       updatedFarmers.push(newFarmer)
//                     }
//                   })
//                 } else {
//                   updatedFarmers = newFarmersArray
//                 }

//                 // Save updated farmers to IndexedDB
//                 await dbHelpers.saveFarmers(userName, updatedFarmers)

//                 // Update state if this is the selected user
//                 if (userName === selectedUser || (!selectedUser && userName === userNames[0])) {
//                   setFarmers(updatedFarmers)
//                 }
//               }
//             }

//             setDataLoaded(true)
//           }
//         })
//       } catch (error) {
//         console.error("Error loading initial data:", error)
//         setDataLoaded(true)
//       }
//     }

//     loadInitialData()
//   }, [])

//   useEffect(() => {
//     if (!selectedUser || !dataLoaded) return

//     const loadUserFarmers = async () => {
//       try {
//         // Try to get farmers from IndexedDB first
//         const userFarmers = await dbHelpers.getFarmers(selectedUser)
//         if (userFarmers.length > 0) {
//           setFarmers(userFarmers)
//           return
//         }

//         // If not in IndexedDB, fetch from Firebase
//         const farmersRef = ref(database, `${selectedUser}/farmers`)
//         onValue(farmersRef, async (snapshot) => {
//           const data = snapshot.val()
//           if (data) {
//             const farmersArray = Object.keys(data).map((key) => ({
//               id: key,
//               ...data[key],
//             }))

//             setFarmers(farmersArray)

//             // Save to IndexedDB
//             await dbHelpers.saveFarmers(selectedUser, farmersArray)
//           } else {
//             setFarmers([])
//           }
//         })
//       } catch (error) {
//         console.error(`Error loading farmers for user ${selectedUser}:`, error)
//       }
//     }

//     loadUserFarmers()
//   }, [selectedUser, dataLoaded])

//   const filteredFarmers = farmers.filter(
//     (farmer) =>
//       farmer.farmer_name &&
//       farmer.farmer_name.trim() !== "" &&
//       (farmer.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         farmer.farmer_id?.includes(searchTerm) ||
//         farmer.nutmeg_card_number?.includes(searchTerm)),
//   )

//   // Helper function to merge new data while avoiding duplicates
//   const mergeArray = (existingArray = [], newArray = []) => {
//     const existingIds = new Set(existingArray.map((item) => item.id))
//     const mergedArray = [...existingArray]

//     newArray.forEach((newItem) => {
//       if (!existingIds.has(newItem.id)) {
//         mergedArray.push(newItem)
//       }
//     })

//     return mergedArray
//   }

//   const refreshData = async () => {
//     try {
//       // Get all data from IndexedDB
//       const localData = await dbHelpers.getAllData()

//       if (!localData.users.length) {
//         fetchFreshData()
//         return
//       }

//       const usersRef = ref(database)
//       onValue(usersRef, (snapshot) => {
//         const firebaseData = snapshot.val()
//         if (!firebaseData) {
//           setDataLoaded(true)
//           return
//         }

//         const userNames = Object.keys(firebaseData)
//         const farmersDataFromFirebase = {}

//         userNames.forEach((userName) => {
//           if (firebaseData[userName] && firebaseData[userName].farmers) {
//             const farmersArray = Object.keys(firebaseData[userName].farmers).map((key) => ({
//               id: key,
//               ...firebaseData[userName].farmers[key],
//             }))
//             farmersDataFromFirebase[userName] = farmersArray
//           } else {
//             farmersDataFromFirebase[userName] = []
//           }
//         })

//         showSyncOptions(localData, { users: userNames, farmersData: farmersDataFromFirebase })
//       })
//     } catch (error) {
//       console.error("Error refreshing data:", error)
//       alert("Error refreshing data. Please try again.")
//     }
//   }

//   const fetchFreshData = () => {
//     setDataLoaded(false)

//     // Clear IndexedDB data
//     const clearDB = async () => {
//       try {
//         const db = await initDB()
//         const tx1 = db.transaction("users", "readwrite")
//         await tx1.store.clear()
//         await tx1.done

//         const tx2 = db.transaction("farmers", "readwrite")
//         await tx2.store.clear()
//         await tx2.done

//         const tx3 = db.transaction("metadata", "readwrite")
//         await tx3.store.clear()
//         await tx3.done
//       } catch (error) {
//         console.error("Error clearing IndexedDB:", error)
//       }
//     }

//     clearDB().then(() => {
//       const usersRef = ref(database)
//       onValue(usersRef, async (snapshot) => {
//         const data = snapshot.val()
//         if (data) {
//           const userNames = Object.keys(data)
//           setUsers(userNames)

//           // Save users to IndexedDB
//           await dbHelpers.saveUsers(userNames)

//           if (!selectedUser && userNames.length > 0) {
//             setSelectedUser(userNames[0])
//           }

//           // Process and save farmers data
//           for (const userName of userNames) {
//             if (data[userName] && data[userName].farmers) {
//               const farmersArray = Object.keys(data[userName].farmers).map((key) => ({
//                 id: key,
//                 ...data[userName].farmers[key],
//               }))

//               // Save to IndexedDB
//               await dbHelpers.saveFarmers(userName, farmersArray)

//               // Update state if this is the selected user
//               if (userName === selectedUser || (!selectedUser && userName === userNames[0])) {
//                 setFarmers(farmersArray)
//               }
//             }
//           }

//           setDataLoaded(true)
//         }
//       })
//     })
//   }

//   const showSyncOptions = (localData, firebaseData) => {
//     const results = analyzeDifferences(localData, firebaseData)
//     setSyncResults(results)
//     setSyncData({ localData, firebaseData })
//     setSyncModalOpen(true)
//     setDataLoaded(true)
//   }

//   const analyzeDifferences = (localData, firebaseData) => {
//     const results = {
//       newUsers: [],
//       newFarmers: {},
//       disputedFarmers: {},
//     }

//     firebaseData.users.forEach((user) => {
//       if (!localData.users.includes(user)) {
//         results.newUsers.push(user)
//       }
//     })

//     firebaseData.users.forEach((user) => {
//       if (!localData.farmersData[user]) {
//         results.newFarmers[user] = firebaseData.farmersData[user] || []
//         return
//       }

//       const localFarmers = localData.farmersData[user] || []
//       const firebaseFarmers = firebaseData.farmersData[user] || []

//       results.newFarmers[user] = []
//       results.disputedFarmers[user] = []

//       firebaseFarmers.forEach((firebaseFarmer) => {
//         const localFarmer = localFarmers.find((f) => f.id === firebaseFarmer.id)

//         if (!localFarmer) {
//           results.newFarmers[user].push(firebaseFarmer)
//         } else {
//           if (JSON.stringify(localFarmer) !== JSON.stringify(firebaseFarmer)) {
//             results.disputedFarmers[user].push({
//               local: localFarmer,
//               firebase: firebaseFarmer,
//             })
//           }
//         }
//       })

//       if (results.newFarmers[user].length === 0) {
//         delete results.newFarmers[user]
//       }
//       if (results.disputedFarmers[user].length === 0) {
//         delete results.disputedFarmers[user]
//       }
//     })

//     return results
//   }

//   const getFieldDifferences = (localFarmer, firebaseFarmer) => {
//     const differences = []

//     const compareFields = (local, firebase, prefix = "") => {
//       const allKeys = [...new Set([...Object.keys(local), ...Object.keys(firebase)])]

//       allKeys.forEach((key) => {
//         if (
//           key === "id" ||
//           (typeof local[key] === "object" && local[key] !== null) ||
//           (typeof firebase[key] === "object" && firebase[key] !== null)
//         ) {
//           return
//         }

//         if (local[key] !== firebase[key]) {
//           differences.push({
//             key: prefix ? `${prefix}.${key}` : key,
//             localValue: local[key],
//             firebaseValue: firebase[key],
//           })
//         }
//       })
//     }

//     compareFields(localFarmer, firebaseFarmer)
//       ;["verify", "assessment", "workplan"].forEach((arrayKey) => {
//         if (localFarmer[arrayKey] && firebaseFarmer[arrayKey]) {
//           const maxLength = Math.max(localFarmer[arrayKey].length, firebaseFarmer[arrayKey].length)

//           for (let i = 0; i < maxLength; i++) {
//             const localItem = localFarmer[arrayKey][i] || {}
//             const firebaseItem = firebaseFarmer[arrayKey][i] || {}

//             compareFields(localItem, firebaseItem, `${arrayKey}[${i}]`)
//           }
//         } else if (localFarmer[arrayKey] || firebaseFarmer[arrayKey]) {
//           differences.push({
//             key: arrayKey,
//             localValue: localFarmer[arrayKey] ? `${localFarmer[arrayKey].length} items` : "None",
//             firebaseValue: firebaseFarmer[arrayKey] ? `${firebaseFarmer[arrayKey].length} items` : "None",
//           })
//         }
//       })

//     return differences
//   }

//   const handleFieldChoice = (user, farmerId, fieldKey, choice) => {
//     setDisputedFieldChoices((prev) => {
//       const newChoices = { ...prev }

//       if (!newChoices[user]) {
//         newChoices[user] = {}
//       }

//       if (!newChoices[user][farmerId]) {
//         newChoices[user][farmerId] = {}
//       }

//       newChoices[user][farmerId][fieldKey] = choice

//       return newChoices
//     })
//   }

//   const applySyncDecisions = async () => {
//     if (!syncData) return

//     try {
//       const { localData, firebaseData } = syncData
//       const updatedData = { ...localData }

//       // Update users
//       syncResults.newUsers.forEach((user) => {
//         if (!updatedData.users.includes(user)) {
//           updatedData.users.push(user)
//         }
//       })

//       // Save updated users to IndexedDB
//       await dbHelpers.saveUsers(updatedData.users)

//       // Process new farmers
//       for (const user of Object.keys(syncResults.newFarmers)) {
//         if (!updatedData.farmersData[user]) {
//           updatedData.farmersData[user] = []
//         }

//         const newFarmers = syncResults.newFarmers[user]
//         updatedData.farmersData[user] = [...updatedData.farmersData[user], ...newFarmers]

//         // Save new farmers to IndexedDB
//         await dbHelpers.saveFarmers(user, updatedData.farmersData[user])
//       }

//       // Process disputed farmers
//       for (const user of Object.keys(syncResults.disputedFarmers)) {
//         if (!updatedData.farmersData[user]) {
//           updatedData.farmersData[user] = []
//         }

//         for (const disputedItem of syncResults.disputedFarmers[user]) {
//           const { local: localFarmer, firebase: firebaseFarmer } = disputedItem
//           const farmerId = localFarmer.id

//           const farmerIndex = updatedData.farmersData[user].findIndex((f) => f.id === farmerId)
//           const updatedFarmer =
//             farmerIndex !== -1 ? { ...updatedData.farmersData[user][farmerIndex] } : { ...localFarmer }

//           if (disputedFieldChoices[user]?.[farmerId]) {
//             Object.entries(disputedFieldChoices[user][farmerId]).forEach(([fieldKey, choice]) => {
//               if (choice === "firebase") {
//                 const fieldPath = fieldKey.split(".")
//                 let currentFirebaseValue = firebaseFarmer
//                 let currentUpdatedValue = updatedFarmer

//                 for (let i = 0; i < fieldPath.length - 1; i++) {
//                   const pathPart = fieldPath[i]
//                   const arrayMatch = pathPart.match(/^(.*)\[(\d+)\]$/)

//                   if (arrayMatch) {
//                     const [_, arrayName, index] = arrayMatch
//                     currentFirebaseValue = currentFirebaseValue[arrayName][index]
//                     if (!currentUpdatedValue[arrayName]) {
//                       currentUpdatedValue[arrayName] = []
//                     }
//                     if (!currentUpdatedValue[arrayName][index]) {
//                       currentUpdatedValue[arrayName][index] = {}
//                     }
//                     currentUpdatedValue = currentUpdatedValue[arrayName][index]
//                   } else {
//                     currentFirebaseValue = currentFirebaseValue[pathPart]
//                     if (!currentUpdatedValue[pathPart]) {
//                       currentUpdatedValue[pathPart] = {}
//                     }
//                     currentUpdatedValue = currentUpdatedValue[pathPart]
//                   }
//                 }

//                 const finalKey = fieldPath[fieldPath.length - 1]
//                 currentUpdatedValue[finalKey] = currentFirebaseValue[finalKey]
//               }
//             })
//           }

//           if (farmerIndex !== -1) {
//             updatedData.farmersData[user][farmerIndex] = updatedFarmer
//           } else {
//             updatedData.farmersData[user].push(updatedFarmer)
//           }
//         }

//         // Save updated farmers to IndexedDB
//         await dbHelpers.saveFarmers(user, updatedData.farmersData[user])
//       }

//       // Update state
//       setUsers(updatedData.users)
//       if (selectedUser) {
//         const updatedFarmers = updatedData.farmersData[selectedUser] || []
//         setFarmers(updatedFarmers)

//         if (selectedFarmer) {
//           const updatedSelectedFarmer = updatedFarmers.find((f) => f.id === selectedFarmer.id)
//           if (updatedSelectedFarmer) {
//             setSelectedFarmer(updatedSelectedFarmer)
//           }
//         }
//       }

//       setSyncModalOpen(false)
//       setSyncData(null)
//       setSyncResults(null)
//       setDisputedFieldChoices({})
//     } catch (error) {
//       console.error("Error applying sync decisions:", error)
//       alert("Error applying changes. Please try again.")
//     }
//   }

//   const handleFlagVerify = async (index) => {
//     try {
//       const updatedVerify = [...selectedFarmer.verify]
//       updatedVerify[index] = {
//         ...updatedVerify[index],
//         flagged: true,
//       }

//       const updatedFarmer = { ...selectedFarmer, verify: updatedVerify }
//       const updatedFarmers = farmers.map((farmer) => (farmer.id === selectedFarmer.id ? updatedFarmer : farmer))

//       setFarmers(updatedFarmers)
//       setSelectedFarmer(updatedFarmer)

//       // Update in IndexedDB
//       await dbHelpers.saveFarmers(selectedUser, updatedFarmers)
//     } catch (error) {
//       console.error("Error flagging verify:", error)
//       alert("Error flagging plot. Please try again.")
//     }
//   }

//   const handleFlagAssessment = async (index) => {
//     try {
//       const updatedAssessment = [...selectedFarmer.assessment]
//       updatedAssessment[index] = {
//         ...updatedAssessment[index],
//         flagged: true,
//       }

//       const updatedFarmer = { ...selectedFarmer, assessment: updatedAssessment }
//       const updatedFarmers = farmers.map((farmer) => (farmer.id === selectedFarmer.id ? updatedFarmer : farmer))

//       setFarmers(updatedFarmers)
//       setSelectedFarmer(updatedFarmer)

//       // Update in IndexedDB
//       await dbHelpers.saveFarmers(selectedUser, updatedFarmers)
//     } catch (error) {
//       console.error("Error flagging assessment:", error)
//       alert("Error flagging assessment. Please try again.")
//     }
//   }

//   const handleFlagWorkplan = async (index) => {
//     try {
//       const updatedWorkplan = [...selectedFarmer.workplan]
//       updatedWorkplan[index] = {
//         ...updatedWorkplan[index],
//         flagged: true,
//       }

//       const updatedFarmer = { ...selectedFarmer, workplan: updatedWorkplan }
//       const updatedFarmers = farmers.map((farmer) => (farmer.id === selectedFarmer.id ? updatedFarmer : farmer))

//       setFarmers(updatedFarmers)
//       setSelectedFarmer(updatedFarmer)

//       // Update in IndexedDB
//       await dbHelpers.saveFarmers(selectedUser, updatedFarmers)
//     } catch (error) {
//       console.error("Error flagging workplan:", error)
//       alert("Error flagging workplan. Please try again.")
//     }
//   }

//   const handleFlagFarmer = async () => {
//     try {
//       const updatedFarmer = { ...selectedFarmer, flagged: true }
//       const updatedFarmers = farmers.map((farmer) => (farmer.id === selectedFarmer.id ? updatedFarmer : farmer))

//       setFarmers(updatedFarmers)
//       setSelectedFarmer(updatedFarmer)

//       // Update in IndexedDB
//       await dbHelpers.saveFarmers(selectedUser, updatedFarmers)
//     } catch (error) {
//       console.error("Error flagging farmer:", error)
//       alert("Error flagging farmer. Please try again.")
//     }
//   }

//   const handleDownloadJSON = async () => {
//     try {
//       // Get all data from IndexedDB
//       const data = await dbHelpers.getAllData()
//       if (!data || !data.users || data.users.length === 0) {
//         alert("No data available to download.")
//         return
//       }

//       const allUsers = data.users || []
//       const finalData = {}

//       // Process data for all users
//       allUsers.forEach((user) => {
//         const farmersData = data.farmersData[user] || []
//         const userFarmers = {}

//         // Process each farmer for this user
//         farmersData.forEach((farmer) => {
//           // Skip flagged farmers or farmers with FLAGGED in their name or empty farmer_name
//           if (
//             farmer.flagged ||
//             farmer.farmer_name?.includes("FLAGGED") ||
//             !farmer.farmer_name ||
//             farmer.farmer_name.trim() === ""
//           ) {
//             return
//           }

//           // Create a sanitized key for the farmer
//           const sanitizedKey = `${farmer.farmer_name} ${farmer.id}`
//             .replace(/\./g, "_")
//             .replace(/#/g, "_")
//             .replace(/\$/g, "_")
//             .replace(/\//g, "_")
//             .replace(/\[/g, "_")
//             .replace(/\]/g, "_")

//           // Filter out flagged verify entries
//           const filteredVerify = farmer.verify ? farmer.verify.filter((v) => !v.flagged) : []

//           // Filter out flagged assessment entries
//           const filteredAssessment = farmer.assessment ? farmer.assessment.filter((a) => !a.flagged) : []

//           // Filter out flagged workplan entries
//           const filteredWorkplan = farmer.workplan ? farmer.workplan.filter((w) => !w.flagged) : []

//           // Structure the farmer data
//           userFarmers[sanitizedKey] = {
//             ...farmer,
//             verify: filteredVerify,
//             assessment: filteredAssessment,
//             workplan: filteredWorkplan,
//           }
//         })

//         // Add this user's farmers to the final data
//         finalData[user] = {
//           farmers: userFarmers,
//         }
//       })

//       // Convert to JSON string with pretty formatting
//       const jsonString = JSON.stringify(finalData, null, 2)

//       // Create a Blob from the JSON data
//       const blob = new Blob([jsonString], { type: "application/json" })

//       // Create an object URL for the Blob
//       const url = URL.createObjectURL(blob)

//       // Create a download link for the JSON file
//       const a = document.createElement("a")
//       a.href = url
//       a.download = `all_farmers_data.json`
//       a.click()

//       // Clean up the URL object
//       URL.revokeObjectURL(url)
//     } catch (error) {
//       console.error("Error downloading JSON:", error)
//       alert("Failed to download JSON data. See console for details.")
//     }
//   }

// const generatePDFReport = (data) => {
//   try {
//     const doc = new jsPDF()
//     // Add autoTable to jsPDF prototype if it's not already there
//     if (typeof doc.autoTable !== "function") {
//       autoTable(doc)
//     }

//     const allUsers = data.users || []
//     let totalFarmers = 0
//     const farmersByUser = {}
//     const farmersByDate = {}

//     // Process data
//     allUsers.forEach((user) => {
//       const farmersData = data.farmersData[user] || []
//       // Filter out flagged farmers or farmers with FLAGGED in their name
//       const validFarmers = farmersData.filter((farmer) => !farmer.flagged && !farmer.farmer_name.includes("FLAGGED"))

//       farmersByUser[user] = validFarmers.length
//       totalFarmers += validFarmers.length

//       // Count farmers by date
//       validFarmers.forEach((farmer) => {
//         if (farmer.dateCreated) {
//           const date = new Date(farmer.dateCreated).toLocaleDateString()
//           farmersByDate[date] = (farmersByDate[date] || 0) + 1
//         }
//       })
//     })

//     // Add title
//     doc.setFontSize(18)
//     doc.text("Farmer Assessment Data Report", 14, 22)
//     doc.setFontSize(12)
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)

//     // Add total farmers
//     doc.setFontSize(14)
//     doc.text(`Total Number of Farmers: ${totalFarmers}`, 14, 40)

//     // Add farmers by user table
//     doc.setFontSize(14)
//     doc.text("Farmers per User", 14, 50)

//     const userTableData = Object.entries(farmersByUser).map(([user, count]) => [user, count])
//     doc.autoTable({
//       startY: 55,
//       head: [["User", "Number of Farmers"]],
//       body: userTableData,
//     })

//     // Add farmers by date table
//     const dateTableY = doc.autoTable.previous.finalY + 10
//     doc.setFontSize(14)
//     doc.text("Farmers Added by Date", 14, dateTableY)

//     const dateTableData = Object.entries(farmersByDate).map(([date, count]) => [date, count])
//     doc.autoTable({
//       startY: dateTableY + 5,
//       head: [["Date", "Number of Farmers Added"]],
//       body: dateTableData,
//     })

//     // Create charts on a new page
//     doc.addPage()
//     doc.setFontSize(16)
//     doc.text("Data Visualization", 14, 20)

//     // Create canvas for charts
//     const canvas = document.createElement("canvas")
//     canvas.width = 500
//     canvas.height = 300
//     document.body.appendChild(canvas)

//     try {
//       // Create user chart
//       const userCtx = canvas.getContext("2d")
//       new Chart(userCtx, {
//         type: "bar",
//         data: {
//           labels: Object.keys(farmersByUser),
//           datasets: [
//             {
//               label: "Number of Farmers",
//               data: Object.values(farmersByUser),
//               backgroundColor: "rgba(54, 162, 235, 0.6)",
//               borderColor: "rgba(54, 162, 235, 1)",
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//           animation: false,
//         },
//       })

//       // Add user chart to PDF
//       doc.text("Farmers per User", 14, 30)
//       doc.addImage(canvas.toDataURL(), "PNG", 10, 35, 180, 100)

//       // Clear canvas for next chart
//       userCtx.clearRect(0, 0, canvas.width, canvas.height)

//       // Create date chart
//       const dateLabels = Object.keys(farmersByDate)
//       const dateData = Object.values(farmersByDate)

//       new Chart(userCtx, {
//         type: "line",
//         data: {
//           labels: dateLabels,
//           datasets: [
//             {
//               label: "Farmers Added",
//               data: dateData,
//               fill: false,
//               borderColor: "rgba(75, 192, 192, 1)",
//               tension: 0.1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//           animation: false,
//         },
//       })

//       // Add date chart to PDF
//       doc.text("Farmers Added by Date", 14, 150)
//       doc.addImage(canvas.toDataURL(), "PNG", 10, 155, 180, 100)
//     } catch (chartError) {
//       console.error("Error creating charts:", chartError)
//       doc.text("Error generating charts. See console for details.", 14, 30)
//     }

//     // Remove canvas
//     document.body.removeChild(canvas)

//     // Save the PDF
//     doc.save("farmer_assessment_report.pdf")
//   } catch (error) {
//     console.error("Error generating PDF report:", error)
//     alert("Failed to generate PDF report. Please check if all required libraries are installed.")
//   }
// }

























import { useState, useEffect } from "react";
import { database, ref, onValue } from "./firebase";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import Chart from "chart.js/auto";
import { firebaseThreeHelpers } from "./firebase-three";
// import { uploadToSecondaryFirebase } from "./second-firebase";

const App = () => {
  const [farmers, setFarmers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Try to load data from Firebase Three first
        const users = await firebaseThreeHelpers.getUsers();
        setUsers(users || []);

        if (users.length > 0 && !selectedUser) {
          setSelectedUser(users[0]);
          const userFarmers = await firebaseThreeHelpers.getFarmers(users[0]);
          setFarmers(userFarmers || []);
        }

        setDataLoaded(true);

        // Fetch data from primary Firebase
        const usersRef = ref(database);
        onValue(usersRef, async (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const userNames = Object.keys(data);
            setUsers(userNames);

            // Save users to Firebase Three
            await firebaseThreeHelpers.saveUsers(userNames);

            if (!selectedUser && userNames.length > 0) {
              setSelectedUser(userNames[0]);
            }

            // Process farmers data for each user
            for (const userName of userNames) {
              if (data[userName] && data[userName].farmers) {
                const newFarmersArray = Object.keys(data[userName].farmers).map((key) => ({
                  id: key,
                  ...data[userName].farmers[key],
                }));

                // Get existing farmers from Firebase Three
                const existingFarmers = await firebaseThreeHelpers.getFarmers(userName);

                let updatedFarmers = [];

                if (existingFarmers.length > 0) {
                  // Merge existing and new farmers
                  updatedFarmers = existingFarmers.map((existingFarmer) => {
                    const newEntry = newFarmersArray.find((f) => f.id === existingFarmer.id);
                    if (newEntry) {
                      return {
                        ...existingFarmer,
                        verify: mergeArray(existingFarmer.verify, newEntry.verify),
                        assessment: mergeArray(existingFarmer.assessment, newEntry.assessment),
                        workplan: newEntry.workplan, // Always replace workplan with latest data
                      };
                    }
                    return existingFarmer;
                  });

                  // Add new farmers that don't exist yet
                  newFarmersArray.forEach((newFarmer) => {
                    if (!updatedFarmers.some((f) => f.id === newFarmer.id)) {
                      updatedFarmers.push(newFarmer);
                    }
                  });
                } else {
                  updatedFarmers = newFarmersArray;
                }

                // Save updated farmers to Firebase Three
                await firebaseThreeHelpers.saveFarmers(userName, updatedFarmers);

                // Update state if this is the selected user
                if (userName === selectedUser || (!selectedUser && userName === userNames[0])) {
                  setFarmers(updatedFarmers);
                }
              }
            }

            setDataLoaded(true);
          }
        });
      } catch (error) {
        console.error("Error loading initial data:", error);
        setDataLoaded(true);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (!selectedUser || !dataLoaded) return;

    const loadUserFarmers = async () => {
      try {
        // Try to get farmers from Firebase Three first
        const userFarmers = await firebaseThreeHelpers.getFarmers(selectedUser);
        if (userFarmers.length > 0) {
          setFarmers(userFarmers);
          return;
        }

        // If not in Firebase Three, fetch from primary Firebase
        const farmersRef = ref(database, `${selectedUser}/farmers`);
        onValue(farmersRef, async (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const farmersArray = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));

            setFarmers(farmersArray);

            // Save to Firebase Three
            await firebaseThreeHelpers.saveFarmers(selectedUser, farmersArray);
          } else {
            setFarmers([]);
          }
        });
      } catch (error) {
        console.error(`Error loading farmers for user ${selectedUser}:`, error);
      }
    };

    // Set up a listener for the selected user's farmers in Firebase Three
    const unsubscribe = firebaseThreeHelpers.listenToUserFarmers(selectedUser, (farmersData) => {
      setFarmers(farmersData);
    });

    loadUserFarmers();

    // Clean up listener when component unmounts or selectedUser changes
    return () => unsubscribe && unsubscribe();
  }, [selectedUser, dataLoaded]);

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.farmer_name &&
      farmer.farmer_name.trim() !== "" &&
      (farmer.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.farmer_id?.includes(searchTerm) ||
        farmer.nutmeg_card_number?.includes(searchTerm)),
  );

  // Helper function to merge new data while avoiding duplicates
  const mergeArray = (existingArray = [], newArray = []) => {
    const existingIds = new Set(existingArray.map((item) => item.id));
    const mergedArray = [...existingArray];

    newArray.forEach((newItem) => {
      if (!existingIds.has(newItem.id)) {
        mergedArray.push(newItem);
      }
    });

    return mergedArray;
  };




  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Assessment Data</h1>
          {/* <button
            onClick={refreshData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Refresh Data
          </button> */}
          {/* <button
            onClick={handleDownloadJSON}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Download JSON
          </button> */}
        </div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-50 "> </h1>
        </div>
        <div className="mb-6">
          <label className="underline font-bold">Fields Officer</label>
          <select
            onChange={(e) => setSelectedUser(e.target.value)}
            value={selectedUser}
            className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="font-bold">Filter</label>
          <input
            type="text"
            placeholder="Enter name, farmer ID, or card number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            {/* <h2 className="text-xl font-semibold mb-4">Farmers List</h2> */}
            <h2 className="text-xl font-semibold">Farmers List</h2>
            <span className="text-sm text-gray-500">
              {!dataLoaded ? (
                "Loading..."
              ) : (
                `${filteredFarmers
                  .filter(farmer => !farmer.flagged &&
                    !farmer.farmer_name.toLowerCase().includes("flagged"))
                  .length} entries`
              )}
            </span>
            {!dataLoaded ? (
              <p className="text-gray-500">Loading data...</p>
            ) : filteredFarmers.length === 0 ? (
              <p className="text-gray-500">No farmers found</p>
            ) : (
              <ul className="space-y-2">
                {filteredFarmers
                  .filter((farmer) => !farmer.flagged &&
                    !farmer.farmer_name.toLowerCase().includes("flagged"))
                  .sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated))
                  .map((farmer) => (
                    <li
                      key={farmer.id}
                      onClick={() => setSelectedFarmer(farmer)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedFarmer?.id === farmer.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                        }`}
                    >
                      <p className="font-medium text-gray-900">{farmer.farmer_name}</p>
                      <p className="text-sm text-gray-500">Farmer ID: {farmer.farmer_id}</p>
                      <p className="text-sm text-gray-500">Card Number: {farmer.nutmeg_card_number}</p>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {selectedFarmer && !selectedFarmer.flagged && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-6">Farmer Details</h2>
                {/* <button onClick={handleFlagFarmer} className="mt-2 text-red-600">
                                    Flag Farmer
                                </button> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Name: <span className="font-medium text-gray-900">{selectedFarmer.farmer_name}</span>
                    </p>
                    <p className="text-gray-600">
                      ID: <span className="font-medium text-gray-900">{selectedFarmer.farmer_id}</span>
                    </p>
                    <p className="text-gray-600">
                      Nutmeg Card:{" "}
                      <span className="font-medium text-gray-900">{selectedFarmer.nutmeg_card_number}</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Phone: <span className="font-medium text-gray-900">{selectedFarmer.phone_number}</span>
                    </p>
                    <p className="text-gray-600">
                      Sex: <span className="font-medium text-gray-900">{selectedFarmer.sex}</span>
                    </p>
                    <p className="text-gray-600">
                      Age Range: <span className="font-medium text-gray-900">{selectedFarmer.age}</span>
                    </p>
                  </div>
                </div>

                {selectedFarmer.verify && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Plots</h3>
                    <div className="grid gap-4">
                      {selectedFarmer.verify
                        .filter((v) => !v.flagged)
                        .map((v, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <p className="text-gray-600">
                                Condition: <span className="font-medium text-gray-900">{v.condition}</span>
                              </p>
                              <p className="text-gray-600">
                                Overall Acreage: <span className="font-medium text-gray-900">{v.overall_acreage}</span>
                              </p>
                              <p className="text-gray-600">
                                Labour: <span className="font-medium text-gray-900">{v.labour}</span>
                              </p>
                              <p className="text-gray-600">
                                Shade: <span className="font-medium text-gray-900">{v.shade}</span>
                              </p>
                              <p className="text-gray-600">
                                Date:{" "}
                                <span className="font-medium text-gray-900">
                                  {new Date(v.date ?? Date.now()).toDateString()}
                                </span>
                              </p>
                              <p className="text-gray-600">
                                Location:{" "}
                                <span className="font-medium text-gray-900">{v.location ?? "Not Available"}</span>
                              </p>
                              <p className="text-gray-600">
                                Acreage Rehabilitated:{" "}
                                <span className="font-medium text-gray-900">
                                  {v.acreage_rehabilitated ?? "Not Available"}
                                </span>
                              </p>
                              <p className="text-gray-600">
                                Tenure:{" "}
                                <span className="font-medium text-gray-900">{v.newtenure ?? "Not Available"}</span>
                              </p>

                              {/* <button onClick={() => handleFlagVerify(index)} className="mt-2 text-red-600">
                                                                Flag Plot
                                                            </button> */}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  {selectedFarmer.assessment && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Assessments</h3>
                      <div className="grid gap-4">
                        {selectedFarmer.assessment
                          .filter((a) => !a.flagged)
                          .map((a, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <p className="text-gray-600">
                                  Plot: <span className="font-medium text-gray-900">{a.plot_num}</span>
                                </p>
                                <p className="text-gray-600">
                                  Production 2023:{" "}
                                  <span className="font-medium text-gray-900">{a.production_2023}</span>
                                </p>
                                <p className="text-gray-600">
                                  Drainage: <span className="font-medium text-gray-900">{a.drainage}</span>
                                </p>
                                <p className="text-gray-600">
                                  Spices: <span className="font-medium text-gray-900">{a.spices}</span>
                                </p>

                                <p className="text-gray-600">
                                  Nutmeg Card Number:{" "}
                                  <span className="font-medium text-gray-900">{a.nutmeg_card_number}</span>
                                </p>

                                <p className="text-gray-600">
                                  Land Clearing Remarks:{" "}
                                  <span className="font-medium text-gray-900">{a.land_clearing}</span>
                                </p>

                                <p className="text-gray-600">
                                  Drainage Remarks: <span className="font-medium text-gray-900">{a.drainage}</span>
                                </p>

                                <p className="text-gray-600">
                                  Shade Crops Remarks:{" "}
                                  <span className="font-medium text-gray-900">{a.shade_crops}</span>
                                </p>

                                <p className="text-gray-600">
                                  Spices Remarks: <span className="font-medium text-gray-900">{a.spices}</span>
                                </p>

                                <p className="text-gray-600">
                                  Fertilizing Remarks:{" "}
                                  <span className="font-medium text-gray-900">{a.fertilizing}</span>
                                </p>

                                <p className="text-gray-600">
                                  Comments: <span className="font-medium text-gray-900">{a.comments}</span>
                                </p>

                                {/* <button onClick={() => handleFlagAssessment(index)} className="mt-2 text-red-600">
                                                                    Flag Assessment
                                                                </button> */}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {selectedFarmer.workplan && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Workplans</h3>
                      <div className="grid gap-4">
                        {selectedFarmer.workplan
                          .filter((w) => !w.flagged)
                          .map((w, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <p className="text-gray-600">
                                  Work Plan: <span className="font-medium text-gray-900">{w.work_plan}</span>
                                </p>
                                <p className="text-gray-600">
                                  Base Crop: <span className="font-medium text-gray-900">{w.base_crop}</span>
                                </p>
                                <p className="text-gray-600">
                                  Farmer Date: <span className="font-medium text-gray-900">{w.farmer_date}</span>
                                </p>
                                <p className="text-gray-600">
                                  Officer Date: <span className="font-medium text-gray-900">{w.officer_date}</span>
                                </p>
                              </div>

                              {w && w.activities ? (
                                (() => {
                                  let activities
                                  try {
                                    activities = JSON.parse(w.activities)
                                  } catch (error) {
                                    console.error("Failed to parse activities:", error)
                                    return <p>Invalid activities data</p>
                                  }

                                  return (
                                    <div>
                                      <h4 className="text-lg font-medium mb-2">Activities</h4>
                                      <div className="overflow-x-auto">
                                        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                                          <thead>
                                            <tr className="bg-gray-100">
                                              <th className="border border-gray-300 px-4 py-2">Activity</th>
                                              <th className="border border-gray-300 px-4 py-2">Man Days</th>
                                              <th className="border border-gray-300 px-4 py-2">Weeks</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {Object.entries(activities).map(([activity, details], activityIndex) => (
                                              <tr key={activityIndex} className="even:bg-gray-50">
                                                <td className="border border-gray-300 px-4 py-2">{activity}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                  {details.manDays || "N/A"}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                  <div className="flex space-x-2">
                                                    {details.weeks.map((isActive, weekIndex) => (
                                                      <div
                                                        key={weekIndex}
                                                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold ${isActive
                                                          ? "bg-green-500 text-white"
                                                          : "bg-gray-300 text-gray-600"
                                                          }`}
                                                      >
                                                        {weekIndex + 1}
                                                      </div>
                                                    ))}
                                                  </div>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  )
                                })()
                              ) : (
                                <p>No activities available</p>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {w.farmer_signature && (
                                  <div>
                                    <p className="text-sm text-gray-500 mb-2">Farmer Signature</p>
                                    <img
                                      src={w.farmer_signature || "/placeholder.svg"}
                                      alt="Farmer Signature"
                                      className="max-w-[200px] border rounded p-2"
                                    />
                                  </div>
                                )}
                                {w.officer_signature && (
                                  <div>
                                    <p className="text-sm text-gray-500 mb-2">Officer Signature</p>
                                    <img
                                      src={w.officer_signature || "/placeholder.svg"}
                                      alt="Officer Signature"
                                      className="max-w-[200px] border rounded p-2"
                                    />
                                  </div>
                                )}
                                {/* <button onClick={() => handleFlagWorkplan(index)} className="mt-2 text-red-600">
                                                                    Flag Workplan
                                                                </button> */}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App

