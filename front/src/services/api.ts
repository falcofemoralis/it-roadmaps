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
    protected handleErrors(err: Error): void {
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
     * @param path - path in url
     * @returns json data
     */
    public async getMany<T>(path: string, config?: any) {
        try {
            const response = await fetch(this.getUrl(path), config ?? {});
            return await response.json() as Promise<T>;
        } catch (err) {
            this.handleErrors(err);
        }
    }

    /**
     * To get a singular object by id
     * @param id - id of resource
     * @param path - path in url
     * @returns json data
     */
    public async getOne(path: string, id: number) {
        try {
            if (!id) throw Error("Id is not provided");
            const response = await fetch(this.getUrl(path, id));
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
        } catch (err) {
            this.handleErrors(err);
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
        //if (!id) throw Error("Id is not provided");
        try {
            const response = await fetch(this.getUrl(path, id), {
                method: "PUT",
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
     * Deleting a resource entity.
     * @param id - id of resource
     * @param path - path in url
     * @returns 
     */
    public async delete(path: string, id: number) {
        if (!id) throw Error("Id is not provided");
        try {
            await fetch(this.getUrl(path, id), {
                method: "DELETE"
            });
            return true;
        } catch (err) {
            this.handleErrors(err);
        }
    }
}

class RoadmapsApiService extends ModelApiService {
    constructor() {
        super("roadmaps");
    }
}

class UsersApiService extends ReadOnlyApiService {
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