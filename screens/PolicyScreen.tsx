import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const PolicyScreen = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>📜 Chính Sách & Điều Khoản</Text>
            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>1. Điều Khoản Sử Dụng</Text>
                <Text style={styles.text}>
                    - Người dùng phải tuân thủ quy định của ứng dụng khi sử dụng dịch vụ.
                    {"\n"}- Không được chia sẻ nội dung trái pháp luật hoặc vi phạm bản quyền.
                    {"\n"}- Chúng tôi có quyền thay đổi hoặc cập nhật điều khoản mà không cần báo trước.
                </Text>

                <Text style={styles.sectionTitle}>2. Quyền Riêng Tư</Text>
                <Text style={styles.text}>
                    - Thông tin cá nhân của bạn sẽ được bảo mật và không chia sẻ với bên thứ ba.
                    {"\n"}- Dữ liệu tài khoản chỉ được sử dụng để cung cấp dịch vụ tốt hơn.
                </Text>

                <Text style={styles.sectionTitle}>3. Chính Sách Mượn & Trả Sách</Text>
                <Text style={styles.text}>
                    - Mỗi người dùng chỉ có thể mượn một sách cùng thể loại tại một thời điểm.
                    {"\n"}- Sách phải được trả đúng hạn, nếu không sẽ tự động trả sau thời gian quy định.
                    {"\n"}- Nếu sách đã mượn hết, bạn có thể đặt trước để đọc sau.
                </Text>

                <Text style={styles.sectionTitle}>4. Liên Hệ & Hỗ Trợ</Text>
                <Text style={styles.text}>
                    - Nếu bạn có bất kỳ thắc mắc nào, hãy liên hệ với chúng tôi qua email: support@appdocsach.com.
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        marginTop: 5,
    },
});

export default PolicyScreen;
