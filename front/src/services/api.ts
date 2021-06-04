class BaseApiService {
    baseUrl: string;
    resource: string;

    /**
     * Base constructor
     * @param resource - A particular resource, e.g. users, posts, comments etc.
     */
    constructor(resource: string) {
        this.baseUrl = "http://localhost:3000/api";
        if (!resource) throw new Error("Resource is not provided");
        this.resource = resource;
    }

    /**
     * A helper function to connect base url, resource and (optional) id.
     * @param id - id of resource
     * @returns url
     */
    getUrl(id?: string): string {
        console.log("url: " + `${this.baseUrl}/${this.resource}/${id ?? ""}`);

        return `${this.baseUrl}/${this.resource}/${id ?? ""}`;
    }

    /**
     * A function responsible for errors handling.
     * @param err - error
     */
    handleErrors(err: Error): void {
        console.log({ message: "Errors is handled here", err });
    }
}

class ReadOnlyApiService extends BaseApiService {
    constructor(resource: string) {
        super(resource);
    }

    /**
     * To fetch many objects
     * @param config - optional config
     * @returns json data
     */
    async fetch(config?: any) {
        try {
            const response = await fetch(this.getUrl(), config ?? {});
            return await response.json();
        } catch (err) {
            this.handleErrors(err);
        }
    }

    /**
     * To get a singular object by id
     * @param id - id of resource
     * @returns json data
     */
    async get(id: string) {
        try {
            if (!id) throw Error("Id is not provided");
            const response = await fetch(this.getUrl(id));
            return await response.json();
        } catch (err) {
            this.handleErrors(err);
        }
    }
}

class ModelApiService extends ReadOnlyApiService {
    constructor(resource: string) {
        super(resource);
    }

    /**
     * Creating a resource entity.
     * @param data - data to upload
     * @returns 
     */
    async post(data: any) {
        try {
            const response = await fetch(this.getUrl(), {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (err) {
            this.handleErrors(err);
        }
    }

    /**
     * Updating a resource entity.
     * @param id - id of resource
     * @param data - data to upload
     * @returns 
     */
    async put(id: string, data: any = {}) {
        if (!id) throw Error("Id is not provided");
        try {
            const response = await fetch(this.getUrl(id), {
                method: "PUT",
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (err) {
            this.handleErrors(err);
        }
    }

    /**
     * Deleting a resource entity.
     * @param id - id of resource
     * @returns 
     */
    async delete(id: string) {
        if (!id) throw Error("Id is not provided");
        try {
            await fetch(this.getUrl(id), {
                method: "DELETE"
            });
            return true;
        } catch (err) {
            this.handleErrors(err);
        }
    }
}

export class RoadmapsApiService extends ModelApiService {
    constructor(resource?: string) {
        super(`roadmaps${resource ?? ""}`);
    }
}

export class UsersApiService extends ReadOnlyApiService {
    constructor(resource?: string) {
        super(`users${resource ?? ""}`);
    }
}