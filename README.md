# t@lk

t@lk is an app for collecting audio responses to a prompt, transcribing and displaying them. The main page displays the current prompt, and allows the user to record a response. The collection pages display all responses to a given prompt. t@lk is a React Typescript/Django hybrid application, where the React app is served in the Django index.html template. Webpack is used to compile the React code, and leverages Babel. The frontend uses MUI components and styling. This app was built as a final project for CSCI E-33a at Harvard Extension.

[See presentation & video walkthrough here](https://www.youtube.com/watch?v=NxDCjpmeqFA)
[Slides available here](https://docs.google.com/presentation/d/1pLwuQI-4wEVs67DhHKX_ZZu39XnynIf6LNowSNA-sr0/edit?usp=sharing)

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Citations](#citations)

## Features

### A. Prompt Page

#### Explore Collections Menu

This menu displays the past and current prompts. Clicking on one of these prompts takes the user to that collection page (see the Collection Pages section for more information) 
##### Components:
- CollectionsMenu.tsx

---

#### Prompt

The prompt page displays the current prompt and allows users to respond to it by recording audio of themselves speaking. The prompt page always displays the latest added prompt (meaning that adding a new prompt will end responses for the previous prompt -- see the Django Admin Tool section for guidance for a manager of this site).
##### Components:
- PromptPage.tsx
- PromptCard.tsx

---

#### Toggle

The page can be toggled to display a QR code instead of the microphone. This is so that the prompt page can be displayed on a large screen and users can scan it to respond easily on their phones. The QR code opens up the prompt page.
##### Components:
- Toggle.tsx

---

#### Recorder

The recorder component starts a recording when the user clicks the microphone button. Once the user clicks the button again to stop the recording, they are able to listen back to their recorded audio and add any identifying information they would like to display alongside their audio. The user then clicks submit.

If a recording is successfully submitted, the user sees a confirmation message that also informs them of content moderation practices.

Media is stored in the `media/prompt_app/audio` directory.

##### Components:
- RecordResponse.tsx
- RecordButton.tsx
- SaveResponse.tsx

---

#### Facilitation Tips

The facilitation tips are currently static. These tips provide guidance to the user to use the app to host conversation in person.
##### Components:
- FacilitationTips.tsx

---

### B. Collection Pages

#### Prompt

The collection page renders the relevant prompt as a prompt card.
##### Components:
- CollectionPage.tsx
- PromptCard.tsx

---

#### Responses

The collection page renders cards for each of the responses to the prompt displayed on the page. Responses do not appear if they are past their expiration date, or if they have been toggled to public=False.

Each response displays the transcribed text, the audio player to listen to the audio, the user's submitted identifier, and the expiration date.
##### Components:
- CollectionPage.tsx 

---

### C. Django Admin Tool
The administrator of t@lk should create a [superuser profile](https://www.w3schools.com/django/django_admin_create_user.php) to use the Django admin interface. 

The Django admin interface is used to add a new prompt, and also to change a response's public value to False if it violates content moderation rules. 

The user can access the admin tool at the /admin route. 

---

## Installation

1. Clone the repository and install dependencies:

in root directory:

`npm install`
`pip install -r requirements.txt`

2.  Next, you must create a `.env` file inside `prompt_app` and add an OpenAI API Key (see [Configuration](#configuration) section for details)

3. Start both backend and frontend servers:

`npm run dev`
`python manage.py runserver`

## Configuration

### Requirement: OpenAI API Key
An OpenAI API Key is required for the app to function. A key can be created at [platform.openai.com](https://platform.openai.com/docs/overview). There is no cost for creating a key, but a login is required. 

You may need to input payment information in order to use your API key (if you have already completed a free trial period). The cost to run a transcription in the app is typically less than 1 cent. 
#### Configuring your OpenAI API Key
Run the following commands in your terminal, starting from the project's root directory `cscie33a_final`:

`cd prompt_app`
`touch .env`

Next, add the following to your `.env` file:
`TRANSCRIBE_API_KEY=your_api_key`.
Do not surround the API key in quotes.

`.env` is included in .gitignore, use caution to avoid exposing API keys.

---
### /types
The `/prompt_app/types` directory contains `types.ts` where prompt and response data are typed. These types are referenced in the components.

---
### /utils
The `/prompt_app/utils` directory contains `csrf.ts`, which was used to configure the CSRF token as a cookie.

---
### webpack.config.js
Webpack is used in this project to bundle the JS code and serve the React App inside the Django template. It uses Babel.

---

## Citations

The following resources were referenced in building this project, and some code was incorporated:
- [Adding CSRF tokens as cookies](https://gist.github.com/joduplessis/7b3b4340353760e945f972a69e855d11?permalink_comment_id=3482344) 
- [Building an audio recorder component in React](https://cassidoo.co/post/react-microphone/)
- [Material UI](https://mui.com/material-ui/)
