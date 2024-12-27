---
title: 'Deploying llama3 to Bytebase SQL editor via One API for natural language to SQL conversion'
author: Dec
tags: Tutorial
updated_at: 2024/12/27 18:15
integrations: General
level: Intermediate
estimated_time: '20 mins'
description: 'In this tutorial, we will demonstrate how to use One API to help deploy llama3 to Bytebase SQL editor'
---

With Open AI-compatible API, it is possible to query database using natural language in Bytebase SQL editor. For data security reasons, privately deploying a large language model is a good option - here we chose the powerful open source model llama3. Since OpenAI blocks outbound traffic by default, to simplify network configuration and further prevent token leakage, we used the open source project One API as a relay to convert between Bytebase's OpenAI API-compliant requests and llama3 API requests.

## Prerequisites

Before you begin, make sure you have:

- [Docker](https://www.docker.com/) installed
- [Bytebase](https://www.bytebase.com/docs/get-started/step-by-step/deploy-with-docker/) instance running

## Get llama3 running in Docker

Run the following command in terminal to get a Docker container running:

```bash
docker run -d -p 11434:11434 --name ollama --restart always ollama/ollama
```

Container starts and returns id, then enter the container with the following command:

```bash
docker exec -it ollama bash
```

Pull and run the llama3 model. Due to permission issues, the model needs to be renamed to gpt-3.5-turbo (or mapped in One-API). After renaming, the model name is gpt-3.5-turbo, but indeed it is still llama3.

```bash
ollama pull llama3
ollama cp llama3 gpt-3.5-turbo
ollama run gpt-3.5-turbo
```

Now that the model is running, you can test if the API is working properly in a new terminal page:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "gpt-3.5-turbo",  
  "prompt":"Why is the sky blue?"
}'
```

Seeing the results streaming out means that API is working well.

## Configure One API

Choose a directory with read&write permissions (replace <YOUR_PATH> in the following command) to save data and logs. For example, you can use the `pwd` command in the mac terminal to view the current path and replace <YOUR_PATH> with it.

```bash
docker run --name one-api -d --restart always -p 3000:3000 -e TZ=Asia/Shanghai -v <YOUR_PATH>/one-api:/data justsong/one-api-en
```

Seeing the Docker container start and id output means successful deployment. If you encounter any issues, refer to the solution in One API documentation.

![one-api-docker-run](/content/docs/tutorials/one-api-ollama-sql-editor/one-api-docker-run.webp)

In Docker dashboard, you can see one-api container and its address as well. You can access `localhost:3000` here to log in to One API dashboard.

<HintBlock type="info">

The initial account username is `root`, password is `123456`.

</HintBlock>

### Configure Channel

Enter **channel page**, select **Add a new channel**. Fill in model information:

- **Type**: `ollama`
- **Name**: `llama3`
- **Group**: `default`
- **Model**: `gpt-3.5-turbo`
- **Key**: Anything (for example `SSSS|sssss|1111`) with format `APPID|APISecret|APIKey` if ollama has not set up for key
- **Proxy**: the IP address of the ollama container `http://host.docker.internal:11434`

Furthermore, we mentioned above that the model name can be mapped in One-API. This can be done in the **Model redirection** bar on this page using a JSON string.

### Configure API Keys

In the **API keys** page, click **Add New Token**, and fill in the **Name** (for example `llama3`) and **Model scope** (for example `gpt-3.5-turbo`).

After clicking **Submit**, you will see the new API key in **My keys** list within **API keys** page. Click **Copy** to get a token starting with `sk-`, with witch you can repalce <YOUR_TOKEN> in the code below. If the code runs successfully in your terminal, it means that One API configuration is complete.

```bash
curl http://localhost:3000/v1/chat/completions \
    -H "Content-Type: application/json" \
        -H "Authorization: Bearer <YOUR_TOKEN>" \
    -d '{
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": "Tell me a joke."
            }
        ],
        "temperature": 0.7
    }'
```

## Configure Bytebase and run

In Bytebase Workspace, go to **Settings** -> **General**, and scroll down to **AI Assistant** section. Fill <YOUR_TOKEN> we generated in One API into `OpenAI API Key` bar, and fill the `OpenAI API Endpoint` bar with `http://localhost:3000`. Click **Update**.

![bytebase-ai-assistant-config](/content/docs/tutorials/one-api-ollama-sql-editor/bytebase-ai-assistant-config.webp)

Enter **SQL Editor** from top of any page. You can see an OpenAI icon on top right corner. Click it to start conversation with AI assistant, ask questions in natural language and get SQL results.

![bytebase-ai-assistant-sql-editor](/content/docs/tutorials/one-api-ollama-sql-editor/bytebase-ai-assistant-sql-editor.webp)
