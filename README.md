# OneShoot RAG Football Chatbot

A **Retrieval-Augmented Generation (RAG)** chatbot designed specifically for football enthusiasts. This intelligent assistant combines the power of OpenAI GPT models with custom data retrieval to provide accurate, dynamic, and contextually relevant answers about football matches, players, stats, and more.

![OneShoot Screenshot](./public/preview.png)
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

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/rag_chatbot_football.git
cd rag_chatbot_football

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in your OPENAI_API_KEY and ASTRA_DB credentials

# (Optional) Seed the vector database
npm run seed

# Run the development server
npm run dev
```

# Future Improvements

- Add more live data sources for up-to-date football stats.
- Implement user authentication for personalized experience.
- Add analytics dashboard to track popular queries.
- Support multi-language football queries.
- Enhance UI/UX with more animations and responsive design.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.





## 🌐 Connect With Us

### 👨‍💻 Manish Darji (Lukas)

[![Website](https://img.shields.io/badge/Website-lukasaiengineer.com-blue?style=flat-square&logo=google-chrome&logoColor=white)](https://lukasaiengineer.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-@manish--d--05b05221a-blue?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manish-d-05b05221a/)

---

### 🏢 UnicodaX (Company)

UnicodaX is a forward-thinking software company specializing in AI-powered applications, chatbots, RAG (Retrieval-Augmented Generation) solutions, and end-to-end product development.

We help individuals and businesses build intelligent systems like this one — integrating custom LLMs, vector databases, and scalable infrastructure.

[![Website](https://img.shields.io/badge/Website-unicodax.com-blue?style=flat-square&logo=google-chrome&logoColor=white)](https://unicodax.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-UnicodeX-blue?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/unicodax/)

