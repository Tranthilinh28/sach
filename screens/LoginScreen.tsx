import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const saveLoginData = async (email:any) => {
        try {
            await AsyncStorage.setItem('userEmail', email);
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu đăng nhập:', error);
        }
    };

    const handleLogin = () => {
        if (email.trim() === "" || password.trim() === "") {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin đăng nhập!");
        } else {
            Alert.alert("Thành công", `Chào mừng, ${email}!`);
            navigation.navigate("Tài Khoản", { username: email });
        }
        saveLoginData(email);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>Đăng nhập</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Quên Mật Khẩu")}>
                    <Text style={styles.linkText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Đăng Ký")}>
                    <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký ngay!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    card: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 15,
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    linkText: {
        marginTop: 15,
        fontSize: 14,
        color: "#4CAF50",
        textAlign: "center",
        textDecorationLine: "underline",
    },
});

export default LoginScreen;
