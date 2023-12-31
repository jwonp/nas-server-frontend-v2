import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const directoryList = req.query
    res.status(200).json(directoryList);
};

export default handler;
