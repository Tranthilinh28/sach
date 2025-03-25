import React, {useEffect,useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BookShelfScreen = ({ navigation }: any) => {
    const [currentlyReading, setCurrentlyReading] = useState<any[]>([]);
    const handleRemoveBook = async (bookId:any) => {
        const updatedBooks = currentlyReading.filter((book) => book.id !== bookId);
        setCurrentlyReading(updatedBooks);
        await AsyncStorage.setItem('currentlyReading', JSON.stringify(updatedBooks));
    };

    useEffect(() => {
        loadCurrentlyReading();
    }, []);

    const loadCurrentlyReading = async () => {
        try {
            const storedBooks = await AsyncStorage.getItem('currentlyReading');
            if (storedBooks) {
                setCurrentlyReading(JSON.parse(storedBooks));
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách sách:', error);
        }
    };
    const handleOpenBook = async (book: any) => {
        try {
            // Lấy chương đang đọc của sách
            const lastReadChapter = await AsyncStorage.getItem(`lastReadChapter_${book.id}`);
            const chapterIndex = lastReadChapter ? JSON.parse(lastReadChapter) : 0;

            navigation.navigate('Đọc Truyện', {
                book,
                chapterIndex,
                onStartReading: (book: any) => {
                    console.log(`Bắt đầu đọc: ${book.title}`);
                }
            });
        } catch (error) {
            console.error('Lỗi khi mở sách:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>⬅ Quay lại</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Tủ Sách - Đang Đọc</Text>
            {currentlyReading.length > 0 ? (
                <FlatList
                    data={currentlyReading}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleOpenBook(item)} style={styles.bookItem}>
                            <Image source={item.image} style={styles.bookImage} />
                            <View>
                                <Text style={styles.bookTitle}>{item.title}</Text>
                                <Text style={styles.bookAuthor}>Tác giả: {item.author}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleRemoveBook(item.id)}>
                                <Text style={{ color: 'red', marginLeft: 10 }}>Xóa</Text>
                            </TouchableOpacity>

                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={styles.noBooksText}>Bạn chưa đọc sách nào</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    backButton: { fontSize: 16, color: 'blue', marginBottom: 10 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    bookItem: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    bookImage: { width: 50, height: 80, marginRight: 10 },
    bookTitle: { fontSize: 18, fontWeight: 'bold' },
    bookAuthor: { fontSize: 16, color: '#555' },
    noBooksText: { fontSize: 16, color: '#999', textAlign: 'center', marginTop: 20 },
});

export default BookShelfScreen;
