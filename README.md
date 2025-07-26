# RAG Football Chatbot

A **Retrieval-Augmented Generation (RAG)** chatbot designed specifically for football enthusiasts. This intelligent assistant combines the power of OpenAI GPT models with custom data retrieval to provide accurate, dynamic, and contextually relevant answers about football matches, players, stats, and more.

---

## 🚀 Project Overview

This chatbot leverages LangChain for managing conversational AI workflows and retrieval from a scalable Astra DB database. It features a sleek, responsive React frontend built with Next.js and animated using Framer Motion for smooth user experience. Puppeteer is optionally used for scraping live football data to keep the knowledge base up-to-date.

### Why RAG?

Traditional chatbots rely solely on generative models that can hallucinate or provide outdated info. RAG combines generative AI with document retrieval, grounding responses on real data — ensuring accuracy and trustworthiness in football-related queries.

---

## ⚙️ Features

- **Context-aware conversational AI:** Understands and responds to football-specific questions.
- **Hybrid retrieval + generation:** Combines vector search with GPT generation.
- **Real-time data ingestion:** (Optional) Puppeteer-powered scrapers update data.
- **TypeScript-based codebase:** Robust, maintainable, and scalable.
- **Next.js for SSR & API routes:** Fast loading and SEO friendly.
- **Database integration:** Astra DB for persistence and scalability.
- **Environment variable based config:** Easy secrets management.
- **Linting & formatting:** Ensures clean code with ESLint and TypeScript.

---

## 🛠️ Technologies Used

| Technology           | Purpose                           |
|----------------------|---------------------------------|
| [Next.js](https://nextjs.org/)         | React framework, SSR, API routes       |
| [React](https://reactjs.org/)           | Frontend UI                        |
| [LangChain](https://langchain.com/)     | Conversational AI and retrieval      |
| [OpenAI API](https://openai.com/api/)  | Language generation                |
| [Astra DB](https://www.datastax.com/astra)      | Cloud NoSQL database                |
| [Puppeteer](https://pptr.dev/)         | Web scraping for live data (optional) |
| [TypeScript](https://www.typescriptlang.org/)   | Static typing                     |
| [Framer Motion](https://www.framer.com/motion/) | Animations and transitions        |
| [dotenv](https://github.com/motdotla/dotenv)     | Environment variable management    |

---

```
bash
- git clone https://github.com/Manniss01/oneshoot.git
- cd oneshoot
Create .env.local file in the root with this below

OPENAI_API_KEY=your_openai_api_key
ASTRA_DB_ID=your_astra_db_id
ASTRA_DB_REGION=your_astra_db_region
ASTRA_DB_KEYSPACE=your_astra_db_keyspace
ASTRA_DB_APPLICATION_TOKEN=your_astra_db_application_token

- npm install
- npm run dev

```
# Future Improvements

- **Add more live data sources for up-to-date football stats.
- **Implement user authentication for personalized experience.
- **Add analytics dashboard to track popular queries.
- **Support multi-language football queries.
- **Enhance UI/UX with more animations and responsive design.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.


## Connect with us

[![Manish LinkedIn](https://img.shields.io/badge/Manish-Darji-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/your-linkedin/)
[![UnicodeX](https://img.shields.io/badge/UnicodeX-LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/company/unicodex/)
