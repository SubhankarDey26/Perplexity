import React from 'react'
import '../../../styles/components/messageInput.scss'

const MessageInput = ({ value, onChange, onSend, onUpload }) => {
  return (
    <div className="message-input">
      <textarea
        className="message-input__field"
        placeholder="Type your message here"
        value={value}
        onChange={onChange}
      />
      <div className="message-input__actions">
        <button className="message-input__upload" onClick={onUpload}>
          📎
        </button>
        <button className="message-input__send" onClick={onSend}>
          ➤
        </button>
      </div>
    </div>
  )
}

export default MessageInput
