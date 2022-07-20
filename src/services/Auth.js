import Api from "./Api";

export default {
    async signIn(credentialsObj) {
        return Api.post('/signIn', credentialsObj);
    },
    async signUp(registerObj) {
        return Api.post('/signUp', registerObj);
    },
    async logOut() {
        return Api.post('/logout');
    }
}