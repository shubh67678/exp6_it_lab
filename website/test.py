import http.client

conn = http.client.HTTPSConnection("community-open-weather-map.p.rapidapi.com")

headers = {
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    "x-rapidapi-key": "76920dee8emsheefb1f27de6458dp122c45jsn5e6cf6d9e73e",
}

conn.request(
    "GET",
    "/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=imperial&mode=xml",
    headers=headers,
)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
