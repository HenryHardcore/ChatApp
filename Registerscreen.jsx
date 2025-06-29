import React, { useState } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	Text,
	TouchableOpacity,
	Alert
} from 'react-native';
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from './firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';

export default function RegisterScreen({ navigation }) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleRegister = async () => {
		if (password !== confirmPassword) {
			Alert.alert('Error', 'Passwords do not match');
			return;
		}

		try {
			const userCredential = await doCreateUserWithEmailAndPassword(email, password);
			const user = userCredential.user;

			await setDoc(doc(db, 'users', user.uid), {
				firstName,
				lastName,
				email,
				createdAt: new Date()
			});

			await doSendEmailVerification();
			Alert.alert('Success', 'Verification email sent!');
		} catch (err) {
			Alert.alert('Error', err.message);
		}
	};

	return (
		<View style={styles.containerr}>
			<View style={styles.container}>
				<TextInput
					placeholder="First Name"
					value={firstName}
					onChangeText={setFirstName}
					style={styles.input}
					placeholderTextColor="#888"
				/>
				<TextInput
					placeholder="Last Name"
					value={lastName}
					onChangeText={setLastName}
					style={styles.input}
					placeholderTextColor="#888"
				/>
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
				<TextInput
					placeholder="Confirm Password"
					secureTextEntry
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					style={styles.input}
					placeholderTextColor="#888"
				/>

				<TouchableOpacity style={styles.button} onPress={handleRegister}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>

				<View style={styles.centerRow}>
					<Text style={styles.text}>Already have an account? </Text>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Text style={styles.register}>Log In</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	containerr: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'black', 
	},
	container: {
		padding: 20,
		backgroundColor: 'grey',
		borderRadius: 12,
		width: '90%',
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
		marginTop: 10,
	},
});