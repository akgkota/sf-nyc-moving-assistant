import React, { useState } from 'react';

const MovingApp = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      content: "Hey! 👋 Ready to move from SF to NYC? I can help you price items, find apartments, and track expenses!",
      timestamp: '2:30 PM'
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleSend = () => {
    if (!currentInput.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentInput,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setCurrentInput('');
    
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'agent',
        content: `Got it! "${currentInput}" - I'm analyzing this with my AI agents. This is a demo response - connect to Claude API for real intelligence! 🤖`,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const quickActions = [
    "Price my MacBook for sale",
    "Find apartments under $3000",
    "Calculate moving costs",
    "Schedule apartment visit"
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '900', 
          margin: '0 0 10px 0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          SF → NYC ✨
        </h1>
        <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.9 }}>
          Your AI-powered moving assistant
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '25px'
      }}>
        
        {/* Items to Sell */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
            💰 Items to Sell
          </h2>
          
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                  MacBook Pro 16" M3
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>tech</span>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>apple</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#00ff88' }}>
                  $2,400
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Like New</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px', opacity: 0.9 }}>
              M3 MacBooks are 🔥 right now - similar ones selling for $2200-2600
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem' }}>👁️ 0 views • ❤️ 0 likes</div>
              <button style={{
                background: 'linear-gradient(135deg, #00ff88, #00b4db)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                💡 Optimize Price
              </button>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            borderRadius: '15px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                  iPhone 15 Pro
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>tech</span>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>phone</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#00ff88' }}>
                  $900
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Excellent</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px', opacity: 0.9 }}>
              iPhone 15 Pro still holding strong value - $850-950 range
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem' }}>👁️ 23 views • ❤️ 5 likes</div>
              <button style={{
                background: 'linear-gradient(135deg, #00ff88, #00b4db)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                🔥 Listed
              </button>
            </div>
          </div>
        </div>

        {/* Apartments */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
            🏠 NYC Apartments
          </h2>
          
          <div style={{
            background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '15px',
            color: '#333'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                  123 E 34th St, Manhattan
                </div>
                <div style={{ fontSize: '0.9rem', marginBottom: '8px', opacity: 0.8 }}>
                  Midtown vibes ✨ Close to everything
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    background: 'rgba(0,0,0,0.1)',
                    color: '#333',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>gym</span>
                  <span style={{
                    background: 'rgba(0,0,0,0.1)',
                    color: '#333',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>rooftop</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ff6b6b' }}>
                  $3,500
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>/month</div>
              </div>
            </div>
            <div style={{ fontSize: '0.8rem', marginBottom: '10px', opacity: 0.7 }}>
              📸 8 photos • 🚇 15 min to FiDi
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              📅 Schedule Visit
            </button>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
            borderRadius: '15px',
            padding: '20px',
            color: '#333'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                  456 Brooklyn Ave, Williamsburg
                </div>
                <div style={{ fontSize: '0.9rem', marginBottom: '8px', opacity: 0.8 }}>
                  Brooklyn hipster paradise 🎨 Amazing coffee nearby
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <span style={{
                    background: 'rgba(0,0,0,0.1)',
                    color: '#333',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>rooftop</span>
                  <span style={{
                    background: 'rgba(0,0,0,0.1)',
                    color: '#333',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>pet friendly</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <span>Your Score: </span>
                  <span>⭐⭐⭐⭐⭐⭐⭐⭐</span>
                  <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>8/10</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ff6b6b' }}>
                  $2,800
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>/month</div>
              </div>
            </div>
            <div style={{ fontSize: '0.8rem', marginBottom: '10px', opacity: 0.7 }}>
              📸 12 photos • 🚇 25 min to Manhattan
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              ✅ Visited
            </button>
          </div>
        </div>

        {/* AI Chat */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '20px'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
              🤖 AI Assistant
            </h2>
          </div>
          
          <div style={{
            height: '300px',
            overflowY: 'auto',
            padding: '20px',
            background: '#f8f9fa'
          }}>
            {messages.map(message => (
              <div 
                key={message.id}
                style={{
                  margin: '10px 0',
                  padding: '12px 16px',
                  borderRadius: '15px',
                  maxWidth: '85%',
                  ...(message.type === 'user' ? {
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    marginLeft: 'auto',
                    textAlign: 'right'
                  } : {
                    background: '#ffffff',
                    color: '#333',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  })
                }}
              >
                <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>
                  {message.content}
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                  {message.timestamp}
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div style={{
                background: '#ffffff',
                color: '#333',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                margin: '10px 0',
                padding: '12px 16px',
                borderRadius: '15px',
                maxWidth: '85%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🤖 AI thinking...</span>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#667eea',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s ease-in-out infinite both'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#764ba2',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s ease-in-out -0.32s infinite both'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#667eea',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s ease-in-out -0.16s infinite both'
                    }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div style={{ padding: '20px', background: 'white' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about your move..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '25px',
                  border: '2px solid #e9ecef',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <button 
                onClick={handleSend}
                disabled={!currentInput.trim() || isProcessing}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  opacity: (!currentInput.trim() || isProcessing) ? 0.5 : 1
                }}
              >
                ✨
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Actions */}
      <button
        onClick={() => setShowActions(!showActions)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
          color: 'white',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        {showActions ? '✕' : '⚡'}
      </button>

      {showActions && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          background: 'white',
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          width: '280px',
          zIndex: 999
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '1.1rem' }}>
            ⚡ Quick Actions
          </h3>
          {quickActions.map((action, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCurrentInput(action);
                setShowActions(false);
              }}
              style={{
                padding: '12px',
                margin: '8px 0',
                background: '#f8f9fa',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#e9ecef'}
              onMouseLeave={(e) => e.target.style.background = '#f8f9fa'}
            >
              {action}
            </div>
          ))}
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          } 40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default MovingApp;