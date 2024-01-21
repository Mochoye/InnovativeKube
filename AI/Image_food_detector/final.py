import numpy as np
import cv2
import matplotlib.pyplot as plt
from PIL import Image
from ultralytics import YOLO

model= YOLO("final.pt")
img = cv2.imread(r'image3.jpg', cv2.IMREAD_COLOR)
pred = model.predict(img, conf=0.4)[0]

boxes = pred.boxes  # Boxes object for bbox outputs
masks = pred.masks  # Masks object for segmenation masks outputs
probs = pred.probs 


# plot the predictions on the image

# get the class labels from the results
class_names = [model.names[int(c)] for r in pred for c in r.boxes.cls]
print(class_names)


# print the value of the first detected class label
pred_plotted = pred.plot()
pred_plotted.shape


cv2.imshow('prediction', pred_plotted)
cv2.waitKey(0)
cv2.destroyAllWindows()
