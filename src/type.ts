import { User } from 'firebase/auth';

export type UserContext = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}