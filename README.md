OpenAI has an API to query GPT4 models. In early stages of product development, this can become quite expensive, especially if your input needs a lot of tokens and you are testing out different iterations.

Assuming you are on ChatGPT Plus plan, I wanted to have an affordable fast paced environment to tweak my prompts and get the outputs quickly. Once everything is built, I end up using the APIs as they are extremely reliable.

*About this repo*
chatgpt4-scraper uses a combination of tools to query ChatGPT and returns the output. At high level, this is a simple wrapper service that emulates human behavior by entering input as query, waits for response, and makes it available to `callee`.

*Requirements*
- Needs node 18+ (tested on 18.15.0)
- Chrome Stable or Chrome Canary running in CDP mode.
- ChatGPT Plus account

*Steps*
- run `npm install` to install all packages.
- `/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222` run Chrome Canary on port 9222
- login to ChatGPT and keep the window open. Start a new chat (recommended)
- `node main.cjs --query "Hi There"`

*Technical Details*
- Use Chrome Debugging Protocol (CDP) to open a headful Chrome browser sesssion.
- Make sure you are already logged in to https://chat.openai.com/ and have a new chat session with the preferred model active.

*Details*
- `cdp.js`: communicates with the CDP at port 9222. ChatGPT UI has one input field and a textarea div that returns the response.

`prompt-textarea` is the text box where user can enter an input. However, we can't use textarea.value as this won't trigger the "send" event.
To trigger the "send" event aka enable the send button, we dispatch and event and then sleep for a bit.

Once button is enabled, send the request and wait upto x seconds for response (can be tweaked).
The response uses attribute [data-testid], once we match for this substring, we grab the last div and return back the response.

- `main.cjs`: main script to query OpenAI via CDP and get the response.
CDP offers `Runtime.evaluate` that allows us to execute a script remotely. Using await, we wait till response is returned.
`Runtime.getPoperties` allows us to get the response from cdp.js and make it available to our main.cjs program.



**Have Fun**
🎉🎉🎉🎉

**PS**:
This repo is for Educational and Research purpose only.