import os
from dotenv import load_dotenv
import requests
from datetime import datetime
load_dotenv()
MASSIVE_API_KEY = os.getenv("MASSIVE_API_KEY")
url = (
    f"https://api.massive.com/v2/aggs/ticker/NVDA/range/1/minute/2026-01-01/2026-01-02"
    f"?adjusted=true&sort=asc&limit=50000&apiKey={MASSIVE_API_KEY}"
)

def reqdata():
    res = requests.get(url).json()

    prices = []
    times = []

    for items in res ['results']:
        prices.append(items['c'])
        t = datetime.fromtimestamp(items['t']/1000)
        times.append(t.strftime("%Y-%m-%d %H:%M:%S"))

    maxprice = max(prices)
    minprice = min(prices)
    currentprice = prices[-1]
    changediff = currentprice - prices[0]
    changepercent = (changediff/prices[0])*100


    output = {
        "symbol": "NVDA",
        "currPrice": round(currentprice, 2),
        "maxPrice": round(maxprice, 2),
        "minPrice": round(minprice, 2),
        "changepercentage": round(changepercent, 2),
        "changedifference": round(changediff, 2),
        "prices": prices,
        "times": times
    }

    print(output)
reqdata()