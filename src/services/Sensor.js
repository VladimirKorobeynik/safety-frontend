import Api from "./Api";

export default {
    getUserSensors(user_id, searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }

        return Api.get('/getUserSensors/' + user_id, config);
    },
    activateDeviceSensors(deviceAndSensorObj) {
        return Api.put('/activateUserSensor', deviceAndSensorObj);
    },
    getSensorTypes() {
        return Api.get('/getSensorsType');
    }
}