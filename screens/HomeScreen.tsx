import React, { useState,useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { books } from '../booksData';
import AsyncStorage from '@react-native-async-storage/async-storage';
type BookType = {
    id: string;
    title: string;
    author: string;
    image: any;
    chapters: { title: string; content: string }[];
};

const HomeScreen = ({ navigation }: any) => {
    const [currentlyReading, setCurrentlyReading] = useState<BookType[]>([]);
    const saveCurrentlyReading = async (books:any) => {
        try {
            await AsyncStorage.setItem('currentlyReading', JSON.stringify(books));
        } catch (error) {
            console.error('Lỗi khi lưu trạng thái:', error);
        }
    };
    useEffect(() => {
        const loadCurrentlyReading = async () => {
            try {
                const storedBooks = await AsyncStorage.getItem('currentlyReading');
                if (storedBooks) {
                    setCurrentlyReading(JSON.parse(storedBooks));
                }
            } catch (error) {
                console.error('Lỗi khi tải trạng thái:', error);
            }
        };
        loadCurrentlyReading();
    }, []);

    // Hàm thêm sách vào "Tủ Sách"
    const handleStartReading = (book: BookType) => {
        if (!currentlyReading.find((b) => b.id === book.id)) {
            setCurrentlyReading((prevBooks) => {
                const updatedBooks = [...prevBooks, book];
                saveCurrentlyReading(updatedBooks); // Lưu trạng thái
                return updatedBooks;
            });
        }
    };

    return (
        <View style={styles.container}>
            {/* Tiêu đề và banner */}
            <Text style={styles.header}>📚 Trang chủ</Text>
            <Image
                source={require('../assets/banner.png')} // Đảm bảo file banner có trong thư mục assets
                style={styles.banner}
            />

            {/* Danh sách sách với 2 cột */}
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.bookItem}
                        onPress={() =>
                            navigation.navigate('Chi Tiết', {
                                book: item,
                                onStartReading: handleStartReading, // Truyền hàm vào DetailScreen
                            })
                        }
                    >
                        <Image source={item.image} style={styles.bookImage} />
                        <Text style={styles.bookTitle}>{item.title}</Text>
                        <Text style={styles.bookAuthor}>Tác giả: {item.author}</Text>
                    </TouchableOpacity>
                )}
                numColumns={2} // Hiển thị 2 cột
                columnWrapperStyle={styles.columnWrapper} // Tùy chỉnh khoảng cách giữa các cột
            />

            {/* Nút điều hướng cố định ở cuối */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Trang Chủ')}>
                    <Text style={[styles.footerText, navigation.isFocused('Trang Chủ') && styles.activeFooterText]}>
                        🏠 Trang chủ
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Khám Phá')}>
                    <Text style={styles.footerText}>🌍 Khám phá</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Tài Khoản')}>
                    <Text style={styles.footerText}>👤 Tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' }, // Màu nền sáng hơn
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333', // Màu chữ đậm
    },
    banner: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Bóng đổ
    },
    bookItem: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#fff', // Nền trắng
        padding: 10,
        borderRadius: 10, // Bo góc sách
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Bóng đổ
        marginHorizontal: 5, // Khoảng cách ngang giữa các sách
    },
    bookImage: { width: 100, height: 150, marginBottom: 10, borderRadius: 5 }, // Hình ảnh nổi bật hơn
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // Màu chữ đậm
        textAlign: 'center',
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    columnWrapper: {
        justifyContent: 'space-between', // Giãn đều các phần tử trong hàng
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    activeFooterText: {
        color: '#4CAF50', // Màu xanh đậm cho mục được chọn
        textDecorationLine: 'underline', // Gạch dưới
    },
    footerText: {
        fontSize: 16,
        color: '#007BFF', // Màu xanh nổi bật
        fontWeight: 'bold',
    },
});

export default HomeScreen;
