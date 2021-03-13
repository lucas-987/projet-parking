class User {
    constructor(id, userType) {
        this.id = id;
        this.userType = userType;
    }

    static fromObject(object) {
        return new User(object.id, object.user_type);
    }
}

export default User;