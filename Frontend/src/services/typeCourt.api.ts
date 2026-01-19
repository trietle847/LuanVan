import ApiClient from "./axios";

class TypeCourt extends ApiClient {
    constructor() {
        super("/type")
    }
}

export default new TypeCourt();
