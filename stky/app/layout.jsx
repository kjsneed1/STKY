import "./globals.css";

export const metadata = {
  title: "STKY",
  description: "An application to create and save sticky notes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
