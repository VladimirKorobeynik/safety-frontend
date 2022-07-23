import Api from "./Api";

export default {
    signIn(credentialsObj) {
        return Api.post('/signIn', credentialsObj);
    },
    signUp(registerObj) {
        return Api.post('/signUp', registerObj);
    },
    logOut() {
        return Api.post('/logout');
    }
}