import Api from "./Api";

export default {
    async getUserSensors(user_id, searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }

        return Api.get('/getUserSensors/' + user_id, config);
    },
    async activateDeviceSensors(deviceAndSensorObj) {
        return Api.put('/activateUserSensor', deviceAndSensorObj);
    },
}