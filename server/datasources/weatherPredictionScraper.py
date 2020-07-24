from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import json

driver = webdriver.Chrome("/usr/local/bin/chromedriver")

links = {}
driver.get("http://www.theweatherprediction.com/habyhints/")
# driver.get("https://www.flipkart.com/search?q=laptop&sid=6bo%2Cb5g&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_na&as-pos=1&as-type=RECENT&suggestionId=laptop%7CLaptops&requestId=807e099c-ccc1-41da-8280-7b705fb97c4a&as-backfill=on")

content = driver.page_source
soup = BeautifulSoup(content, 'html.parser')

for number in soup.findAll('font', attrs={'color':'FF0000'}, limit=10):
    if number.next_sibling is not None:
        name=number.next_sibling.text
        driver.get('http://www.theweatherprediction.com/habyhints/{}'.format(number.next_sibling['href']))
        newContent = driver.page_source
        newSoup = BeautifulSoup(newContent, 'html.parser')
        jeffHabyTitle = newSoup.find('center', text = 'METEOROLOGIST JEFF HABY')
        if jeffHabyTitle is not None:
            description='{}'.format(jeffHabyTitle.next_sibling.next_sibling.next_sibling)
            links[name] = description
        driver.back()

driver.close()
with open('links.json', 'w') as fp:
    json.dump(links, fp)

# products=[] #List to store name of the product
# prices=[] #List to store price of the product
# ratings=[] #List to store rating of the product
# driver.get("https://www.flipkart.com/search?q=laptop&sid=6bo%2Cb5g&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_na&as-pos=1&as-type=RECENT&suggestionId=laptop%7CLaptops&requestId=807e099c-ccc1-41da-8280-7b705fb97c4a&as-backfill=on")
#
# content = driver.page_source
# soup = BeautifulSoup(content, 'html.parser')
# for a in soup.findAll('a',href=True, attrs={'class':'_31qSD5'}):
#     name=a.find('div', attrs={'class':'_3wU53n'})
#     price=a.find('div', attrs={'class':'_1vC4OE _2rQ-NK'})
#     rating=a.find('div', attrs={'class':'hGSR34'})
#     products.append(name.text)
#     prices.append(price.text)
# #     ratings.append(rating.text)
#
# df = pd.DataFrame({'Product Name':products,'Price':prices})
# df.to_csv('products.csv', index=False, encoding='utf-8')