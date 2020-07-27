from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import json

driver = webdriver.Chrome("/usr/local/bin/chromedriver")

links = {}
driver.get("http://www.theweatherprediction.com/habyhints/")

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