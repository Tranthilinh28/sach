import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClearDataScreen = ({ navigation }: any) => {
    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Dữ liệu AsyncStorage đã được xóa!');
            Alert.alert('Xóa dữ liệu thành công!');
            navigation.replace('Trang Chủ'); // Quay lại màn hình Home
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bạn có muốn xóa toàn bộ dữ liệu không?</Text>
            <TouchableOpacity style={styles.button} onPress={clearAsyncStorage}>
                <Text style={styles.buttonText}>Xóa Dữ Liệu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    text: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
    button: { backgroundColor: 'red', padding: 10, borderRadius: 5 },
    buttonText: { color: 'white', fontWeight: 'bold' },
});

export default ClearDataScreen;
