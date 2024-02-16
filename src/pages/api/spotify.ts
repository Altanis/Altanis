import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

require("dotenv").config();

let spotifyApi = new SpotifyWebApi();

const authorization_code = "user-read-currently-playing";
spotifyApi.setCredentials({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    redirectUri: 'https://spotify-refresh-token-generator.netlify.app',
});

// spotifyApi.authorizationCodeGrant(authorization_code).then((data) =>
// {
//     console.log("The token expires in " + data.body["expires_in"]);
//     console.log("The access token is " + data.body["access_token"]);
//     console.log("The refresh token is " + data.body["refresh_token"]);

//     spotifyApi.setAccessToken(data.body["access_token"]);
//     spotifyApi.setRefreshToken(data.body["refresh_token"]);
// })
// .catch((e: Error) => console.error(e.message));

export default function GET(_: NextApiRequest, res: NextApiResponse)
{
    return new Promise((resolve, reject) =>
    {
        spotifyApi.refreshAccessToken().then(function(data)
        {
            spotifyApi.setAccessToken(data.body.access_token);
            spotifyApi
                .getMyCurrentPlayingTrack()
                .then(function(data)
                {
                    res.status(200).json({ data });
                    resolve(void 0);
                })
                .catch(function(err: any) 
                {
                    console.log("Error:", err.message);
                    res.status(500);
                    reject();
                });
        });
    });
}

process.on("unhandledRejection", () => {});