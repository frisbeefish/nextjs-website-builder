var express = require("express");
const router = express.Router();

const { getWebsiteJson, saveWebsiteJson } = require("../services/db");

const { generateWebPage } = require("../services/ai");

const { generateWebsite } = require("../services/website-generation");

/*

import { generateWebPage } from "@/app/_server/services/ai";

import { getWebsiteJson, saveWebsiteJson } from "@/app/_server/services/db";

export async function GET(request, { params }) {
  const websiteJson = await getWebsiteJson();

  return NextResponse.json(websiteJson);
}

export async function POST(request, { params }) {
  const websiteJson = JSON.stringify(await request.json(), null, 3);
  await saveWebsiteJson(websiteJson);

  return new Response(null, {
    status: 200,
  });
}
*/

/* GET users listing. */
router.get("/json", async function (req, res, next) {
  const websiteJson = await getWebsiteJson();

  console.log("did it");

  res.json(websiteJson);

  //return NextResponse.json(websiteJson);

  //res.send("respond with a resource");
});

router.post("/json", async function (req, res, next) {
  //const websiteJson = await getWebsiteJson();

  await saveWebsiteJson(JSON.stringify(req.body, null, 3));

  res.status(200).end();

  //res.json(websiteJson);

  //return NextResponse.json(websiteJson);

  //res.send("respond with a resource");
});

router.post("/webpage/ai-generate", async function (req, res, next) {
  const { userQuery } = req.body;

  const { webpageJson, error } = await generateWebPage({ userQuery });

  if (error) {
    next(error);
  } else {
    res.status(201).json(webpageJson);
    //res.json(webpageJson);
  }

  /*
  import { generateWebPage } from "@/app/_server/services/ai";

export async function POST(request, { params }) {
  const { userQuery } = await request.json();

  const { webpageJson, error } = await generateWebPage({ userQuery });

  const response = error
    ? new Response(null, {
        status: 500,
        statusText: error,
      })
    : NextResponse.json(webpageJson);

  return response;
}

  */
});

router.post("/generate-preview", async function (req, res, next) {
  const { error } = await generateWebsite();

  if (error) {
    next(error);
  } else {
    res.status(200).end();
    //res.json(webpageJson);
  }
});

module.exports = router;

/*
webpage/ai-generate

*/
