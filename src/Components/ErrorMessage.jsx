import React from 'react'
import '../Styles/ErrorMessage.css'

const ErrorMessage = ({children}) => {
  return (
    <div className='errorMessage'>
        {children}
    </div>
  )
}

export default ErrorMessage