import { IAuthRequest, IAuthResponse } from "./auth";

interface POSTRequestMap {
    "/auth": {
        req: IAuthRequest
        res: IAuthResponse
        r: string
    }
}

interface GET {
    "/games": {
        req: IAuthRequest,
        res: IAuthResponse
    }
}

function POSTAPIUrl<P extends keyof POSTRequestMap, B extends POSTRequestMap[P]["req"], R extends POSTRequestMap[P]["res"]>(path: P, body: B): R {
    return {} as any as R;
}

POSTAPIUrl("/auth", {
    userToken: "eee"
})!.success