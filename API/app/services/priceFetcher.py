import os
from dotenv import load_dotenv
import requests
from datetime import datetime, timedelta


today = datetime.today().strftime("%Y-%m-%d")
yesterday = (datetime.today() - timedelta(days=1)).strftime("%Y-%m-%d")

load_dotenv()
MASSIVE_API_KEY = os.getenv("MASSIVE_API_KEY")


def process_api(res):
    prices = []
    times = []

    for price in res['results']:
        prices.append(price['c'])
        t = datetime.fromtimestamp(price['t']/1000)
        times.append(t.strftime("%Y-%m-%d %H:%M:%S"))

    maxprice1 = max(prices[-60:])
    minprice1 = min(prices[-60:])
    maxPrice24 = max(prices)
    minPrice24 = min(prices)
    currPrice = prices[-1]
    changedifference = currPrice - prices[0]
    changepercentage = (changedifference/prices[0])*100

    return maxprice1, minprice1, maxPrice24, minPrice24, currPrice, changedifference, changepercentage, prices, times


def get_prices(symbol: str, yesterday:str = yesterday, today: str = today):
    url = (
    f"https://api.massive.com/v2/aggs/ticker/{symbol}/range/1/minute/{yesterday}/{today}"
    f"?adjusted=true&sort=asc&limit=50000&apiKey={MASSIVE_API_KEY}"
    )
    res = requests.get(url).json()
    maxprice1, minprice1, maxPrice24, minPrice24, currPrice, changedifference, changepercentage, prices, times = process_api(res)
    apijson = {
        "symbol": symbol,
        "currPrice": currPrice,
        "maxPrice24": maxPrice24,
        "minPrice24": minPrice24,
        "maxprice1": maxprice1,
        "minprice1": minprice1,
        "changepercentage": changepercentage,
        "changedifference": changedifference,
        "prices": prices,
        "times": times
    }

    return apijson


if __name__=="__main__":
    print(get_prices("NVDA"))




