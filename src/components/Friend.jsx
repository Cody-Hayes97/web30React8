import React from 'react'

function Friend({ details }) {
  if (!details) {
    return <h3>Working fetching your friend&apos;s details...</h3>
  }
  return (
    <div className='friend container'>
      <h2>{details.username}</h2>
      <p>Email: {details.email}</p>
      <p>Married: {details.married ? 'Yes' : 'No'}</p>

      {
        !!details.hobbies && !!details.hobbies.length &&
        <div>
          Hobbies:
          <ul>
            {
              details.hobbies.map((like, idx) => <li key={idx}>{like}</li>)
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Friend
