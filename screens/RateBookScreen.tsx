import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RateBookScreen = ({ route, navigation }: any) => {
    const { book } = route.params;
    const [rating, setRating] = useState(""); // Điểm đánh giá
    const [review, setReview] = useState(""); // Nội dung đánh giá
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
    const [userEmail, setUserEmail] = useState(""); // Email người dùng

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const email = await AsyncStorage.getItem("userEmail");
            console.log("Email từ AsyncStorage:", email); // Kiểm tra giá trị userEmail
            if (email) {
                setIsLoggedIn(true);
                setUserEmail(email);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Lỗi kiểm tra trạng thái đăng nhập:", error);
        }
    };


    const handleSubmitReview = async () => {
        if (!rating || !review) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ đánh giá và điểm số.");
            return;
        }
        if (parseInt(rating) < 1 || parseInt(rating) > 5) {
            Alert.alert("Lỗi", "Điểm số phải nằm trong khoảng từ 1 đến 5.");
            return;
        }

        try {
            const reviews = await AsyncStorage.getItem(`reviews_${book.id}`);
            const updatedReviews = reviews ? JSON.parse(reviews) : [];
            updatedReviews.push({
                rating: parseInt(rating),
                review,
                userEmail,
                date: new Date().toISOString(),
            });

            await AsyncStorage.setItem(`reviews_${book.id}`, JSON.stringify(updatedReviews));
            Alert.alert("Thành công", "Cảm ơn bạn đã đánh giá!");
            navigation.goBack();
        } catch (error) {
            console.error("Lỗi khi lưu đánh giá:", error);
            Alert.alert("Lỗi", "Không thể lưu đánh giá của bạn, vui lòng thử lại.");
        }
    };

    if (!isLoggedIn) {
        return (
            <View style={styles.loginContainer}>
                <Text style={styles.loginMessage}>Bạn cần đăng nhập để đánh giá sách.</Text>
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
            <Text style={styles.title}>Đánh giá sách: {book.title}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập điểm số (1-5)"
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
            />
            <TextInput
                style={[styles.input, styles.reviewInput]}
                placeholder="Nhập đánh giá của bạn"
                multiline
                value={review}
                onChangeText={setReview}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
                <Text style={styles.submitButtonText}>Gửi Đánh Giá</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    reviewInput: { height: 100, textAlignVertical: "top" },
    submitButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
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

export default RateBookScreen;
