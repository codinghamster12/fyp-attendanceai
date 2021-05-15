import sys
import os, time
import cognitive_face as CF
from global_variables import personGroupId
import urllib
import sqlite3

from dotenv import load_dotenv

load_dotenv()

Key = os.getenv('API_KEY')
CF.Key.set(Key)

BASE_URL = os.getenv('BASE_URL')
CF.BaseUrl.set(BASE_URL)

import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
def get_person_id(Id):
	person_id = ''
	extractId = str(Id)[-5:]
	connect = sqlite3.connect("../db.sqlite3")
	c = connect.cursor()
	cmd = "SELECT * FROM student_student WHERE Registration_No = " + extractId
	c.execute(cmd)
	row = c.fetchone()
	person_id = row[9]
	connect.close()
	return person_id

def get_faces(Id):
    currentDir = os.path.dirname(os.path.abspath(__file__)).replace('\\', '/')
    imageFolder = os.path.join(currentDir, "dataset/user" + str(Id)).replace('\\', '/')
    person_id = get_person_id(Id)
    for filename in os.listdir(imageFolder):
        if filename.endswith(".jpg"):
            print (filename)
            imgurl = os.path.join(imageFolder, filename)
            # print(imgurl)
            res = CF.face.detect(imgurl)
            time.sleep(6)
            if len(res) != 1:
                print ("No face detected in image")
            else:
                res = CF.person.add_face(imgurl, personGroupId, person_id)
                print (res)

