import React from 'react'
import '../../../styles/components/header.scss'

const Header = ({ onAuthClick, isAuthenticated, userName }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <h1>Ask Anything</h1>
        <p>Your personal assistant for productivity and creativity</p>
      </div>
      <div className="header__auth">
        {!isAuthenticated ? (
          <>
            <button className="header__btn header__btn--register" onClick={onAuthClick}>
              Register
            </button>
            <button className="header__btn header__btn--login" onClick={onAuthClick}>
              Login
            </button>
          </>
        ) : (
          <span className="header__user">Welcome, {userName}</span>
        )}
      </div>
    </header>
  )
}

export default Header
