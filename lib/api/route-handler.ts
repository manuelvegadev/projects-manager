import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

type RouteHandlerMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RouteHandler = (handlers: {
  [key in RouteHandlerMethod]?: {
    handler: ({
      req,
      res,
    }: {
      req: NextApiRequest;
      res: NextApiResponse;
    }) => Promise<void | unknown>;
    requireSession?: boolean;
  };
}) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export const routeHandler: RouteHandler = (handlers) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method as RouteHandlerMethod;
    const methodHandler = handlers[method];

    if (methodHandler) {
      try {
        const requireSession = methodHandler.requireSession ?? true;

        if (requireSession) {
          const session = await getServerSession(req, res, authOptions);

          if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
          }
        }

        await methodHandler.handler({ req, res });
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
