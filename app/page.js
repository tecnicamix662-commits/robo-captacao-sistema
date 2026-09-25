'use client';
import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');
  const [cidade, setCidade] = useState('Santo André, SP');
  const [loading, setLoading] = useState(false);

  async function iniciarCaptacao() {
    setLoading(true);
    setStatus('🤖 Iniciando robô...');
    try {
      const res = await fetch('/api/captar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cidade })
      });
      const data = await res.json();
      setStatus(✅ ${data.mensagem || 'Captação concluída!'} - ${data.total || 0} leads encontrados);
    } catch (e) {
      setStatus('❌ Erro: ' + e.message);
    }
    setLoading(false);
  }

  return (
    <div style={{maxWidth: '600px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
      <h1 style={{textAlign: 'center'}}>🤖 Robô de Captação</h1>
      <p style={{textAlign: 'center', color: '#666'}}>Sistema Automático de Leads</p>
      
      <div style={{marginTop: '30px'}}>
        <label style={{fontWeight: 'bold'}}>Cidade para captar:</label>
        <input 
          value={cidade} 
          onChange={e => setCidade(e.target.value)}
          style={{width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box'}}
        />
      </div>

      <button 
        onClick={iniciarCaptacao} 
        disabled={loading}
        style={{width: '100%', padding: '15px', marginTop: '20px', background: loading ? '#999' : '#0070f3', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'}}
      >
        {loading ? 'Captando...' : '🚀 INICIAR CAPTAÇÃO'}
      </button>

      {status && (
        <div style={{marginTop: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd'}}>
          {status}
        </div>
      )}

      <div style={{marginTop: '30px', fontSize: '12px', color: '#888', textAlign: 'center'}}>
        Status: {loading ? '🟡 Trabalhando' : '🟢 Pronto'}
      </div>
    </div>
  );
}
