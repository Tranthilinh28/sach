import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReadingScreen = ({ route, navigation }: any) => {
    const { book, chapterIndex, onStartReading } = route.params;
    const chapter = book.chapters[chapterIndex];
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Ban đầu chưa biết trạng thái
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const userEmail = await AsyncStorage.getItem("userEmail");
            setIsLoggedIn(!!userEmail); // true nếu có email, false nếu không
        } catch (error) {
            console.error("Lỗi khi kiểm tra đăng nhập:", error);
            setIsLoggedIn(false);
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    const handleRateBook = async () => {
        const userEmail = await AsyncStorage.getItem("userEmail");

        if (!userEmail) {
            Alert.alert(
                "Yêu cầu đăng nhập",
                "Bạn cần đăng nhập để đánh giá sách.",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Đăng nhập", onPress: () => navigation.navigate("Đăng Nhập") },
                ]
            );
        } else {
            navigation.navigate("Đánh Giá Sách", { book });
        }
    };


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>⬅ Quay lại</Text>
            </TouchableOpacity>
            <Text style={styles.chapterTitle}>{chapter.title}</Text>
            <ScrollView style={styles.contentContainer}>
                <Text style={styles.content}>{chapter.content}</Text>
            </ScrollView>
            <View style={styles.navigationButtons}>
                {chapterIndex > 0 && (
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={() =>
                            navigation.replace("Đọc Truyện", {
                                book,
                                chapterIndex: chapterIndex - 1,
                                onStartReading,
                            })
                        }
                    >
                        <Text style={styles.navButtonText}>◀ Chương {chapterIndex}</Text>
                    </TouchableOpacity>
                )}
                {chapterIndex < book.chapters.length - 1 ? (
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={() =>
                            navigation.replace("Đọc Truyện", {
                                book,
                                chapterIndex: chapterIndex + 1,
                                onStartReading,
                            })
                        }
                    >
                        <Text style={styles.navButtonText}>Chương {chapterIndex + 2} ▶</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.rateButton} onPress={handleRateBook}>
                        <Text style={styles.rateButtonText}>⭐ Đánh giá Sách</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    backButton: { fontSize: 16, color: "blue", marginBottom: 10 },
    chapterTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    contentContainer: { flex: 1 },
    content: { fontSize: 16, lineHeight: 24 },
    navigationButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
    navButton: {
        padding: 10,
        backgroundColor: "#4CAF50",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginHorizontal: 5,
    },
    navButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    rateButton: {
        padding: 10,
        backgroundColor: "#FFD700",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginHorizontal: 5,
    },
    rateButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ReadingScreen;
