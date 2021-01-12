from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from rest_framework import status
from .serializers import StudentSerializer, AttendanceSerializer, studentImageSerializer
from .extract_embeddings import createEmbeddings
from django.conf import settings
from .helpers import modify_input_for_multiple_files
from rest_framework import viewsets
from . import models
from . import serializers

import os
import cv2
from imutils import paths
import numpy as np
import imutils
import pickle

from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC

from imutils.video import VideoStream
from imutils.video import FPS
import time






# Create your views here.

class StudentViewset(viewsets.ModelViewSet):
    queryset= models.Student.objects.all()
    serializer_class= serializers.StudentSerializer






@api_view(['POST'])
def createEmbeddings(request):
        # load our serialized face detector from disk
    print("[INFO] loading face detector...")
    protoPath = os.path.sep.join([r"C:/Users/bisma/fyp-attendanceai/face_detection_model", 'deploy.prototxt'])
        
    modelPath = os.path.sep.join([r"C:/Users/bisma/fyp-attendanceai/face_detection_model", 'res10_300x300_ssd_iter_140000.caffemodel'])
    print('protoPath',protoPath)
    print('modelPath',modelPath)

    detector = cv2.dnn.readNetFromCaffe(protoPath, modelPath)

    # load our serialized face embedding model from disk
    print("[INFO] loading face recognizer...")
    embedder = cv2.dnn.readNetFromTorch(r"C:/Users/bisma/fyp-attendanceai/openface_nn4.small2.v1.t7")

    # grab the paths to the input images in our dataset
    print("[INFO] quantifying faces...")
    imagePaths = list(paths.list_images(os.path.join(settings.MEDIA_ROOT, 'uploads')))

    # initialize our lists of extracted facial embeddings and
    # corresponding people names
    knownEmbeddings = []
    knownNames = []

    # initialize the total number of faces processed
    total = 0

    # loop over the image paths
    for (i, imagePath) in enumerate(imagePaths):
        # extract the person name from the image path
        print("[INFO] processing image {}/{}".format(i + 1,
            len(imagePaths)))
        name = imagePath.split(os.path.sep)[-2]

        # load the image, resize it to have a width of 600 pixels (while
        # maintaining the aspect ratio), and then grab the image
        # dimensions
        image = cv2.imread(imagePath)
        image = imutils.resize(image, width=600)
        (h, w) = image.shape[:2]

        # construct a blob from the image
        imageBlob = cv2.dnn.blobFromImage(
            cv2.resize(image, (300, 300)), 1.0, (300, 300),
            (104.0, 177.0, 123.0), swapRB=False, crop=False)

        # apply OpenCV's deep learning-based face detector to localize
        # faces in the input image
        detector.setInput(imageBlob)
        detections = detector.forward()

        # ensure at least one face was found
        if len(detections) > 0:
            # we're making the assumption that each image has only ONE
            # face, so find the bounding box with the largest probability
            i = np.argmax(detections[0, 0, :, 2])
            confidence = detections[0, 0, i, 2]

            # ensure that the detection with the largest probability also
            # means our minimum probability test (thus helping filter out
            # weak detections)
            if confidence > 0.5:
                # compute the (x, y)-coordinates of the bounding box for
                # the face
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")

                # extract the face ROI and grab the ROI dimensions
                face = image[startY:endY, startX:endX]
                (fH, fW) = face.shape[:2]

                # ensure the face width and height are sufficiently large
                if fW < 20 or fH < 20:
                    continue

                # construct a blob for the face ROI, then pass the blob
                # through our face embedding model to obtain the 128-d
                # quantification of the face
                faceBlob = cv2.dnn.blobFromImage(face, 1.0 / 255,
                    (96, 96), (0, 0, 0), swapRB=True, crop=False)
                embedder.setInput(faceBlob)
                vec = embedder.forward()

                # add the name of the person + corresponding face
                # embedding to their respective lists
                knownNames.append(name)
                knownEmbeddings.append(vec.flatten())
                total += 1

    # dump the facial embeddings + names to disk
    print("[INFO] serializing {} encodings...".format(total))
    data = {"embeddings": knownEmbeddings, "names": knownNames}
    f = open('C:/Users/bisma/fyp-attendanceai/output/embeddings.pickle', "wb")
    f.write(pickle.dumps(data))
    f.close()
    return Response({'Success'}, status= status.HTTP_200_OK)

@api_view(['POST'])
def train(request):
    print("[INFO] loading face embeddings...")
    data = pickle.loads(open('C:/Users/bisma/fyp-attendanceai/output/embeddings.pickle', "rb").read())

    # encode the labels
    print("[INFO] encoding labels...")
    le = LabelEncoder()
    labels = le.fit_transform(data["names"])

    # train the model used to accept the 128-d embeddings of the face and
    # then produce the actual face recognition
    print("[INFO] training model...")
    recognizer = SVC(C=1.0, kernel="linear", probability=True)
    recognizer.fit(data["embeddings"], labels)

    # write the actual face recognition model to disk
    f = open('C:/Users/bisma/fyp-attendanceai/output/recognizer.pickle', "wb")
    f.write(pickle.dumps(recognizer))
    f.close()

    # write the label encoder to disk
    f = open('C:/Users/bisma/fyp-attendanceai/output/le.pickle', "wb")
    f.write(pickle.dumps(le))
    f.close()
    return Response({'Success'}, status= status.HTTP_200_OK)

@api_view(['POST'])
def detect(request):
    protoPath = os.path.sep.join([r"C:/Users/bisma/fyp-attendanceai/face_detection_model", 'deploy.prototxt'])
        
    modelPath = os.path.sep.join([r"C:/Users/bisma/fyp-attendanceai/face_detection_model", 'res10_300x300_ssd_iter_140000.caffemodel'])
   
    detector = cv2.dnn.readNetFromCaffe(protoPath, modelPath)

    # load our serialized face embedding model from disk
    print("[INFO] loading face recognizer...")
    embedder = cv2.dnn.readNetFromTorch(r"C:/Users/bisma/fyp-attendanceai/openface_nn4.small2.v1.t7")


    # load the actual face recognition model along with the label encoder
    recognizer = pickle.loads(open('C:/Users/bisma/fyp-attendanceai/output/recognizer.pickle', "rb").read())
    le = pickle.loads(open('C:/Users/bisma/fyp-attendanceai/output/le.pickle', "rb").read())

    # initialize the video stream, then allow the camera sensor to warm up
    print("[INFO] starting video stream...")
    vs = VideoStream(src=0).start()
    time.sleep(2.0)

    # start the FPS throughput estimator
    fps = FPS().start()

    # loop over frames from the video file stream
    while True:
        # grab the frame from the threaded video stream
        frame = vs.read()

        # resize the frame to have a width of 600 pixels (while
        # maintaining the aspect ratio), and then grab the image
        # dimensions
        frame = imutils.resize(frame, width=600)
        (h, w) = frame.shape[:2]

        # construct a blob from the image
        imageBlob = cv2.dnn.blobFromImage(
            cv2.resize(frame, (300, 300)), 1.0, (300, 300),
            (104.0, 177.0, 123.0), swapRB=False, crop=False)

        # apply OpenCV's deep learning-based face detector to localize
        # faces in the input image
        detector.setInput(imageBlob)
        detections = detector.forward()

        # loop over the detections
        for i in range(0, detections.shape[2]):
            # extract the confidence (i.e., probability) associated with
            # the prediction
            confidence = detections[0, 0, i, 2]

            # filter out weak detections
            if confidence > 0.5:
                # compute the (x, y)-coordinates of the bounding box for
                # the face
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")

                # extract the face ROI
                face = frame[startY:endY, startX:endX]
                (fH, fW) = face.shape[:2]

                # ensure the face width and height are sufficiently large
                if fW < 20 or fH < 20:
                    continue

                # construct a blob for the face ROI, then pass the blob
                # through our face embedding model to obtain the 128-d
                # quantification of the face
                faceBlob = cv2.dnn.blobFromImage(face, 1.0 / 255,
                    (96, 96), (0, 0, 0), swapRB=True, crop=False)
                embedder.setInput(faceBlob)
                vec = embedder.forward()

                # perform classification to recognize the face
                preds = recognizer.predict_proba(vec)[0]
                j = np.argmax(preds)
                proba = preds[j]
                name = le.classes_[j]

                # draw the bounding box of the face along with the
                # associated probability
                text = "{}: {:.2f}%".format(name, proba * 100)
                y = startY - 10 if startY - 10 > 10 else startY + 10
                cv2.rectangle(frame, (startX, startY), (endX, endY),
                    (0, 0, 255), 2)
                cv2.putText(frame, text, (startX, y),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 255), 2)

        # update the FPS counter
        fps.update()

        # show the output frame
        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF

        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break

    # stop the timer and display FPS information
    fps.stop()
    print("[INFO] elasped time: {:.2f}".format(fps.elapsed()))
    print("[INFO] approx. FPS: {:.2f}".format(fps.fps()))

    # do a bit of cleanup
    cv2.destroyAllWindows()
    vs.stop()




@api_view(['POST'])
def takeAttendance(request):
    serializer = AttendanceSerializer(data=request.data)
    embeddings= createEmbeddings()
    students = Student.objects.all()
    data = {}
    if serializer.is_valid(raise_exception=True):
        attendance = serializer.save()
        data['message'] = 'Attendance taken successfully'
        data['course'] = attendance.course
        data['semester'] = attendance.semester
        data['section'] = attendance.section
        data['period'] = attendance.period

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        data = serializer.errors
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
