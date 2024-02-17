from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS

from food_recommend import MealPlanner, CaloricIntakeEstimator, modelLR, kmeans_model
from exercise_recommendation_system import ExerciseRecommendationSystem
from exercise_recommendation_system import ExerciseRecommendationSystem
app = Flask(__name__)


CORS(app, resources={r"/predict_calories": {"origins": "http://localhost:5173"}},
         supports_credentials=True)
CORS(app, resources={r"/generate_meal_plan": {"origins": "http://localhost:5173"}},
         supports_credentials=True)
CORS(app, resources={r"/get_recommendations": {"origins": "http://localhost:5173"}},
         supports_credentials=True)

food_df = pd.read_csv('food_data.csv', encoding='utf-8')
columns_for_clustering = ['calories', 'total fat (PDV)', 'sugar (PDV)', 'sodium (PDV)', 'protein (PDV)', 'saturated fat (PDV)', 'carbohydrates (PDV)']
clustering_data = food_df[columns_for_clustering]
scaler = StandardScaler()
clustering_data_standardized = scaler.fit_transform(clustering_data)

meal_planner = MealPlanner(food_df, clustering_data_standardized, columns_for_clustering)

caloric_estimator = CaloricIntakeEstimator(modelLR)
exercise_system = ExerciseRecommendationSystem('megaGymDataset.csv')

# @app.route('/exercise', methods=['POST'])
# def get_recommendations():
#     # Check if request data is JSON
#     if not request.is_json:
#         return jsonify({'error': 'Request data must be in JSON format.'}), 400

#     # Parse request data
#     req_data = request.json
#     body_part = req_data.get('body_part')
#     level = req_data.get('level')

#     if not body_part or not level:
#         return jsonify({'error': 'Both body_part and level parameters are required.'}), 400

#     # Get exercise recommendations
#     recommendations = exercise_system.recommend_exercises(body_part, level)

#     # Convert recommendations to JSON response
#     response_data = recommendations.to_dict(orient='records')

#     return jsonify(response_data)

# class ExerciseRecommendationSystem:
#     def __init__(self, csv_path):
#         self.df = pd.read_csv(csv_path)

#     def recommend_exercises(self, body_part, level):
#         recommendations = self.df[(self.df['BodyPart'] == body_part) & (self.df['Level'] == level)]
#         return recommendations[['Title', 'Type', 'Equipment', 'Desc']]

#     def display_recommendations(self, body_part, level):
#         recommendations = self.recommend_exercises(body_part, level)
#         return recommendations.to_dict(orient='records')

# exercise_system = ExerciseRecommendationSystem('megaGymDataset.csv')

# @app.route('/recommend_exercises', methods=['POST'])
# def recommend_exercises():
#     data = request.json
#     body_part = data['body_part']
#     level = data['level']
#     recommendations = exercise_system.recommend_exercises(body_part, level)
#     return jsonify(recommendations)


# # Endpoint to plot all graphs
# @app.route('/plot_all_graphs', methods=['POST'])
# def plot_all_graphs():
#     exercise_system.plot_all_graphs()
#     return 'All graphs plotted.'

# from exercise_recommendation_system import ExerciseRecommendationSystem


# @app.route('/recommend', methods=['POST'])
# def recommend_exercises():
#     try:
#         # Retrieve data from request body
#         data = request.get_json()
#         body_part = data['bodyPart']
#         level = data['level']

#         # Process data and generate recommendations
#         exercise_system = ExerciseRecommendationSystem()
#         recommendations = exercise_system.recommend_exercises(body_part, level)

#         # Convert recommendations to JSON format
#         response = recommendations.to_json(orient='records')

#         return jsonify({'status': 'success', 'data': response})

#     except Exception as e:
#         print(f"Error occurred: {e}")
#         return jsonify({'status': 'error', 'message': 'An error occurred. Please check your request data and try again.'})

csv_path = 'megaGymDataset.csv'
exercise_system = ExerciseRecommendationSystem(csv_path)

# Endpoint to receive data and return recommendations
@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    body_part = data['body_part']
    level = data['level']
    recommendations = exercise_system.recommend_exercises(body_part, level)
    return jsonify(recommendations)


# @app.route('/recommendations', methods=['POST'])
# def get_recommendations():
#     # Extract data from the request
#     try:
#         data = request.json(force=True)
#         body_part = data.get('body_part')
#         level = data.get('level')
    
#     # Get exercise recommendations based on body part and level
#         recommendations = exercise_system.recommend_exercises(body_part, level)
    
#     # Convert recommendations to JSON format and send the response
#         return jsonify(recommendations.to_dict(orient='records'))
#     except Exception as e:
#         print(e)
#         return jsonify({'error': str(e)})

@app.route('/predict_calories', methods=['POST'])
def predict_calories():
    print(request.json)
    try:
        user_inputs = request.get_json(force=True)
        print(user_inputs)
        result = caloric_estimator.calculate_daily_calories_direct(user_inputs)
        return jsonify({'result': result[0]})
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})

@app.route('/generate_meal_plan', methods=['POST'])
def generate_meal_plan():
    try:
        meal_input = request.get_json()
        meal_planner.generate_meal_recommendations(meal_input)

        # Collect meal recommendations in a data structure
        meal_recommendations = []

        for rec_item in meal_planner.recommended_items:
            if rec_item:
                recommendations = []
                for _, row in rec_item[0].iterrows():
                    recommendation = {
                        'name': row['name'],
                        'minutes': row['minutes'],
                        'n_steps': row['n_steps'],
                        'steps': eval(row['steps'])[0],
                        'description': row['description'],
                        'ingredients': row['ingredients'],
                        'n_ingredients': row['n_ingredients'],
                        'calories': row['calories'],
                        'total_fat_pdv': row['total fat (PDV)'],
                        'sugar_pdv': row['sugar (PDV)'],
                        'sodium_pdv': row['sodium (PDV)'],
                        'protein_pdv': row['protein (PDV)'],
                        'saturated_fat_pdv': row['saturated fat (PDV)'],
                        'carbohydrates_pdv': row['carbohydrates (PDV)'],
                    } 
                    recommendations.append(recommendation)
                meal_recommendations.append({'options': recommendations})

        return jsonify({'meal_recommendations': meal_recommendations})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)
