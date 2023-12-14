import { NextApiRequest, NextApiResponse } from "next";
import { OutgoingHttpHeaders } from "node:http";

export type RouteMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

//region Response types
export type ApiMetaResponse = {
  date: string;
  latency: number;
  request: {
    method: RouteMethod;
    query: NextApiRequest["query"];
    body: NextApiRequest["body"];
    url: NextApiRequest["url"];
  };
  response: {
    statusCode: number;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
};

export type ApiErrorResponse = {
  message: string;
  details?: any;
};

export type ApiSuccessResponse<ResponseType> = {
  data: ResponseType;
  _meta: ApiMetaResponse;
};

export type ApiResponse<ResponseType> =
  | ApiSuccessResponse<ResponseType>
  | ApiErrorResponse;
//endregion

export type ResponseGenerator<ResponseType> = ({
  initTime,
  req,
  res,
}: {
  initTime: number;
  req: NextApiRequest;
  res: NextApiResponse<ApiResponse<ResponseType>>;
}) => (data: ResponseType) => ApiSuccessResponse<ResponseType>;
