const OpenAI = require("openai");
const dotenv = require("dotenv");
//mport getSystemPrompt from "./system-prompt";

dotenv.config();

const AI_MODEL = "gpt-3.5-turbo";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CANNED_SURFING_RESPONSE = {
  pageType: "BLOG_PAGE",
  menuLabel: "Surfing",
  heading: "Surfing 101: Riding the Waves",
  body: "Surfing is a popular water sport that involves riding ocean waves on a surfboard. It originated in ancient Polynesia and has evolved into a global phenomenon. Here is a breakdown of the key aspects of surfing:\n\n1. Surfboard: The primary equipment used in surfing is the surfboard. There are different types and sizes of surfboards designed for various surfing conditions.\n\n2. Waves: Surfing requires waves for riding. Waves are formed by wind blowing over the ocean surface and come in different sizes and shapes.\n\n3. Paddling: Before catching a wave, surfers use their arms to paddle out to the lineup, where they wait for waves.\n\n4. Takeoff: Once a suitable wave approaches, the surfer paddles and then pops up to their feet in a motion called takeoff.\n\n5. Riding: Surfers ride the face of the wave by using various techniques, including turning, trimming, and carving.\n\n6. Maneuvers: Advanced surfers perform maneuvers such as cutbacks, aerials, and barrels to showcase their skills.\n\nSurfing is not only a sport but also a way of life for many enthusiasts. It offers a unique connection with nature and the ocean, providing both physical exercise and a sense of freedom.\n\nIf you want to learn more about surfing, check out the following video:",
  posts: [
    {
      blogPostType: "VIDEO_POST",
      heading: "Surfing Basics: How to Catch a Wave",
      body: "A beginner's guide to catching and riding waves in surfing.",
      layout: "VERTICAL_IMAGE_BELOW",
      youTubeVideoLink: "https://www.youtube.com/watch?v=6iFJtOF2cOw",
    },
    {
      blogPostType: "TEXT_POST",
      heading: "Different Types of Surfboards",
      body: "Surfboards come in various shapes and sizes to suit different wave conditions. Some common types of surfboards include longboards, shortboards, fish boards, and funboards.",
    },
    {
      blogPostType: "TEXT_POST",
      heading: "Safety Tips for Surfing",
      body: "Surfing can be a thrilling but potentially dangerous sport. It is essential to prioritize safety while in the water. Some safety tips for surfing include checking the local surf conditions, wearing a leash, using proper surfing etiquette, and staying aware of your surroundings.",
    },
    {
      blogPostType: "IMAGE_POST",
      heading: "Surfing Locations Around the World",
      body: "Each coast and country offers unique surfing spots. From the famous breaks of Hawaii to the pristine beaches of Indonesia, here are some popular surfing destinations around the world:",
      layout: "VERTICAL_IMAGE_BELOW",
      imageUrl: "https://i.imgur.com/PSVV88x.jpg",
    },
    {
      blogPostType: "TEXT_POST",
      heading: "Surfing Competitions and Events",
      body: "Surfing has a competitive side with various professional and amateur competitions happening worldwide. Some major surfing events include the World Surf League Championship Tour, Vans Triple Crown of Surfing, and the Quiksilver Pro.",
    },
    {
      blogPostType: "IMAGE_POST",
      heading: "Surfing Gear and Equipment",
      body: "Apart from a surfboard, there is essential gear required for safe and enjoyable surfing. This includes a wetsuit or rash guard, surf wax, fins, leash, and surfboard bag.",
      layout: "HORIZONTAL_IMAGE_RIGHT",
      imageUrl: "https://i.imgur.com/hoZH1YY.jpg",
    },
    {
      blogPostType: "TEXT_POST",
      heading: "Environmental Impact of Surfing",
      body: "Surfers have a close relationship with the ocean and are often passionate about protecting it. Surfers engage in initiatives to preserve coastal ecosystems, raise awareness about pollution, and support sustainable practices in the surfing industry.",
    },
  ],
};

/**
 * This function executes a single request and response with OpenAI - without the need
 * for memory of prior message exchanges.
 */
async function aiSimpleChatExchange({ systemPrompt, userQuery }) {
  //
  // TODO: Remove this once live on network and want to use OpenAI.
  //
  return JSON.stringify(CANNED_SURFING_RESPONSE, null, 3);

  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: userQuery,
    },
  ];

  const chatCompletion = await openai.chat.completions.create({
    messages,
    model: AI_MODEL,
  });

  return chatCompletion.choices[0].message.content;
}

module.exports = {
  aiSimpleChatExchange,
};
