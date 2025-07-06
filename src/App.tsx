import React, { useState } from 'react';

const MovingAssistantApp = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [messages, setMessages] = useState([{
    id: 1,
    type: 'agent',
    content: "yo! 👋 ready to make this SF→NYC move smooth af? I've got your back with smart pricing, apartment hunting, and expense tracking. what do you wanna tackle first?",
    timestamp: new Date().toLocaleTimeString()
  }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const items = [
    { 
      id: 1, 
      name: 'MacBook Pro 16" M3', 
      estimatedValue: 2400, 
      marketResearch: 'M3 MacBooks are 🔥 rn - similar ones going for $2200-2600', 
      status: 'researching',
      condition: 'Like New',
      tags: ['tech', 'laptop', 'apple'],
      views: 0,
      likes: 0
    },
    { 
      id: 2, 
      name: 'IKEA KIVIK Sofa', 
      estimatedValue: 350, 
      marketResearch: 'IKEA sofas selling fast in SF - yours could go for $300-400 easy', 
      status: 'pending',
      condition: 'Good',
      tags: ['furniture', 'living room'],
      views: 0,
      likes: 0
    },
    {
      id: 3,
      name: 'iPhone 15 Pro',
      estimatedValue: 900,
      marketResearch: 'iPhone 15 Pro still holding value - $850-950 range',
      status: 'listed',
      condition: 'Excellent',
      tags: ['tech', 'phone', 'apple'],
      views: 23,
      likes: 5
    }
  ];
  
  const apartments = [
    { 
      id: 1, 
      address: '123 E 34th St, Manhattan', 
      rent: 3500, 
      visited: false, 
      notes: 'Midtown vibes ✨ Close to everything', 
      score: 0,
      photos: 8,
      amenities: ['gym', 'rooftop', 'laundry'],
      commute: '15 min to FiDi'
    },
    { 
      id: 2, 
      address: '456 Brooklyn Ave, Williamsburg', 
      rent: 2800, 
      visited: true, 
      notes: 'Brooklyn hipster paradise 🎨 Amazing coffee shops nearby', 
      score: 8,
      photos: 12,
      amenities: ['rooftop', 'bike storage', 'pet friendly'],
      commute: '25 min to Manhattan'
    }
  ];

  const agents = {
    itemValuationAgent: { emoji: '💰', name: 'Item Valuation' },
    apartmentAgent: { emoji: '🏠', name: 'Apartment Hunt' },
    expenseAgent: { emoji: '📊', name: 'Expense Tracker' },
    coordinatorAgent: { emoji: '🧠', name: 'Coordinator' }
  };

  const handleAgentQuery = async (query: string) => {
    setIsProcessing(true);
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString()
    }]);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'agent',
        content: `Great question! "${query}" - I'm working on this with my AI agents. This is a demo response - connect to Claude API for real intelligence! 🤖`,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsProcessing(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!currentInput.trim()) return;
    handleAgentQuery(currentInput);
    setCurrentInput('');
  };

  const quickActions = [
    "Help me price my MacBook for sale",
    "Find apartments in Brooklyn under $3000",
    "Calculate my moving costs",
    "Schedule apartment visits",
    "What's the best neighborhood for me?"
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    },
    header: {
      textAlign: 'center',
      color: 'white',
      marginBottom: '30px'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '900',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    subtitle: {
      fontSize: '1.2rem',
      opacity: 0.9
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '25px',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '25px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    itemCard: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px'
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px'
    },
    itemName: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    itemPrice: {
      fontSize: '1.8rem',
      fontWeight: '900',
      color: '#00ff88'
    },
    itemTags: {
      display: 'flex',
      gap: '8px',
      marginBottom: '10px',
      flexWrap: 'wrap'
    },
    tag: {
      background: 'rgba(255,255,255,0.2)',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem'
    },
    button: {
      background: 'linear-gradient(135deg, #00ff88, #00b4db)',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '10px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      fontSize: '0.9rem'
    },
    apartmentCard: {
      background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px',
      color: '#333'
    },
    chatContainer: {
      height: '400px',
      overflowY: 'auto',
      marginBottom: '15px',
      padding: '10px',
      background: '#f8f9fa',
      borderRadius: '10px'
    },
    message: {
      margin: '10px 0',
      padding: '12px',
      borderRadius: '15px',
      maxWidth: '80%'
    },
    userMessage: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      marginLeft: 'auto',
      textAlign: 'right'
    },
    agentMessage: {
      background: '#e9ecef',
      color: '#333'
    },
    inputContainer: {
      display: 'flex',
      gap: '10px'
    },
    input: {
      flex: 1,
      padding: '12px',
      borderRadius: '10px',
      border: '2px solid #ddd',
      fontSize: '1rem'
    },
    quickActionButton: {
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
    },
    quickActionsMenu: {
      position: 'fixed',
      bottom: '100px',
      right: '30px',
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      width: '300px',
      zIndex: 999
    },
    quickActionItem: {
      padding: '10px',
      margin: '5px 0',
      background: '#f8f9fa',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.2s'
    },
    agentPill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255,255,255,0.2)',
      padding: '8px 15px',
      borderRadius: '25px',
      margin: '5px',
      color: 'white',
      fontSize: '0.9rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>SF → NYC ✨</h1>
        <p style={styles.subtitle}>Your AI-powered moving assistant that actually gets it</p>
        
        <div style={{marginTop: '20px'}}>
          {Object.entries(agents).map(([key, agent]) => (
            <span key={key} style={styles.agentPill}>
              <span>{agent.emoji}</span>
              <span>{agent.name}</span>
            </span>
          ))}
        </div>
      </div>

      <div style={styles.mainGrid}>
        {/* Items to Sell */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>💰 Items to Sell</h2>
          {items.map(item => (
            <div key={item.id} style={styles.itemCard}>
              <div style={styles.itemHeader}>
                <div>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemTags}>
                    {item.tags.map(tag => (
                      <span key={tag} style={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={styles.itemPrice}>${item.estimatedValue}</div>
                  <div style={{fontSize: '0.8rem', opacity: 0.8}}>{item.condition}</div>
                </div>
              </div>
              <p style={{fontSize: '0.9rem', marginBottom: '15px', opacity: 0.9}}>
                {item.marketResearch}
              </p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{fontSize: '0.8rem'}}>
                  👁️ {item.views} • ❤️ {item.likes}
                </div>
                <button 
                  style={styles.button}
                  onClick={() => handleAgentQuery(`Help me optimize pricing for ${item.name}`)}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  💡 Optimize
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Apartments */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🏠 NYC Apartments</h2>
          {apartments.map(apartment => (
            <div key={apartment.id} style={styles.apartmentCard}>
              <div style={styles.itemHeader}>
                <div>
                  <div style={styles.itemName}>{apartment.address}</div>
                  <div style={{fontSize: '0.9rem', margin: '8px 0', opacity: 0.8}}>
                    {apartment.notes}
                  </div>
                  <div style={styles.itemTags}>
                    {apartment.amenities.slice(0, 3).map(amenity => (
                      <span key={amenity} style={{...styles.tag, background: 'rgba(0,0,0,0.1)', color: '#333'}}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{...styles.itemPrice, color: '#ff6b6b'}}>${apartment.rent}</div>
                  <div style={{fontSize: '0.8rem', opacity: 0.8}}>/month</div>
                </div>
              </div>
              <div style={{fontSize: '0.8rem', margin: '10px 0', opacity: 0.7}}>
                📸 {apartment.photos} photos • 🚇 {apartment.commute}
              </div>
              {apartment.score > 0 && (
                <div style={{margin: '10px 0'}}>
                  <span>Your Score: </span>
                  {[...Array(apartment.score)].map((_, i) => <span key={i}>⭐</span>)}
                  <span style={{fontWeight: 'bold', marginLeft: '5px'}}>{apartment.score}/10</span>
                </div>
              )}
              <button 
                style={styles.button}
                onClick={() => handleAgentQuery(`Schedule visit for ${apartment.address}`)}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1)'}
              >
                📅 {apartment.visited ? 'Reschedule' : 'Schedule Visit'}
              </button>
            </div>
          ))}
        </div>

        {/* AI Chat */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🤖 AI Assistant</h2>
          <div style={styles.chatContainer}>
            {messages.map(message => (
              <div 
                key={message.id} 
                style={{
                  ...styles.message,
                  ...(message.type === 'user' ? styles.userMessage : styles.agentMessage)
                }}
              >
                <div>{message.content}</div>
                <div style={{fontSize: '0.7rem', opacity: 0.7, marginTop: '5px'}}>
                  {message.timestamp}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div style={{...styles.message, ...styles.agentMessage}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <div>🤖 AI thinking...</div>
                  <div style={{display: 'flex', gap: '3px'}}>
                    <div style={{width: '8px', height: '8px', background: '#667eea', borderRadius: '50%', animation: 'bounce 1s infinite'}}></div>
                    <div style={{width: '8px', height: '8px', background: '#764ba2', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s'}}></div>
                    <div style={{width: '8px', height: '8px', background: '#667eea', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={currentInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentInput(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSubmit()}
              placeholder="Ask me anything about your move..."
              style={styles.input}
            />
            <button 
              onClick={handleSubmit}
              style={styles.button}
              disabled={isProcessing || !currentInput.trim()}
            >
              ✨ Send
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <button
        style={styles.quickActionButton}
        onClick={() => setShowQuickActions(!showQuickActions)}
      >
        {showQuickActions ? '✕' : '⚡'}
      </button>

      {showQuickActions && (
        <div style={styles.quickActionsMenu}>
          <h3 style={{margin: '0 0 15px 0', color: '#333'}}>Quick Actions</h3>
          {quickActions.map((action, idx) => (
            <div
              key={idx}
              style={styles.quickActionItem}
              onClick={() => {
                handleAgentQuery(action);
                setShowQuickActions(false);
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.background = '#e9ecef'}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.background = '#f8f9fa'}
            >
              {action}
            </div>
          ))}
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-10px,0);
          }
          70% {
            transform: translate3d(0,-5px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
      `}</style>
    </div>
  );
};

export default MovingAssistantApp;