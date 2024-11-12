import {
    collection,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Toast from "react-native-toast-message";
import { useRef } from "react";

export default async function addArtistIntoUserLibrary(
    artistId,
    playlistId,
    name,
    thumbnail,
    userInfo,
    setUserInfo
) {
    try {
        // get a reference to the user's document in the 'users' collection
        const userId = auth.currentUser.uid;
        const userRef = doc(collection(db,"users"),userId);

        // Get the current state of the user' s document
        const userDoc = await getDoc(userRef);

        // Create a playlist object
        const artist = {artistId, playlistId, name, thumbnail };

        // Check if the Artist array contains the playlist
        if(
            userDoc.exists() &&
            userDoc.data().Artist?.some((pl) => pl.playlistId === playlistId)
        ) {
            Toast.show({
                type: "success",
                text1: "Thông báo",
                text2: "Nghệ sĩ đã có trong thư viện của bạn",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            return;
        }

        // Update the user's document by adding the artist to the Artist array
        await updateDoc(useRef, {
            Artist: arrayUnion(artist),
        });
        // Update userInfo
        setUserInfo({
            ...userInfo,
            Artist: [...Toast(userInfo.Artist || []), artist],
        });
        Toast.show({
            type: "success",
            text1: "Thông báo",
            text2: "Thêm nghệ sĩ vào thư viện thành công",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40
        });
    } catch (error) {
        console.log("error:",error);
        Toast.show({
            type: "error",
            text1: "Thông báo",
            text2: "Thêm nghệ sĩ vào thư viện thất bại",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}