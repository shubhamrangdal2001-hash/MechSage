import os
import re
from pathlib import Path

agent_dir = Path('dev/agentic/agents')
agents = ['supervisor.py', 'diagnostics.py', 'work_order.py', 'scheduling.py']

openrouter_func = '''
def _call_llm(model_name: str, system_instruction: str, prompt: str, max_tokens: int, temperature: float) -> str:
    from openai import OpenAI
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        default_headers={"HTTP-Referer": "https://github.com/MechSage", "X-Title": "MechSage"}
    )
    response = client.chat.completions.create(
        model=model_name,
        messages=[{"role": "system", "content": system_instruction}, {"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        temperature=temperature
    )
    return response.choices[0].message.content.strip()
'''

for agent in agents:
    p = agent_dir / agent
    content = p.read_text('utf-8')

    # Remove genai import
    content = re.sub(r'import google\.generativeai as genai\n', '', content)

    model_cfg = '_config.strong_model' if agent == 'diagnostics.py' else '_config.cheap_model'
    
    # Extract system prompt
    m = re.search(r'system_instruction=textwrap\.dedent\(\"\"\"\\(.*?)\"\"\"\),', content, re.DOTALL)
    if not m:
        continue
    sys_prompt = m.group(1)

    # Replace _get_model
    content = re.sub(r'def _get_model\(\) -> .*?:\n.*?\"\"\"\),\n    \)\n', openrouter_func, content, flags=re.DOTALL)
    
    call_pattern = r'model = _get_model\(\)\n\n.*?response = model\.generate_content\(\n\s*prompt,\n\s*generation_config={\"max_output_tokens\": (\d+), \"temperature\": ([0-9.]+)\},\n\s*\)\n\s*([a-zA-Z_]+) = response\.text\.strip\(\)'

    def replace_call(match):
        max_t = match.group(1)
        temp = match.group(2)
        var_name = match.group(3)
        sys_str = 'textwrap.dedent(\"\"\"\\' + sys_prompt + '\"\"\")'
        return f'{var_name} = _call_llm({model_cfg}, {sys_str}, prompt, {max_t}, {temp})'
        
    content = re.sub(call_pattern, replace_call, content, flags=re.DOTALL)
    p.write_text(content, 'utf-8')
    print(f'Updated {agent}')

print('Done.')
