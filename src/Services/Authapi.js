// // src/services/AuthApi.js
// import { signInWithEmailAndPassword, getIdToken, signOut, onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import BASE_URL from './base_urls';

// class AuthApi {
  
//   // Login with email and password
//   static async login(email, password) {
//     try {
//       // Validate inputs
//       if (!email || !password) {
//         throw new Error('Email and password are required');
//       }

//       // Sign in with Firebase Auth
//       const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
//       const idToken = await getIdToken(userCredential.user, true);
      
//       // Send token to backend for verification and user data
//       const response = await fetch(`${BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${idToken}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.error || data.message || 'Backend authentication failed');
//       }

//       // Ensure all required fields are present
//       const user = {
//         uid: data.user.uid,
//         email: data.user.email,
//         name: data.user.name || email.split('@')[0],
//         role: data.user.role || 'user',
//         isAdmin: data.user.isAdmin || data.user.role === 'admin',
//         schoolId: data.user.schoolId || null,
//         fullAccess: data.user.fullAccess || false,
//         enabledTabs: Array.isArray(data.user.enabledTabs) ? data.user.enabledTabs : [],
//         picture: data.user.picture || null,
//         emailVerified: data.user.emailVerified || false,
//         createdAt: data.user.createdAt,
//         lastLogin: new Date().toISOString()
//       };

//       // Store user data in localStorage for persistence
//       localStorage.setItem('adminUser', JSON.stringify(user));
//       localStorage.setItem('adminToken', idToken);
//       localStorage.setItem('adminLoginTime', new Date().toISOString());

//       return {
//         success: true,
//         user: user,
//         token: idToken
//       };
      
//     } catch (error) {
//       console.error('Login error:', error.code, error.message);
      
//       // Handle specific Firebase auth errors
//       let errorMessage = 'Login failed. Please try again.';
      
//       switch (error.code) {
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address format.';
//           break;
//         case 'auth/user-disabled':
//           errorMessage = 'This account has been disabled.';
//           break;
//         case 'auth/user-not-found':
//           errorMessage = 'No account found with this email.';
//           break;
//         case 'auth/wrong-password':
//           errorMessage = 'Incorrect password. Please try again.';
//           break;
//         case 'auth/too-many-requests':
//           errorMessage = 'Too many failed attempts. Please try again later.';
//           break;
//         default:
//           errorMessage = error.message || 'Login failed. Please check your credentials.';
//       }
      
//       return {
//         success: false,
//         error: errorMessage,
//         code: error.code
//       };
//     }
//   }

//   // Logout user
//   static async logout() {
//     try {
//       // Sign out from Firebase
//       await signOut(auth);
      
//       // Clear localStorage
//       localStorage.removeItem('adminUser');
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('adminLoginTime');
      
//       return { success: true };
//     } catch (error) {
//       console.error('Logout error:', error);
//       return { 
//         success: false, 
//         error: error.message || 'Logout failed' 
//       };
//     }
//   }

//   // Get current authenticated user
//   static async getCurrentUser() {
//     const user = auth.currentUser;
//     if (!user) {
//       // Check localStorage for cached user
//       const cachedUser = localStorage.getItem('adminUser');
//       if (cachedUser) {
//         try {
//           return JSON.parse(cachedUser);
//         } catch (e) {
//           return null;
//         }
//       }
//       return null;
//     }

//     try {
//       // Get fresh ID token
//       const idToken = await getIdToken(user, true);
      
//       // Fetch latest user profile from backend
//       const response = await fetch(`${BASE_URL}/auth/profile`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${idToken}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch profile');
//       }
      
//       const data = await response.json();
      
//       if (data.success && data.user) {
//         // Update localStorage with fresh data
//         const userData = {
//           ...data.user,
//           enabledTabs: Array.isArray(data.user.enabledTabs) ? data.user.enabledTabs : [],
//           fullAccess: data.user.fullAccess || false
//         };
//         localStorage.setItem('adminUser', JSON.stringify(userData));
//         localStorage.setItem('adminToken', idToken);
//         return userData;
//       }
      
//       return null;
      
//     } catch (err) {
//       console.error('Get current user failed:', err);
      
//       // Return cached user if available
//       const cachedUser = localStorage.getItem('adminUser');
//       if (cachedUser) {
//         try {
//           return JSON.parse(cachedUser);
//         } catch (e) {
//           return null;
//         }
//       }
      
//       return null;
//     }
//   }

//   // Update user profile
//   static async updateProfile(profileData) {
//     try {
//       const user = auth.currentUser;
//       if (!user) {
//         throw new Error('No authenticated user');
//       }

//       const idToken = await getIdToken(user, true);
      
//       const response = await fetch(`${BASE_URL}/auth/profile`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${idToken}`,
//         },
//         body: JSON.stringify(profileData),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.error || 'Profile update failed');
//       }

//       // Update cached user data
//       const currentUser = await this.getCurrentUser();
//       if (currentUser) {
//         const updatedUser = { ...currentUser, ...profileData };
//         localStorage.setItem('adminUser', JSON.stringify(updatedUser));
//       }

//       return {
//         success: true,
//         message: data.message || 'Profile updated successfully'
//       };
      
//     } catch (error) {
//       console.error('Update profile error:', error);
//       return {
//         success: false,
//         error: error.message || 'Failed to update profile'
//       };
//     }
//   }

//   // Verify if user is authenticated
//   static async isAuthenticated() {
//     try {
//       const user = await this.getCurrentUser();
//       const token = localStorage.getItem('adminToken');
      
//       if (!user || !token) {
//         return false;
//       }
      
//       // Verify token with backend
//       const response = await fetch(`${BASE_URL}/auth/verify`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
      
//       const data = await response.json();
//       return response.ok && data.success;
      
//     } catch (error) {
//       console.error('Auth verification error:', error);
//       return false;
//     }
//   }

//   // Check if user has admin access
//   static hasAdminAccess() {
//     const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
//     return user.isAdmin === true || user.role === 'admin' || user.role === 'super_admin';
//   }

//   // Check if user has specific tab access
//   static hasTabAccess(tabName) {
//     const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
//     // Admin and super admin have access to all tabs
//     if (this.hasAdminAccess() || user.fullAccess === true) {
//       return true;
//     }
    
//     // Check if tab is in enabled tabs list
//     return Array.isArray(user.enabledTabs) && user.enabledTabs.includes(tabName);
//   }

//   // Get user role
//   static getUserRole() {
//     const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
//     return user.role || 'user';
//   }

//   // Refresh token
//   static async refreshToken() {
//     try {
//       const user = auth.currentUser;
//       if (!user) {
//         throw new Error('No authenticated user');
//       }
      
//       const newToken = await getIdToken(user, true);
//       localStorage.setItem('adminToken', newToken);
      
//       return {
//         success: true,
//         token: newToken
//       };
      
//     } catch (error) {
//       console.error('Token refresh error:', error);
//       return {
//         success: false,
//         error: error.message
//       };
//     }
//   }

//   // Subscribe to auth state changes
//   static onAuthStateChanged(callback) {
//     return onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userData = await this.getCurrentUser();
//         callback(userData);
//       } else {
//         // Clear localStorage on logout
//         localStorage.removeItem('adminUser');
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('adminLoginTime');
//         callback(null);
//       }
//     });
//   }
// }

// export default AuthApi;