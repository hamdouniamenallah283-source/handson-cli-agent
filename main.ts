import OpenAI from "openai";
import tools from "./tools.json"
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
// TODO (2.2): call the model and return its response.
// - client.chat.completions.create takes { model, messages } (tools comes later).
// - Use "kimi-k2.5" as the model.
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

  const messages = [{ role: "user", content: prompt }];

  // TODO (2.2): call createChatCompletion(messages), then read
  // response.choices[0].message.content and print it to stdout.
  const response = await createChatCompletion(messages);
process.stdout.write(response.choices[0].message.content ?? "");
}

main();
