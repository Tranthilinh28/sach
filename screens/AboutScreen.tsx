import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/banner.png")} style={styles.logo} />
            <Text style={styles.title}>📖 Ứng Dụng Đọc Sách</Text>
            <Text style={styles.description}>
                Ứng dụng giúp bạn dễ dàng đọc những cuốn sách có sẵn, đọc sách mọi lúc, mọi nơi. Khám phá hàng
                ngàn đầu sách hấp dẫn, quản lý sách đọc.........
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 15,
    },
});

export default AboutScreen;
