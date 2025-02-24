import  { MongoClient, ServerApiVersion } from "mongodb";

if(!process.env.DB_URI){
   throw new Error("DB_URI is required");
}

const client = new MongoClient(process.env.DB_URI,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})


async function getDb(dbName){
   try {
    await client.connect(dbName);
    console.log("Connect to database");
    return client.db(dbName);
   } catch (error) {
    
   }
}
export async function getCollection(collectionName){
    const db = await getDb("nextjs-todo");
    if(db){
        return db.collection(collectionName);
    }
 return null;
}