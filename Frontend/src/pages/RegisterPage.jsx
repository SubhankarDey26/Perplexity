import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Input, FormGroup } from '../../layers/ui/components/index.js'
import '../../styles/pages/registerPage.scss'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    console.log('Registration submitted:', formData)
    navigate('/login')
  }

  return (
    <div className="register-page">
      <div className="register-page__container">
        <div className="register-page__card">
          <h1 className="register-page__title">Register</h1>
          <p className="register-page__subtitle">Create a new account</p>

          <form onSubmit={handleSubmit} className="register-page__form">
            <FormGroup label="Username">
              <Input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormGroup>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup label="Confirm Password">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Button type="submit" variant="primary" size="lg">
              Register
            </Button>
          </form>

          <p className="register-page__footer">
            Already have an account?{' '}
            <Link to="/login" className="register-page__link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
