import { User } from 'firebase/auth';

export type UserContext = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export type RouletteOfUser = {
    rouletteSets: Roulette[]
}

export type Roulette = {
    items: String[],
    title: string | number | readonly string[] | undefined
}