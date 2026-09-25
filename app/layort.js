export const metadata = {
  title: 'Robo Captação',
  description: 'Sistema de Captação Automática'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body style={{fontFamily: 'Arial', margin: 0, padding: 0, background: '#f5f5f5'}}>
        {children}
      </body>
    </html>
  );
}
