class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.parkings = [];
    }

    static fromObject(city) {
        let city = new City(city.id, city.city);
        return city;
    }
}

export default City;