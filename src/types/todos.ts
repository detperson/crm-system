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