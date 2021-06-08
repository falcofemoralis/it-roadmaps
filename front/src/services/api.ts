import { store } from '../store/index'

class BaseApiService {
    baseUrl: string;
    resource: string;
    useToken: boolean;

    /**
     * Base constructor
     * @param resource - A particular resource, e.g. users, posts, comments etc.
     */
    constructor(resource: string) {
        this.baseUrl = "http://localhost:3000/api";
        if (!resource) throw new Error("Resource is not provided");
        this.resource = resource;
        this.useToken = false;
    }

    /**
     * A helper function to connect base url, resource and (optional) id.
     * @param id - id of resource
     * @returns url
     */
    protected getUrl(subResource: string, id?: string): string {
        return `${this.baseUrl}/${this.resource}${subResource}/${id ?? ""}`;
    }

    public setTokenHeader() {
        this.useToken = true;
        return this;
    }

    protected getTokenHeader(headers: Headers) {
        headers.append("Authorization", store.getters.getToken)
        return headers;
    }

    protected getJsonHeader(headers: Headers) {
        headers.append("Accept", " application/json");
        headers.append("Content-Type", "application/json");
        return headers;
    }
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
    protected async get(path: string, id?: string) {
        let headers = new Headers();

        if (this.useToken) {
            headers = this.getTokenHeader(headers);
        }

        return await await fetch(this.getUrl(path, id), {
            method: "GET",
            headers: headers
        });
    }

    /**
     * Creating a resource entity.
     * @param data - data to upload
     * @param path - path in url
     * @returns 
     */
    protected async post(path: string, data: any) {
        let headers = new Headers();
        headers = this.getJsonHeader(headers);

        if (this.useToken) {
            headers = this.getTokenHeader(headers);
        }

        return await fetch(this.getUrl(path), {
            method: "POST",
            headers: headers,
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
    protected async put(path: string, data: any = {}, id?: string) {
        let headers = new Headers();
        headers = this.getJsonHeader(headers);

        if (this.useToken) {
            headers = this.getTokenHeader(headers);
        }

        return await fetch(this.getUrl(path, id), {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data)
        });
    }

    /**
     * Deleting a resource entity.
     * @param id - id of resource
     * @param path - path in url
     * @returns 
     */
    protected async delete(path: string, id?: string) {
        let headers = new Headers();

        if (this.useToken) {
            headers = this.getTokenHeader(headers);
        }

        return await fetch(this.getUrl(path, id), {
            method: "DELETE",
            headers: headers
        });
    }
}