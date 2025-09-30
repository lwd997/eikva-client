import { type TokenResponse } from "../models/Auth";

interface HttpRequestInit extends Omit<RequestInit, 'headers' | 'body'> {
    headers?: Record<string, string>;
    body?: Record<string, unknown> | string;
}

type HttpBadStatus = 400 | 401 | 403 | 404 | 500;

interface HttpResponseOk<T extends object> {
    body: T;
    status: 200;
}

interface HttpResponseFail {
    body: null
    status: Exclude<HttpBadStatus, 200>;
}

type HttpResponse<T extends object> = HttpResponseOk<T> | HttpResponseFail;

interface HttpConstructor {
    baseUrl: string;
    accessToken: string | null;
    refreshToken: string | null;
    onUpdateTokenFail?: (h: Http) => void;
}

export class Http {
    public isPaued: boolean = false;
    public readonly baseUrl: string;

    public accessToken: string | null;
    public refreshToken: string | null;
    public onUpdateTokenFail: ((h: Http) => void) | null;

    constructor(config: HttpConstructor) {
        this.baseUrl = config.baseUrl;
        this.accessToken = config.accessToken;
        this.refreshToken = config.refreshToken;
        this.onUpdateTokenFail = config.onUpdateTokenFail || null;
    }

    updateTokens({ refresh_token, access_token }: TokenResponse) {
        this.accessToken = access_token;
        this.refreshToken = refresh_token;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", access_token)
    }

    deleteTokens() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    async request<T extends object>(path: string, options: HttpRequestInit = {}): Promise<HttpResponse<T>> {
        if (!options.headers) {
            options.headers = {};
        }

        options.headers["Content-Type"] = "application/json";

        if (this.accessToken) {
            options.headers["Authorization"] = "Bearer " + this.accessToken;
        }

        if (options.body && typeof options.body !== "string") {
            options.body = JSON.stringify(options.body)
        }

        const resp = await fetch(path, options as RequestInit);

        if (resp.status === 401 && path !== "/auth/update-tokens") {
            this.isPaued = true;
            const refreshResponse = await this.request<TokenResponse>("/auth/update-tokens", {
                method: "POST",
                body: { refresh_token: this.refreshToken }
            });

            if (refreshResponse.status === 200) {
                this.updateTokens(refreshResponse.body);
            } else {
                if (typeof this.onUpdateTokenFail === 'function') {
                    this.onUpdateTokenFail(this);
                }

                return {
                    status: 401,
                    body: null
                }
            }

            this.isPaued = false;
        }

        if (!resp.headers.get("Content-Type")?.includes("application/json")) {
            return {
                status: 500,
                body: null
            };
        }

        return {
            status: resp.status as HttpBadStatus | 200,
            body: await resp.json()
        }
    }
}

