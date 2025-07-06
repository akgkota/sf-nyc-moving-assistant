import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, DollarSign, Calendar, CheckSquare, Search, Upload, Brain, Users, Home, TrendingUp, Calculator, Zap, Star, Clock, ChevronRight, Plus, X, Check, Eye, MessageCircle, Heart, Share2, Filter } from 'lucide-react';

interface Item {
  id: number;
  name: string;
  image: string | null;
  estimatedValue: number;
  marketResearch: string;
  status: string;
  condition: string;
  tags: string[];
  views: number;
  likes: number;
}

interface Apartment {
  id: number;
  address: string;
  rent: number;
  visited: boolean;
  notes: string;
  score: number;
  photos: number;
  amenities: string[];
  commute: string;
  available: string;
  virtual_tour: boolean;
}

interface Expense {
  id: number;
  category: string;
  item: string;
  amount: number;
  type: string;
  details: string;
  emoji: string;
}

interface Todo {
  id: number;
  task: string;
  agent: string;
  completed: boolean;
  priority: string;
  emoji: string;
}

interface Message {
  id: number;
  type: string;
  agent?: string;
  content: string;
  timestamp: string;
  actions?: string[];
  recommendations?: string[];
  quickActions?: string[];
  reactions: any[];
}

interface Agent {
  active: boolean;
  lastAction: string | null;
  emoji: string;
}

interface Notification {
  id: number;
  message: string;
  type: string;
}

const MovingAssistantApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [items, setItems] = useState<Item[]>([
    { 
      id: 1, 
      name: 'MacBook Pro 16" M3', 
      image: null, 
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
      image: null, 
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
      image: null,
      estimatedValue: 900,
      marketResearch: 'iPhone 15 Pro still holding value - $850-950 range',
      status: 'listed',
      condition: 'Excellent',
      tags: ['tech', 'phone', 'apple'],
      views: 23,
      likes: 5
    }
  ]);
  
  const [apartments, setApartments] = useState<Apartment[]>([
    { 
      id: 1, 
      address: '123 E 34th St, Manhattan', 
      rent: 3500, 
      visited: false, 
      notes: 'Midtown vibes ✨ Close to everything', 
      score: 0,
      photos: 8,
      amenities: ['gym', 'rooftop', 'laundry'],
      commute: '15 min to FiDi',
      available: '2025-08-01',
      virtual_tour: true
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
      commute: '25 min to Manhattan',
      available: '2025-07-15',
      virtual_tour: true
    },
    {
      id: 3,
      address: '789 LES Delancey St',
      rent: 3200,
      visited: false,
      notes: 'Lower East Side energy! 🌃 Nightlife central',
      score: 0,
      photos: 6,
      amenities: ['doorman', 'gym'],
      commute: '10 min to SoHo',
      available: '2025-08-15',
      virtual_tour: false
    }
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: 'Housing', item: 'Rent Difference (SF→NYC)', amount: 800, type: 'monthly', details: 'SF: $2700/mo → NYC: $3500/mo', emoji: '🏠' },
    { id: 2, category: 'Transportation', item: 'No More Car Payments!', amount: -650, type: 'monthly', details: 'Car payment + insurance + gas savings', emoji: '🚗' },
    { id: 3, category: 'Moving', item: 'Cross-Country Movers', amount: 3500, type: 'one-time', details: 'Full-service moving company', emoji: '📦' },
    { id: 4, category: 'Food', item: 'NYC Food Scene', amount: 200, type: 'monthly', details: 'More expensive but way better options', emoji: '🍕' },
    { id: 5, category: 'Entertainment', item: 'NYC Nightlife', amount: 150, type: 'monthly', details: 'Broadway, clubs, events', emoji: '🎭' }
  ]);

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, task: 'Take photos of MacBook', agent: 'itemValuationAgent', completed: false, priority: 'high', emoji: '📱' },
    { id: 2, task: 'Schedule Brooklyn apt visit', agent: 'apartmentAgent', completed: false, priority: 'high', emoji: '🗓️' },
    { id: 3, task: 'Research NYC tax rates', agent: 'expenseAgent', completed: false, priority: 'medium', emoji: '💸' },
    { id: 4, task: 'List iPhone on FB Marketplace', agent: 'itemValuationAgent', completed: true, priority: 'high', emoji: '✅' }
  ]);

  const [messages, setMessages] = useState<Message[]>([{
    id: Date.now(),
    type: 'agent',
    agent: 'coordinatorAgent',
    content: "yo! 👋 ready to make this SF→NYC move smooth af? I've got your back with smart pricing, apartment hunting, and expense tracking. what do you wanna tackle first?",
    timestamp: new Date().toLocaleTimeString(),
    reactions: []
  }]);

  const [currentInput, setCurrentInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showQuickActions, setShowQuickActions] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [agents, setAgents] = useState<Record<string, Agent>>({
    itemValuationAgent: { active: false, lastAction: null, emoji: '💰' },
    apartmentAgent: { active: false, lastAction: null, emoji: '🏠' },
    expenseAgent: { active: false, lastAction: null, emoji: '📊' },
    coordinatorAgent: { active: false, lastAction: null, emoji: '🧠' }
  });

  const handleAgentQuery = async (query: string, targetAgent: string = 'coordinatorAgent'): Promise<void> => {
    setIsProcessing(true);
    setAgents(prev => ({ ...prev, [targetAgent]: { ...prev[targetAgent], active: true } }));

    try {
      const prompt = `You are a specialized ${targetAgent} for a moving assistant app targeting Gen-Z users. Use casual, friendly language with occasional emojis. The user is moving from SF to NYC.

Context:
- Current items to sell: ${JSON.stringify(items)}
- Apartments being considered: ${JSON.stringify(apartments)}
- Current expenses: ${JSON.stringify(expenses)}
- Pending todos: ${JSON.stringify(todos)}

Query: ${query}

Respond with JSON in this format:
{
  "response": "Casual, helpful response with emojis (keep it under 100 words)",
  "actions": ["specific", "actionable", "tasks"],
  "updates": {
    "items": [],
    "apartments": [], 
    "expenses": [],
    "todos": []
  },
  "quickActions": ["Quick Action 1", "Quick Action 2"],
  "recommendations": ["short rec 1", "short rec 2"]
}

Make it sound natural and helpful, not robotic. Use "yo", "tbh", "ngl" etc. when appropriate.`;

      // Simulate AI response for now (replace with real Claude API later)
      const mockResponse = {
        response: `Hey! 👋 I'm working on ${query}. This is a simulated response for now - connect the real Claude API to get intelligent responses!`,
        actions: ["Simulated action 1", "Simulated action 2"],
        updates: {
          items: [],
          apartments: [],
          expenses: [],
          todos: []
        },
        quickActions: ["Try another query", "Check out the other features"],
        recommendations: ["This will be smart once connected to Claude API", "For now, explore the UI!"]
      };

      // TODO: Replace with real Claude API call:
      // const response = await fetch('https://api.anthropic.com/v1/messages', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'x-api-key': process.env.REACT_APP_CLAUDE_API_KEY,
      //     'anthropic-version': '2023-06-01'
      //   },
      //   body: JSON.stringify({
      //     model: 'claude-3-sonnet-20240229',
      //     max_tokens: 1000,
      //     messages: [{ role: 'user', content: prompt }]
      //   })
      // });
      // const data = await response.json();
      // const agentResponse = JSON.parse(data.content[0].text);

      const agentResponse = mockResponse;

      if (agentResponse.updates.items?.length > 0) {
        setItems(prev => [...prev, ...agentResponse.updates.items]);
      }
      if (agentResponse.updates.apartments?.length > 0) {
        setApartments(prev => [...prev, ...agentResponse.updates.apartments]);
      }
      if (agentResponse.updates.expenses?.length > 0) {
        setExpenses(prev => [...prev, ...agentResponse.updates.expenses]);
      }
      if (agentResponse.updates.todos?.length > 0) {
        setTodos(prev => [...prev, ...agentResponse.updates.todos]);
      }

      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'user',
        content: query,
        timestamp: new Date().toLocaleTimeString(),
        reactions: []
      }, {
        id: Date.now() + 1,
        type: 'agent',
        agent: targetAgent,
        content: agentResponse.response,
        actions: agentResponse.actions,
        recommendations: agentResponse.recommendations,
        quickActions: agentResponse.quickActions,
        timestamp: new Date().toLocaleTimeString(),
        reactions: []
      }]);

      setAgents(prev => ({ 
        ...prev, 
        [targetAgent]: { 
          ...prev[targetAgent],
          active: false, 
          lastAction: `${query.substring(0, 30)}...` 
        } 
      }));

    } catch (error) {
      console.error('Agent query error:', error);
      addNotification('Oops! Something went wrong. Try again? 🤷‍♀️', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const addNotification = (message: string, type: string = 'success'): void => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedPhoto(imageUrl);

    addNotification('Analyzing photo... 📸', 'info');
    
    setTimeout(async () => {
      await handleAgentQuery(`I just uploaded a photo of an item. Can you analyze it and give me pricing suggestions? The item appears to be in good condition.`, 'itemValuationAgent');
      addNotification('Photo analyzed! Check the suggestions 💡', 'success');
    }, 2000);
  };

  const handleQuickAction = async (action: string): Promise<void> => {
    setShowQuickActions(false);
    await handleAgentQuery(action);
  };

  const scheduleApartmentVisit = async (apartmentId: number): Promise<void> => {
    const apartment = apartments.find(apt => apt.id === apartmentId);
    if (!apartment) return;

    addNotification('Opening calendar... 📅', 'info');
    
    setTimeout(async () => {
      await handleAgentQuery(`Schedule a visit for the apartment at ${apartment.address} this weekend`, 'apartmentAgent');
      addNotification('Visit scheduled! 🗓️', 'success');
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    await handleAgentQuery(currentInput);
    setCurrentInput('');
  };

  const quickActions = [
    { icon: Camera, text: "Snap & Price Item", action: "Help me take a photo and price a new item for sale" },
    { icon: Home, text: "Find Apartments", action: "Find me 3 new apartments in NYC under $3200/month" },
    { icon: Calendar, text: "Schedule Visits", action: "Help me schedule apartment visits for this weekend" },
    { icon: DollarSign, text: "Calculate Savings", action: "Show me how much money I'll save/spend moving to NYC" },
    { icon: Zap, text: "Quick Sell", action: "What's the fastest way to sell my items before moving?" },
    { icon: MapPin, text: "Best Neighborhoods", action: "What are the best NYC neighborhoods for someone my age?" }
  ];

  const ItemCard: React.FC<{ item: Item }> = ({ item }) => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-gray-900">{item.name}</h4>
          <div className="flex gap-1 mt-1">
            {item.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-green-600">${item.estimatedValue}</div>
          <div className="text-xs text-gray-500">{item.condition}</div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{item.marketResearch}</p>
      
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {item.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            {item.likes}
          </span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          item.status === 'listed' ? 'bg-green-100 text-green-800' :
          item.status === 'researching' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {item.status === 'listed' ? '🔥 Live' : item.status === 'researching' ? '🔍 Analyzing' : '⏳ Pending'}
        </span>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => handleAgentQuery(`Get me the latest pricing for ${item.name} and optimization tips`, 'itemValuationAgent')}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all text-sm font-medium"
        >
          💡 Optimize
        </button>
        <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const ApartmentCard: React.FC<{ apartment: Apartment }> = ({ apartment }) => (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-transparent hover:border-purple-200 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1">{apartment.address}</h4>
          <p className="text-sm text-gray-600 mb-2">{apartment.notes}</p>
          <div className="flex gap-2 mb-2">
            {apartment.amenities.slice(0, 2).map((amenity: string) => (
              <span key={amenity} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                {amenity}
              </span>
            ))}
            {apartment.amenities.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{apartment.amenities.length - 2}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-purple-600">${apartment.rent}</div>
          <div className="text-xs text-gray-500">/month</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
        <span>📸 {apartment.photos} photos</span>
        <span>🚇 {apartment.commute}</span>
        <span>📅 Available {apartment.available}</span>
      </div>
      
      {apartment.score > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">Your Score:</span>
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < apartment.score ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm font-bold text-purple-600">{apartment.score}/10</span>
        </div>
      )}
      
      <div className="flex gap-2">
        <button 
          onClick={() => scheduleApartmentVisit(apartment.id)}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all text-sm font-medium"
        >
          📅 {apartment.visited ? 'Reschedule' : 'Schedule Visit'}
        </button>
        {apartment.virtual_tour && (
          <button className="px-3 py-2 bg-purple-100 hover:bg-purple-200 rounded-xl transition-all text-purple-600">
            👁️ Tour
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification: Notification) => (
          <div 
            key={notification.id}
            className={`px-4 py-3 rounded-xl shadow-lg transform transition-all duration-300 ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            SF → NYC ✨
          </h1>
          <p className="text-gray-600 text-lg">Your AI-powered moving assistant that actually gets it</p>
        </div>

        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {Object.entries(agents).map(([agentName, status]: [string, Agent]) => (
            <div key={agentName} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              status.active ? 'bg-green-100 text-green-800 shadow-lg scale-105' : 'bg-white text-gray-600 shadow-sm'
            }`}>
              <span className="text-lg">{status.emoji}</span>
              <span className="text-sm font-medium">{agentName.replace('Agent', '').replace(/([A-Z])/g, ' $1').trim()}</span>
              {status.active && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
            </div>
          ))}
        </div>

        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center"
          >
            {showQuickActions ? <X className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
          </button>
          
          {showQuickActions && (
            <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl p-4 w-64 border">
              <h3 className="font-bold mb-3 text-gray-900">Quick Actions ⚡</h3>
              <div className="space-y-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action.action)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-left"
                  >
                    <action.icon className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  💰 Items to Sell
                </h2>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Snap & Price
                </button>
              </div>
              <div className="grid gap-4">
                {items.map((item: Item) => <ItemCard key={item.id} item={item} />)}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  🏠 NYC Apartments
                </h2>
                <button
                  onClick={() => handleAgentQuery('Find me 3 new apartments based on my preferences', 'apartmentAgent')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Find More
                </button>
              </div>
              <div className="grid gap-4">
                {apartments.map((apartment: Apartment) => <ApartmentCard key={apartment.id} apartment={apartment} />)}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">📊 Quick Stats</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-xl">
                  <div className="text-2xl font-black text-green-600">
                    ${items.reduce((sum: number, item: Item) => sum + item.estimatedValue, 0)}
                  </div>
                  <div className="text-sm text-gray-600">💰 Total item value</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-xl">
                  <div className="text-2xl font-black text-blue-600">
                    +${expenses.filter((e: Expense) => e.type === 'monthly').reduce((sum: number, e: Expense) => sum + e.amount, 0)}
                  </div>
                  <div className="text-sm text-gray-600">📈 Monthly change</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 rounded-xl">
                  <div className="text-2xl font-black text-purple-600">
                    {todos.filter((t: Todo) => !t.completed).length}
                  </div>
                  <div className="text-sm text-gray-600">✅ Tasks left</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <h3 className="font-bold flex items-center gap-2">
                  🤖 AI Assistant
                </h3>
              </div>
              
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {messages.map((message: Message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.agent && (
                        <div className="text-xs opacity-75 mb-1 flex items-center gap-1">
                          {agents[message.agent]?.emoji} {message.agent.replace('Agent', '')}
                        </div>
                      )}
                      <div className="text-sm">{message.content}</div>
                      {message.quickActions && (
                        <div className="mt-2 space-y-1">
                          {message.quickActions.map((action: string, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickAction(action)}
                              className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-all"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="text-xs opacity-60 mt-1">{message.timestamp}</div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-gray-600">AI thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentInput(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter' && currentInput.trim()) {
                        handleAgentQuery(currentInput);
                        setCurrentInput('');
                      }
                    }}
                    placeholder="ask me anything..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <button
                    onClick={() => {
                      if (currentInput.trim()) {
                        handleAgentQuery(currentInput);
                        setCurrentInput('');
                      }
                    }}
                    disabled={isProcessing || !currentInput.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    ✨
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingAssistantApp;