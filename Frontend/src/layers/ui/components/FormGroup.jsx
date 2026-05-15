import React from 'react'
import '../../../styles/components/formGroup.scss'

const FormGroup = ({ label, children, error, className = '' }) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-group__label">{label}</label>}
      {children}
      {error && <span className="form-group__error">{error}</span>}
    </div>
  )
}

export default FormGroup
