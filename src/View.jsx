import { useState, useEffect } from "react";
import { database, ref, onValue } from "./firebase";

function App() {
    const [farmers, setFarmers] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedFarmer, setSelectedFarmer] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search term

    useEffect(() => {
        const usersRef = ref(database);
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const userNames = Object.keys(data);
                setUsers(userNames);
                if (!selectedUser && userNames.length > 0) {
                    setSelectedUser(userNames[0]);
                }
            }
        });
    }, []);

    useEffect(() => {
        if (!selectedUser) return;
        const farmersRef = ref(database, `${selectedUser}/farmers`);

        onValue(farmersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const farmersArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setFarmers(farmersArray);
            } else {
                setFarmers([]);
            }
        });
    }, [selectedUser]);

    const filteredFarmers = farmers.filter(
        (farmer) =>
            farmer.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            farmer.farmer_id.includes(searchTerm) ||
            farmer.nutmeg_card_number.includes(searchTerm)
    );


    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Farmer Assessment Data</h1>

                <div className="mb-6">
                    <label className="underline font-bold">Fields Officer</label>
                    <select
                        onChange={(e) => setSelectedUser(e.target.value)}
                        value={selectedUser}
                        className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {users.map((user) => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className=" font-bold">Filter</label>
                    <input
                        type="text"
                        placeholder="Enter name, farmer ID, or card number"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Farmers List</h2>
            <ul className="space-y-2">
              {farmers.map((farmer) => (
                <li
                  key={farmer.id}
                  onClick={() => setSelectedFarmer(farmer)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedFarmer?.id === farmer.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                    }`}
                >
                  <p className="font-medium text-gray-900">{farmer.farmer_name}</p>
                  <p className="text-sm text-gray-500">Farmer ID: {farmer.farmer_id}</p>
                  <p className="text-sm text-gray-500">Card Number: {farmer.nutmeg_card_number}</p>
                </li>
              ))}
            </ul>
          </div> */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Farmers List</h2>
                        <ul className="space-y-2">
                            {filteredFarmers.map((farmer) => (
                                <li
                                    key={farmer.id}
                                    onClick={() => setSelectedFarmer(farmer)}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedFarmer?.id === farmer.id
                                        ? "bg-blue-50 border border-blue-200"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <p className="font-medium text-gray-900">{farmer.farmer_name}</p>
                                    <p className="text-sm text-gray-500">Farmer ID: {farmer.farmer_id}</p>
                                    <p className="text-sm text-gray-500">Card Number: {farmer.nutmeg_card_number}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {selectedFarmer && (
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow p-6">


                                <h2 className="text-2xl font-semibold mb-6">Farmer Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Name: <span className="font-medium text-gray-900">{selectedFarmer.farmer_name}</span></p>
                                        <p className="text-gray-600">ID: <span className="font-medium text-gray-900">{selectedFarmer.farmer_id}</span></p>
                                        <p className="text-gray-600">Nutmeg Card: <span className="font-medium text-gray-900">{selectedFarmer.nutmeg_card_number}</span></p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Phone: <span className="font-medium text-gray-900">{selectedFarmer.phone_number}</span></p>
                                        <p className="text-gray-600">Sex: <span className="font-medium text-gray-900">{selectedFarmer.sex}</span></p>
                                        <p className="text-gray-600">Age Range: <span className="font-medium text-gray-900">{selectedFarmer.age}</span></p>
                                    </div>
                                </div>


                                {selectedFarmer.verify && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Plots</h3>
                                        <div className="grid gap-4">
                                            {selectedFarmer.verify.map((v, index) => (
                                                <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <p className="text-gray-600">Condition: <span className="font-medium text-gray-900">{v.condition}</span></p>
                                                        <p className="text-gray-600">Overall Acreage: <span className="font-medium text-gray-900">{v.overall_acreage}</span></p>
                                                        <p className="text-gray-600">Labour: <span className="font-medium text-gray-900">{v.labour}</span></p>
                                                        <p className="text-gray-600">Shade: <span className="font-medium text-gray-900">{v.shade}</span></p>
                                                        <p className="text-gray-600">Date: <span className="font-medium text-gray-900">{new Date(v.date ?? Date.now()).toDateString()}</span></p>
                                                        <p className="text-gray-600">Location: <span className="font-medium text-gray-900">{v.location ?? "Not Available"}</span></p>
                                                        <p className="text-gray-600">Acreage Rehabilitated: <span className="font-medium text-gray-900">{v.acreage_rehabilitated ?? "Not Available"}</span></p>
                                                        <p className="text-gray-600">Tenure: <span className="font-medium text-gray-900">{v.newtenure ?? "Not Available"}</span></p>
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
                                                {selectedFarmer.assessment.map((a, index) => (
                                                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <p className="text-gray-600">Plot: <span className="font-medium text-gray-900">{a.plot_num}</span></p>
                                                            <p className="text-gray-600">Production 2023: <span className="font-medium text-gray-900">{a.production_2023}</span></p>
                                                            <p className="text-gray-600">Drainage: <span className="font-medium text-gray-900">{a.drainage}</span></p>
                                                            <p className="text-gray-600">Spices: <span className="font-medium text-gray-900">{a.spices}</span></p>

                                                            <p className="text-gray-600">
                                                                Nutmeg Card Number: <span className="font-medium text-gray-900">{a.nutmeg_card_number}</span>
                                                            </p>


                                                            {/* 
                              <p className="text-gray-600">
                                Date of Land Clearing: <span className="font-medium text-gray-900">{a.land_clearing_date}</span>
                              </p> */}
                                                            <p className="text-gray-600">
                                                                Land Clearing Remarks: <span className="font-medium text-gray-900">{a.land_clearing}</span>
                                                            </p>


                                                            {/* <p className="text-gray-600">
                                Date of Drainage: <span className="font-medium text-gray-900">{a.drainage_date}</span>
                              </p> */}
                                                            <p className="text-gray-600">
                                                                Drainage Remarks: <span className="font-medium text-gray-900">{a.drainage}</span>
                                                            </p>

                                                            {/* <p className="text-gray-600">
                                Date of Shade Crops: <span className="font-medium text-gray-900">{a.shade_crops_date}</span>
                              </p> */}
                                                            <p className="text-gray-600">
                                                                Shade Crops Remarks: <span className="font-medium text-gray-900">{a.shade_crops}</span>
                                                            </p>

                                                            {/* 
                              <p className="text-gray-600">
                                Date of Spices: <span className="font-medium text-gray-900">{a.spices_date}</span>
                              </p> */}
                                                            <p className="text-gray-600">
                                                                Spices Remarks: <span className="font-medium text-gray-900">{a.spices}</span>
                                                            </p>

                                                            {/* 
                              <p className="text-gray-600">
                                Date of Fertilizing: <span className="font-medium text-gray-900">{a.fertilizing_date}</span>
                              </p> */}
                                                            <p className="text-gray-600">
                                                                Fertilizing Remarks: <span className="font-medium text-gray-900">{a.fertilizing}</span>
                                                            </p>

                                                            <p className="text-gray-600">
                                                                Comments: <span className="font-medium text-gray-900">{a.comments}</span>
                                                            </p>






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
                                                {selectedFarmer.workplan.map((w, index) => (
                                                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                            <p className="text-gray-600">Work Plan: <span className="font-medium text-gray-900">{w.work_plan}</span></p>
                                                            <p className="text-gray-600">Base Crop: <span className="font-medium text-gray-900">{w.base_crop}</span></p>
                                                            <p className="text-gray-600">Farmer Date: <span className="font-medium text-gray-900">{w.farmer_date}</span></p>
                                                            <p className="text-gray-600">Officer Date: <span className="font-medium text-gray-900">{w.officer_date}</span></p>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                            {/* <p className="text-gray-600">Work Plan: <span className="font-medium text-gray-900">{w.activities}</span></p> */}
                                                            {/* <p className="text-gray-600">Base Crop: <span className="font-medium text-gray-900">{w.base_crop}</span></p>
                              <p className="text-gray-600">Farmer Date: <span className="font-medium text-gray-900">{w.farmer_date}</span></p>
                              <p className="text-gray-600">Officer Date: <span className="font-medium text-gray-900">{w.officer_date}</span></p> */}
                                                        </div>
                                                        {/* {console.log("Activities Data:", w?.activities)} */}
                                                        {/* Debugging: Check if activities exist */}
                                                        {/* {console.log("Activities Data:", w?.activities)} */}

                                                        {/* Activities Section */}
                                                        {/* <p>Activities</p>
                            {w && w.activities && Object.keys(w.activities).length > 0 ? (
                              Object.entries(w.activities).map(([activity, details], activityIndex) => {
                                // Ensure details exist and are valid
                                if (!details || typeof details !== "object") return null;

                                // Check if at least one week is true
                                const hasActiveWeeks = details.weeks.some(week => week);

                                // Skip if manDays is empty and no weeks are selected
                                if (!details.manDays.trim() && !hasActiveWeeks) return null;

                                return (
                                  <div key={activityIndex}>
                                    <p>{activity.replace(/([A-Z])/g, " $1").trim()}</p> {/* Formats names */}
                                                        {/* <p>Man Days: {details.manDays.trim() ? details.manDays : "N/A"}</p>
                                    <div>
                                      {hasActiveWeeks ? (
                                        details.weeks.map((week, weekIndex) => (
                                          <p key={weekIndex}>
                                            Week {weekIndex + 1}: {week ? "✔" : "❌"}
                                          </p>
                                        ))
                                      ) : (
                                        <p>No weeks available</p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <p>No activities available</p>
                            )} */}

                                                        {w && w.activities ? (
                                                            (() => {
                                                                let activities;
                                                                try {
                                                                    activities = JSON.parse(w.activities); // Parse the string into a JSON object
                                                                } catch (error) {
                                                                    console.error("Failed to parse activities:", error);
                                                                    return <p>Invalid activities data</p>;
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
                                                                                            <td className="border border-gray-300 px-4 py-2">{details.manDays || "N/A"}</td>
                                                                                            <td className="border border-gray-300 px-4 py-2">
                                                                                                <div className="flex space-x-2">
                                                                                                    {details.weeks.map((isActive, weekIndex) => (
                                                                                                        <div
                                                                                                            key={weekIndex}
                                                                                                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold ${isActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
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
                                                                );
                                                            })()
                                                        ) : (
                                                            <p>No activities available</p>
                                                        )}

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {w.farmer_signature && (
                                                                <div>
                                                                    <p className="text-sm text-gray-500 mb-2">Farmer Signature</p>
                                                                    <img src={w.farmer_signature} alt="Farmer Signature" className="max-w-[200px] border rounded p-2" />
                                                                </div>
                                                            )}
                                                            {w.officer_signature && (
                                                                <div>
                                                                    <p className="text-sm text-gray-500 mb-2">Officer Signature</p>
                                                                    <img src={w.officer_signature} alt="Officer Signature" className="max-w-[200px] border rounded p-2" />
                                                                </div>
                                                            )}
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
    );
}

export default App;

