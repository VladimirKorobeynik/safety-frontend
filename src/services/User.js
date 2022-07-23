import Api from "./Api";
import VueJwtDecode from 'vue-jwt-decode';

export default {
    getUserData(user_id) {
        return Api.get('/getUser/' + user_id);
    },

    updateUserData(user_id, updateUserObj) {
        return Api.put('/updateUser/' + user_id, updateUserObj);
    },

    updateUserPassword(user_id, passwordObj) {
        return Api.put('/updateUserPassword/' + user_id, passwordObj);
    },

    deleteUser(user_id) {
        return Api.delete('/deleteUser/' + user_id);
    },
    getAllUsers(searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }
        return Api.get('/allUsers', config);
    },
    createUser(userObj) {
        return Api.post('/createUser', userObj);
    },
    exportUsers() {
        let config = {
            responseType: 'blob'
        }
        return Api.get('/exportUsers', config);
    },
    getAllRoles() {
        return Api.get('/getRoles');
    },
    getUserRole() {
        return VueJwtDecode.decode(localStorage.getItem('access_token')).scopes[0];
    }
}