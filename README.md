# ChatGPT Apps SDK Next.js Starter

A minimal Next.js application demonstrating how to build an [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) compatible MCP server with widget rendering in ChatGPT.

## Overview

This project shows how to integrate a Next.js application with the ChatGPT Apps SDK using the Model Context Protocol (MCP). It includes a working MCP server that exposes tools and resources that can be called from ChatGPT, with responses rendered natively in ChatGPT.

## Key Components

### 1. MCP Server Route (`app/mcp/route.ts`)

The core MCP server implementation that exposes tools and resources to ChatGPT.

**Key features:**
- **Tool registration** with OpenAI-specific metadata
- **Resource registration** that serves HTML content for iframe rendering
- **Cross-linking** between tools and resources via `templateUri`

**OpenAI-specific metadata:**
```typescript
{
  "openai/outputTemplate": widget.templateUri,      // Links to resource
  "openai/toolInvocation/invoking": "Loading...",   // Loading state text
  "openai/toolInvocation/invoked": "Loaded",        // Completion state text
  "openai/widgetAccessible": false,                 // Widget visibility
  "openai/resultCanProduceWidget": true            // Enable widget rendering
}
```

Full configuration options: [OpenAI Apps SDK MCP Documentation](https://developers.openai.com/apps-sdk/build/mcp-server)

### 2. Asset Configuration (`next.config.ts`)

**Critical:** Set `assetPrefix` to ensure `/_next/` static assets are fetched from the correct origin:

```typescript
const nextConfig: NextConfig = {
  assetPrefix: baseURL,  // Prevents 404s on /_next/ files in iframe
};
```

Without this, Next.js will attempt to load assets from the iframe's URL, causing 404 errors.

### 3. CORS Middleware (`middleware.ts`)

Handles browser OPTIONS preflight requests required for cross-origin RSC (React Server Components) fetching during client-side navigation:

```typescript
export function middleware(request: NextRequest) {
  if (request.method === "OPTIONS") {
    // Return 204 with CORS headers
  }
  // Add CORS headers to all responses
}
```

### 4. SDK Bootstrap (`app/layout.tsx`)

The `<NextChatSDKBootstrap>` component patches browser APIs to work correctly within the ChatGPT iframe:

**What it patches:**
- `history.pushState` / `history.replaceState` - Prevents full-origin URLs in history
- `window.fetch` - Rewrites same-origin requests to use the correct base URL
- `<html>` attribute observer - Prevents ChatGPT from modifying the root element

**Required configuration:**
```tsx
<html lang="en" suppressHydrationWarning>
  <head>
    <NextChatSDKBootstrap baseUrl={baseURL} />
  </head>
  <body>{children}</body>
</html>
```

**Note:** `suppressHydrationWarning` is currently required because ChatGPT modifies the initial HTML before the Next.js app hydrates, causing hydration mismatches.

## Getting Started

### Installation

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Testing the MCP Server

The MCP server is available at:
```
http://localhost:3000/mcp
```

### Connecting from ChatGPT

1. [Deploy your app to Vercel](https://vercel.com/new/clone?demo-description=Ship%20an%20ChatGPT%20app%20on%20Vercel%20with%20Next.js%20and%20Model%20Context%20Protocol%20%28MCP%29.%0A&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F5TdbPy0tev8hh3rTOsdfMm%2F155b970ca5e75adb74206db26493efc7%2Fimage.png&demo-title=ChatGPT%20app%20with%20Next.js&demo-url=https%3A%2F%2Fchatgpt-apps-sdk-nextjs-starter.labs.vercel.dev%2F&from=templates&project-name=ChatGPT%20app%20with%20Next.js&project-names=Comma%20separated%20list%20of%20project%20names%2Cto%20match%20the%20root-directories&repository-name=chatgpt-app-with-next-js&repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fchatgpt-apps-sdk-nextjs-starter&root-directories=List%20of%20directory%20paths%20for%20the%20directories%20to%20clone%20into%20projects&skippable-integrations=1&teamSlug=vercel)
3. In ChatGPT, navigate to **Settings → [Connectors](https://chatgpt.com/#settings/Connectors) → Create** and add your MCP server URL with the `/mcp` path (e.g., `https://your-app.vercel.app/mcp`)

**Note:** Connecting MCP servers to ChatGPT requires developer mode access. See the [connection guide](https://developers.openai.com/apps-sdk/deploy/connect-chatgpt) for setup instructions.


## Project Structure

```
app/
├── mcp/
│   └── route.ts          # MCP server with tool/resource registration
├── layout.tsx            # Root layout with SDK bootstrap
├── page.tsx              # Homepage content
└── globals.css           # Global styles
middleware.ts             # CORS handling for RSC
next.config.ts            # Asset prefix configuration
```

## How It Works

1. **Tool Invocation**: ChatGPT calls a tool registered in `app/mcp/route.ts`
2. **Resource Reference**: Tool response includes `templateUri` pointing to a registered resource
3. **Widget Rendering**: ChatGPT fetches the resource HTML and renders it in an iframe
4. **Client Hydration**: Next.js hydrates the app inside the iframe with patched APIs
5. **Navigation**: Client-side navigation uses patched `fetch` to load RSC payloads

## Learn More

- [OpenAI Apps SDK Documentation](https://developers.openai.com/apps-sdk)
- [OpenAI Apps SDK - MCP Server Guide](https://developers.openai.com/apps-sdk/build/mcp-server)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Next.js Documentation](https://nextjs.org/docs)

## Deployment

This project is designed to work seamlessly with [Vercel](https://vercel.com) deployment. The `baseUrl.ts` configuration automatically detects Vercel environment variables and sets the correct asset URLs.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel-labs/chatgpt-apps-sdk-nextjs-starter)

The configuration automatically handles:
- Production URLs via `VERCEL_PROJECT_PRODUCTION_URL`
- Preview/branch URLs via `VERCEL_BRANCH_URL`
- Asset prefixing for correct resource loading in iframes
