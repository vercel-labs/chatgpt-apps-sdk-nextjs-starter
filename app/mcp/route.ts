import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const getAppsSdkCompatibleHtml = async (baseUrl: string, path: string) => {
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

type ContentWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  description: string;
};

const getContentToShow = async () => {
  return "Some content from an API";
};

function widgetMeta(widget: ContentWidget) {
  // Documentation for all of these configuration options can be found here:
  // https://developers.openai.com/apps-sdk/build/mcp-server
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  } as const;
}

const handler = createMcpHandler(async (server) => {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/");

  const contentWidget: ContentWidget = {
    id: "show_content",
    title: "Show Content",
    templateUri: "ui://widget/content-template-17.html",
    invoking: "Loading content...",
    invoked: "Content loaded",
    html: html,
    description: "Displays the homepage content",
  };

  // Register the content widget resource
  server.registerResource(
    "content-widget",
    contentWidget.templateUri,
    {
      title: contentWidget.title,
      description: contentWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": contentWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${contentWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": contentWidget.description,
            "openai/widgetPrefersBorder": true,
          },
        },
      ],
    })
  );

  // Register the show_content tool
  server.registerTool(
    contentWidget.id,
    {
      title: contentWidget.title,
      description: "Fetch and display the homepage content",
      inputSchema: {},
      _meta: widgetMeta(contentWidget),
    },
    async () => {
      const contentToShow = await getContentToShow();

      return {
        content: [
          {
            type: "text",
            text: contentToShow,
          },
        ],
        structuredContent: {
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(contentWidget),
      };
    }
  );
});

export const GET = handler;
export const POST = handler;
