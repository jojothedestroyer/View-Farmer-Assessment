// import { useState, useEffect } from "react";
// import { database, ref, onValue } from "./firebase";

// const Index = () => {
//     const [farmers, setFarmers] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState("");
//     const [selectedFarmer, setSelectedFarmer] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [dataLoaded, setDataLoaded] = useState(false);
//     const [syncModalOpen, setSyncModalOpen] = useState(false);
//     const [syncData, setSyncData] = useState(null);
//     const [syncResults, setSyncResults] = useState(null);
//     const [disputedFieldChoices, setDisputedFieldChoices] = useState({});

//     useEffect(() => {
//         // Check if we have data in localStorage first
//         const localData = localStorage.getItem("farmersAppData");

//         if (localData) {
//             // If we have local data, use it
//             const parsedData = JSON.parse(localData);
//             setUsers(parsedData.users || []);

//             // Set selected user if available
//             if (parsedData.users && parsedData.users.length > 0 && !selectedUser) {
//                 setSelectedUser(parsedData.users[0]);
//             }

//             // Set farmers data if available for the selected user
//             if (parsedData.farmersData && parsedData.farmersData[selectedUser || parsedData.users[0]]) {
//                 setFarmers(parsedData.farmersData[selectedUser || parsedData.users[0]]);
//             }

//             setDataLoaded(true);
//         } else {
//             // If no local data, fetch from Firebase
//             const usersRef = ref(database);
//             onValue(usersRef, (snapshot) => {
//                 const data = snapshot.val();
//                 if (data) {
//                     const userNames = Object.keys(data);
//                     setUsers(userNames);

//                     if (!selectedUser && userNames.length > 0) {
//                         setSelectedUser(userNames[0]);
//                     }

//                     // Create an object to store all farmers data by user
//                     const farmersData = {};

//                     // For each user, get their farmers data
//                     userNames.forEach((userName) => {
//                         if (data[userName] && data[userName].farmers) {
//                             const farmersArray = Object.keys(data[userName].farmers).map((key) => ({
//                                 id: key,
//                                 ...data[userName].farmers[key],
//                             }));
//                             farmersData[userName] = farmersArray;
//                         } else {
//                             farmersData[userName] = [];
//                         }
//                     });

//                     // Save all data to localStorage
//                     localStorage.setItem(
//                         "farmersAppData",
//                         JSON.stringify({
//                             users: userNames,
//                             farmersData: farmersData,
//                         })
//                     );

//                     // Set initial farmers data for the first user
//                     if (userNames.length > 0) {
//                         setFarmers(farmersData[userNames[0]] || []);
//                     }

//                     setDataLoaded(true);
//                 }
//             });
//         }
//     }, []);

//     useEffect(() => {
//         if (!selectedUser || !dataLoaded) return;

//         // Get farmers data from localStorage
//         const localData = localStorage.getItem("farmersAppData");
//         if (localData) {
//             const parsedData = JSON.parse(localData);
//             if (parsedData.farmersData && parsedData.farmersData[selectedUser]) {
//                 setFarmers(parsedData.farmersData[selectedUser]);
//                 return;
//             }
//         }

//         // If we don't have the data locally for this user, fetch from Firebase
//         const farmersRef = ref(database, `${selectedUser}/farmers`);
//         onValue(farmersRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const farmersArray = Object.keys(data).map((key) => ({
//                     id: key,
//                     ...data[key],
//                 }));
//                 setFarmers(farmersArray);

//                 // Update localStorage with this user's farmers data
//                 const localData = localStorage.getItem("farmersAppData");
//                 if (localData) {
//                     const parsedData = JSON.parse(localData);
//                     parsedData.farmersData[selectedUser] = farmersArray;
//                     localStorage.setItem("farmersAppData", JSON.stringify(parsedData));
//                 }
//             } else {
//                 setFarmers([]);
//             }
//         });
//     }, [selectedUser, dataLoaded]);

//     const filteredFarmers = farmers.filter(
//         (farmer) =>
//             farmer.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             farmer.farmer_id.includes(searchTerm) ||
//             farmer.nutmeg_card_number.includes(searchTerm)
//     );
















// import { useState, useEffect } from "react";
// import { database, ref, onValue } from "./firebase";

// const Index = () => {
//     const [farmers, setFarmers] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState("");
//     const [selectedFarmer, setSelectedFarmer] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [dataLoaded, setDataLoaded] = useState(false);
//     const [syncModalOpen, setSyncModalOpen] = useState(false);
//     const [syncData, setSyncData] = useState(null);
//     const [syncResults, setSyncResults] = useState(null);
//     const [disputedFieldChoices, setDisputedFieldChoices] = useState({});

//     useEffect(() => {
//         const localData = localStorage.getItem("farmersAppData");
//         let parsedData = localData ? JSON.parse(localData) : { users: [], farmersData: {} };

//         setUsers(parsedData.users || []);

//         if (parsedData.users.length > 0 && !selectedUser) {
//             setSelectedUser(parsedData.users[0]);
//         }

//         if (parsedData.farmersData[selectedUser]) {
//             setFarmers(parsedData.farmersData[selectedUser]);
//         }

//         setDataLoaded(true);

//         // Fetch data from Firebase
//         const usersRef = ref(database);
//         onValue(usersRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const userNames = Object.keys(data);
//                 setUsers(userNames);

//                 if (!selectedUser && userNames.length > 0) {
//                     setSelectedUser(userNames[0]);
//                 }

//                 const farmersData = { ...parsedData.farmersData };

//                 userNames.forEach((userName) => {
//                     if (data[userName] && data[userName].farmers) {
//                         const newFarmersArray = Object.keys(data[userName].farmers).map((key) => ({
//                             id: key,
//                             ...data[userName].farmers[key],
//                         }));

//                         if (farmersData[userName]) {
//                             // Merge existing and new farmers while updating workplan
//                             const existingFarmers = farmersData[userName];
//                             const updatedFarmers = existingFarmers.map((existingFarmer) => {
//                                 const newEntry = newFarmersArray.find((f) => f.id === existingFarmer.id);
//                                 return newEntry ? { ...existingFarmer, workplan: newEntry.workplan } : existingFarmer;
//                             });

//                             // Add new farmers that don't exist yet
//                             newFarmersArray.forEach((newFarmer) => {
//                                 if (!updatedFarmers.some((f) => f.id === newFarmer.id)) {
//                                     updatedFarmers.push(newFarmer);
//                                 }
//                             });

//                             farmersData[userName] = updatedFarmers;
//                         } else {
//                             farmersData[userName] = newFarmersArray;
//                         }
//                     }
//                 });

//                 localStorage.setItem(
//                     "farmersAppData",
//                     JSON.stringify({
//                         users: userNames,
//                         farmersData: farmersData,
//                     })
//                 );

//                 if (userNames.length > 0) {
//                     setFarmers(farmersData[userNames[0]] || []);
//                 }

//                 setDataLoaded(true);
//             }
//         });
//     }, []);

//     useEffect(() => {
//         if (!selectedUser || !dataLoaded) return;

//         const localData = localStorage.getItem("farmersAppData");
//         if (localData) {
//             const parsedData = JSON.parse(localData);
//             if (parsedData.farmersData[selectedUser]) {
//                 setFarmers(parsedData.farmersData[selectedUser]);
//                 return;
//             }
//         }

//         const farmersRef = ref(database, `${selectedUser}/farmers`);
//         onValue(farmersRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const farmersArray = Object.keys(data).map((key) => ({
//                     id: key,
//                     ...data[key],
//                 }));
//                 setFarmers(farmersArray);

//                 const localData = localStorage.getItem("farmersAppData");
//                 if (localData) {
//                     const parsedData = JSON.parse(localData);
//                     parsedData.farmersData[selectedUser] = farmersArray;
//                     localStorage.setItem("farmersAppData", JSON.stringify(parsedData));
//                 }
//             } else {
//                 setFarmers([]);
//             }
//         });
//     }, [selectedUser, dataLoaded]);

//     const filteredFarmers = farmers.filter(
//         (farmer) =>
//             farmer.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             farmer.farmer_id.includes(searchTerm) ||
//             farmer.nutmeg_card_number.includes(searchTerm)
//     );


import { useState, useEffect } from "react";
import { database, ref, onValue } from "./firebase";

const Index = () => {
    const [farmers, setFarmers] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedFarmer, setSelectedFarmer] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);
    const [syncModalOpen, setSyncModalOpen] = useState(false);
    const [syncData, setSyncData] = useState(null);
    const [syncResults, setSyncResults] = useState(null);
    const [disputedFieldChoices, setDisputedFieldChoices] = useState({});

    useEffect(() => {
        const localData = localStorage.getItem("farmersAppData");
        let parsedData = localData ? JSON.parse(localData) : { users: [], farmersData: {} };

        setUsers(parsedData.users || []);

        if (parsedData.users.length > 0 && !selectedUser) {
            setSelectedUser(parsedData.users[0]);
        }

        if (parsedData.farmersData[selectedUser]) {
            setFarmers(parsedData.farmersData[selectedUser]);
        }

        setDataLoaded(true);

        // Fetch data from Firebase
        const usersRef = ref(database);
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const userNames = Object.keys(data);
                setUsers(userNames);

                if (!selectedUser && userNames.length > 0) {
                    setSelectedUser(userNames[0]);
                }

                const farmersData = { ...parsedData.farmersData };

                userNames.forEach((userName) => {
                    if (data[userName] && data[userName].farmers) {
                        const newFarmersArray = Object.keys(data[userName].farmers).map((key) => ({
                            id: key,
                            ...data[userName].farmers[key],
                        }));

                        if (farmersData[userName]) {
                            // Merge existing and new farmers while updating workplan, assessments, and verify fields
                            const existingFarmers = farmersData[userName];
                            const updatedFarmers = existingFarmers.map((existingFarmer) => {
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

                            farmersData[userName] = updatedFarmers;
                        } else {
                            farmersData[userName] = newFarmersArray;
                        }
                    }
                });

                localStorage.setItem(
                    "farmersAppData",
                    JSON.stringify({
                        users: userNames,
                        farmersData: farmersData,
                    })
                );

                if (userNames.length > 0) {
                    setFarmers(farmersData[userNames[0]] || []);
                }

                setDataLoaded(true);
            }
        });
    }, []);

    useEffect(() => {
        if (!selectedUser || !dataLoaded) return;

        const localData = localStorage.getItem("farmersAppData");
        if (localData) {
            const parsedData = JSON.parse(localData);
            if (parsedData.farmersData[selectedUser]) {
                setFarmers(parsedData.farmersData[selectedUser]);
                return;
            }
        }

        const farmersRef = ref(database, `${selectedUser}/farmers`);
        onValue(farmersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const farmersArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setFarmers(farmersArray);

                const localData = localStorage.getItem("farmersAppData");
                if (localData) {
                    const parsedData = JSON.parse(localData);
                    parsedData.farmersData[selectedUser] = farmersArray;
                    localStorage.setItem("farmersAppData", JSON.stringify(parsedData));
                }
            } else {
                setFarmers([]);
            }
        });
    }, [selectedUser, dataLoaded]);

    const filteredFarmers = farmers.filter(
        (farmer) =>
            farmer.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            farmer.farmer_id.includes(searchTerm) ||
            farmer.nutmeg_card_number.includes(searchTerm)
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




    // Function to refresh data from Firebase and compare with local data
    const refreshData = () => {
        // Check if we have local data
        const localData = localStorage.getItem("farmersAppData");

        if (!localData) {
            // If no local data, just fetch fresh data as before
            fetchFreshData();
            return;
        }

        // If we have local data, fetch Firebase data and compare
        const parsedLocalData = JSON.parse(localData);

        const usersRef = ref(database);
        onValue(usersRef, (snapshot) => {
            const firebaseData = snapshot.val();
            if (!firebaseData) {
                setDataLoaded(true);
                return;
            }

            const userNames = Object.keys(firebaseData);
            const farmersDataFromFirebase = {};

            // For each user, get their farmers data from Firebase
            userNames.forEach((userName) => {
                if (firebaseData[userName] && firebaseData[userName].farmers) {
                    const farmersArray = Object.keys(firebaseData[userName].farmers).map((key) => ({
                        id: key,
                        ...firebaseData[userName].farmers[key],
                    }));
                    farmersDataFromFirebase[userName] = farmersArray;
                } else {
                    farmersDataFromFirebase[userName] = [];
                }
            });

            // Compare data and show sync options
            showSyncOptions(parsedLocalData, { users: userNames, farmersData: farmersDataFromFirebase });
        });
    };

    // Function to fetch fresh data without comparing
    const fetchFreshData = () => {
        setDataLoaded(false);
        localStorage.removeItem("farmersAppData");

        // This will trigger the first useEffect to fetch fresh data
        const usersRef = ref(database);
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const userNames = Object.keys(data);
                setUsers(userNames);

                if (!selectedUser && userNames.length > 0) {
                    setSelectedUser(userNames[0]);
                }

                // Create an object to store all farmers data by user
                const farmersData = {};

                // For each user, get their farmers data
                userNames.forEach((userName) => {
                    if (data[userName] && data[userName].farmers) {
                        const farmersArray = Object.keys(data[userName].farmers).map((key) => ({
                            id: key,
                            ...data[userName].farmers[key],
                        }));
                        farmersData[userName] = farmersArray;
                    } else {
                        farmersData[userName] = [];
                    }
                });

                // Save all data to localStorage
                localStorage.setItem(
                    "farmersAppData",
                    JSON.stringify({
                        users: userNames,
                        farmersData: farmersData,
                    })
                );

                // Set initial farmers data for the selected user
                if (selectedUser) {
                    setFarmers(farmersData[selectedUser] || []);
                } else if (userNames.length > 0) {
                    setFarmers(farmersData[userNames[0]] || []);
                }

                setDataLoaded(true);
            }
        });
    };

    // Function to show sync options modal
    const showSyncOptions = (localData, firebaseData) => {
        // Analyze differences between local and Firebase data
        const results = analyzeDifferences(localData, firebaseData);
        setSyncResults(results);
        setSyncData({ localData, firebaseData });
        setSyncModalOpen(true);
        setDataLoaded(true);
    };

    // Function to analyze differences between local and Firebase data
    const analyzeDifferences = (localData, firebaseData) => {
        const results = {
            newUsers: [],
            newFarmers: {},
            disputedFarmers: {},
        };

        // Check for new users in Firebase
        firebaseData.users.forEach((user) => {
            if (!localData.users.includes(user)) {
                results.newUsers.push(user);
            }
        });

        // Check for new or modified farmers
        firebaseData.users.forEach((user) => {
            if (!localData.farmersData[user]) {
                // If user exists in Firebase but not in local, all farmers are new
                results.newFarmers[user] = firebaseData.farmersData[user] || [];
                return;
            }

            // User exists in both, check for new or modified farmers
            const localFarmers = localData.farmersData[user] || [];
            const firebaseFarmers = firebaseData.farmersData[user] || [];

            results.newFarmers[user] = [];
            results.disputedFarmers[user] = [];

            // Check for new farmers in Firebase
            firebaseFarmers.forEach((firebaseFarmer) => {
                const localFarmer = localFarmers.find((f) => f.id === firebaseFarmer.id);

                if (!localFarmer) {
                    // Farmer exists in Firebase but not in local, ALWAYS add it
                    results.newFarmers[user].push(firebaseFarmer);
                } else {
                    // Farmer exists in both, check if they're different
                    if (JSON.stringify(localFarmer) !== JSON.stringify(firebaseFarmer)) {
                        // Farmers are different, add to disputed
                        results.disputedFarmers[user].push({
                            local: localFarmer,
                            firebase: firebaseFarmer,
                        });
                    }
                }
            });

            // Remove empty arrays
            if (results.newFarmers[user].length === 0) {
                delete results.newFarmers[user];
            }
            if (results.disputedFarmers[user].length === 0) {
                delete results.disputedFarmers[user];
            }
        });

        return results;
    };

    // Get all field differences between two farmers
    const getFieldDifferences = (localFarmer, firebaseFarmer) => {
        const differences = [];

        // Helper function to compare basic fields
        const compareFields = (local, firebase, prefix = '') => {
            const allKeys = [...new Set([...Object.keys(local), ...Object.keys(firebase)])];

            allKeys.forEach(key => {
                // Skip id field and arrays/objects (handled separately)
                if (key === 'id' ||
                    (typeof local[key] === 'object' && local[key] !== null) ||
                    (typeof firebase[key] === 'object' && firebase[key] !== null)) {
                    return;
                }

                if (local[key] !== firebase[key]) {
                    differences.push({
                        key: prefix ? `${prefix}.${key}` : key,
                        localValue: local[key],
                        firebaseValue: firebase[key]
                    });
                }
            });
        };

        // Compare basic farmer fields
        compareFields(localFarmer, firebaseFarmer);

        // Handle nested objects specifically, add more as needed
        ['verify', 'assessment', 'workplan'].forEach(arrayKey => {
            if (localFarmer[arrayKey] && firebaseFarmer[arrayKey]) {
                // Compare arrays of objects
                const maxLength = Math.max(localFarmer[arrayKey].length, firebaseFarmer[arrayKey].length);

                for (let i = 0; i < maxLength; i++) {
                    const localItem = localFarmer[arrayKey][i] || {};
                    const firebaseItem = firebaseFarmer[arrayKey][i] || {};

                    compareFields(localItem, firebaseItem, `${arrayKey}[${i}]`);
                }
            } else if (localFarmer[arrayKey] || firebaseFarmer[arrayKey]) {
                // One has the array and the other doesn't
                differences.push({
                    key: arrayKey,
                    localValue: localFarmer[arrayKey] ? `${localFarmer[arrayKey].length} items` : 'None',
                    firebaseValue: firebaseFarmer[arrayKey] ? `${firebaseFarmer[arrayKey].length} items` : 'None'
                });
            }
        });

        return differences;
    };

    // Function to handle field choice
    const handleFieldChoice = (user, farmerId, fieldKey, choice) => {
        setDisputedFieldChoices(prev => {
            const newChoices = { ...prev };

            if (!newChoices[user]) {
                newChoices[user] = {};
            }

            if (!newChoices[user][farmerId]) {
                newChoices[user][farmerId] = {};
            }

            newChoices[user][farmerId][fieldKey] = choice;

            return newChoices;
        });
    };

    // Function to apply sync decisions
    const applySyncDecisions = () => {
        if (!syncData) return;

        const { localData, firebaseData } = syncData;
        const updatedData = { ...localData };

        // Add new users
        syncResults.newUsers.forEach((user) => {
            if (!updatedData.users.includes(user)) {
                updatedData.users.push(user);
            }
        });

        // Add new farmers (always add these as specified in requirement #1)
        Object.keys(syncResults.newFarmers).forEach((user) => {
            if (!updatedData.farmersData[user]) {
                updatedData.farmersData[user] = [];
            }

            syncResults.newFarmers[user].forEach((farmer) => {
                updatedData.farmersData[user].push(farmer);
            });
        });

        // Handle disputed farmers based on field-level choices
        Object.keys(syncResults.disputedFarmers).forEach((user) => {
            syncResults.disputedFarmers[user].forEach((disputedItem) => {
                const { local: localFarmer, firebase: firebaseFarmer } = disputedItem;
                const farmerId = localFarmer.id;

                // Find the farmer in our updated data
                const farmerIndex = updatedData.farmersData[user].findIndex(f => f.id === farmerId);

                if (farmerIndex !== -1) {
                    const updatedFarmer = { ...updatedData.farmersData[user][farmerIndex] };

                    // Check if we have choices for this farmer
                    if (disputedFieldChoices[user]?.[farmerId]) {
                        const fieldChoices = disputedFieldChoices[user][farmerId];

                        // Apply each field choice
                        Object.entries(fieldChoices).forEach(([fieldKey, choice]) => {
                            if (choice === 'firebase') {
                                // Parse the field path and set the value
                                const path = fieldKey.split('.');

                                // Handle array indexing in the path
                                if (path.length === 1 && !path[0].includes('[')) {
                                    // Simple field
                                    updatedFarmer[path[0]] = firebaseFarmer[path[0]];
                                } else {
                                    // Complex path with arrays
                                    let currentLocalObj = updatedFarmer;
                                    let currentFirebaseObj = firebaseFarmer;
                                    let finalKey = path[path.length - 1];

                                    // Handle array notation like "verify[0]"
                                    const arrayMatch = finalKey.match(/^(.*)\[(\d+)\]$/);
                                    if (arrayMatch) {
                                        finalKey = arrayMatch[1];
                                        const arrayIndex = parseInt(arrayMatch[2]);

                                        // Navigate to the parent path
                                        for (let i = 0; i < path.length - 1; i++) {
                                            const pathPart = path[i];
                                            if (pathPart.includes('[')) {
                                                const match = pathPart.match(/^(.*)\[(\d+)\]$/);
                                                const key = match[1];
                                                const index = parseInt(match[2]);

                                                // Ensure arrays exist
                                                if (!currentLocalObj[key]) currentLocalObj[key] = [];
                                                if (currentLocalObj[key].length <= index) {
                                                    for (let j = currentLocalObj[key].length; j <= index; j++) {
                                                        currentLocalObj[key][j] = {};
                                                    }
                                                }

                                                currentLocalObj = currentLocalObj[key][index];
                                                currentFirebaseObj = currentFirebaseObj?.[key]?.[index] || {};
                                            } else {
                                                // Ensure objects exist
                                                if (!currentLocalObj[pathPart]) currentLocalObj[pathPart] = {};
                                                currentLocalObj = currentLocalObj[pathPart];
                                                currentFirebaseObj = currentFirebaseObj?.[pathPart] || {};
                                            }
                                        }

                                        // Handle the array notation in final key
                                        if (!currentLocalObj[finalKey]) currentLocalObj[finalKey] = [];
                                        if (currentLocalObj[finalKey].length <= arrayIndex) {
                                            for (let j = currentLocalObj[finalKey].length; j <= arrayIndex; j++) {
                                                currentLocalObj[finalKey][j] = {};
                                            }
                                        }

                                        // Get the appropriate values from firebase
                                        if (currentFirebaseObj[finalKey]?.[arrayIndex]) {
                                            currentLocalObj[finalKey][arrayIndex] = currentFirebaseObj[finalKey][arrayIndex];
                                        }
                                    } else {
                                        // Handle regular nested paths like "verify.condition"
                                        for (let i = 0; i < path.length - 1; i++) {
                                            const pathPart = path[i];

                                            // Ensure objects exist
                                            if (!currentLocalObj[pathPart]) currentLocalObj[pathPart] = {};
                                            currentLocalObj = currentLocalObj[pathPart];
                                            currentFirebaseObj = currentFirebaseObj?.[pathPart] || {};
                                        }

                                        currentLocalObj[finalKey] = currentFirebaseObj[finalKey];
                                    }
                                }
                            }
                            // If choice is 'local', do nothing as we're keeping the local version
                        });
                    }

                    // Update the farmer in our data
                    updatedData.farmersData[user][farmerIndex] = updatedFarmer;
                }
            });
        });

        // Save updated data to localStorage
        localStorage.setItem("farmersAppData", JSON.stringify(updatedData));

        // Update state
        setUsers(updatedData.users);
        if (selectedUser) {
            setFarmers(updatedData.farmersData[selectedUser] || []);
        } else if (updatedData.users.length > 0) {
            setSelectedUser(updatedData.users[0]);
            setFarmers(updatedData.farmersData[updatedData.users[0]] || []);
        }

        // Close modal
        setSyncModalOpen(false);
        setSyncData(null);
        setSyncResults(null);
        setDisputedFieldChoices({});
    };


    const handleDeleteVerify = (index) => {
        const updatedVerify = selectedFarmer.verify.filter((_, i) => i !== index);
        const updatedFarmer = { ...selectedFarmer, verify: updatedVerify };

        const updatedFarmers = farmers.map((farmer) =>
            farmer.id === selectedFarmer.id ? updatedFarmer : farmer
        );

        setFarmers(updatedFarmers);
        setSelectedFarmer(updatedFarmer);

        // Update localStorage or Firebase here if necessary
        saveFarmersDataToLocalStorage();
    };

    const handleDeleteAssessment = (index) => {
        const updatedAssessment = selectedFarmer.assessment.filter((_, i) => i !== index);
        const updatedFarmer = { ...selectedFarmer, assessment: updatedAssessment };

        const updatedFarmers = farmers.map((farmer) =>
            farmer.id === selectedFarmer.id ? updatedFarmer : farmer
        );

        setFarmers(updatedFarmers);
        setSelectedFarmer(updatedFarmer);

        // Update localStorage or Firebase here if necessary
        saveFarmersDataToLocalStorage();
    };

    // const saveFarmersDataToLocalStorage = () => {
    //     const updatedFarmersData = farmers.reduce((acc, farmer) => {
    //         acc[farmer.id] = farmer;
    //         return acc;
    //     }, {});

    //     const updatedData = {
    //         users,
    //         farmersData: updatedFarmersData,
    //     };

    //     localStorage.setItem("farmersAppData", JSON.stringify(updatedData));
    // };




    const handleFlagVerify = (index) => {
        const updatedVerify = [...selectedFarmer.verify];
        updatedVerify[index] = {
            ...updatedVerify[index],
            flagged: true, // Flag the entry
        };

        const updatedFarmer = { ...selectedFarmer, verify: updatedVerify };
        const updatedFarmers = farmers.map((farmer) =>
            farmer.id === selectedFarmer.id ? updatedFarmer : farmer
        );

        setFarmers(updatedFarmers);
        setSelectedFarmer(updatedFarmer);
        saveFarmersDataToLocalStorage();
    };

    const handleFlagAssessment = (index) => {
        const updatedAssessment = [...selectedFarmer.assessment];
        updatedAssessment[index] = {
            ...updatedAssessment[index],
            flagged: true, // Flag the entry
        };

        const updatedFarmer = { ...selectedFarmer, assessment: updatedAssessment };
        const updatedFarmers = farmers.map((farmer) =>
            farmer.id === selectedFarmer.id ? updatedFarmer : farmer
        );

        setFarmers(updatedFarmers);
        setSelectedFarmer(updatedFarmer);
        saveFarmersDataToLocalStorage();
    };

    const handleFlagWorkplan = (index) => {
        const updatedWorkplan = [...selectedFarmer.workplan];
        updatedWorkplan[index] = {
            ...updatedWorkplan[index],
            flagged: true, // Flag the entry
        };

        const updatedFarmer = { ...selectedFarmer, workplan: updatedWorkplan };
        const updatedFarmers = farmers.map((farmer) =>
            farmer.id === selectedFarmer.id ? updatedFarmer : farmer
        );

        setFarmers(updatedFarmers);
        setSelectedFarmer(updatedFarmer);
        saveFarmersDataToLocalStorage();
    };

    const handleFlagFarmer = () => {
        // Mark the farmer as flagged
        const updatedFarmer = { ...selectedFarmer, flagged: true };

        // Update the farmers list by replacing the flagged farmer
        const updatedFarmers = farmers.map((farmer) =>
            farmer.id === selectedFarmer.id ? updatedFarmer : farmer
        );

        // Update the state with the modified list of farmers and selected farmer
        setFarmers(updatedFarmers);
        setSelectedFarmer(updatedFarmer);
        saveFarmersDataToLocalStorage();
    };





    // const saveFarmersDataToLocalStorage = () => {
    //     const updatedFarmersData = farmers.reduce((acc, farmer) => {
    //         acc[farmer.id] = farmer;
    //         return acc;
    //     }, {});

    //     const updatedData = {
    //         users,
    //         farmersData: updatedFarmersData,
    //     };

    //     localStorage.setItem("farmersAppData", JSON.stringify(updatedData));
    // };


    const saveFarmersDataToLocalStorage = () => {
        const updatedFarmersData = farmers.reduce((acc, farmer) => {
            acc[farmer.id] = farmer;
            return acc;
        }, {});

        const updatedData = {
            users,
            farmersData: updatedFarmersData,
        };

        localStorage.setItem("farmersAppData", JSON.stringify(updatedData));
    };
    const handleDownloadJSON = () => {
        const jsonData = JSON.stringify({
            users,
            farmersData: farmers.reduce((acc, farmer) => {
                acc[farmer.id] = farmer;
                return acc;
            }, {}),
        }, null, 2);

        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'farmersData.json';
        a.click();
        URL.revokeObjectURL(url);
    };



    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Farmer Assessment Data</h1>
                    <button
                        onClick={refreshData}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Refresh Data
                    </button>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Farmer Assessment Data</h1>
                    <button
                        onClick={handleDownloadJSON}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        Download Json
                    </button>
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
                        <h2 className="text-xl font-semibold mb-4">Farmers List</h2>
                        {!dataLoaded ? (
                            <p className="text-gray-500">Loading data...</p>
                        ) : filteredFarmers.length === 0 ? (
                            <p className="text-gray-500">No farmers found</p>
                        ) : (
                            <ul className="space-y-2">
                                {filteredFarmers
                                    .filter(farmer => !farmer.flagged)
                                    .map((farmer) => (
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
                        )}
                    </div>

                    {selectedFarmer && !selectedFarmer.flagged && (
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-semibold mb-6">Farmer Details</h2>
                                <button
                                    onClick={handleFlagFarmer}  // Call flag farmer function
                                    className="mt-2 text-red-600"
                                >
                                    Flag Farmer
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-2">
                                        <p className="text-gray-600">
                                            Name:{" "}
                                            <span className="font-medium text-gray-900">{selectedFarmer.farmer_name}</span>
                                        </p>
                                        <p className="text-gray-600">
                                            ID: <span className="font-medium text-gray-900">{selectedFarmer.farmer_id}</span>
                                        </p>
                                        <p className="text-gray-600">
                                            Nutmeg Card:{" "}
                                            <span className="font-medium text-gray-900">
                                                {selectedFarmer.nutmeg_card_number}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">
                                            Phone:{" "}
                                            <span className="font-medium text-gray-900">{selectedFarmer.phone_number}</span>
                                        </p>
                                        <p className="text-gray-600">
                                            Sex: <span className="font-medium text-gray-900">{selectedFarmer.sex}</span>
                                        </p>
                                        <p className="text-gray-600">
                                            Age Range:{" "}
                                            <span className="font-medium text-gray-900">{selectedFarmer.age}</span>
                                        </p>
                                    </div>
                                </div>

                                {selectedFarmer.verify && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Plots</h3>
                                        <div className="grid gap-4">
                                            {selectedFarmer.verify
                                                .filter(v => !v.flagged)
                                                .map((v, index) => (
                                                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <p className="text-gray-600">
                                                                Condition:{" "}
                                                                <span className="font-medium text-gray-900">{v.condition}</span>
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Overall Acreage:{" "}
                                                                <span className="font-medium text-gray-900">{v.overall_acreage}</span>
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Labour:{" "}
                                                                <span className="font-medium text-gray-900">{v.labour}</span>
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Shade:{" "}
                                                                <span className="font-medium text-gray-900">{v.shade}</span>
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Date:{" "}
                                                                <span className="font-medium text-gray-900">
                                                                    {new Date(v.date ?? Date.now()).toDateString()}
                                                                </span>
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Location:{" "}
                                                                <span className="font-medium text-gray-900">
                                                                    {v.location ?? "Not Available"}
                                                                </span>
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Acreage Rehabilitated:{" "}
                                                                <span className="font-medium text-gray-900">
                                                                    {v.acreage_rehabilitated ?? "Not Available"}
                                                                </span>
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Tenure:{" "}
                                                                <span className="font-medium text-gray-900">
                                                                    {v.newtenure ?? "Not Available"}
                                                                </span>
                                                            </p>


                                                            <button
                                                                onClick={() => handleFlagVerify(index)}
                                                                className="mt-2 text-red-600"
                                                            >
                                                                Flag Plot
                                                            </button>

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
                                                    .filter(a => !a.flagged)
                                                    .map((a, index) => (
                                                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <p className="text-gray-600">
                                                                    Plot:{" "}
                                                                    <span className="font-medium text-gray-900">{a.plot_num}</span>
                                                                </p>
                                                                <p className="text-gray-600">
                                                                    Production 2023:{" "}
                                                                    <span className="font-medium text-gray-900">
                                                                        {a.production_2023}
                                                                    </span>
                                                                </p>
                                                                <p className="text-gray-600">
                                                                    Drainage:{" "}
                                                                    <span className="font-medium text-gray-900">{a.drainage}</span>
                                                                </p>
                                                                <p className="text-gray-600">
                                                                    Spices:{" "}
                                                                    <span className="font-medium text-gray-900">{a.spices}</span>
                                                                </p>

                                                                <p className="text-gray-600">
                                                                    Nutmeg Card Number:{" "}
                                                                    <span className="font-medium text-gray-900">
                                                                        {a.nutmeg_card_number}
                                                                    </span>
                                                                </p>

                                                                <p className="text-gray-600">
                                                                    Land Clearing Remarks:{" "}
                                                                    <span className="font-medium text-gray-900">{a.land_clearing}</span>
                                                                </p>

                                                                <p className="text-gray-600">
                                                                    Drainage Remarks:{" "}
                                                                    <span className="font-medium text-gray-900">{a.drainage}</span>
                                                                </p>

                                                                <p className="text-gray-600">
                                                                    Shade Crops Remarks:{" "}
                                                                    <span className="font-medium text-gray-900">{a.shade_crops}</span>
                                                                </p>

                                                                <p className="text-gray-600">
                                                                    Spices Remarks:{" "}
                                                                    <span className="font-medium text-gray-900">{a.spices}</span>
                                                                </p>

                                                                <p className="text-gray-600">
                                                                    Fertilizing Remarks:{" "}
                                                                    <span className="font-medium text-gray-900">{a.fertilizing}</span>
                                                                </p>

                                                                <p className="text-gray-600">
                                                                    Comments:{" "}
                                                                    <span className="font-medium text-gray-900">{a.comments}</span>
                                                                </p>

                                                                <button
                                                                    onClick={() => handleFlagAssessment(index)}
                                                                    className="mt-2 text-red-600"
                                                                >
                                                                    Flag Assessment
                                                                </button>
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
                                                    .filter(w => !w.flagged)
                                                    .map((w, index) => (
                                                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                <p className="text-gray-600">
                                                                    Work Plan:{" "}
                                                                    <span className="font-medium text-gray-900">{w.work_plan}</span>
                                                                </p>
                                                                <p className="text-gray-600">
                                                                    Base Crop:{" "}
                                                                    <span className="font-medium text-gray-900">{w.base_crop}</span>
                                                                </p>
                                                                <p className="text-gray-600">
                                                                    Farmer Date:{" "}
                                                                    <span className="font-medium text-gray-900">{w.farmer_date}</span>
                                                                </p>
                                                                <p className="text-gray-600">
                                                                    Officer Date:{" "}
                                                                    <span className="font-medium text-gray-900">{w.officer_date}</span>
                                                                </p>
                                                            </div>

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
                                                                                            <th className="border border-gray-300 px-4 py-2">
                                                                                                Activity
                                                                                            </th>
                                                                                            <th className="border border-gray-300 px-4 py-2">
                                                                                                Man Days
                                                                                            </th>
                                                                                            <th className="border border-gray-300 px-4 py-2">
                                                                                                Weeks
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {Object.entries(activities).map(
                                                                                            ([activity, details], activityIndex) => (
                                                                                                <tr
                                                                                                    key={activityIndex}
                                                                                                    className="even:bg-gray-50"
                                                                                                >
                                                                                                    <td className="border border-gray-300 px-4 py-2">
                                                                                                        {activity}
                                                                                                    </td>
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
                                                                                            )
                                                                                        )}
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
                                                                <button
                                                                    onClick={() => handleFlagWorkplan(index)}
                                                                    className="mt-2 text-red-600"
                                                                >
                                                                    Flag Workplan
                                                                </button>
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
                {/* Sync Modal */}
                {syncModalOpen && syncResults && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">Sync Data</h2>
                                <p className="mb-6">
                                    We found differences between your local data and the Firebase database.
                                </p>

                                {/* New Users */}
                                {syncResults.newUsers.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-2">New Users</h3>
                                        <p className="mb-2">The following users will be added to your local data:</p>
                                        <ul className="list-disc pl-6 mb-4">
                                            {syncResults.newUsers.map((user) => (
                                                <li key={user}>{user}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* New Farmers */}
                                {Object.keys(syncResults.newFarmers).length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-2">New Farmers</h3>
                                        <p className="mb-2">
                                            The following new farmers will be added to your local data:
                                        </p>
                                        {Object.keys(syncResults.newFarmers).map((user) => (
                                            <div key={user} className="mb-4">
                                                <h4 className="font-medium">{user}</h4>
                                                <ul className="list-disc pl-6">
                                                    {syncResults.newFarmers[user].map((farmer) => (
                                                        <li key={farmer.id}>
                                                            {farmer.farmer_name} (ID: {farmer.farmer_id})
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Disputed Farmers - Now with field-level choices */}
                                {Object.keys(syncResults.disputedFarmers).length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-2">Disputed Farmers</h3>
                                        <p className="mb-2">
                                            The following farmers have different data in Firebase. Choose which fields to update:
                                        </p>
                                        {Object.keys(syncResults.disputedFarmers).map((user) => (
                                            <div key={user} className="mb-6">
                                                <h4 className="font-medium text-lg mb-2">{user}</h4>
                                                <div className="space-y-6 mt-2">
                                                    {syncResults.disputedFarmers[user].map((item) => {
                                                        const differences = getFieldDifferences(item.local, item.firebase);
                                                        return (
                                                            <div key={item.firebase.id} className="border rounded-lg p-4">
                                                                <h5 className="font-medium text-lg mb-4 pb-2 border-b">
                                                                    {item.firebase.farmer_name} (ID: {item.firebase.farmer_id})
                                                                </h5>

                                                                {differences.length === 0 ? (
                                                                    <p>No field differences detected.</p>
                                                                ) : (
                                                                    <div className="space-y-4">
                                                                        {differences.map((diff, index) => (
                                                                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 border-b pb-4">
                                                                                <div className="font-medium">
                                                                                    {diff.key}
                                                                                </div>
                                                                                <div className="grid grid-cols-2 col-span-2 gap-4">
                                                                                    <div className="space-y-1">
                                                                                        <div className="text-sm text-gray-500">Local</div>
                                                                                        <div className={`p-2 rounded ${!disputedFieldChoices[user]?.[item.firebase.id]?.[diff.key] ||
                                                                                            disputedFieldChoices[user]?.[item.firebase.id]?.[diff.key] === 'local'
                                                                                            ? 'bg-blue-50 border border-blue-200'
                                                                                            : 'bg-gray-50'
                                                                                            }`}>
                                                                                            {diff.localValue === undefined ? "Not set" :
                                                                                                typeof diff.localValue === 'object' ? JSON.stringify(diff.localValue) :
                                                                                                    String(diff.localValue)}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <div className="text-sm text-gray-500">Firebase</div>
                                                                                        <div className={`p-2 rounded ${disputedFieldChoices[user]?.[item.firebase.id]?.[diff.key] === 'firebase'
                                                                                            ? 'bg-blue-50 border border-blue-200'
                                                                                            : 'bg-gray-50'
                                                                                            }`}>
                                                                                            {diff.firebaseValue === undefined ? "Not set" :
                                                                                                typeof diff.firebaseValue === 'object' ? JSON.stringify(diff.firebaseValue) :
                                                                                                    String(diff.firebaseValue)}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex justify-end space-x-2 col-span-3">
                                                                                    <button
                                                                                        onClick={() => handleFieldChoice(user, item.firebase.id, diff.key, 'local')}
                                                                                        className={`px-3 py-1 rounded ${!disputedFieldChoices[user]?.[item.firebase.id]?.[diff.key] ||
                                                                                            disputedFieldChoices[user]?.[item.firebase.id]?.[diff.key] === 'local'
                                                                                            ? 'bg-blue-500 text-white'
                                                                                            : 'bg-gray-200 text-gray-800'
                                                                                            }`}
                                                                                    >
                                                                                        Keep Local
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => handleFieldChoice(user, item.firebase.id, diff.key, 'firebase')}
                                                                                        className={`px-3 py-1 rounded ${disputedFieldChoices[user]?.[item.firebase.id]?.[diff.key] === 'firebase'
                                                                                            ? 'bg-blue-500 text-white'
                                                                                            : 'bg-gray-200 text-gray-800'
                                                                                            }`}
                                                                                    >
                                                                                        Use Firebase
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-end space-x-4">
                                    <button
                                        onClick={() => {
                                            setSyncModalOpen(false);
                                            setSyncData(null);
                                            setSyncResults(null);
                                            setDisputedFieldChoices({});
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={applySyncDecisions}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Apply Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
// Instead of Delete Use Flagging
// Allow input and output of JSon
// Setup new firebase for viewing 
// Create report based on how many were filled out  when and by who
export default Index;