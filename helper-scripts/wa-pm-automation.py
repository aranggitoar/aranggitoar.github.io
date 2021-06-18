from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
import time


opt = Options()
# opt.add_argument("--user-data-dir=/home/ajt/.config/google-chrome")
# opt.add_argument("--profile-directory=Person 1")
driver = webdriver.Chrome(options=opt, executable_path="/opt/lampp/htdocs/situs-pemuridan/helper-scripts/chromedriver")


driver.get("https://web.whatsapp.com")
time.sleep(50)


def enter_keys(string_to_find, find_by_what, keys_to_enter):
    if find_by_what == 'css':
        e = driver.find_element_by_css_selector(string_to_find)
    elif find_by_what == 'xpath':
        e = driver.find_element_by_xpath(string_to_find)
    elif find_by_what == 'class':
        e = driver.find_element_by_class_name(string_to_find)
    e.clear()
    e.send_keys(keys_to_enter)

def click(string_to_find, find_by_what):
    if find_by_what == 'css':
        e = driver.find_element_by_css_selector(string_to_find)
    elif find_by_what == 'xpath':
        e = driver.find_element_by_xpath(string_to_find)
    elif find_by_what == 'class':
        e = driver.find_element_by_class_name(string_to_find)
    e.click()


# HARUS DICARI TERLEBIH DAHULU, TIDAK MUNCUL DI LAYAR BERARTI ELEMEN BELUM ADA
click('span[title="Test Kode Broadcast BYB"]', 'css')
click('//span[text()="Test Kode Broadcast BYB]', 'xpath')
# perlu ada satu lagi untuk tunjukkan nama semua anggota grup

group_participant_cell_class_name_hook = '//span[@title="Você"]/../../../../'
group_participant_cell_class_name_driver = driver.find_element_by_xpath(group_participant_cell_class_name_hook)
group_participant_cell_class_name = group_participant_cell_class_name_driver.get_attribute('class')

group_participant_cells = driver.find_elements_by_class_name(group_participant_cell_class_name)
for group_participant_cell in group_participant_cells:
    click(group_participant_cell, 'class')
    if group_participant_cell.get_attribute('class') != group_participant_cell_class_name:
        enter_keys('//div[text()="Digite uma mensagem"]', 'xpath', "*Test* _test_ test")
        click('span[title="Test Kode Broadcast BYB"]', 'css')
        click('//span[text()="Test Kode Broadcast BYB]', 'xpath')
