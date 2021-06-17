module.exports = {
    myThaiStarBackend:{
        host:"java",
        port:8081,
        createBookingEndpoint:"/mythaistar/services/rest/bookingmanagement/v1/booking",
        createOrderEndpoint:"/mythaistar/services/rest/ordermanagement/v1/order",
        getActiveOrdersEndpoint:"/mythaistar/services/rest/ordermanagement/v1/order/activeOrders",
        setWaiterStateEndpoint:"/mythaistar/services/rest/bookingmanagement/v1/booking/updateWaitersHelp"
    }
}