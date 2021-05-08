import sys
import cognitive_face as CF
from .global_variables import personGroupId
import sqlite3
import os
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from dotenv import load_dotenv


load_dotenv()

Key = os.getenv('API_KEY')
CF.Key.set(Key)

BASE_URL =  os.getenv('BASE_URL')
# print(BASE_URL)  # Replace with your regional Base URL
CF.BaseUrl.set(BASE_URL)

def create_person(Id):

    
    res = CF.person.create(personGroupId, str(Id))
    print(res['personId'])
    extractId = str(Id)[-5:]
    connect = sqlite3.connect("db.sqlite3")
    cmd = "SELECT * FROM student_student WHERE Registration_No = " + extractId
    cursor = connect.execute(cmd)
    isRecordExist = 0
    for row in cursor:                                                          # checking wheather the id exist or not
        isRecordExist = 1
    if isRecordExist == 1:                                                    # updating name and roll no
        connect.execute("UPDATE student_student SET personID = ? WHERE Registration_No = ?",(res['personId'], extractId))
    connect.commit()                                                            # commiting into the database
    connect.close()
    print ("Person ID successfully added to the database")

