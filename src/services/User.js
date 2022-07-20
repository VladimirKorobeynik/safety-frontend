import Api from "./Api";
import VueJwtDecode from 'vue-jwt-decode';

export default {
    async getUserData(user_id) {
        return Api.get('/getUser/' + user_id);
    },

    async updateUserData(user_id, updateUserObj) {
        return Api.put('/updateUser/' + user_id, updateUserObj);
    },

    async updateUserPassword(user_id, passwordObj) {
        return Api.put('/updateUserPassword/' + user_id, passwordObj);
    },

    async deleteUser(user_id) {
        return Api.delete('/deleteUser/' + user_id);
    },
    async getAllUsers(searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }
        return Api.get('/allUsers', config);
    },
    async createUser(userObj) {
        return Api.post('/createUser', userObj);
    },
    async exportUsers() {
        let config = {
            responseType: 'blob'
        }
        return Api.get('/exportUsers', config);
    },
    async getAllRoles() {
        return Api.get('/getRoles');
    },
    getUserRole() {
        return VueJwtDecode.decode(localStorage.getItem('access_token')).scopes[0];
    }
}