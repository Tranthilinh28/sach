import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { books } from '../booksData'; // Danh sách sách giả lập

const ExploreScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Khám phá sách</Text>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.bookItem}
                        onPress={() => navigation.navigate('Chi Tiết', { book: item })}
                    >
                        <Image source={item.image} style={styles.bookImage} />
                        <Text style={styles.bookTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    bookItem: { flexDirection: 'row', marginBottom: 15 },
    bookImage: { width: 50, height: 80, marginRight: 10 },
    bookTitle: { fontSize: 18, fontWeight: 'bold' },
});

export default ExploreScreen;
