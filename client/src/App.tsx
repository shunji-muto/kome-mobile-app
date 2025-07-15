import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Vibration, View } from 'react-native';
import { IReactNativeJoystickEvent, ReactNativeJoystick } from './components/joystick/joy-stick';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from './components/header/header';
import Footer from './components/footer';
import ButtonGroup from './components/button-group/button-group';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import React from 'react';

export default function App() {
	// const [message, setMessage] = useState<string>()
	const socketRef = useRef<Socket>(undefined);

	// #0.WebSocket関連の処理は副作用なので、useEffect内で実装
	useEffect(() => {
		// #1.WebSocketオブジェクトを生成しサーバとの接続を開始
		const socket = io('http://192.168.1.11:5000');
		socketRef.current = socket;
		// サーバーからのメッセージ受信
		socket.on('message', (msg) => {
			console.log(msg);
		});

		// クリーンアップ
		return () => {
			socket.close();
			socketRef.current = undefined;
		};
	}, []);

	const onPress = () => {
		socketRef.current = io('http://192.168.1.11:5000');
		console.log('connect');
	};

	// ジョイスティックのonMoveイベント用ハンドラー
	const handleJoystickMove = (event: IReactNativeJoystickEvent) => {
		// 必要に応じてイベントデータを処理
		Vibration.vibrate(400);
		socketRef.current?.send('beep');
		console.log('Joystick Event:', event);
		// console.log('beep');
	};

	// ボタンプレスイベント用ハンドラー
	const handleButtonPress = (button: string) => {
		socketRef.current?.send('beep');
		Vibration.vibrate(100);
		console.log('Button pressed:', button);
	};
	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.container}>
				<Header batteryLevel={50} signalStrength={50} />
				<View style={styles.controlsContainer}>
					{/* 左側セクション */}
					<View style={{ flex: 1, alignItems: 'center', paddingRight: 90 }}>
						<ReactNativeJoystick radius={90} onMove={handleJoystickMove} />
					</View>
					{/* 右側セクション */}
					<View style={{ flex: 1, alignItems: 'center', paddingLeft: 90 }}>
						<ButtonGroup onButtonPress={handleButtonPress} />
					</View>
				</View>
			</View>
			<Footer appVersion="0.1" onPress={onPress} />
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1a1a1a',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	controlsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
