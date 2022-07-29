import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

interface IAuthValue {
    user: User | null,
    login: (email: string, password: string) => Promise<UserCredential | undefined>,
    register: (email: string, password: string) => Promise<UserCredential | undefined>,
    logout: () => Promise<void>
}

const AuthContext = createContext<IAuthValue | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log('Changed:', user)
            setUser(user);
        });

        return unsubscribe;
    }, []);

    async function login(email: string, password: string) {
        console.log('Login triggered')
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        }
        catch(e) {
            console.error(e)
        }
    }

    async function register(email: string, password: string) {
        console.log('Register fired')
        try {
            return await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
        }
        catch(e) {

            console.log('Error is:', JSON.stringify(e))

            if(e instanceof FirebaseError) {
            }
        }
    }

    async function logout() {
        try {
            return await signOut(auth);
        }
        catch(e) {
            console.error(e)
        }
    }

    const value = {
        user,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}