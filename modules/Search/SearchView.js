import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { zingmp3Api } from "../../apis/constants";
import axios from "axios";
import { IconVerticalThreeDot } from "../../components/icon";
import { Image } from "react-native";
import {
    setAudioUrl,
    setCurrentProgress,
    setCurrentSongIndex,
    setIsPlaying,
    setPlayerData,
    setPlaylist,
    setRadioUrl,
    setShowPlayer,
} from "../../redux-toolkit/playerSlice";

export default function SearchView({ navigation }) {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.search.value);
    const [data, setData] = React.useState({});
    const [activeOption, setActiveOption] = React.useState("all");
    React.useEffect(() => {
        async function fetchSearchData() {
            const res = await axios.get(
                zingmp3Api.getSearchAllKeyApi(searchValue)
            );
            const data = res.data;
            setData(data.data);
        }
        fetchSearchData();
    }, [searchValue]);
    return (
        <>
            {!searchValue && (
                <View style={styles.container}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            fontWeight: 700,
                            marginBottom: 10,
                        }}
                    >
                        Play what you like
                    </Text>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: 400,
                            textAlign: "center",
                        }}
                    >
                        Search for artists, songs, radio stations, and more
                        content
                    </Text>
                </View>
            )}
            {searchValue && (
                <View
                    style={{
                        backgroundColor: "#000",
                        flex: 1,
                        alignItems: "center",
                        overflow: "scroll",
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 0,
                            right: 0,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 10,
                        }}
                    >
                        <SearchOptionItem
                            title="All"
                            isActive={activeOption === "all"}
                            onPress={() => setActiveOption("all")}
                        />
                        <SearchOptionItem
                            title="Songs"
                            isActive={activeOption === "Songs"}
                            onPress={() => setActiveOption("Songs")}
                        />
                        <SearchOptionItem
                            title="Artist"
                            isActive={activeOption === "Artist"}
                            onPress={() => setActiveOption("Artist")}
                        />
                        <SearchOptionItem
                            title="Playlist"
                            isActive={activeOption === "Playlist"}
                            onPress={() => setActiveOption("Playlist")}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginTop: 50,
                            width: "100%",
                            padding: 15,
                        }}
                    >
                        {activeOption === "all" && (
                            <>
                                <SongItem
                                    data={data.top}
                                    onPress={() => {
                                        dispatch(setCurrentSongIndex(0));
                                        dispatch(setCurrentProgress(0));
                                        dispatch(setPlaylist([]));
                                        dispatch(setPlayerData(data.top));
                                        dispatch(setAudioUrl(""));
                                        dispatch(setRadioUrl(""));
                                        dispatch(setShowPlayer(true));
                                        dispatch(setIsPlaying(true));
                                    }}
                                ></SongItem>
                                {data?.artists
                                    ?.slice(0, 10)
                                    .map((item, index) => {
                                        return (
                                            <ArtistItem
                                                data={item}
                                                key={index}
                                                onPress={() => {
                                                    dispatch(
                                                        setIsPlaying(false)
                                                    );
                                                    dispatch(
                                                        setCurrentProgress(0)
                                                    );
                                                    navigation.navigate(
                                                        "Artist",
                                                        {
                                                            id: item.playlistId,
                                                        }
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                                {data?.songs
                                    ?.slice(0, 10)
                                    .map((item, index) => {
                                        return (
                                            <SongItem
                                                data={item}
                                                key={index}
                                                onPress={() => {
                                                    dispatch(
                                                        setCurrentSongIndex(0)
                                                    );
                                                    dispatch(
                                                        setCurrentProgress(0)
                                                    );
                                                    dispatch(setPlaylist([]));
                                                    dispatch(
                                                        setPlayerData(item)
                                                    );
                                                    dispatch(setAudioUrl(""));
                                                    dispatch(setRadioUrl(""));
                                                    dispatch();
                                                    setShowPlayer(true);
                                                    dispatch(
                                                        setIsPlaying(true)
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                                {data?.playlists
                                    ?.slice(0, 10)
                                    .map((item, index) => {
                                        return (
                                            <PlaylistItem
                                                data={item}
                                                key={index}
                                                onPress={() => {
                                                    dispatch(
                                                        setIsPlaying(false)
                                                    );
                                                    dispatch(
                                                        setCurrentProgress(0)
                                                    );
                                                    navigation.navigate(
                                                        "PlayList",
                                                        {
                                                            id: item.encodeId,
                                                        }
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                            </>
                        )}
                        {activeOption === "Songs" && (
                            <>
                                <SongItem
                                    data={data.top}
                                    onPress={() => {
                                        dispatch(setCurrentSongIndex(0));
                                        dispatch(setCurrentProgress(0));
                                        dispatch(setPlaylist([]));
                                        dispatch(setPlayerData(data.top));
                                        dispatch(setAudioUrl(""));
                                        dispatch(setRadioUrl(""));
                                        dispatch(setShowPlayer(true));
                                        dispatch(setIsPlaying(true));
                                    }}
                                ></SongItem>
                                {data?.songs
                                    ?.slice(0, 20)
                                    .map((item, index) => {
                                        return (
                                            <SongItem
                                                data={item}
                                                key={index}
                                                onPress={() => {
                                                    dispatch(
                                                        setCurrentSongIndex(0)
                                                    );
                                                    dispatch(
                                                        setCurrentProgress(0)
                                                    );
                                                    dispatch(setPlaylist([]));
                                                    dispatch(
                                                        setPlayerData(item)
                                                    );
                                                    dispatch(setAudioUrl(""));
                                                    dispatch(setRadioUrl(""));
                                                    dispatch(
                                                        setShowPlayer(true)
                                                    );
                                                    dispatch(
                                                        setIsPlaying(true)
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                            </>
                        )}
                        {activeOption === "Artist" && (
                            <>
                                {data?.artists
                                    ?.slice(0, 20)
                                    .map((item, index) => {
                                        return (
                                            <ArtistItem
                                                data={item}
                                                key={index}
                                                onPress={() => {
                                                    dispatch(
                                                        setIsPlaying(false)
                                                    );
                                                    dispatch(
                                                        setCurrentProgress(0)
                                                    );
                                                    navigation.navigate(
                                                        "Artist",
                                                        {
                                                            id: item.playlistId,
                                                        }
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                            </>
                        )}
                        {activeOption === "Playlist" && (
                            <>
                                {data?.playlists
                                    ?.slice(0, 20)
                                    .map((item, index) => {
                                        return (
                                            <PlaylistItem
                                                data={item}
                                                key={index}
                                                onPress={() => {
                                                    dispatch(
                                                        setIsPlaying(false)
                                                    );
                                                    dispatch(
                                                        setCurrentProgress(0)
                                                    );
                                                    navigation.navigate(
                                                        "PlayList",
                                                        {
                                                            id: item.encodeId,
                                                        }
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                            </>
                        )}
                    </View>
                </View>
            )}
        </>
    );
}

function SearchOptionItem({ title, onPress, isActive = false }) {
    return (
        <Pressable
            onPress={onPress}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: 100,
                height: 40,
                borderRadius: 9999,
                backgroundColor: isActive ? "#1fdf64" : "#272727",
            }}
        >
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: isActive ? "black" : "white",
                }}
            >
                {title}
            </Text>
        </Pressable>
    );
}

function SongItem({ data, onPress }) {
    if (!data) return null;
    return (
        <Pressable
            onPress={onPress}
            style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                }}
            >
                <Image
                    style={{ width: 50, height: 50, borderRadius: 5 }}
                    source={{ uri: data.thumbnailM }}
                ></Image>
                <View
                    style={{
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "white",
                        }}
                    >
                        {data.title}
                    </Text>
                    <Text
                        style={{ fontSize: 14, fontWeight: 500, color: "gray" }}
                    >
                        Bài hát • {data.artistsNames}
                    </Text>
                </View>
            </View>
            <Pressable>
                <IconVerticalThreeDot fill="#fff" />
            </Pressable>
        </Pressable>
    );
}

function ArtistItem({ data, onPress }) {
    if (!data) return null;
    return (
        <Pressable
            onPress={onPress}
            style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                }}
            >
                <Image
                    style={{ width: 50, height: 50, borderRadius: 9999 }}
                    source={{ uri: data.thumbnailM }}
                ></Image>
                <View
                    style={{
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "white",
                        }}
                    >
                        {data.name}
                    </Text>
                    <Text
                        style={{ fontSize: 14, fontWeight: 500, color: "gray" }}
                    >
                        Nghệ sĩ
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

function PlaylistItem({ data, onPress }) {
    if (!data) return null;
    return (
        <Pressable
            onPress={onPress}
            style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                }}
            >
                <Image
                    style={{ width: 50, height: 50, borderRadius: 5 }}
                    source={{ uri: data.thumbnail }}
                ></Image>
                <View
                    style={{
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "white",
                        }}
                    >
                        {data.title}
                    </Text>
                    <Text
                        style={{ fontSize: 14, fontWeight: 500, color: "gray" }}
                    >
                        Danh sách phát
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
