from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
import time


opt = Options()
opt.add_argument("--user-data-dir=/home/aranggitoar/.config/google-chrome")
opt.add_argument('--profile-directory=Person 1')
driver = webdriver.Chrome(options=opt, executable_path="/home/aranggitoar/chromedriver")


driver.get("https://benihyangbaik.com/event-rgstr")
assert "ABBA 90" in driver.title


def enter_keys(css_selector, keys_to_enter):
  e = driver.find_element_by_css_selector(css_selector)
  e.clear()
  e.send_keys(keys_to_enter)

def click(css_selector):
  e = driver.find_element_by_css_selector(css_selector)
  e.click()


enter_keys('#e-mail', 'aranggi.josef@gmail.com')
enter_keys('#name', 'Aranggi Josef Toar')
click('#man')
enter_keys('#age', '23')
enter_keys('#phone-number', '087812790477')
enter_keys('#home-address', 'Somewhere over the rainbow')
click('button[type="submit"]')

time.sleep(10)
driver.close()
