import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(".env")
client = OpenAI(base_url='https://openrouter.ai/api/v1', api_key=os.environ['OPENROUTER_API_KEY'])
res = client.chat.completions.create(model='google/gemini-2.5-pro', messages=[{'role': 'user', 'content': 'test'}])
print(res.choices[0].message.content)
