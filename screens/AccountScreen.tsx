import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = ({ navigation, route }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const loadLoginState = async () => {
            try {
                const storedLoginState = await AsyncStorage.getItem("isLoggedIn");
                const storedUsername = await AsyncStorage.getItem("username");

                if (storedLoginState === "true") {
                    setIsLoggedIn(true);
                    setUsername(storedUsername || "");
                }
            } catch (error) {
                console.error("Lỗi khi tải trạng thái đăng nhập:", error);
            }
        };

        loadLoginState();
    }, []);

    useEffect(() => {
        if (route.params?.username) {
            setUsername(route.params.username);
            setIsLoggedIn(true);

            AsyncStorage.setItem(
                "isLoggedIn",
                JSON.stringify(true)
            );
            AsyncStorage.setItem("username", route.params.username);
        }
    }, [route.params?.username]);

    const handleLogout = () => {
        Alert.alert(
            "Đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Đồng ý",
                    onPress: async () => {
                        await AsyncStorage.multiRemove(["isLoggedIn", "username"]);
                        setUsername("");
                        setIsLoggedIn(false);
                        navigation.navigate("Trang Chủ");
                    }
                }
            ]
        );
    };

    const handleViewReviews = () => {
        if (isLoggedIn) {
            navigation.navigate("Xem Đánh Giá");
        } else {
            Alert.alert(
                "Yêu cầu đăng nhập",
                "Bạn cần đăng nhập để xem đánh giá.",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Đăng nhập", onPress: () => navigation.navigate("Đăng Nhập") },
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {!isLoggedIn && (
                    <View style={styles.bannerContainer}>
                        <Image
                            source={require("../assets/banner.png")}
                            style={styles.banner}
                        />
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => navigation.navigate("Đăng Ký")}
                        >
                            <Text style={styles.registerText}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {isLoggedIn && (
                    <View style={styles.card}>
                        <Image
                            source={require("../assets/banner.png")}
                            style={styles.avatar}
                        />
                        <Text style={styles.username}>Xin chào, {username}!</Text>

                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutText}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => navigation.navigate("Tủ Sách")}
                >
                    <Text style={styles.navigationText}>📚 Tủ sách</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={handleViewReviews}
                >
                    <Text style={styles.navigationText}>⭐ Xem đánh giá</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => navigation.navigate("Giới Thiệu")}
                >
                    <Text style={styles.navigationText}>ℹ️ Giới thiệu</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => navigation.navigate("Chính Sách")}
                >
                    <Text style={styles.navigationText}>🔒 Chính sách bảo mật</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate("Trang Chủ")}>
                    <Text style={styles.footerText}>🏠 Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Khám Phá")}>
                    <Text style={styles.footerText}>🌍 Khám phá</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Tài Khoản")}>
                    <Text style={[styles.footerText, styles.activeFooterText]}>
                        👤 Tài khoản
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    scrollContainer: { padding: 20 },
    bannerContainer: { alignItems: "center", marginBottom: 20 },
    banner: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        borderRadius: 10,
    },
    registerButton: {
        position: "absolute",
        top: "50%",
        alignSelf: "center",
        backgroundColor: "#4CAF50",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    registerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    username: { fontSize: 20, fontWeight: "bold", marginBottom: 15, color: "#333" },
    logoutButton: {
        backgroundColor: "#FF6347",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    navigationItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    navigationText: { fontSize: 16, fontWeight: "bold", color: "#555" },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    activeFooterText: {
        color: "#4CAF50",
        textDecorationLine: "underline",
    },
    footerText: { fontSize: 16, color: "#333" },
});

export default AccountScreen;
