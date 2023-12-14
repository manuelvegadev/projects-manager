import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ApiResponse, ResponseGenerator, RouteMethod } from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

export const routeHandler = <
  ResponseTypes extends {
    [key in RouteMethod]?: any; // TODO: Restrict keys to RouteMethod
  },
>(handlers: {
  [key in keyof ResponseTypes]?: {
    handler: ({
      req,
      res,
    }: {
      req: NextApiRequest;
      res: NextApiResponse<ApiResponse<ResponseTypes[key]>>;
      genResponse: ReturnType<ResponseGenerator<ResponseTypes[key]>>;
    }) => Promise<void>;
    requireSession?: boolean;
  };
}) => {
  type ResponseType = ResponseTypes[RouteMethod];

  return async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
    const method = req.method as keyof ResponseTypes;
    const methodHandler = handlers[method];

    if (methodHandler) {
      try {
        const initTime = Date.now();

        const requireSession = methodHandler.requireSession ?? true;

        if (requireSession) {
          const session = await getServerSession(req, res, authOptions);

          if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
          }
        }

        const genResponse: ResponseGenerator<ResponseType> = ({
          initTime,
          req,
          res,
        }) => {
          return (data) => {
            const endTime = Date.now();

            const { method, query, body, url } = req;

            return {
              _meta: {
                date: new Date(initTime).toISOString(),
                latency: endTime - initTime,
                request: {
                  method: method as RouteMethod,
                  query,
                  body,
                  url,
                },
                response: {
                  statusCode: res.statusCode,
                },
              },
              data,
            };
          };
        };

        await methodHandler.handler({
          req,
          res,
          genResponse: genResponse({ initTime, req, res }),
        });
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: "An unknown error occurred." });
        }
      }
    } else {
      res.status(405).json({ message: "Method not allowed." });
    }
  };
};
