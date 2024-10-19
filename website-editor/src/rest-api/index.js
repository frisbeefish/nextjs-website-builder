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
  const response = await httpGET("http://localhost:9999/website/json");
  return response;
}

export async function apiUploadImage(formData) {
  const response = await httpPOSTFormData(
    "http://localhost:9999/upload/image",
    //"http://localhost:3000/api/upload-image",
    //"http://127.0.0.1:8000/upload-image",
    formData
  );
  return response;
}

export async function apiUploadFile(formData) {
  const response = await httpPOSTFormData(
    "http://localhost:9999/upload/file",
    //"http://localhost:3000/api/upload-file",
    //"http://127.0.0.1:8000/upload-image",
    formData
  );
  return response;
}

export async function apiSaveWebsiteJSON(websiteJSON) {
  const response = await httpPOSTNoResponse(
    "http://localhost:9999/website/json",
    // "http://localhost:3000/api/website-json",
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
    "http://localhost:9999/website/generate-preview"
    // "http://localhost:3000/api/generate-website"
    //"http://127.0.0.1:8000/generate-website/"
  );
}

export async function apiAiGenerateWebPage({ userQuery }) {
  const response = await httpPOST(
    "http://localhost:9999/website/webpage/ai-generate",
    //"http://localhost:9999/ai-generate-webpage",
    // "http://localhost:3000/api/ai-generate-webpage",
    //"http://localhost:8000/ai-generate-webpage/",
    {
      userQuery,
    }
  );
  return response;
}
