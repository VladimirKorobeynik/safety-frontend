import Api from "./Api";

export default {
    getUserNotification(user_id) {
        return Api.get('/getUserNotifications/' + user_id);
    },
    deleteUserNotification(notification_id) {
        return Api.delete('/deleteNotification/' + notification_id);
    },
}