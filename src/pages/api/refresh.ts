import { NextApiRequest, NextApiResponse } from "next";
import { spotifyApi } from "../../spotify";
import { Token } from "../../types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const refreshToken = req.query.refreshToken;

  if (Array.isArray(refreshToken) || typeof refreshToken !== "string") {
    return res.status(400).json({ message: "code is required" });
  }

  try {
    spotifyApi.setRefreshToken(refreshToken);
    const result = await spotifyApi.refreshAccessToken();

    throw new Error("shit");

    const token: Token = {
      accessToken: result.body.access_token,
      refreshToken: refreshToken,
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
