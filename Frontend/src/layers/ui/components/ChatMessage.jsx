import React from 'react'
import '../../../styles/components/chatMessage.scss'

const ChatMessage = ({ message, sender }) => {
  return (
    <div className={`chat-message chat-message--${sender}`}>
      <div className="chat-message__content">
        {message}
      </div>
    </div>
  )
}

export default ChatMessage
