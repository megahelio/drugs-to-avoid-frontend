export class User {

    private _authenticated: boolean
    private _username: string
    private _password: string
    private _authHeader: string

    constructor() {
        const user: User = JSON.parse(localStorage.getItem("user") ?? "{}");
        if (user != null) {
            this.username = user._username;
            this.password = user._password;
            this.authenticated = user._authenticated;
            this.authHeader = user._authHeader;
        } else {
            this.authenticated = false;
        }
    }

    get authenticated(): boolean {
        return this._authenticated;
    }

    set authenticated(value: boolean) {
        this._authenticated = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get authHeader(): string {
        return this._authHeader;
    }

    set authHeader(value: string) {
        this._authHeader = value;
    }
    
    public save() {
        localStorage.setItem('user', JSON.stringify(this));
    }

    public clear() {
        localStorage.removeItem('user');
    }


}