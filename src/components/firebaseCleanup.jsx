const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.cleanupOldUserEntries = functions.pubsub
  .schedule('every 4 hours')
  .onRun(async () => {
    const db = admin.firestore();

    try {
      const currentTime = admin.firestore.Timestamp.now();
      const twentyFourHoursAgo = new Date(currentTime.toMillis() - 24 * 60 * 60 * 1000);
      console.log("Current Time:", currentTime.toDate());
      console.log("Timestamp to compare:", twentyFourHoursAgo);

      const snapshot = await db.collection("userEntries").get();

      if (snapshot.empty) {
        console.log("No documents found in userEntries.");
        return null;
      }

      const batch = db.batch();
      let deleteCount = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.lastEntry && data.lastEntry.toDate() < twentyFourHoursAgo) {
          console.log(`Marking ${doc.id} for deletion. Created at: ${data.lastEntry.toDate()}`);
          batch.delete(doc.ref);
          deleteCount++;
        }
      });

      if (deleteCount > 0) {
        await batch.commit();
        console.log(`Successfully deleted ${deleteCount} old entries.`);
      } else {
        console.log("No entries older than 24 hours found.");
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  });