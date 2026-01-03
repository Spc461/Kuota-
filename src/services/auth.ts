import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface AuthResult {
  user: AuthUser | null;
  error: string | null;
}

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    // Set up auth state listener
    onAuthStateChanged(auth, user => {
      this.currentUser = user;
    });
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: AuthUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };

      return { user, error: null };
    } catch (error: any) {
      return {
        user: null,
        error: error.message || 'Failed to sign in',
      };
    }
  }

  async signUp(
    email: string,
    password: string,
    displayName?: string
  ): Promise<AuthResult> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile if displayName provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }

      const user: AuthUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName || userCredential.user.displayName,
      };

      return { user, error: null };
    } catch (error: any) {
      return {
        user: null,
        error: error.message || 'Failed to sign up',
      };
    }
  }

  async signOut(): Promise<{ error: string | null }> {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error: any) {
      return { error: error.message || 'Failed to sign out' };
    }
  }

  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: any) {
      return { error: error.message || 'Failed to send password reset email' };
    }
  }

  getCurrentUser(): AuthUser | null {
    if (!this.currentUser) return null;

    return {
      uid: this.currentUser.uid,
      email: this.currentUser.email,
      displayName: this.currentUser.displayName,
    };
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return onAuthStateChanged(auth, user => {
      const authUser = user
        ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }
        : null;
      callback(authUser);
    });
  }
}

const authService = new AuthService();

export default authService;
