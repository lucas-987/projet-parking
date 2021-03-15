class Reservation {
    constructor(id, userId, parkingId, startDate, endDate, vehiculeType, licensePlate) {
        this.id = id;
        this.userId = userId;
        this.parkingId = parkingId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.vehiculeType = vehiculeType;
        this.licensePlate = licensePlate;
    }
}

export default Reservation;