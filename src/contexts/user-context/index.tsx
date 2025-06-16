import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";


type ErrorType = { message: string } | null;

type UserContextType = {
    fetchUsers: () => Promise<any>;
    setError?: Dispatch<SetStateAction<ErrorType>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return ctx;
};

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setError] = useState<ErrorType>(null);

    const handleErrorClose = () => {
        setError(null);
    };

    async function fetchUsers() {
        try {
            setError(null);
            const response = await fetch('https://jsonplaceholder.typicode.com/users', { method: "GET" });

            if (!response.ok) {
               const errorData = await response.json().catch(() => null); 
               throw new Error(errorData?.message || 'Something went wrong...');
            }

            return await response.json();
        } catch (err: any) {
            setError({ message: err.message || 'Something went wrong...'})
            throw err;
        }
    }

    const ctx: UserContextType  = {
        fetchUsers,
        setError
    }

    return (
        <UserContext.Provider value={ctx}>
            {children}
            <Snackbar
                open={!!error}
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <Alert  severity="error" sx={{ width: '100%' }}>
                    {error?.message}
                </Alert>
            </Snackbar>
        </UserContext.Provider>
    )
}