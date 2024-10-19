import OpenAI from "openai";

import dotenv from "dotenv";

dotenv.config();
//require("dotenv").config();

/*
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

const HOBBES_CHAT_OPENAI_MODEL = "gpt-4-0613";
const HOBBES_SUGGESTIONS_OPENAI_MODEL = "gpt-3.5-turbo";

PT-4 Turbo is available for all paying developers to try by passing gpt-4-1106-preview in the API and we plan to release the stable production-ready model in the coming weeks.

*/

console.log("hi from ai");

console.log("process.env.OPENAI_API_KEY " + process.env.OPENAI_API_KEY);

/*

const getSuggestionsInstructionsSection = `
The tutor, named Hobbes, is having a conversation with a student. You can see the conversation they've had further down below.

Given the latest message from Hobbes, can you give 3-5 suggestions for what the student may say next? 

The goal is here to reduce the amount of typing the student has to do.

Common answers:

* Yes, let's do it.
* I'm not sure.

When suggesting Yes or No it's nice if you can add a reason why the student may say yes or no.

Potential answers when they are discussing are actually discussing a specific subject

* Quiz me
* Create a game to teach this
* Tell a story to teach this

Follow these guidelines:

1. Keep the suggestions very short.
2. Write each suggestion on a new line. E.g.,
Yes, let's get started
No, I don't want to do this now
3. Make sure to only give one suggestion per line.
4. Keep all suggestions in the same format. E.g., 7th grade, 8th grade, 9th grade.
5. Do not include "Student" or "Hobbes" in the suggestions.
6. Do not give redundant suggestions.
7. When possible, give many suggestions! Don't just give one suggestions`;

export default getSuggestionsInstructionsSection;


export default function getSuggestionsPrompt({ conversation, finalMessage }) {
  const prompt = `
  ${getSuggestionsInstructionsSection}
  
  -----------------------
  CONVERSATION BETWEEN HOBBES AND STUDENT SO FAR:
  ${conversation}
  
  -----------------------
  THE TUTOR'S (HOBBES') LATEST MESSAGE
  
  ${finalMessage}
  
  `;

  return prompt;
}

  //
  // This is a "system" message - where we ask OpenAI to do something.
  //
  const systemMessage = {
    role: "system",
    content: prompt,
  };

  //
  // Call OpenAI
  //
  const responseFromAI = await openaiGetSuggestions({
    messages: [systemMessage],
  });

  const suggestedResponse = responseFromAI.content;

async function openaiGetSuggestions({ messages }) {
  const chatCompletion = await openai.chat.completions.create({
    model: HOBBES_SUGGESTIONS_OPENAI_MODEL,
    messages,
  });
  const responseFromAI = chatCompletion.choices[0].message;
  return responseFromAI;
}

"messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
*/

/*
const openai = new OpenAI({
  apiKey: 'My API Key', // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

const HOBBES_CHAT_OPENAI_MODEL = "gpt-4-0613";
const HOBBES_SUGGESTIONS_OPENAI_MODEL = "gpt-3.5-turbo";

*/

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  //organization: process.env.OPENAI_ORG_ID,
});

const SYSTEM_MESSAGE = `
You are a good researcher. When the user asks a question, you find relevant text, images, and videos
to help answer that question. Your answers will be displayed on a website with one or more pages.

You will respond to a question with your answer formatted as a JSON object that follows this structure:

{
  "pageType": "BLOG_PAGE",
  "menuLabel": "Blog",
  "heading": "This is a blog page",
  "body": "Example page body text",
  "posts": [
    {
      "blogPostType": "TEXT_POST",
      "heading": "Text Post: Example blog post heading",
      "body": "Example post text"
    },
    {
      "blogPostType": "IMAGE_POST",
      "heading": "Image Post: Example blog post heading",
      "body": "Example post text",
      "layout": "VERTICAL_IMAGE_BELOW",
      "imageUrl": "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg"
    },
    {
      "blogPostType": "VIDEO_POST",
      "heading": "Video Post: Example blog post heading",
      "body": "Example post text",
      "layout": "VERTICAL_IMAGE_BELOW",
      "youTubeVideoLink": ""
    }
  ]
}

You MUST replace the "menuLabel" field with a VERY SHORT label for the user query.

You will return one or more "posts" with each post being either TEXT ONLY, TEXT AND IMAGE, or TEXT AND VIDEO. Each post you 
return will be a JSON object you add into the "posts" array that you return.

1. If a post has no image or video associated with it, the post should be in this format:

  {
    "blogPostType": "TEXT_POST",
    "heading": "Text Post: Example blog post heading",
    "body": "Example post text"
  }

With these values:

  "heading" is a heading that will be displayed to the user. It is a heading or title brifely describing the page.
  "body" is where you put all of the textual content for your answer.
  "youTubeVideoLink" is the URL to a you tube video on the internet that best matches your answer.


2. If a post DOES HAVE AN IMAGE associated with it, the post should be in this format:

{
  "blogPostType": "IMAGE_POST",
  "heading": "Image Post: Example blog post heading",
  "body": "Example post text",
  "layout": "VERTICAL_IMAGE_BELOW",
  "imageUrl": ""
}

With these values:

  "heading" is a heading that will be displayed to the user. It is a heading or title brifely describing the page.
  "body" is where you put all of the textual content for your answer.
  "imageUrl" is the URL to a an image on the internet that best matches your answer.

3. If a post DOES HAVE A VIDEO associated with it, the post should be in this format:

{
  "blogPostType": "VIDEO_POST",
  "heading": "Image Post: Example blog post heading",
  "body": "Example post text",
  "layout": "VERTICAL_IMAGE_BELOW",
  "youTubeVideoLink": ""
}

With these values:

  "heading" is a heading that will be displayed to the user. It is a heading or title brifely describing the page.
  "body" is where you put all of the textual content for your answer.
  "youTubeVideoLink" is the URL to a YouTube video on the internet that best matches your answer.


Please return an answer with 5-7 posts.
`;

async function aiGenerateWebpage({ systemMessageContent, userMessageContent }) {
  const messages = [
    {
      role: "system",
      content: systemMessageContent,
    },
    {
      role: "user",
      content: userMessageContent,
    },
  ];

  const chatCompletion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });

  return chatCompletion;
}

/*
GOT RESPONSE 
{
   "id": "chatcmpl-8Hy2e8psCNLso6NQqaHCGvn5F7h34",
   "object": "chat.completion",
   "created": 1699293068,
   "model": "gpt-3.5-turbo-0613",
   "choices": [
      {
         "index": 0,
         "message": {
            "role": "assistant",
            "content":
*/

aiGenerateWebpage({
  systemMessageContent: SYSTEM_MESSAGE,
  userMessageContent: "Explain Surfing",
})
  .then(function (response) {
    console.log("GOT RESPONSE ");
    console.log(JSON.stringify(response, null, 3));
    const webpageJSON = JSON.parse(response.choices[0].message.content);

    console.log("JSON");
    console.log(JSON.stringify(webpageJSON, null, 3));
  })
  .catch(function (error) {
    console.error("ERROR");
    console.log(error);
  });
