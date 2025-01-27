import "./globals.css";

export const metadata = {
  title: "STKY",
  description: "An application to create and save sticky notes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <header>
        <div id = "header1">
            <h1>
                STKY
            </h1>
        </div>
        <div id = "header2"></div>
        <div id = "header3"></div>
        <div id = "header4"></div>
      </header>
        {children}
      </body>
    </html>
  );
}
