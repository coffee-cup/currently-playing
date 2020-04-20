import { NextApiRequest, NextApiResponse } from "next";
import { spotifyApi, scopes } from "../../spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const state = req.query.state;

  if (Array.isArray(state) || typeof state !== "string") {
    return res.status(400).json({ message: "state is required" });
  }

  const authURL = spotifyApi.createAuthorizeURL(scopes, state);

  res.json({
    url: authURL,
  });
};
