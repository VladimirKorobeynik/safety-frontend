import Api from "./Api";

export default {
    getHousesWithStatistics(user_id, searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }

        return Api.get('/getUserHousesWithStatistics/' + user_id, config);
    },
    getAllHouse(searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }

        return Api.get('/allHouses', config);
    },
    exportHouses() {
        let config = {
            responseType: 'blob'
        }
        return Api.get('/exportHouses', config);
    },
    createHouse(houseObj) {
        return Api.post('/createHouse', houseObj);
    },
    updateHouse(house_id, houseObj) {
        return Api.put('/updateHouse/' + house_id, houseObj);
    },
    deleteHouse(house_id) {
        return Api.delete('/deleteHouse/' + house_id);
    },
    bindSmartDeviceToHouse(bindObj) {
        return Api.put('/bindSmartDeviceToHouse/', bindObj);
    },
    getOperatorResponsibilityHouses(operator_id) {
        return Api.get('/getOperatorResponsibilityHouses/' + operator_id);
    },
}