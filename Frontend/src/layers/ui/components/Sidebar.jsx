import React from 'react'
import '../../../styles/components/sidebar.scss'

const Sidebar = ({ username, recentChats, onNewChat, onChatSelect, onSettings }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <button className="sidebar__new-chat-btn" onClick={onNewChat}>
          + NEW CHAT
        </button>
      </div>

      <div className="sidebar__content">
        <div className="sidebar__section">
          <h3 className="sidebar__section-title">recent chats</h3>
          <div className="sidebar__chats-list">
            {recentChats && recentChats.map((chat, index) => (
              <div
                key={index}
                className="sidebar__chat-item"
                onClick={() => onChatSelect(chat)}
              >
                <span className="sidebar__chat-title">{chat.title}</span>
                <span className="sidebar__chat-date">{chat.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <span className="sidebar__username">{username}</span>
          <button className="sidebar__settings-btn" onClick={onSettings}>
            ⚙️
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
