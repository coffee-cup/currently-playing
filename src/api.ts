import { Token } from "./types";

export type Result<T> =
  | {
      success: true;
      error: null;
      body: T;
    }
  | {
      success: false;
      error: string;
      body: null;
    };

export const error = <T>(error: string): Result<T> => ({
  success: false,
  error,
  body: null,
});

export const success = <T>(body: T): Result<T> => ({
  success: true,
  error: null,
  body,
});

const id = <T>(x: T): T => x;

const jsonRequest = <T>(input: RequestInfo, init?: RequestInit) => async (
  fn: (json: any) => T = id,
): Promise<Result<T>> => {
  try {
    const res = await fetch(input, init);
    const json = await res.json();

    if (res.status !== 200) {
      return error(json);
    }

    return success(fn(json));
  } catch (e) {
    return error(e.message);
  }
};

export const getAuthURL = (): Promise<Result<string>> =>
  jsonRequest<string>("/api/auth-url?state=x")(json => json.url);

export const getToken = async (code: string): Promise<Result<Token>> =>
  jsonRequest<Token>(`/api/auth-code?code=${code}`)();

export const refreshToken = async (
  refreshToken: string,
): Promise<Result<Token>> =>
  jsonRequest<Token>(`/api/refresh?refreshToken=${refreshToken}`)();
