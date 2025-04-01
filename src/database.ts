import { openDB, type DBSchema, type IDBPDatabase } from "idb"

interface FarmerData {
  id: string
  user: string
  farmer_name: string
  farmer_id: string
  nutmeg_card_number: string
  phone_number?: string
  sex?: string
  age?: string
  verify?: any[]
  assessment?: any[]
  workplan?: any[]
  [key: string]: any // Allow for additional properties
}

interface FarmerDB extends DBSchema {
  farmers: {
    key: string
    value: FarmerData
    indexes: {
      "by-user": string
    }
  }
  users: {
    key: string
    value: string
  }
}

let db: IDBPDatabase<FarmerDB>

/**
 * Initialize the IndexedDB database
 */
export const initDB = async (): Promise<void> => {
  db = await openDB<FarmerDB>("farmers-db", 1, {
    upgrade(db) {
      // Create a store for farmers
      const farmerStore = db.createObjectStore("farmers", { keyPath: "id" })
      // Create an index to query farmers by user
      farmerStore.createIndex("by-user", "user")

      // Create a store for users
      db.createObjectStore("users", { keyPath: "name" })
    },
  })

  console.log("Database initialized")
}

/**
 * Save farmers data to IndexedDB
 */
export const saveFarmersData = async (user: string, farmers: FarmerData[]): Promise<void> => {
  if (!db) {
    console.error("Database not initialized")
    return
  }

  const tx = db.transaction(["farmers", "users"], "readwrite")

  // Add or update user
  await tx.objectStore("users").put({ name: user })

  // Add or update farmers
  const farmerStore = tx.objectStore("farmers")
  for (const farmer of farmers) {
    await farmerStore.put(farmer)
  }

  await tx.done
  console.log(`Saved ${farmers.length} farmers for user ${user}`)
}

/**
 * Get list of all users
 */
export const getUsersList = async (): Promise<string[]> => {
  if (!db) {
    console.error("Database not initialized")
    return []
  }

  const users = await db.getAll("users")
  return users.map((user) => user.name)
}

/**
 * Get farmers by user
 */
export const getFarmersByUser = async (user: string): Promise<FarmerData[]> => {
  if (!db) {
    console.error("Database not initialized")
    return []
  }

  const farmers = await db.getAllFromIndex("farmers", "by-user", user)
  return farmers
}

/**
 * Get farmer by ID
 */
export const getFarmerById = async (id: string): Promise<FarmerData | null> => {
  if (!db) {
    console.error("Database not initialized")
    return null
  }

  const farmer = await db.get("farmers", id)
  return farmer || null
}

/**
 * Clear all data from the database
 */
export const clearDatabase = async (): Promise<void> => {
  if (!db) {
    console.error("Database not initialized")
    return
  }

  const tx = db.transaction(["farmers", "users"], "readwrite")
  await tx.objectStore("farmers").clear()
  await tx.objectStore("users").clear()
  await tx.done

  console.log("Database cleared")
}

