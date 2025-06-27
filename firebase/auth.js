
import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  signInWithCredential, 
  GoogleAuthProvider 
} from "firebase/auth";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const doCreateUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSendEmailVerification = () => {
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser);
  } else {
    throw new Error('No user is currently signed in');
  }
};

export const doSignOut = () => {
  return signOut(auth);
};

export const useGoogleLogin = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '432407185349-9ete9mhjv49culgl21k9s9m7750jecdj.apps.googleusercontent.com',
    iosClientId: '432407185349-r22g6il2bot521c7o8k28h4oipro60td.apps.googleusercontent.com',
    androidClientId: '432407185349-dfm4ggm3aemi440ertkak64qu9p0k5io.apps.googleusercontent.com',
  });

  const signIn = async () => {
    const result = await promptAsync();
    if (result?.type === 'success') {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);
      return signInWithCredential(auth, credential);
    } else {
      throw new Error('Google login failed');
    }
  };

  return { signIn, request };
};