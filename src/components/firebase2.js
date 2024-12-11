// firebase2.js

import { db } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const generateUUID = () => {
  const uuid = uuidv4().replace(/-/g, "");
  const uuidArray = new Uint8Array(
    uuid.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );
  return btoa(String.fromCharCode(...uuidArray)).substring(0, 16);
};

export async function FirebaseTestResult2(email, name) {
  const passEntry = doc(collection(db, "passEntries"), email);

  try {
    const passEntryDoc = await getDoc(passEntry);

    if (passEntryDoc.exists()) {
      return { allowed: true, message: "Pass entry already exists." };
    } else {
      await setDoc(passEntry, {
        name: name,
        email: email,
        test: "Passed",
        uuid: generateUUID(),
        passEntry: serverTimestamp(),
      });
      return { allowed: true, message: "New pass entry created." };
    }
  } catch (error) {
    console.error("Error updating passEntry: ", error);
    return {
      allowed: false,
      message: "Error connecting to server. Please try again !",
    };
  }
}
