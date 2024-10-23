from rest_framework.decorators import api_view
from rest_framework.response import Response
import numpy as np
import joblib

# Load the trained AI model
model = joblib.load('model.joblib')

@api_view(['POST'])
def predict_weather(request):
    temperature = request.data.get('temperature')
    humidity = request.data.get('humidity')
    
   
    input_data = np.array([[temperature, humidity]])
    
   
    prediction = model.predict(input_data)
    
    return Response({'predicted_temperature': prediction[0]})
