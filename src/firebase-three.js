import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, remove, onValue } from "firebase/database";

// Your Firebase configuration for the third database
// Replace these values with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBGJfq266hixikyRL2OoWNdse8_6puqA48",
    authDomain: "farmer-assessment-view.firebaseapp.com",
    databaseURL: "https://farmer-assessment-view-default-rtdb.firebaseio.com",
    projectId: "farmer-assessment-view",
    storageBucket: "farmer-assessment-view.firebasestorage.app",
    messagingSenderId: "187215425453",
    appId: "1:187215425453:web:cef88122020c170473bb24"
};

// Initialize the third Firebase app with a unique name
const app = initializeApp(firebaseConfig, "firebase-three");
const database = getDatabase(app);

// Helper functions for Firebase operations
const firebaseThreeHelpers = {
    async saveUsers(users) {
        try {
            await set(ref(database, 'users'), users);
            return true;
        } catch (error) {
            console.error("Error saving users to Firebase:", error);
            return false;
        }
    },

    async getUsers() {
        try {
            const snapshot = await get(ref(database, 'users'));
            return snapshot.exists() ? snapshot.val() : [];
        } catch (error) {
            console.error("Error getting users from Firebase:", error);
            return [];
        }
    },

    // async saveFarmers(user, farmers) {
    //     try {
    //         // Create an object to store farmers with sanitized keys
    //         const farmerData = {};

    //         // Create updates object for batch update
    //         const updates = {};

    //         // Process each farmer
    //         for (const farmer of farmers) {
    //             const { id, farmer_name } = farmer;

    //             // Sanitize key for Firebase
    //             const sanitizedKey = `${farmer_name} ${id}`
    //                 .replace(/\./g, '_')
    //                 .replace(/\#/g, '_')
    //                 .replace(/\$/g, '_')
    //                 .replace(/\//g, '_')
    //                 .replace(/\[/g, '_')
    //                 .replace(/\]/g, '_');

    //             // Add to farmers data
    //             farmerData[sanitizedKey] = farmer;
    //         }

    //         // Add the entire farmers object to updates
    //         updates[`${user}/farmers`] = farmerData;

    //         // Update Firebase with all farmers at once
    //         await update(ref(database), updates);
    //         return true;
    //     } catch (error) {
    //         console.error(`Error saving farmers for user ${user} to Firebase:`, error);
    //         return false;
    //     }
    // },
    async saveFarmers(user, farmers) {
        try {
            // Create an object to store farmers with sanitized keys
            const farmerData = {};

            // Process each farmer
            for (const farmer of farmers) {
                const { id, farmer_name, workplan, ...otherData } = farmer;

                // Sanitize key for Firebase
                const sanitizedKey = `${farmer_name} ${id}`
                    .replace(/\./g, '_')
                    .replace(/\#/g, '_')
                    .replace(/\$/g, '_')
                    .replace(/\//g, '_')
                    .replace(/\[/g, '_')
                    .replace(/\]/g, '_');

                // Create a clean farmer object without undefined values
                const cleanFarmer = {
                    id,
                    farmer_name,
                    workplan: workplan || null, // Replace undefined with null
                    ...otherData
                };

                // Remove any remaining undefined values
                Object.keys(cleanFarmer).forEach(key => {
                    if (cleanFarmer[key] === undefined) {
                        cleanFarmer[key] = null;
                    }
                });

                // Add to farmers data
                farmerData[sanitizedKey] = cleanFarmer;
            }

            // Create updates object for batch update
            const updates = {
                [`${user}/farmers`]: farmerData
            };

            // Update Firebase with all farmers at once
            await update(ref(database), updates);
            return true;
        } catch (error) {
            console.error(`Error saving farmers for user ${user} to Firebase:`, error);
            return false;
        }
    },
    async getFarmers(user) {
        try {
            const snapshot = await get(ref(database, `${user}/farmers`));

            if (snapshot.exists()) {
                // Convert object to array
                const farmersObject = snapshot.val();
                const farmersArray = Object.keys(farmersObject).map(key => ({
                    ...farmersObject[key]
                }));

                return farmersArray;
            }

            return [];
        } catch (error) {
            console.error(`Error getting farmers for user ${user} from Firebase:`, error);
            return [];
        }
    },

    async getFarmersByIds(user, ids) {
        try {
            if (!ids || ids.length === 0) return [];

            const snapshot = await get(ref(database, `${user}/farmers`));
            if (!snapshot.exists()) return [];

            const farmersObject = snapshot.val();
            const farmers = [];

            // Find farmers by ID in the object
            for (const key in farmersObject) {
                const farmer = farmersObject[key];
                if (ids.includes(farmer.id)) {
                    farmers.push(farmer);
                }
            }

            return farmers;
        } catch (error) {
            console.error("Error getting farmers by IDs from Firebase:", error);
            return [];
        }
    },

    async getAllData() {
        try {
            // Get users
            const usersSnapshot = await get(ref(database, 'users'));
            const users = usersSnapshot.exists() ? usersSnapshot.val() : [];

            // Get farmers data for each user
            const farmersData = {};

            for (const user of users) {
                const farmersSnapshot = await get(ref(database, `${user}/farmers`));

                if (farmersSnapshot.exists()) {
                    // Convert object to array
                    const farmersObject = farmersSnapshot.val();
                    farmersData[user] = Object.keys(farmersObject).map(key => ({
                        ...farmersObject[key]
                    }));
                } else {
                    farmersData[user] = [];
                }
            }

            return { users, farmersData };
        } catch (error) {
            console.error("Error getting all data from Firebase:", error);
            return { users: [], farmersData: {} };
        }
    },

    async clearAllData() {
        try {
            await remove(ref(database));
            return true;
        } catch (error) {
            console.error("Error clearing Firebase database:", error);
            return false;
        }
    },

    // Listen for changes to a specific user's farmers
    listenToUserFarmers(user, callback) {
        const farmersRef = ref(database, `${user}/farmers`);
        return onValue(farmersRef, (snapshot) => {
            if (snapshot.exists()) {
                const farmersObject = snapshot.val();
                const farmersArray = Object.keys(farmersObject).map(key => ({
                    ...farmersObject[key]
                }));
                callback(farmersArray);
            } else {
                callback([]);
            }
        });
    },

    // Listen for changes to all users
    listenToUsers(callback) {
        const usersRef = ref(database, 'users');
        return onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            } else {
                callback([]);
            }
        });
    },

    // Upload formatted data directly to Firebase, similar to the uploadDatabaseToFirebase function
    async uploadFormattedData(userData) {
        try {
            // Check if userData is valid
            if (!userData || Object.keys(userData).length === 0) {
                console.error("No valid user data to upload");
                return false;
            }

            // Process updates in batches
            const updates = {};

            // Add each user's farmers data to updates
            for (const user in userData) {
                if (userData[user].farmers) {
                    updates[`${user}/farmers`] = userData[user].farmers;
                }
            }

            // Update all paths at once
            await update(ref(database), updates);
            console.log("Data uploaded to Firebase Three successfully");
            return true;
        } catch (error) {
            console.error("Error uploading formatted data to Firebase Three:", error);
            return false;
        }
    }
};

export { database, ref, onValue, firebaseThreeHelpers };
