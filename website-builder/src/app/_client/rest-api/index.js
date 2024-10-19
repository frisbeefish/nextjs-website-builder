import {
  httpDELETE,
  httpGET,
  httpPOST,
  httpPOSTFormData,
  httpPOSTNoResponse,
  httpPUT,
  httpPUTNoResponse,
} from "./utils";

/*
upload-image
*/

export async function apiGetWebsiteJSON() {
  const response = await httpGET("api/website-json");
  return response;
}

export async function apiUploadImage(formData) {
  const response = await httpPOSTFormData(
    "api/upload-image",
    //"http://127.0.0.1:8000/upload-image",
    formData
  );
  return response;
}

export async function apiUploadFile(formData) {
  const response = await httpPOSTFormData(
    "api/upload-file",
    //"http://127.0.0.1:8000/upload-image",
    formData
  );
  return response;
}

export async function apiSaveWebsiteJSON(websiteJSON) {
  const response = await httpPOSTNoResponse(
    "api/website-json",
    websiteJSON
    /*
    //"http://127.0.0.1:8000/save-website-json",
    {
      websiteJSON: {
        pages,
      },
    }
    */
  );
}

export async function apiGenerateWebsite() {
  const response = await httpPOSTNoResponse(
    "api/generate-website"
    //"http://127.0.0.1:8000/generate-website/"
  );
}

export async function apiAiGenerateWebPage({ userQuery }) {
  const response = await httpPOST(
    "api/ai-generate-webpage",
    //"http://localhost:8000/ai-generate-webpage/",
    {
      userQuery,
    }
  );
  return response;
}
