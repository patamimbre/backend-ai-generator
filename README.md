# Backend AI Generator
Backend AI Generator is a CLI tool that generates a working Graphql API project from a Entity Relationship diagram from [eraser.io](https://app.eraser.io/). The tool takes the input diagram, analyzes it using AI and generates a Drizzle schema file that is used to generate a working Graphql API project.

https://github.com/user-attachments/assets/c99d29d5-22aa-4abf-8c07-9d4487aa2456

## Usage (npx)
🚧 Under construction 🚧

## Usage (cloning the repo)
1. Clone the repository: `git clone https://github.com/patamimbre/backend-ai-generator`
2. Install the dependencies: `npm install`
3. Run the CLI: `npm run start`

## Recommendations
We offer different AI providers to generate the Drizzle schema. However, some of them does not work as expected or requires additional steps to work.
1. **Gemini**: Google Gemini is the recommended AI provider. It returns the best results and it is free to use. However, it requires a VPN connection to work and generate an API key.
2. **OpenAI** and **Perplexity**: OpenAI and Perplexity are good alternatives to Gemini. They also return good results, but they are not free to use. You need to have an account and an API key to use them.
3. **Ollama**: [Ollama](https://ollama.ai) allow you to run the AI model locally. You need to have the model downloaded and installed in your machine (`ollama pull <model>`). It is free to use, but it requires additional steps to work. Results may vary and we do not guarantee the generated code will work as expected.

## Disclaimer
This tool is still in development and is not ready for production use. The generated code is not guaranteed to work as expected. Please review the generated code before using it in your project, and apply any necessary changes. Sometimes, the generated code may not work as expected, and might have syntax errors or other issues. Please report any issues you find.

## TODO
- [ ] Publish the CLI to npm and update the README

## Future improvements
- [ ] The template should use the given project name (custom template)
- [ ] Add support for REST API generation
- [ ] Add support for TRPC generation
- [ ] Support other database types (currently only supports SQLite)
- [ ] Auto deploy to Cloudflare / Vercel / Netlify
- [ ] Other suggestions?

