import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen.tsx";
import ReadingScreen from "./screens/ReadingScreen.tsx";
import DetailScreen from "./screens/DetailScreen.tsx";
import ClearDataScreen from "./screens/ClearDataScreen.tsx";
import AccountScreen from "./screens/AccountScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";
import BookShelfScreen from "./screens/BookShelfScreen .tsx";
import AboutScreen from "./screens/AboutScreen.tsx";
import PolicyScreen from "./screens/PolicyScreen.tsx";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen.tsx";
import ExploreScreen from "./screens/ExploreScreen.tsx";
import RateBookScreen from "./screens/RateBookScreen.tsx";


const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                <Stack.Screen name="Trang Chủ" component={HomeScreen} />
                <Stack.Screen name="Đọc Truyện" component={ReadingScreen} />
                <Stack.Screen name="Chi Tiết" component={DetailScreen} />
                <Stack.Screen name="Tài Khoản" component={AccountScreen} />
                <Stack.Screen name="Đăng Ký" component={RegisterScreen}/>
                <Stack.Screen name="Đăng Nhập" component={LoginScreen}/>
                <Stack.Screen name="Tủ Sách" component={BookShelfScreen}/>
                <Stack.Screen name="Giới Thiệu" component={AboutScreen}/>
                <Stack.Screen name="Chính Sách" component={PolicyScreen}/>
                <Stack.Screen name="Quên Mật Khẩu" component={ForgotPasswordScreen}/>
                <Stack.Screen name="Khám Phá" component={ExploreScreen}/>
                <Stack.Screen name="Đánh Giá Sách" component={RateBookScreen}/>
                <Stack.Screen name="Xóa" component={ClearDataScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
