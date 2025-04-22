from sqlalchemy import Column, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class UserPortfolio(Base):
    __tablename__ = "user_portfolios"

    uid = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=True)
    biog = Column(Text, nullable=True)
    background_color = Column(String, nullable=True)
    title_color = Column(String, nullable=True)
    biog_color = Column(String, nullable=True)
