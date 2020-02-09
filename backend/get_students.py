def recognize_faces(image_blob):
    import numpy as np # linear algebra
    import cv2 # opencv
    from mtcnn.mtcnn import MTCNN
    from keras.models import load_model
    import joblib # loading the model
    from PIL import Image
    from sklearn.preprocessing import LabelEncoder
    from sklearn.preprocessing import Normalizer
    import os
    import time

    # loading the models
    facenet_model = load_model(f'data/facenet_keras.h5')
    # facenet_model.load_weights(f'../facenet_keras_weights.h5')

    knn = joblib.load(f'data/knn_classifier.pkl')

    # loading the embeddings
    emd_data = np.load(f'data/secomps-students-embedding.npz')
    emdTrainX, trainy, emdTestX, testy = emd_data['arr_0'], emd_data['arr_1'], emd_data['arr_2'], emd_data['arr_3']

    # concatenating train and test embedding dataset
    emdTTX = np.concatenate((emdTrainX, emdTestX), axis=0)
    labels = np.concatenate((trainy, testy), axis=0)

    # normalize input vectors
    in_encoder = Normalizer()
    emdTTX_norm = in_encoder.transform(emdTTX)

    # label encode targets
    out_encoder = LabelEncoder()
    out_encoder.fit(trainy)
    labels_enc = out_encoder.transform(labels)

    # to calculae embeddings
    def get_embedding(model, face):
        # scale pixel values
        face = face.astype('float32')
        # standardization
        mean, std = face.mean(), face.std()
        face = (face-mean)/std
        # transfer face into one sample (3 dimension to 4 dimension)
        sample = np.expand_dims(face, axis=0)
        # make prediction to get embedding
        yhat = model.predict(sample)
        return yhat[0]

    # similarity function aka euclidean distance
    def distance(emb1, emb2):
        return np.sum(np.square(emb1 - emb2))

    # extract a multiple face from a given photograph
    def extract_mul_faces(filename, required_size=(160, 160)):
        image = cv2.imread(filename)

        # downscaling the image
        if image.shape[1] >= 6000:
            scale_percent = 30
        if image.shape[1] >= 5000:
            scale_percent = 35
        elif image.shape[1] >= 4000:
            scale_percent = 40
        elif image.shape[1] >= 3000:
            scale_percent = 60
        elif image.shape[1] >= 2000:
            scale_percent = 80
        else:
            scale_percent = 100

        width = int(image.shape[1] * scale_percent / 100)
        height = int(image.shape[0] * scale_percent / 100)
        dim = (width, height)
        # resize image
        image = cv2.resize(image, dim, interpolation = cv2.INTER_AREA)

        # image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        pixels = np.asarray(image)
        detector = MTCNN()
        results = detector.detect_faces(pixels)

        mul_faces = list()
        for i,face in enumerate(results):
          # discard low conf
          if results[i]['confidence'] < 0.95:
            continue
          # extract the bounding box from the first face
          x1, y1, width, height = results[i]['box']
          # deal with negative pixel index
          x1, y1 = abs(x1), abs(y1)
          x2, y2 = x1 + width, y1 + height
          # extract the face
          face = pixels[y1:y2, x1:x2]
          # resize pixels to the model size
          image = Image.fromarray(face)
          image = image.resize(required_size)
          face_array = np.asarray(image)
          mul_faces.append(face_array)

        if mul_faces:
            return np.asarray(mul_faces)
        return None

    # load the photo and extract the face
    # time : 5.61 with 80% downsampling (time indirectly proportional to the downsampling)
    all_faces = extract_mul_faces(image_blob)

    if all_faces is None:
        # print('No face detected')
        return None

    faces_detected = len(all_faces)

    # generating embeddings for all the detected faces
    # time : 1.32 seconds
    input_img_emd = list()
    for face in all_faces:
      emd = get_embedding(facenet_model, face)
      input_img_emd.append(emd)
    input_img_emd = np.asarray(input_img_emd)

    # normalizing the embeddings
    input_img_emd_norm = in_encoder.transform(input_img_emd)

    # recognizing the faces
    # time : 0.05
    recognized_faces = []
    matched = False
    for i in range(len(input_img_emd_norm)):
      for j in range(len(emdTTX_norm)):
        if distance(input_img_emd_norm[i], emdTTX_norm[j]) <= 0.64:
          matched = True
          break
        else:
          matched = False

      if matched:
        samples = np.expand_dims(input_img_emd_norm[i], axis=0)
        yhat_class = knn.predict(samples)
        # get name
        predict_names = out_encoder.inverse_transform(yhat_class)
        recognized_faces.append(predict_names[0])

    recognized_faces = np.asarray(recognized_faces)
    # print(f'Recognized: {len(recognized_faces)}/{faces_detected}')
    # for faces in recognized_faces:
    #     print(faces)

    return faces_detected, recognized_faces

# driver code
from sys import argv
if __name__ == '__main__':
    recognize_faces(argv[1])
