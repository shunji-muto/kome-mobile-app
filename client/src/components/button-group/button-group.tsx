import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonGroupProps {
	onButtonPress: (button: string) => void;
}

// ボタンサイズとグループサイズを定数化
const BUTTON_SIZE = 65;
const GROUP_SIZE = 3 * BUTTON_SIZE; // 例: 3個分のボタンサイズでグループサイズを決定
const CENTER = GROUP_SIZE / 2 - BUTTON_SIZE / 2;
const OFFSET = GROUP_SIZE / 2 - BUTTON_SIZE / 2;

export default function ButtonGroup({ onButtonPress }: ButtonGroupProps) {
	return (
		<View style={[styles.buttonControls, { width: GROUP_SIZE, height: GROUP_SIZE }]}>
			<TouchableOpacity
				style={[
					styles.controlButton,
					{
						top: 0,
						left: CENTER,
					},
					styles.buttonY,
				]}
				onPress={() => onButtonPress('Y')}
			>
				<Text style={[styles.buttonText, styles.buttonTextY]}>Y</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					styles.controlButton,
					{
						top: CENTER,
						left: 0,
					},
					styles.buttonX,
				]}
				onPress={() => onButtonPress('X')}
			>
				<Text style={[styles.buttonText, styles.buttonTextX]}>X</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					styles.controlButton,
					{
						top: CENTER,
						right: 0,
					},
					styles.buttonB,
				]}
				onPress={() => onButtonPress('B')}
			>
				<Text style={[styles.buttonText, styles.buttonTextB]}>B</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					styles.controlButton,
					{
						bottom: 0,
						left: CENTER,
					},
					styles.buttonA,
				]}
				onPress={() => onButtonPress('A')}
			>
				<Text style={[styles.buttonText, styles.buttonTextA]}>A</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonControls: {
		position: 'relative',
	},
	controlButton: {
		position: 'absolute',
		width: BUTTON_SIZE,
		height: BUTTON_SIZE,
		borderRadius: BUTTON_SIZE / 2,
		backgroundColor: '#000000',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '500',
	},
	buttonY: {},
	buttonTextY: {
		color: '#ffeb3b',
	},
	buttonX: {},
	buttonTextX: {
		color: '#03a9f4',
	},
	buttonB: {},
	buttonTextB: {
		color: '#f44336',
	},
	buttonA: {},
	buttonTextA: {
		color: '#4caf50',
	},
});
