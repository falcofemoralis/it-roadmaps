class BaseApiService {
    baseUrl: string;
    resource: string;
    headers: Array<string>;

    /**
     * Base constructor
     * @param resource - A particular resource, e.g. users, posts, comments etc.
     */
    constructor(resource: string) {
        this.baseUrl = "http://localhost:3000/api";
        if (!resource) throw new Error("Resource is not provided");
        this.resource = resource;
        this.headers = [];
    }

    /**
     * A helper function to connect base url, resource and (optional) id.
     * @param id - id of resource
     * @returns url
     */
    protected getUrl(subResource: string, id?: number): string {
        return `${this.baseUrl}/${this.resource}${subResource}/${id ?? ""}`;
    }

    /*     public setHeaders(headers: any) {
    
        } */
}

export default class ModelApiService extends BaseApiService {
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
        const response = await fetch(this.getUrl(path, id));
        return await response.json();
    }

    /**
     * Creating a resource entity.
     * @param data - data to upload
     * @param path - path in url
     * @returns 
     */
    public async post(path: string, data: any) {
        return await fetch(this.getUrl(path), {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    /**
     * Updating a resource entity.
     * @param id - id of resource
     * @param path - path in url
     * @param data - data to upload
     * @returns 
     */
    public async put(path: string, data: any = {}, id?: number) {
        return await fetch(this.getUrl(path, id), {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    /**
     * Deleting a resource entity.
     * @param id - id of resource
     * @param path - path in url
     * @returns 
     */
    public async delete(path: string, id?: number) {
        return await fetch(this.getUrl(path, id), {
            method: "DELETE"
        });
    }
}