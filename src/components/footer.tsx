import { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type FooterProps = {
	appVersion: string;
	onPress: () => void;
};

const Footer: FC<FooterProps> = ({ appVersion, onPress }) => {
	return (
		<View style={styles.footer}>
			<View style={styles.statusBar}>
				<Text style={styles.statusText}>© 2024 Kome Inc.</Text>
				{/* Connection */}
				<TouchableOpacity style={styles.connectionStatus} onPress={onPress}>
					<View style={styles.statusIndicator} />
					<Text style={styles.connectionText}>Connected to Robot Car</Text>
				</TouchableOpacity>
				<Text style={styles.statusText}>Version: {appVersion}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		width: '100%',
		paddingVertical: 10,
		paddingHorizontal: 30,
		backgroundColor: 'rgba(10, 10, 35, 0.9)',
		borderTopWidth: 1,
		borderTopColor: 'rgba(120, 119, 198, 0.3)',
		bottom: 0,
		left: 0,
	},
	statusBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// borderWidth: 2,
		// borderColor: 'red',
	},
	statusText: {
		color: '#7877c6',
		fontSize: 12,
	},
	connectionStatus: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 12,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		borderStyle: 'solid',
	},
	statusIndicator: {
		width: 6,
		height: 6,
		borderRadius: '50%',
		backgroundColor: '#00ff88',
		boxShadow: '0 0 8px rgba(0, 255, 136, 0.6)',
		// animation: 'pulse 2s infinite',
	},
	connectionText: {
		color: 'white',
		fontSize: 12,
		fontWeight: '400',
		fontFamily: "'Inter', sans-serif",
	},
});

export default Footer;
