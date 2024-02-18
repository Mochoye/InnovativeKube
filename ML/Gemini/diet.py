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
You are an expert in diet recommendation where you need to take the following mentioned vitals of the user and recommend diet on the basis of that to the user.

1. Calorie Intake Per Day - 4000 calories
2. Height of the user - 6 feet.
3. Weight of the user - 70 kg.
4. Medical Issues - 
4. Breakfast preference - Bread and Omlet.
5. Lunch Preference - Rice and Curry.
6. Evening Snacks - Tea or Coffee.
7. Dinner - Roti/Chappati with vegetable curry 
----
----
Finally you can also mention which food should be taken at which time period and mention the calories it contain. Give the diet chart in such a way that it has variety of combination that totals the calories to 4000 calories.
Give the recommendation in Json format.


"""

print(get_gemini_response(input_prompt))

##initialize our streamlit app

# st.set_page_config(page_title="Q&A Demo")

# st.header("Gemini Application")

# input=st.text_input("Input: ",key="input")


# submit=st.button("Ask the question")

# ## If ask button is clicked

# if submit:
    
#     response=get_gemini_response(input_prompt)
#     st.subheader("The Response is")
#     st.write(response)