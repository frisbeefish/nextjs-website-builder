import json
import pprint
from fastapi import FastAPI, File, UploadFile
import shutil
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body
import subprocess
from simpleaichat import AIChat
from dotenv import load_dotenv
from bing_image_urls import bing_image_urls

from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

import urllib.parse as p
import re
import os
import pickle

SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"]

load_dotenv()

app = FastAPI()

from pydantic import BaseModel


class AIWebPageQuery(BaseModel):
    requestText: str

class WebsiteJSON(BaseModel):
    pages: dict


def youtube_authenticate():
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = "credentials.json"
    creds = None
    # the file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first time
    if os.path.exists("token.pickle"):
        with open("token.pickle", "rb") as token:
            creds = pickle.load(token)
    # if there are no (valid) credentials availablle, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(client_secrets_file, SCOPES)
            creds = flow.run_local_server(port=0)
        # save the credentials for the next run
        with open("token.pickle", "wb") as token:
            pickle.dump(creds, token)

    return build(api_service_name, api_version, credentials=creds)

# authenticate to YouTube API
youtube = youtube_authenticate()

def search(youtube, **kwargs):
    return youtube.search().list(
        part="snippet",
        **kwargs
    ).execute()

'''
"optionalImages": [
      {
        "imageUrl":
          "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      },
      {
        "imageUrl":
          "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2022-07/220726-cat-theo-elise-ew-636p-6cd3b0.jpg",
      }
'''

SURFING_RESPONSE = '''
{
  "pageType": "BLOG_PAGE",
  "menuLabel": "Surfing",
  "heading": "Surfing: Riding the Waves",
  "body": "Surfing is a water sport that involves riding waves on a surfboard. It originated in ancient Polynesia and has since gained popularity worldwide. Surfers paddle out into the ocean, wait for a suitable wave, and then ride it back towards the shore. It requires skill, balance, and a deep connection with the ocean. Surfing can be done on various types of waves, from small and mellow to big and powerful. It is not only a sport but also a way of life for many enthusiasts, who embrace the thrill and beauty of the ocean.",
  "posts": [
    {
      "blogPostType": "IMAGE_POST",
      "heading": "The Art of Surfing",
      "body": "Surfing requires a combination of physical skill and artistry. Surfers must read the waves, position themselves correctly, and perform fluid movements on the board. It is a graceful and exhilarating sport that captures the essence of the ocean.",
      "layout": "VERTICAL_IMAGE_BELOW",
      "imageUrl": "https://i.imgur.com/7MPlVU5.jpg",
      "optionalImages": [
        {
          "imageUrl":"https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
        },
        {
          "imageUrl":"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2022-07/220726-cat-theo-elise-ew-636p-6cd3b0.jpg"
        }
      ]
    },
    {
      "blogPostType": "VIDEO_POST",
      "heading": "Surfing: Aerial Maneuvers",
      "body": "Surfers have pushed the boundaries of the sport, performing incredible aerial maneuvers. With the advancement of board technology and athleticism, surfers can launch off the lip of the wave and perform tricks in mid-air. Watch this video to see some jaw-dropping aerial surfing maneuvers.",
      "layout": "VERTICAL_IMAGE_BELOW",
      "youTubeVideoLink": "https://www.youtube.com/watch?v=Zu0fZy8e5Fg"
    },
    {
      "blogPostType": "TEXT_POST",
      "heading": "Surfboard Types",
      "body": "There are various types of surfboards designed for different wave conditions and skill levels. Longboards, shortboards, fish boards, and hybrid boards are some common types. Longboards are longer and offer stability, making them ideal for beginners. Shortboards are shorter and more maneuverable, allowing advanced surfers to perform tricks. Fish boards are wider and provide better stability in smaller waves. Hybrid boards combine features of different types to suit specific preferences and conditions."
    },
    {
      "blogPostType": "IMAGE_POST",
      "heading": "Surfing Destinations",
      "body": "Surfing can be enjoyed in numerous destinations around the world. From the tropical waters of Hawaii and Indonesia to the rugged coastlines of California and Australia, there are countless surf breaks waiting to be explored. Each destination offers its own unique waves, culture, and natural beauty. Check out this stunning image of a surfer catching a wave in the famous surf spot of Pipeline, Hawaii.",
      "layout": "VERTICAL_IMAGE_BELOW",
      "imageUrl": "https://i.imgur.com/6d4w4B5.jpg"
    },
    {
      "blogPostType": "TEXT_POST",
      "heading": "Surfing Safety",
      "body": "While surfing is an exciting sport, it is important to prioritize safety. Surfers should always check the conditions, wear a leash to keep the board attached, and be aware of their surroundings. It is also crucial to respect other surfers in the lineup and adhere to surfing etiquette. Additionally, beginner surfers are encouraged to take lessons from experienced instructors to learn proper techniques and ocean awareness."
    },
    {
      "blogPostType": "VIDEO_POST",
      "heading": "Surfing: The Zen of the Ocean",
      "body": "Surfing is not just about riding waves; it is also about connecting with nature and experiencing a sense of peace. This video captures the beauty and tranquility of surfing, showcasing the mesmerizing rhythm of the ocean and the joy it brings to those who embrace it.",
      "layout": "VERTICAL_IMAGE_BELOW",
      "youTubeVideoLink": "https://www.youtube.com/watch?v=O5bTbVbe4e4"
    }
  ]
}
'''

ITALIAN_CASHMERE_RESPONSE='''
{
  "pageType": "BLOG_PAGE",
  "menuLabel": "Italian Cashmere",
  "heading": "Italian Cashmere: The Epitome of Luxury",
  "body": "Italian cashmere is renowned worldwide for its exceptional quality and luxurious feel. Cashmere is a type of wool that is sourced from cashmere goats, primarily found in the highlands of Mongolia, China, and Iran. However, it is the Italian craftsmanship and expertise that truly sets Italian cashmere apart from the rest. Here are some key reasons why Italian cashmere is considered the epitome of luxury:\n\n1. Superior Quality: Italian cashmere is known for its superior quality and durability. The long and fine fibers of the cashmere goats are carefully harvested and meticulously processed to create soft and luxurious yarn.\n\n2. Expert Craftsmanship: Italian artisans have been perfecting the art of cashmere production for centuries. They have honed their skills to create exquisitely woven and knitted pieces that showcase the natural beauty and softness of cashmere.\n\n3. Unparalleled Softness: The softness of Italian cashmere is unparalleled. It is incredibly lightweight, yet provides exceptional warmth and insulation. The fibers are incredibly fine, measuring less than 19 microns in diameter, resulting in a fabric that feels incredibly soft against the skin.\n\n4. Timeless Elegance: Italian cashmere is synonymous with timeless elegance. Its luxurious texture and refined appearance make it a staple in high-end fashion. Whether it's a cashmere sweater, scarf, or coat, Italian cashmere elevates any outfit and adds a touch of sophistication.\n\n5. Sustainable and Ethical Production: Italian cashmere producers are committed to sustainable and ethical practices. They ensure the welfare of the cashmere goats and promote responsible grazing and farming techniques.\n\nWhen it comes to luxury and quality, Italian cashmere is unmatched. Investing in Italian cashmere pieces is not only a testament to style and sophistication but also a guarantee of long-lasting, timeless pieces that will be cherished for years to come.",
  "posts": [
    {
      "blogPostType": "IMAGE_POST",
      "heading": "The Process of Making Italian Cashmere",
      "body": "Italian cashmere production involves a meticulous process that ensures the highest quality. It begins with the careful selection of cashmere goats and their fine fibers.",
      "layout": "VERTICAL_IMAGE_BELOW",
      "imageUrl": "https://i.imgur.com/2vYq0zc.jpg"
    },
    {
      "blogPostType": "TEXT_POST",
      "heading": "Why Italian Cashmere is Worth the Investment",
      "body": "Investing in Italian cashmere is worth every penny. The exceptional quality, superior softness, and timeless elegance make it a valuable addition to any wardrobe. Italian cashmere pieces are not only luxurious but also durable and long-lasting, ensuring years of enjoyment."
    },
    {
      "blogPostType": "IMAGE_POST",
      "heading": "Italian Cashmere Fashion Trends",
      "body": "Italian cashmere has always been at the forefront of fashion trends. Whether it's classic cashmere sweaters or innovative designs, Italian fashion houses continue to push the boundaries of cashmere fashion.",
      "layout": "VERTICAL_IMAGE_BELOW",
      "imageUrl": "https://i.imgur.com/d9ZUQ2U.jpg"
    },
    {
      "blogPostType": "VIDEO_POST",
      "heading": "The Art of Italian Cashmere Production",
      "body": "Witness the artistry and craftsmanship behind Italian cashmere production in this captivating video. From the careful selection of fibers to the intricate weaving process, every step is a testament to the dedication and skill of Italian artisans.",
      "layout": "VERTICAL_IMAGE_BELOW",
      "youTubeVideoLink": "https://www.youtube.com/watch?v=ABC123"
    },
    {
      "blogPostType": "TEXT_POST",
      "heading": "How to Care for Italian Cashmere",
      "body": "Proper care is essential to maintain the beauty and longevity of Italian cashmere. Always follow the care instructions provided by the manufacturer. Generally, it is recommended to hand wash cashmere with a gentle detergent, avoid wringing or twisting, and lay it flat to dry. Keep your cashmere folded or hung to prevent stretching and store it in a clean, dry place."
    },
    {
      "blogPostType": "IMAGE_POST",
      "heading": "Italian Cashmere vs. Other Cashmere",
      "body": "Italian cashmere stands out from other types of cashmere due to its superior quality and craftsmanship. The fine fibers, meticulous processing, and expert weaving techniques result in a fabric that is unmatched in softness and durability.",
      "layout": "VERTICAL_IMAGE_BELOW",
      "imageUrl": "https://i.imgur.com/8I7l6uL.jpg"
    },
    {
      "blogPostType": "TEXT_POST",
      "heading": "Italian Cashmere Brands to Explore",
      "body": "If you're looking to invest in Italian cashmere, here are some renowned brands to explore:\n\n1. Loro Piana\n2. Brunello Cucinelli\n3. Agnona\n4. Malo\n5. Zegna\n\nThese brands are known for their commitment to quality, craftsmanship, and sustainability."
    }
  ]
}
'''

CANNED_RESPONSE = ITALIAN_CASHMERE_RESPONSE

#
# We send this to OpenAI each time we speak with it.
#
# This is the "preamble" that trains it to behave the way we want it to.
#
SYSTEM_PROMPT = '''
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
'''

#
# CORS.
#
# This allows the web app to call into this API even though this API
# is served up from a different domain than the web app is served from.
#
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["DELETE", "GET", "POST", "PUT"],
    allow_headers=["*"],
)

@app.post("/upload-image")
async def create_upload_file(file: UploadFile = File(...)):
    print('in upload image')
    print('file name ' + file.filename)
    with open(f"../website-builder/public/static/images/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {
      "filename": file.filename,
      "url":f"http://localhost:3000/static/images/{file.filename}"
    }

@app.post("/save-website-json")
async def saveWebsiteJSON(websiteJSON: dict = Body(embed=True)):
    """Save website JSON to => /database/charmianstewart.com/website.json
    """
    #websiteJSON = data.websiteJSON
    json_formatted_str = json.dumps(websiteJSON["pages"], indent=4)
    print(json_formatted_str)

    with open('../database/charmianstewart.com/website.json', 'w') as f:
      f.write(json_formatted_str)

    return {"success": True}


@app.post("/generate-website")
async def generateWebsite():
    """Generate the website based on the data in /database/charmianstewart.com/website.json
    """
    print('posted')
    subprocess.run(["npm","run","build"],cwd="../website-generator")
    return {"success": True}


@app.post("/ai-generate-webpage")
async def ai_generate_webpage(webPageQuery:AIWebPageQuery):
    """This is the code that calls out to ChatGPT and asks it
    to create a web page of whatever the user asked for from the
    web app when they were designing their website.

    This will return JSON in the same format as the website editor tool uses to
    define the website the user is building (and the same format as is consumed
    by the website generator).
    """

    print(CANNED_RESPONSE)

    #ai = AIChat(system=SYSTEM_PROMPT)
    #response = ai(webPageQuery.requestText)
    #webpage = json.loads(response, strict=False)
    #return webpage

    webpage = json.loads(CANNED_RESPONSE, strict=False)

    for post in webpage["posts"]:
        if post["blogPostType"] == "IMAGE_POST":
            print('IMAGE POST')
            # "heading": "Surfing: Aerial Maneuvers",
            post["imageUrl"] = ""
            images_query = post["heading"]
            print("query ", images_query)
            images = bing_image_urls(images_query, limit=10)
            images = [
              image for image in images if image.startswith("https:")
            ]
            pprint.pprint(images)
            post["optionalImages"] = [
              {
                "imageUrl":image_url 
              }
              for image_url in images
            ]
            if len(post["optionalImages"]) > 0:
                post["imageUrl"] = post["optionalImages"][0]["imageUrl"]

        elif post["blogPostType"] == "VIDEO_POST":

            post["videoId"] = ""
            videos_query = post["heading"]

            print("query ", videos_query)

            response = search(youtube, q=videos_query, maxResults=6)
            items = response.get("items")

            optional_videos = [
              {
                "videoId":item["id"]["videoId"],
                "thumbnailImageUrl":item["snippet"]["thumbnails"]["medium"]["url"]
              }
              for item in items
            ]
            post["optionalVideos"] = optional_videos

            if len(optional_videos) > 0:
                post["videoId"] = post["optionalVideos"][0]["videoId"]

            '''
            post["optionalVideos"] = [
              {
                 "videoId":"jyn_orqdyHQ",
                 "thumbnailImageUrl":"https://i.ytimg.com/vi/jyn_orqdyHQ/mqdefault.jpg"
              },
              {
                "videoId":"6fezIiROLjQ",
                "thumbnailImageUrl":"https://i.ytimg.com/vi/6fezIiROLjQ/mqdefault.jpg"
              }
            ]
            '''


        
        #print(post)
        #blogPostType': 'IMAGE_POST

    pprint.pprint(webpage)
    print("that was the webpage")

    #images = bing_image_urls("kitty", limit=20)
    #print(images)

    return webpage





