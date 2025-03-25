import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const ForgotPasswordScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert('Thông báo', 'Vui lòng nhập email!');
            return;
        }
        Alert.alert('Thành công', 'Đã gửi email khôi phục mật khẩu!');
        navigation.navigate('Đăng Nhập');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quên mật khẩu</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Gửi email khôi phục</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 15, borderColor: '#ddd' },
    button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default ForgotPasswordScreen;
