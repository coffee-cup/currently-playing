export interface Token {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  href: string;
  uri: string;
}

export interface Track {
  name: string;
  url: string;
  artist: string;
  album: string;
  image: string;
}

export type LoadingValue<T> =
  | {
      loading: true;
      error: null;
      data: null;
    }
  | {
      loading: false;
      error: string;
      data: null;
    }
  | {
      loading: false;
      error: null;
      data: T;
    };
