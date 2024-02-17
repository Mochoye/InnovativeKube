# -*- coding: utf-8 -*-

import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
modelLR = joblib.load('linear_regression_model.pkl')
kmeans_model = joblib.load('KMeans_model.pkl')
food_df = pd.read_csv('food_data.csv', encoding='utf-8')
columns_for_clustering = ['calories', 'total fat (PDV)', 'sugar (PDV)', 'sodium (PDV)', 'protein (PDV)', 'saturated fat (PDV)', 'carbohydrates (PDV)']
clustering_data = food_df[columns_for_clustering]
scaler = StandardScaler()
clustering_data_standardized = scaler.fit_transform(clustering_data)

class CaloricIntakeEstimator:
    def __init__(self, modelLR):
        self.modelLR = modelLR

    def calculate_bmi(self, weight_kg, height_m):
        return weight_kg / (height_m ** 2)

    def calculate_bmr(self, age, weight_kg, height_m, gender_F, gender_M):
        if gender_F == 1:
            return 655 + (9.6 * weight_kg) + (1.8 * height_m * 100) - (4.7 * age)
        elif gender_M == 1:
            return 66 + (13.7 * weight_kg) + (5 * height_m * 100) - (6.8 * age)
        else:
            raise ValueError("Invalid gender values")

    def calculate_daily_calories_direct(self, user_inputs):
        age = user_inputs['age']
        weight_kg = user_inputs['weight(kg)']
        height_m = user_inputs['height(m)']
        gender_F = user_inputs['gender_F']
        gender_M = user_inputs['gender_M']
        activity_level = user_inputs['activity_level']
        BMI = self.calculate_bmi(weight_kg, height_m)
        BMR = self.calculate_bmr(age, weight_kg, height_m, gender_F, gender_M)
        initial_weight = user_inputs['initial_weight']
        desired_weight = user_inputs['desired_weight']
        time_interval = user_inputs['time_interval_days']
        weight_change = desired_weight - initial_weight
        calories_per_kg = 7700
        daily_weight_change = weight_change / time_interval
        caloric_difference = daily_weight_change * calories_per_kg
        input_array = np.array([[age, weight_kg, height_m, BMI, BMR, activity_level, gender_F, gender_M]])
        model_predicted_calories = self.modelLR.predict(input_array)
        daily_cal = model_predicted_calories + caloric_difference
        return daily_cal

    @staticmethod
    def get_user_inputs():
        age = int(input("Enter your age: "))
        weight_kg = float(input("Enter your weight in kilograms: "))
        height_m = float(input("Enter your height in meters: "))
        gender = input("Enter your gender (male or female): ").lower()
        activity_level = float(input("Enter your activity level (e.g., 1.5 for moderate): "))

        initial_weight = weight_kg
        desired_weight = float(input("Enter your desired weight: "))
        time_interval_days = int(input("Enter the time interval in days: "))

        gender_F = 1 if gender == "female" else 0
        gender_M = 1 if gender == "male" else 0

        return {
            'age': age,
            'weight(kg)': weight_kg,
            'height(m)': height_m,
            'gender_F': gender_F,
            'gender_M': gender_M,
            'activity_level': activity_level,
            'initial_weight': initial_weight,
            'desired_weight': desired_weight,
            'time_interval_days': time_interval_days
        }

class MealPlanner:
    def __init__(self, food_df, clustering_data_standardized, columns_for_clustering):
        self.food_df = food_df
        self.clustering_data_standardized = clustering_data_standardized
        self.columns_for_clustering = columns_for_clustering
        self.selected_foods = None
        self.recommended_items = None
        self.lose_weight = None

    @staticmethod
    def plot_pie_chart(ax, data, labels):
        ax.pie(data, labels=labels, autopct='%1.1f%%', startangle=90, colors=['#99ff99', '#ffcc99', '#ccffcc', '#ff6666', '#c2f0c2'])
        ax.axis('equal')
        ax.set_facecolor('#1a1a1a')

    def find_closest_food(self, target_food, target_features, exclude_foods=[]):
        recommended_items = []
        target_cluster_df = self.food_df.loc[self.food_df['name'] == target_food, 'cluster']
        if target_cluster_df.empty:
            print(f"Target food {target_food} not found in the dataset.")
            return recommended_items
        target_cluster = target_cluster_df.values[0]

        cluster_recipes = self.food_df[self.food_df['cluster'] == target_cluster]
        cluster_recipes = cluster_recipes[~cluster_recipes['name'].isin(exclude_foods)]

        if cluster_recipes.empty:
            print(f"No recipes found in the same cluster as {target_food} after excluding previous recommendations.")
            return recommended_items

        cluster_data = self.clustering_data_standardized[self.food_df['cluster'] == target_cluster]
        distances = np.linalg.norm(cluster_recipes[self.columns_for_clustering] - target_features, axis=1)
        cluster_recipes.loc[:, 'distance_to_target'] = distances

        closest_recipes = cluster_recipes.sort_values(by='distance_to_target').head(5)
        recommended_items.append(closest_recipes)

        return recommended_items

    def generate_meal_recommendations(self, meal_dict):
        self.selected_foods = []
        self.recommended_items = []

        for meal_time, foods in meal_dict.items():
            for food in foods:
                # Check if there are matching rows for the specified food name
                matching_rows = self.food_df[self.food_df['name'] == food]
                if matching_rows.empty:
                    print(f"No data found for {food}. Skipping...")
                    continue

                target_features = matching_rows[self.columns_for_clustering].values[0]
                closest_food_items = self.find_closest_food(food, target_features, exclude_foods=self.selected_foods)
                self.selected_foods.extend(closest_food_items[0]['name'].tolist())
                self.recommended_items.append(closest_food_items)

            print(f"\n{meal_time} Recommendations for {foods}:")

            option_number = 1
            for rec_item in self.recommended_items:
                print(f"\nClosest 3 Items to {foods}:")

                if not rec_item:
                    print(f"\nOption {option_number}: No recommendations found.")
                else:
                    if self.lose_weight == 1:
                        best_recommendation = rec_item[0].sort_values(by='calories').head(1)
                    else:
                        best_recommendation = rec_item[0].sort_values(by='calories', ascending=False).head(1)
                    for _, row in best_recommendation.iterrows():
                        print(f"\nOption {option_number}:")
                        print(f"Name: {row['name']}")
                        print(f"Minutes: {row['minutes']}")
                        print(f"Number of Steps: {row['n_steps']}")
                        print(f"Steps: {eval(row['steps'])[0]}")
                        print(f"Description: {row['description']}")
                        print(f"Ingredients: {row['ingredients']}")
                        print(f"Number of Ingredients: {row['n_ingredients']}")
                        print(f"Calories: {row['calories']}")
                        print(f"Total Fat (PDV): {row['total fat (PDV)']}")
                        print(f"Sugar (PDV): {row['sugar (PDV)']}")
                        print(f"Sodium (PDV): {row['sodium (PDV)']}")
                        print(f"Protein (PDV): {row['protein (PDV)']}")
                        print(f"Saturated Fat (PDV): {row['saturated fat (PDV)']}")
                        print(f"Carbohydrates (PDV): {row['carbohydrates (PDV)']}")
                        '''
                        fig, ax = plt.subplots()
                        nutritional_data = [row.loc['total fat (PDV)'], row.loc['sugar (PDV)'], row.loc['sodium (PDV)'], row.loc['protein (PDV)'], row.loc['carbohydrates (PDV)']]
                        nutritional_labels = ['Total Fat', 'Sugar', 'Sodium', 'Protein', 'Carbohydrates']
                        self.plot_pie_chart(ax, nutritional_data, nutritional_labels)
                        plt.title(f"Nutritional Information for {row['name']}")
                        plt.show()'''
                        option_number += 1
        print("\nEnd of Recommendations")

    def create_meal_plan(self):
        cal1 = {}
        meal_times = ['Breakfast', 'Mid_Morning_Snack', 'Lunch', 'Evening_Snack', 'Dinner']

        for meal_time in meal_times:
            food_items = input(f"Enter food items for {meal_time} (separated by commas): ")
            food_list = [item.strip() for item in food_items.split(',')]
            cal1[meal_time] = food_list

        return cal1

    def __call__(self):

        self.food_df = food_df
        self.clustering_data_standardized = clustering_data_standardized
        self.columns_for_clustering = columns_for_clustering

        self.lose_weight = 1  # You can set this value based on user preferences
        user_input_cal1 = self.create_meal_plan()
        self.generate_meal_recommendations(user_input_cal1)

