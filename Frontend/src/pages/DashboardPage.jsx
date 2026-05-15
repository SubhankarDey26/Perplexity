import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar, MessageInput, ChatMessage } from '../../layers/ui/components/index.js'
import '../../styles/pages/dashboardPage.scss'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [recentChats] = useState([
    { title: 'React Best Practices', date: 'Today' },
    { title: 'API Design Patterns', date: 'Yesterday' },
    { title: 'Database Optimization', date: '2 days ago' }
  ])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prev => [...prev, { text: inputValue, sender: 'user' }])
      setInputValue('')
      // AI response will be added later
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: 'This is a sample AI response. Logic will be added later.', 
          sender: 'ai' 
        }])
      }, 500)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setInputValue('')
  }

  const handleChatSelect = (chat) => {
    // Logic to load selected chat
    console.log('Loading chat:', chat)
  }

  const handleSettings = () => {
    // Logic for settings
    console.log('Opening settings')
  }

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <Sidebar
        username="User"
        recentChats={recentChats}
        onNewChat={handleNewChat}
        onChatSelect={handleChatSelect}
        onSettings={handleSettings}
      />

      <div className="dashboard__main">
        <div className="dashboard__header">
          <div className="dashboard__title">
            <h1>Ask Anything</h1>
            <p>Your personal assistant for productivity and creativity</p>
          </div>
          <button className="dashboard__logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="dashboard__chat-area">
          {messages.length === 0 ? (
            <div className="dashboard__empty-state">
              <p>Start a new conversation</p>
            </div>
          ) : (
            <div className="dashboard__messages">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg.text}
                  sender={msg.sender}
                />
              ))}
            </div>
          )}
        </div>

        <div className="dashboard__input-area">
          <MessageInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSend={handleSendMessage}
            onUpload={() => console.log('Upload clicked')}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
