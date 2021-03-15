class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.parkings = [];
    }

    static fromObject(object) {
        let city = new City(object.id, object.city);
        return city;
    }
}

export default City;