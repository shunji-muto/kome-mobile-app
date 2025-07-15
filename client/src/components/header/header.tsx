import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type HeaderProps = {
	batteryLevel: number;
	signalStrength: number;
};

const Header: FC<HeaderProps> = ({ batteryLevel, signalStrength }) => {
	return (
		<View style={styles.header}>
			{/* <Text style={styles.headerTitle}>ROBOT CAR CONTROLLER</Text> */}
			<View style={styles.statusBar}>
				<Text style={styles.statusText}>Battery: {batteryLevel}%</Text>
				<Text style={styles.statusText}>Signal: {signalStrength}</Text>
				<Text style={styles.statusText}>Mode: Manual</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: '100%',
		paddingVertical: 20,
		paddingHorizontal: 20,
		backgroundColor: 'rgba(10, 10, 35, 0.9)',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(120, 119, 198, 0.3)',
	},
	headerTitle: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
		letterSpacing: 2,
	},
	statusBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	statusText: {
		color: '#7877c6',
		fontSize: 12,
	},
});

export default Header;
