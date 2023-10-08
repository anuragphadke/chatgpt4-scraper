OpenAI has an API to query GPT4 models. In early stages of product development, this can become quite expensive.

chatgpt4-scraper uses a combination of tools to query ChatGPT and returns the output. At high level, this is a simple wrapper service that emulates human behavior.

Technical Details:
- Use Chrome Debugging Protocol (CDP) to open a headful Chrome browser sesssion.
- Make sure you are already logged in to https://chat.openai.com/ and have a new chat session with the preferred model active.

Details:
- `cdp.js`: communicates with the CDP at port 9222. ChatGPT UI has one input field and a textarea div that returns the response.

`prompt-textarea` is the text box where user can enter an input. However, we can't use textarea.value as this won't trigger the "send" event.
To trigger the "send" event aka enable the send button, we dispatch and event and then sleep for a bit.

Once button is enabled, send the request and wait upto x seconds for response (can be tweaked).
The response uses attribute [data-testid], once we match for this substring, we grab the last div and return back the response.

--
Wrapping it up to be invoked via a program:

