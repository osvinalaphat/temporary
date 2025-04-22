from fastapi import FastAPI, Request
from pydantic import BaseModel
from sqlalchemy import Column, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from typing import Optional


# Initialize FastAPI app
app = FastAPI()

# Database configuration
DATABASE_URL = "sqlite+aiosqlite:///./portfolios.db"
engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# Database models
Base = declarative_base()

class UserPortfolio(Base):
    __tablename__ = "user_portfolios"

    uid = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=True)
    biog = Column(Text, nullable=True)
    background_color = Column(String, nullable=True)
    title_color = Column(String, nullable=True)
    biog_color = Column(String, nullable=True)

# Initialize the database
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Startup event to initialize database
@app.on_event("startup")
async def on_startup():
    await init_db()

# Pydantic model to validate user input
class UserValidate(BaseModel):
    uid: str
    title: Optional[str] = None
    biog: Optional[str] = None
    background_color: Optional[str] = None
    title_color: Optional[str] = None
    biog_color: Optional[str] = None

# Routes

# Template + Static (for frontend)
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def front_image(request: Request):
    return templates.TemplateResponse("front.html", {"request": request})

# Route to retrieve user data with a GET request
@app.get("/my-page")
async def get_user_data(uid: str):
    async with async_session() as session:
        result = await session.execute(select(UserPortfolio).where(UserPortfolio.uid == uid))
        user = result.scalar_one_or_none()

        if user:
            return {
                "title": user.title,
                "biog": user.biog,
                "background_color": user.background_color,
                "title_color": user.title_color,
                "biog_color": user.biog_color,
            }

    return {}  # If user not found

# Route to save user data with a POST request
@app.post("/my-page")
async def save_user_data(user_data: UserValidate):
    async with async_session() as session:
        result = await session.execute(select(UserPortfolio).where(UserPortfolio.uid == user_data.uid))
        user = result.scalar_one_or_none()

        if not user:
            user = UserPortfolio(uid=user_data.uid)
            session.add(user)

        for field in ["title", "biog", "background_color", "title_color", "biog_color"]:
            value = getattr(user_data, field)
            if value is not None:
                setattr(user, field, value)

        await session.commit()

    return {"message": "Data saved successfully"}
