import Api from "./Api";

export default {
    async getHousesWithStatistics(user_id, searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }

        return Api.get('/getUserHousesWithStatistics/' + user_id, config);
    },
    async getAllHouse(searchString) {
        let config = {
            params: {
                'searchString': searchString
            }
        }

        return Api.get('/allHouses', config);
    },
    async exportHouses() {
        let config = {
            responseType: 'blob'
        }
        return Api.get('/exportHouses', config);
    },
    async createHouse(houseObj) {
        return Api.post('/createHouse', houseObj);
    },
    async updateHouse(house_id, houseObj) {
        return Api.put('/updateHouse/' + house_id, houseObj);
    },
    async deleteHouse(house_id) {
        return Api.delete('/deleteHouse/' + house_id);
    },
    async bindSmartDeviceToHouse(bindObj) {
        return Api.put('/bindSmartDeviceToHouse/', bindObj);
    },
    async getOperatorResponsibilityHouses(operator_id) {
        return Api.get('/getOperatorResponsibilityHouses/' + operator_id);
    },
}