export const BASE_URL = 'http://localhost:8080';

export const API_PATHS = {

    ROOMS: {
        ADD: "rooms/add",
        ROOMDETAILS: "rooms/roomDetails",
        CITY: "rooms/city",
        AVL_ID: (id) => `rooms/avl/${id}`,
        LIST_ROOMS: "rooms/listRooms",
        GET_ROOM_BY_ID: "rooms/listRooms",
        GET_ROOM_BY_USER_ID:"rooms/myrooms",
    },

    REVIEWS: {
        ADD_REVIEW: "reviews/add",
    },

    USERS: {
        ADD_USER: "users/add",
        USER_ID: (email) => `users/${email}`,
        USER_EXISTS: (id) => `users/exists/${id}`,
        USER_LOGIN:"/users/login",
        ME:"/users/me",
            
    },

    COMPLAINTS: {
        ADD_COMPLAINT: "complaints/add",
    },

    BOOKINGS: {
        MY_BOOKING_ID: (userID) => `bookings/user/${userID}`,
        BOOK_ROOM: "bookings/book",
        CANCEL_ROOM: "bookings/cancel",
        GET_ALL_BOOKINGS: "bookings/admin/all",
    },

    ADMIN: {
        LIST_USERS: "admin/listUsers",
        LIST_ROOMS: "admin/listRooms",
        DELETE_USER_BY_ID: (userID) => `admin/deleteUser/${userID}`,
        DELETE_ROOM: (roomId) => `admin/deleteRoom/${roomId}`,
    }
};
