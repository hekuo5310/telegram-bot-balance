import { handleRequest } from "./handle_request.js";

export default {
    async fetch(req, env, context) {
        console.log('Request URL:', req.url);
        return handleRequest(req);
    }
}
