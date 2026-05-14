export const metadata = {
  title: "AI Agency",
  description: "Multi AI Agent Website"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{fontFamily:'Arial',background:'#0f172a',color:'white'}}>
        {children}
      </body>
    </html>
  );
}