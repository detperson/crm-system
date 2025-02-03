export interface IMetaResponse<T, N> {
    data: T[]
    info?: N
    meta: {
        totalAmount: number
    }
}