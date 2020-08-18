import json
import requests

json_open = open('hyakunin.json', 'r',encoding='utf-8')
json_load = json.load(json_open)
print(json_load)

for num in range (1,100+1):
    print(num)
    print(f"create {num:03}.jpg")
    url = json_load[num]["imageURL"]
    file_name = f"{num:03}.jpg"
    response = requests.get(url)
    image = response.content

    with open(file_name, "wb") as aaa:
        aaa.write(image)