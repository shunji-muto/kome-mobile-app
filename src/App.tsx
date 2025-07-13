import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { IReactNativeJoystickEvent, ReactNativeJoystick } from './components/joystick/joy-stick';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	// ジョイスティックのonMoveイベント用ハンドラー
	const handleJoystickMove = (event: IReactNativeJoystickEvent) => {
		// 必要に応じてイベントデータを処理
		console.log('Joystick Event:', event);
	};
	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.container}>
				<View style={styles.container}>
					<Text>Open up App.tsx to start working on your app!</Text>
					<StatusBar style="auto" />
				</View>
				<View style={styles.container}>
					<ReactNativeJoystick radius={50} onMove={handleJoystickMove} />
				</View>
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'red',
		borderWidth: 2,
	},
});
