import "./global.css";

export const metadata = {
  title: "FOOtballChatbot",
  description: "The place where you can find all the football Information",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
