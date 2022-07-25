import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

interface IAuthValue {
    user: User | null,
    login: (email: string, password: string) => Promise<UserCredential | undefined>,
    register: (email: string, password: string) => Promise<UserCredential | undefined>
}

const AuthContext = createContext<IAuthValue | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

    async function login(email: string, password: string) {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        }
        catch(e) {
            console.error(e)
        }
    }

    async function register(email: string, password: string) {
        try {
            return await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
        }
        catch(e) {
            if(e instanceof FirebaseError) {
                console.error(e.message);
            }
        }
    }

    const value = {
        user,
        login,
        register
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}