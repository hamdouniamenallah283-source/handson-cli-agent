import OpenAI from "openai";
import tools from "./tools.json";
import{ readFileSync } from "node:fs";

const apiKey = process.env.LAB_LLM_API_KEY;
const baseURL = process.env.LAB_LLM_BASE_URL;

if (!apiKey) {
  throw new Error("LAB_LLM_API_KEY is not set"); 
}
if (!baseURL) {
  throw new Error("LAB_LLM_BASE_URL is not set");
}

const client = new OpenAI({ apiKey, baseURL });

const readFile = (filePath:string):string => {
  let data = "" ;
  try { 
    data = readFileSync(filePath , "utf8");
  } catch (err){
    console.error(err); 
  }
  return data;

};

async function createChatCompletion(messages: any[]) {
  const response = await client.chat.completions.create({
    model: "kimi-k2.5",
    messages,
    tools
  });
  return response;
}

async function main() {
  const [, , flag, prompt] = process.argv;
  if (flag !== "-p" || !prompt) {
    throw new Error('usage: your_program.sh -p "<prompt>"');
  }

 

 
  const message = [{role:"user", content : prompt}]
 
 while(true){
  const response = await createChatCompletion(messages);
  message.push(response.choices[0].message);

  const toolCalls = response.choices[0].message.tool_calls;

  if (!toolCalls || toolCalls.length === 0){
    if(process.env.DEBUG_MESSAGE)
    
}
}
main();
