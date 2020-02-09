import os
import tempfile
import time
import pickle

from google.cloud import storage
from google.cloud import firestore_v1 as firestore
from google.cloud.firestore_v1 import Increment

# face_recognition code
import get_students

import firebase_admin
# from firebase_admin import firestore
from firebase_admin import credentials

cred = credentials.Certificate(".faceattendance-253619-firebase-adminsdk-t0wed-873dfd14a5.json")
firebase_admin.initialize_app(cred)

db = firestore.Client()
storage_client = storage.Client()

def students_in_image(data, context):
    file_data = data

    file_name = file_data['name']
    bucket_name = file_data['bucket']

    blob = storage_client.bucket(bucket_name).get_blob(file_name)
    blob_uri = f'gs://{bucket_name}/{file_name}'
    blob_source = {'source': {'image_uri': blob_uri}}

    ext = blob.content_type
    _, temp_image = tempfile.mkstemp()

    if ext.endswith('jpg') or ext.endswith('jpeg'):
        temp_image = temp_image + f'.jpg'
    elif ext.endswith('png'):
        temp_image = temp_image + f'.png'

    # Download file from bucket.
    start = time.time()
    blob.download_to_filename(temp_image)
    print(f'Image {file_name} was downloaded to {temp_image}. Time taken - {(time.time()) - start}')

    update_db(temp_image)

    # Delete the temporary file.
    os.remove(temp_image)


# updates the firestore db with students name
def update_db(image):
    doc = db.collection('AttendanceInstance').document('CurrentAttendance').get()
    doc = doc.to_dict()
    lecture = doc['lectureType']
    subject = doc['subject']
    lecturesNum = doc['lecturesNum']

    with open('students.txt', 'r') as fp:
        names = fp.readlines()

    names = [n.strip('\n').lower() for n in names]

    with open('students.pkl', 'rb') as fp:
        std_metadata = pickle.load(fp)

    # returns no. of face detected and list of students recognized
    detected, students = get_students.recognize_faces(image)
    print(f'Recognized: {len(students)}/{detected}')
    for face in students:
        face = face.split('_')[1] + ' ' + face.split('_')[0]
        print(f'{face} [{std_metadata[face][0]}]')

    if detected is None or detected is 0:
        print('No face detected')
        return

    for id, name in enumerate(students):
        name = name.split('_')[1] + ' ' + name.split('_')[0]
        if name not in names:
            continue

        id = std_metadata[name][0]

        doc_ref = db.collection('students').document(f'{id}')
        doc_ref.update({
            f'Attendance.{lecture}.{subject}': Increment(lecturesNum),
            'Attendance.Last_Updated': firestore.SERVER_TIMESTAMP,
        })


        # doc_ref.update({
        #     'Attendance': {
        #         'Theory': {
        #             'AM-3': 0,
        #             'DIS': 0,
        #             'DLDA': 0,
        #             'DS': 0,
        #             'ECCF': 0,
        #             'OOPM': 0,
        #         },
        #         'Practical': {
        #             'DLDA': 0,
        #             'DS': 0,
        #             'ECCF': 0,
        #             'OOPM': 0,
        #         },
        #         'Lectures_Attended': 0,
        #         'Last_Updated': firestore.SERVER_TIMESTAMP,
        #     },
        #     'ID': f'{id}',
        #     'Name': f'{name}'
        # })

    print('Database updated successfully!')
