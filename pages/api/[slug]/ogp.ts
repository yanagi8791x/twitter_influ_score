import { createCanvas } from "canvas";
import { NextApiRequest, NextApiResponse } from "next";

const createOgp = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const score = req.query["score"] as string;
  const slug = req.query["slug"] as string;

  const WIDTH = 1200;
  const HEIGHT = 630;
  const DX = 0;
  const DY = 0;
  const canvas = createCanvas(WIDTH, HEIGHT);

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FFF";
  ctx.fillRect(DX, DY, WIDTH, HEIGHT);

  ctx.font = "30px Impact";
  ctx.fillStyle = "#888888";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`@${slug}のスコア`, 600, 280);

  ctx.fillStyle = "#888888";
  // TODO: サービス名を変える
  ctx.fillText("twitter_influ_score", 1050, 600);

  ctx.font = "120px Impact";
  ctx.fillStyle = "#222222";
  ctx.fillText(score, 600, 360);

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  });
  res.end(buffer, "binary");
};

export default createOgp;
