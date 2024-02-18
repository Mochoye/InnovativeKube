from dotenv import load_dotenv
load_dotenv() ## loading all the env variables

import streamlit as st
import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

## function to load Gemini Pro model and get responses
model = genai.GenerativeModel('gemini-pro')
def get_gemini_response(question):
    response = model.generate_content(question)
    return response.text


input_prompt ="""
You are a Fitness trainer, who is proficient with all the excersies which can be done with and without equipments. On the basis of the following vitals given to you suggest excersise which are with and without equipments.
User's fitness level will be categorized on the basis of how frequently he/she does workout and the category will be on Never, Occasionally and regular.

1. Calorie Intake Per Day - 4000 calories
2. Height of the user - 6 feet.
3. Weight of the user - 70 kg.
4. Medical Issues - Diabetic
5. How Often Do you Workout - Regular
6. Which part of the body you want to train - Chest 
----
----
Finally Suggest exercise which can be done with and without equipments. Provide a brief description of the excersise and how it can be done with an youtube link of that excersise if found. 
Give the output in Json Format
"""

print(get_gemini_response(input_prompt))

#initialize our streamlit app

# st.set_page_config(page_title="Q&A Demo")

# st.header("Gemini Application")

# input=st.text_input("Input: ",key="input")


# submit=st.button("Ask the question")

# ## If ask button is clicked

# if submit:
    
#     response=get_gemini_response(input_prompt)
#     st.subheader("The Response is")
#     st.write(response)