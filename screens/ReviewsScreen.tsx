import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Review {
    userEmail: string;
    rating: number;
    review: string;
    date: string;
}
const ReviewsScreen = ({ route, navigation }: any) => {
    const { book } = route.params; // Lấy thông tin sách từ route
    const [reviews, setReviews] =useState<Review[]>([]); // Danh sách đánh giá
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

    useEffect(() => {
        checkLoginStatus(); // Kiểm tra trạng thái đăng nhập
        loadReviews(); // Tải đánh giá
    }, []);

    // Kiểm tra trạng thái đăng nhập
    const checkLoginStatus = async () => {
        try {
            const userEmail = await AsyncStorage.getItem("userEmail");
            if (userEmail) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Lỗi kiểm tra trạng thái đăng nhập:", error);
        }
    };

    // Tải danh sách đánh giá từ AsyncStorage
    const loadReviews = async () => {
        try {
            const storedReviews = await AsyncStorage.getItem(`reviews_${book.id}`);
            setReviews(storedReviews ? JSON.parse(storedReviews) : []);
        } catch (error) {
            console.error("Lỗi khi tải đánh giá:", error);
            Alert.alert("Lỗi", "Không thể tải đánh giá, vui lòng thử lại.");
        }
    };

    if (!isLoggedIn) {
        return (
            <View style={styles.loginContainer}>
                <Text style={styles.loginMessage}>Bạn cần đăng nhập để xem đánh giá.</Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Đăng Nhập")}
                >
                    <Text style={styles.loginButtonText}>Đăng nhập ngay</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Đánh giá sách: {book.title}</Text>
            {reviews.length > 0 ? (
                <FlatList
                    data={reviews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewText}>
                                <Text style={{ fontWeight: "bold" }}>Người đánh giá: </Text>
                                {item.userEmail}
                            </Text>
                            <Text style={styles.reviewText}>
                                <Text style={{ fontWeight: "bold" }}>Đánh giá: </Text>
                                {item.rating}/5
                            </Text>
                            <Text style={styles.reviewText}>
                                <Text style={{ fontWeight: "bold" }}>Bình luận: </Text>
                                {item.review}
                            </Text>
                            <Text style={styles.reviewDate}>
                                Ngày đánh giá: {new Date(item.date).toLocaleDateString("vi-VN")}
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noReviewsText}>Chưa có đánh giá nào cho sách này.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    reviewItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    reviewText: { fontSize: 16, marginBottom: 5 },
    reviewDate: { fontSize: 14, color: "#555" },
    noReviewsText: { fontSize: 16, color: "#999", textAlign: "center", marginTop: 20 },
    loginContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    loginMessage: { fontSize: 18, color: "red", marginBottom: 15 },
    loginButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ReviewsScreen;
