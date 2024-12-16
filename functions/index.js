const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.cleanupOldEntries = functions.pubsub
  .schedule('every 4 hours')
  .onRun(async () => {
    const db = admin.firestore();
    const currentTime = admin.firestore.Timestamp.now();
    const twentyFourHoursAgo = new Date(currentTime.toMillis() - 24 * 60 * 60 * 1000);

    console.log("Current Time:", currentTime.toDate());
    console.log("Timestamp to compare for userEntries:", twentyFourHoursAgo);

    try {
      // Cleanup `userEntries`
      const userEntriesSnapshot = await db.collection("userEntries").get();
      let userEntriesDeletedCount = 0;

      if (!userEntriesSnapshot.empty) {
        const userBatch = db.batch();

        userEntriesSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.lastEntry && data.lastEntry.toDate() < twentyFourHoursAgo) {
            console.log(`Deleting user entry: ${doc.id}`);
            userBatch.delete(doc.ref);
            userEntriesDeletedCount++;
          }
        });

        if (userEntriesDeletedCount > 0) {
          await userBatch.commit();
          console.log(`Deleted ${userEntriesDeletedCount} old user entries.`);
        } else {
          console.log("No user entries older than 24 hours found.");
        }
      } else {
        console.log("No documents found in userEntries.");
      }

      // Cleanup `passEntries`
      console.log("Checking for expired pass entries...");
      const passEntriesSnapshot = await db.collection("passEntries").get();
      let passEntriesDeletedCount = 0;

      if (!passEntriesSnapshot.empty) {
        const passBatch = db.batch();

        passEntriesSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.expiryDate && data.expiryDate.toDate() <= currentTime.toDate()) {
            console.log(`Deleting pass entry: ${doc.id}`);
            passBatch.delete(doc.ref);
            passEntriesDeletedCount++;
          }
        });

        if (passEntriesDeletedCount > 0) {
          await passBatch.commit();
          console.log(`Deleted ${passEntriesDeletedCount} expired pass entries.`);
        } else {
          console.log("No expired pass entries found.");
        }
      } else {
        console.log("No documents found in passEntries.");
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  });