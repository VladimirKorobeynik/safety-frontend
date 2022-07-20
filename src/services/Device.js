import Api from "./Api";

export default {
    async getAllDevices(searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }

        return Api.get('/getAllSmartDevices', config);
    },
    async createDevice(deviceObj) {
        return Api.post('/createSmartDevice', deviceObj);
    },
    async deleteDevice(deleteDevice) {
        return Api.delete('/deleteSmartDevice/' + deleteDevice);
    },
    async exportDevices() {
        let config = {
            responseType: 'blob'
        }
        return Api.get('/exportDevices', config);
    },
    async importDevices(formData) {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return Api.post('/importDevices', formData, config);
    },
    async activateDeviceAndSensor(activateDeviceObj) {
        return Api.put('/activateSmartDevice', activateDeviceObj);
    }
}