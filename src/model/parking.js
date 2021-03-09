class Parking {
    constructor(id, name, type, capacity, cityId) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.cityId = cityId;
        this.type = type;
    }

    static fromObject(object) {
        let parking = new City(object.id, object.name, object.type, 
                                object.capacite, object.cityId);
        return parking;
    }
}

export default Parking;