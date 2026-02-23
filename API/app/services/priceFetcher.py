import os
from dotenv import load_dotenv
import requests

load_dotenv()
MASSIVE_API_KEY = os.getenv("MASSIVE_API_KEY")
url = (
    f"https://api.massive.com/v2/aggs/ticker/NVDA/range/1/minute/2026-01-01/2026-01-02"
    f"?adjusted=true&sort=asc&limit=50000&apiKey={MASSIVE_API_KEY}"
)

res = requests.get(url)

print(res.json())




