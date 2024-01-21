from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS

from food_recommend import MealPlanner, CaloricIntakeEstimator, modelLR, kmeans_model

app = Flask(__name__)


CORS(app, resources={r"/predict_calories": {"origins": "http://localhost:5173"}},
         supports_credentials=True)

food_df = pd.read_csv('food_data.csv', encoding='utf-8')
columns_for_clustering = ['calories', 'total fat (PDV)', 'sugar (PDV)', 'sodium (PDV)', 'protein (PDV)', 'saturated fat (PDV)', 'carbohydrates (PDV)']
clustering_data = food_df[columns_for_clustering]
scaler = StandardScaler()
clustering_data_standardized = scaler.fit_transform(clustering_data)

meal_planner = MealPlanner(food_df, clustering_data_standardized, columns_for_clustering)

caloric_estimator = CaloricIntakeEstimator(modelLR)

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
