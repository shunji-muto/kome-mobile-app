import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type FooterProps = {
	appVersion: string;
};

const Footer: FC<FooterProps> = ({ appVersion }) => {
	return (
		<View style={styles.footer}>
			<View style={styles.statusBar}>
				<Text style={styles.statusText}>© 2024 Kome Inc.</Text>
				<Text style={styles.statusText}>Version: {appVersion}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		width: '100%',
		paddingVertical: 20,
		paddingHorizontal: 20,
		backgroundColor: 'rgba(10, 10, 35, 0.9)',
		borderTopWidth: 1,
		borderTopColor: 'rgba(120, 119, 198, 0.3)',
		bottom: 0,
		left: 0,
	},
	statusBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		// marginTop: 10,
	},
	statusText: {
		color: '#7877c6',
		fontSize: 12,
	},
});

export default Footer;
