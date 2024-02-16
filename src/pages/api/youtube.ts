import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

let subscriber_count = 0, view_count = 0;
async function get_subscribers()
{
	console.log("Updating YouTube subscriber count");
	const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCFuob9RO7W-Io-_zx-no1wg&key=${process.env.YOUTUBE_API_KEY}`);
	const { subscriberCount, viewCount } = response.data.items[0].statistics;
	subscriber_count = +subscriberCount;
	view_count = +viewCount;
	console.log("Updated YouTube subscriber count", subscriber_count, view_count);

	return;
};

get_subscribers();
setInterval(async function()
{
	await get_subscribers();
}, 60_000 * 60); // update hourly

export default function GET(_: NextApiRequest, res: NextApiResponse)
{
	res.status(200).json({ subscriber_count, view_count });
};