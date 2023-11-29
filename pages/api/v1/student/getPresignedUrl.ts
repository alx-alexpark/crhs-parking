import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { v4 as uuidv4 }from "uuid";
import { getAuth } from "@clerk/nextjs/server";

const s3 = new S3({
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  accessKeyId: process.env.CLOUDFLARE_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY,
  signatureVersion: "v4",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { userId } = getAuth(req);

  if (!userId) {
    return res
      .status(403)
      .json({ message: "Access denied: What are you doing???" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, type } = req.body;
    let newName = uuidv4() + "." + name.split(".")[1];

    if (!type.startsWith("image/")) {
      return res.status(500).json({ error: "Only images are allowed, what shenanigans are you trying to pull??" })
    }

    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: newName,
      Expires: 120,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.status(200).json({ url: url, filename: newName });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};