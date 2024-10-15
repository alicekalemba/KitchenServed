import requests
from bs4 import BeautifulSoup
import pandas as pd
#import streamlit as st

def lunch_menu():
    url = f"http://kitchen-served-bucket.s3-website-us-east-1.amazonaws.com/"
    headers = {
       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
   }
    response = requests.get(url, headers=headers)

    content = response.content

    # print(content)
    soup = BeautifulSoup(content, 'html.parser')
    #print(soup) 
    menu_lists = soup.select('.menu-list')
    # print(menu_lists[1])

    # you have the lunch item
    # in the lunch item, there are other items (list of lunch items)
    # use the soup object to get the list of lunch items
    # loop through each item returned by the soup, and for each item, print out it's title
    lunch_item = menu_lists[1]
    lunch_list = lunch_item.select('.menu-item')


    data = []

    for item in lunch_list:
        title = item.contents[0].strip()
        #print(f'Title: {title}')
        ingredients = item.select_one('.ingredients').text.replace('Ingredients: ', '')
        cooking_time = item.select_one('.cooking-time').text
        rating = item.select_one('.rating').text.replace('Rating: ', '')
        
        
        data.append({
            'Title': title,
            'Ingredients': ingredients,
            'Cooking Time': cooking_time,
            'Rating': rating
        })
    df = pd.DataFrame(data)
    # print(df)
    output_folder = '/Users/alice/HandsON/KitchenServed'
    output_file = '/Users/alice/HandsON/KitchenServed/lunch_menu.csv'
    df.to_csv(output_file, index=False)


    print(f"Data saved to {output_file}")
lunch_menu()


