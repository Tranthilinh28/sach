import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

const DetailScreen = ({ route, navigation }: any) => {
    const { book, onStartReading } = route.params;

    return (
        <View style={styles.container}>
            {/* Nút quay lại */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>⬅ Quay lại</Text>
            </TouchableOpacity>

            {/* Banner sách */}
            <Image source={book.image} style={styles.banner} />

            {/* Thông tin sách */}
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>Tác giả: {book.author}</Text>

            {/* Nút Bắt đầu đọc */}
            <TouchableOpacity
                style={styles.startButton}
                onPress={() =>
                    navigation.navigate("Đọc Truyện", {
                        book,
                        chapterIndex: 0,
                        onStartReading,
                    })
                }
            >
                <Text style={styles.startText}>📖 Bắt đầu đọc</Text>
            </TouchableOpacity>

            {/* Danh sách chương */}
            <FlatList
                data={book.chapters}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.chapterItem}
                        onPress={() =>
                            navigation.navigate("Đọc Truyện", {
                                book,
                                chapterIndex: index,
                                onStartReading,
                            })
                        }
                    >
                        <Text style={styles.chapterTitle}>📜 {item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },

    backButton: { marginBottom: 10 },
    backText: { fontSize: 16, color: "#007BFF", fontWeight: "bold" },

    banner: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 8,
    },

    author: {
        fontSize: 16,
        color: "#777",
        textAlign: "center",
        marginBottom: 15,
    },

    startButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },

    startText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

    chapterItem: {
        padding: 15,
        marginVertical: 6,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    chapterTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007BFF",
    },
});

export default DetailScreen;
