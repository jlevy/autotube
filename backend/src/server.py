# from app import config
# from app import search, create_app

# config.setup()


# app = create_app()


# def load():
#     with app.app_context():
#         search.load_autocomplete_indices()


# if __name__ == "__main__":
#     load()
#     # TODO: Providing hostname via Flask's SERVER_NAME
#     # does not work with Blueprint routes for some reason,
#     # leading to 404s on all routes.
#     app.run(config.get_secret("hostname"), debug=True)




from fastapi import FastAPI
from typing import Optional
from typing import List, Optional
from pydantic import BaseModel, HttpUrl

class Topic(BaseModel):
    content: str
    timestamps: List[HttpUrl]

class Takeaway(BaseModel):
    content: str
    timestamp: HttpUrl

class Video(BaseModel):
    title: Optional[str] = ""
    description: Optional[str] = ""
    url: Optional[HttpUrl] = ""
    category: Optional[str] = ""
    topics: List[Topic]
    takeaways: List[Takeaway]

class Channel(BaseModel):
    channel_id: HttpUrl
    categories: List[str]
    videos: List[Video]


app = FastAPI()

@app.get("/channel/{channel_id}")
async def read_channel(channel_id: str) -> Channel:
    # Replace with actual logic to fetch channel data based on channel_id
    return Channel(
        channel_id="https://www.youtube.com/@lexfridman",
        categories=["AI", "MMA", "Continuousness", "Love", "Money", "Fame", "Power"],
        videos=[
            Video(
                title="MrBeast: Future of YouTube, Twitter, TikTok, and Instagram | Lex Fridman Podcast #351",
                description="...",
                url="https://www.youtube.com/watch?v=Z3_PwvvfxIU",
                category="",
                topics=[
                    Topic(
                        content="social media platforms",
                        timestamps=[
                            "https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=7949s",
                            "https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s",
                            "https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s"
                        ]
                    )
                ],
                takeaways=[
                    Takeaway(
                        content="MrBeast talks about Twitter",
                        timestamp="https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s"
                    ),
                    Takeaway(
                        content="MrBeast talks about TikTok",
                        timestamp="https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=3188s"
                    ),
                ]
            )
        ]
    )
