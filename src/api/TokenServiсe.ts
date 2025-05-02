class TokenService {
    private _accessToken: string | null = null

    getAccess() {
        return this._accessToken
    }

    setAccess(accessToken: string) {
        this._accessToken = accessToken
    }

    clearToken() {
        this._accessToken = null
    }
}

export const tokenService = new TokenService()