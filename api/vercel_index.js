import { handleRequest } from "../src/handle_request.js";

export default async function handler(req) {
    return await handleRequest(req);
}
