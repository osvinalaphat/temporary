from fastapi import FastAPI,Request
from pydantic import BaseModel
from typing import Optional
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

user_data = {
    "title" : "",
    "biog" : "",
    "background_color" : "",
    "title_color" : "",
    "biog_color" : ""
}

class UserValidate(BaseModel):
    title : Optional[str] = None
    biog : Optional[str] = None
    background_color : Optional[str] = None
    title_color : Optional[str] = None
    biog_color : Optional[str] = None


@app.get("/")
async def front_image(request:Request):
    return templates.TemplateResponse("front.html", {"request": request})



@app.get("/my-page")
async def get_data(request: Request):
    uid = request.headers.get("Authorization")  # get UID from headers

    if not uid:
        return {"error": "UID missing"}

    if uid in user_data:
        return user_data[uid]
    else:
        # If no data yet, return empty fields
        return {
            "title": "",
            "biog": "",
            "background_color": "",
            "title_color": "",
            "biog_color": ""
        }
    
@app.post("/my-page")
async def change_data(user_post:UserValidate, request:Request):
    uid = request.headers.get("Authorization")  # get UID from headers
    
    if not uid:
            return {"error": "UID missing"}
    if uid not in user_data:
        user_data[uid] = {
            "title": "",
            "biog": "",
            "background_color": "",
            "title_color": "",
            "biog_color": ""
        }
    if user_post.title is not None:
        user_data[uid]["title"] = user_post.title
    if user_post.biog is not None:
        user_data[uid]["biog"] = user_post.biog
    if user_post.background_color is not None:
        user_data[uid]["background_color"] = user_post.background_color
    if user_post.title_color is not None:
        user_data[uid]["title_color"] = user_post.title_color
    if user_post.biog_color is not None:
        user_data[uid]["biog_color"] = user_post.biog_color
    return user_data[uid]
