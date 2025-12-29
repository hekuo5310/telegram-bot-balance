export async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;

  // Health check endpoint
  if (pathname === '/' || pathname === '/index.html') {
    return new Response('Telegram Bot API Proxy is Running! GitHub: https://github.com/your-repo/telegram-bot-balance', {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Construct the target Telegram API URL
  // All bot requests come in the format /bot<token>/method or /file/bot<token>/path
  const targetUrl = `https://api.telegram.org${pathname}${search}`;

  try {
    const headers = new Headers();
    
    // Copy relevant headers from the original request
    for (const [key, value] of request.headers.entries()) {
      const lowerKey = key.trim().toLowerCase();
      // Forward important headers
      if (lowerKey === 'content-type' || 
          lowerKey === 'content-length' ||
          lowerKey === 'accept' ||
          lowerKey === 'user-agent') {
        headers.set(key, value);
      }
    }

    console.log('Proxying request to Telegram API');
    console.log('Target URL:', targetUrl);
    console.log('Method:', request.method);

    // Forward the request to Telegram's official API
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
      body: request.body
    });

    console.log('Telegram API response status:', response.status);

    // Create response headers
    const responseHeaders = new Headers(response.headers);

    // Remove headers that might cause issues with proxying
    responseHeaders.delete('transfer-encoding');
    responseHeaders.delete('connection');
    responseHeaders.delete('keep-alive');
    responseHeaders.delete('content-encoding');
    
    // Add security headers
    responseHeaders.set('Referrer-Policy', 'no-referrer');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: responseHeaders
      });
    }

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders
    });

  } catch (error) {
    console.error('Failed to proxy request:', error);
    return new Response(JSON.stringify({
      ok: false,
      error_code: 500,
      description: 'Proxy Internal Server Error: ' + error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
