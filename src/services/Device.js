import Api from "./Api";

export default {
    getAllDevices(searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }

        return Api.get('/getAllSmartDevices', config);
    },
    createDevice(deviceObj) {
        return Api.post('/createSmartDevice', deviceObj);
    },
    deleteDevice(deleteDevice) {
        return Api.delete('/deleteSmartDevice/' + deleteDevice);
    },
    exportDevices() {
        let config = {
            responseType: 'blob'
        }
        return Api.get('/exportDevices', config);
    },
    importDevices(formData) {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return Api.post('/importDevices', formData, config);
    },
    activateDeviceAndSensor(activateDeviceObj) {
        return Api.put('/activateSmartDevice', activateDeviceObj);
    },
    updateSmartDeviceSensorName(deviceObj) {
        return Api.put('/updateSmartDeviceSensorName', deviceObj);
    }
}