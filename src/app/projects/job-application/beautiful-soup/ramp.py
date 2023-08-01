from bs4 import BeautifulSoup as bs
import requests
import re


# function to extract html document from given url
def getHTMLdocument(url):
      
    # request for HTML document of given url
    response = requests.get(url)
      
    # response will be provided in JSON format
    return response.text
               
# assign required credentials
# assign URL
url_to_scrape = "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
  
# create document
html_document = getHTMLdocument(url_to_scrape)
  
# create soap object
soup = bs(html_document, 'html.parser')
  
# find all the anchor tags with "href" 
# attribute starting with "https://"
url = ''
ul_pattern = re.compile(r'.*75.*')
li_pattern = re.compile(r'98.*')
div_pattern = re.compile(r'.*35')
for ul in soup.find_all('ul', {'data-tag': ul_pattern}):
    for li in ul.find_all('li', {'data-id': li_pattern}):
        for div in li.find_all('div', {'data-class': div_pattern}):
            for span in div.find_all('span'):
                url+= span['value']
print(url)
