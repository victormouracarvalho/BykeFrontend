const ID_TOKEN_KEY = "id_token";
const ID_USER_KEY = "user_id";

const JwtService = {
    getToken() {
        return window.localStorage.getItem(ID_TOKEN_KEY);
    },
    saveToken(token: string) {
        window.localStorage.setItem(ID_TOKEN_KEY, token);
    },
    destroyToken() {
        window.localStorage.removeItem(ID_TOKEN_KEY);
    },

    getUserId() {
        return parseInt(window.localStorage.getItem(ID_USER_KEY) || "0");
    },
    saveUserId(userId: number) {
        window.localStorage.setItem(ID_USER_KEY, userId.toString());
    },
    destroyUserId() {
        window.localStorage.removeItem(ID_USER_KEY);
    },
}

export default JwtService
