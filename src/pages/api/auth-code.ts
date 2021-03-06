import { NextApiRequest, NextApiResponse } from "next";
import { spotifyApi } from "../../spotify";
import { Token } from "../../types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code;

  if (Array.isArray(code) || typeof code !== "string") {
    return res.status(400).json({ message: "code is required" });
  }

  try {
    const result = await spotifyApi.authorizationCodeGrant(code);

    const token: Token = {
      accessToken: result.body.access_token,
      refreshToken: result.body.refresh_token,
      tokenType: result.body.token_type,
      expiresIn: result.body.expires_in,
    };

    res.json(token);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};
