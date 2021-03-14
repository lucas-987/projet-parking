class Parking {
    constructor(id, name, type, capacity, cityId) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.availablePlaces = capacity;
        this.cityId = cityId;
        this.type = type;
        this.reservations = [];
    }

    static fromObject(object) {
        let parking = new Parking(object.id, object.name, object.type, 
                                object.capacite, object.cityId);
        return parking;
    }
}

export default Parking;