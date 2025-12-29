// @ts-nocheck - This file is for Deno Deploy environment
// Local IDE may show errors, but they won't occur in Deno Deploy
import { handleRequest } from "./handle_request.js";

Deno.serve(async (req) => {
    console.log('Request URL:', req.url);
    return await handleRequest(req);
});
