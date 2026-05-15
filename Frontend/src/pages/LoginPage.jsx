import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Input, FormGroup } from '../../layers/ui/components/index.js'
import '../../styles/pages/loginPage.scss'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logic will be added later
    console.log('Form submitted:', formData)
    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__card">
          <h1 className="login-page__title">Login</h1>
          <p className="login-page__subtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="login-page__form">
            <FormGroup label="Email">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup label="Password">
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Button type="submit" variant="primary" size="lg">
              Login
            </Button>
          </form>

          <p className="login-page__footer">
            Don't have an account?{' '}
            <Link to="/register" className="login-page__link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
