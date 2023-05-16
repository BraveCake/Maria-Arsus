const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.GPT_KEY,
});
const openai = new OpenAIApi(configuration);
module.exports = async function runCompletion (question) {
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: question,
});
  console.log("promise\n")
  console.log(completion.data.choices[0].text)
return completion.data.choices[0].text;
}