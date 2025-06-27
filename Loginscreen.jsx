import React, { useState } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	Text,
	Alert,
	TouchableOpacity
} from 'react-native';
import {
	doSignInWithEmailAndPassword,
	useGoogleLogin,
} from './firebase/auth';

export default function AuthScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signIn: googleSignIn } = useGoogleLogin();

	const handleLogin = async () => {
		try {
			await doSignInWithEmailAndPassword(email, password);
			Alert.alert('Success', 'Logged in!');
		} catch (err) {
			Alert.alert('Error', err.message);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			await googleSignIn();
			Alert.alert('Success', 'Logged in with Google!');
		} catch (err) {
			Alert.alert('Google Login Failed', err.message);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
				placeholderTextColor="#888"
			/>
			<TextInput
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={styles.input}
				placeholderTextColor="#888"
			/>

			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>

			<View style={styles.centerRow}>
				<Text style={styles.text}>Don't have an account? </Text>
				<TouchableOpacity onPress={() => navigation.navigate('Register')}>
					<Text style={styles.register}>Register</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				style={[styles.button, styles.googleButton]}
				onPress={handleGoogleLogin}
			>
				<Text style={styles.buttonText}>Sign in with Google</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'green',
	},
	input: {
		height: 50,
		borderColor: '#888',
		borderWidth: 1,
		marginBottom: 15,
		paddingHorizontal: 20,
		backgroundColor: 'white',
		borderRadius: 8,
	},
	button: {
		backgroundColor: '#1e90ff',
		paddingVertical: 12,
		borderRadius: 8,
		marginBottom: 10,
		alignItems: 'center',
	},
	googleButton: {
		backgroundColor: '#de5246',
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
	register: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 16,
	},
	text: {
		color: 'white',
	},
	centerRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 15,
	},
});