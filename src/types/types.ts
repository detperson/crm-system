//Todo
export interface ITodo {
    id: number
    title: string
    created: string
    isDone: boolean
}

export interface ITodoInfo {
    all: number
    completed: number
    inWork: number
}

export interface IMetaResponse<T, N> {
    data: T[]
    info?: N
    meta: {
        totalAmount: number
    }
}

export enum EnumSortStatus {
    ALL = 'all',
    INWORK = 'inWork',
    COMPLITED = 'completed',
}

//Auth

export interface UserRegistration { 
    login: string; 
    username: string; 
    password: string; 
    email: string; 
    phoneNumber: string; 
}

export interface AuthData { 
    login: string; 
    password: string; 
}

// export interface RefreshToken { 
//     refreshToken: string; 
// }

export interface Profile { 
    id: number; 
    username: string; 
    email: string; 
    date: string; 
    isBlocked: boolean; 
    isAdmin: boolean; 
    phoneNumber: string; 
}

// export interface ProfileRequest { 
//     username: string; 
//     email: string; 
//     phoneNumber: string; 
// }

// export interface PasswordRequest { 
//     password: string; 
// }

export interface Token {
    accessToken: string
    refreshToken: string
}