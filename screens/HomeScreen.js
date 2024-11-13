import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    StyleSheet,
    Pressable,
} from "react-native";
import { getHomePage } from "../apis/home";
import { useDispatch } from "react-redux";
import Header from "../modules/Search/Header";
import SkeletonContent from "react-native-skeleton-content";

export default function HomeScreen({ navigation }) {
    const [homeData, setHomeData] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHomePage();
                const items = data.data.items;

                const organizedData = items.reduce((acc, item) => {
                    const { sectionType, title, ...rest } = item;

                    if (
                        sectionType === "new-release" ||
                        sectionType === "playlist"
                    ) {
                        acc.push({ sectionType, title, ...rest });
                    }

                    return acc;
                }, []);

                setHomeData(organizedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <SkeletonContent
                containerStyle={{ flex: 1 }}
                isLoading={homeData === null}
                layout={[
                    {
                        key: "section0",
                        width: "100%",
                        height: 50,
                        marginBottom: 30,
                    },
                    {
                        key: "section1",
                        marginBottom: 20,
                        children: [
                            {
                                key: "sectionTitle1",
                                width: "50%",
                                height: 20,
                                marginBottom: 10,
                            },
                            {
                                key: "itemList1",
                                width: "100%",
                                height: 200,
                                flexDirection: "row",
                                children: [
                                    {
                                        key: "item1",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                    {
                                        key: "item2",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        key: "section2",
                        marginBottom: 20,
                        children: [
                            {
                                key: "sectionTitle2",
                                width: "50%",
                                height: 20,
                                marginBottom: 10,
                            },
                            {
                                key: "itemList2",
                                width: "100%",
                                height: 200,
                                flexDirection: "row",
                                children: [
                                    {
                                        key: "item1",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                    {
                                        key: "item2",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        key: "section3",
                        marginBottom: 20,
                        children: [
                            {
                                key: "sectionTitle3",
                                width: "50%",
                                height: 20,
                                marginBottom: 10,
                            },
                            {
                                key: "itemList3",
                                width: "100%",
                                height: 200,
                                flexDirection: "row",
                                children: [
                                    {
                                        key: "item1",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                    {
                                        key: "item2",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        key: "section4",
                        marginBottom: 20,
                        children: [
                            {
                                key: "sectionTitle4",
                                width: "50%",
                                height: 20,
                                marginBottom: 10,
                            },
                            {
                                key: "itemList4",
                                width: "100%",
                                height: 200,
                                flexDirection: "row",
                                children: [
                                    {
                                        key: "item1",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                    {
                                        key: "item2",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        key: "section5",
                        marginBottom: 20,
                        children: [
                            {
                                key: "sectionTitle5",
                                width: "50%",
                                height: 20,
                                marginBottom: 10,
                            },
                            {
                                key: "itemList5",
                                width: "100%",
                                height: 200,
                                flexDirection: "row",
                                children: [
                                    {
                                        key: "item1",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                    {
                                        key: "item2",
                                        width: 168,
                                        height: 200,
                                        marginRight: 10,
                                    },
                                ],
                            },
                        ],
                    },
                ]}
            >
                <Header title={getCurrentTime()} navigation={navigation} />
                <View style={styles.list}>
                    <FlatList
                        data={homeData}
                        renderItem={({ item }) => (
                            <View style={styles.section}>
                                
                            </View>
                        )}
                    />
                </View>
            </SkeletonContent>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1,
        padding: 15,
    },
    list: {
        flexDirection: "row",
    },
    section: {
        marginBottom: 12,
    },

});
