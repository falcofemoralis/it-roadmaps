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
    protected getUrl(subResource: string, id?: number): string {
        return `${this.baseUrl}/${this.resource}${subResource}/${id ?? ""}`;
    }

    /**
     * A function responsible for errors handling.
     * @param err - error
     */
    protected handleErrors(location: string, err: Error): void {
        console.log({ message: "Errors is handled here: " + location, err });
    }
}

class ModelApiService extends BaseApiService {
    constructor(resource: string) {
        super(resource);
    }

    /**
     * To fetch objects
     * @param id - optional id
     * @param path - path in url
     * @returns json data
     */
    public async get(path: string, id?: number) {
        try {
            const response = await fetch(this.getUrl(path, id));
            return await response.json();
        } catch (err) {
            this.handleErrors("get", err);
        }
    }

    /**
     * Creating a resource entity.
     * @param data - data to upload
     * @param path - path in url
     * @returns 
     */
    public async post(path: string, data: any) {
        try {
            const response = await fetch(this.getUrl(path), {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            try {
                return await response.json();
            } catch (err) {
                return true;
            }
        } catch (err) {
            this.handleErrors("post", err);
        }
    }

    /**
     * Updating a resource entity.
     * @param id - id of resource
     * @param path - path in url
     * @param data - data to upload
     * @returns 
     */
    public async put(path: string, data: any = {}, id?: number) {
        try {
            await fetch(this.getUrl(path, id), {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return true;
        } catch (err) {
            this.handleErrors("put", err);
        }
    }

    /**
     * Deleting a resource entity.
     * @param id - id of resource
     * @param path - path in url
     * @returns 
     */
    public async delete(path: string, id?: number) {
        try {
            await fetch(this.getUrl(path, id), {
                method: "DELETE"
            });
            return true;
        } catch (err) {
            this.handleErrors("delete", err);
        }
    }
}

class RoadmapsApiService extends ModelApiService {
    constructor() {
        super("roadmaps");
    }
}

class UsersApiService extends ModelApiService {
    constructor() {
        super("users");
    }
}

export interface IApi {
    users: UsersApiService,
    roadmaps: RoadmapsApiService,
}

export const api = {
    users: new UsersApiService(),
    roadmaps: new RoadmapsApiService(),
} as IApi;