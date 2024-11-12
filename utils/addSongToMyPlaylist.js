import {
    collection,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { auth,db } from "./firebaseConfig";
import Toast from "react-native-toast-message";
import { useRef } from "react";
import { err } from "react-native-svg/lib/typescript/xml";

export async function addSongsToMyPlaylist(playlistId, songs) {
    try {
        const userId =  auth.currentUser.uid;
        const userRef = doc(collection(db, "users"),userId);
        const userDoc = await getDoc(userRef);
        
        if(!userDoc.exists()) {
            throw new Error("User document not found");
        }
        const existingMyPlaylistSongs = userDoc.data().MyPlaylistSongs || [];

        // Add the songs to the MyPlaylistSongs array
        const updateMyPlaylistSongs = arrayUnion(
            ...songs.map((song) => ({playlistId, song}))
        );

        // Update the user's document with the modified MyPlaylistSongs
        await updateDoc(useRef, {
            MyPlaylistSongs: updateMyPlaylistSongs,
        });

        return updateMyPlaylistSongs;
    } catch (error) {
        console.log("Error adding songs to MyPlaylistSongs: ",error);
        throw error;
    }
}