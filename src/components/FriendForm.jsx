import React from 'react'

function FriendForm(props) {
  const {
    values,
    onInputChange,
    onCheckboxChange,
    onSubmit,
    ////////// NEW PROPS FOR TODAY //////////
    disabled,
    errors,
  } = props

  return (
    <form className='friend container'>
      <h2>Friend Form</h2>
      {/* 🔥 STEP 10 - SHOW A BUNCH OF ERRORS */}
      <div className='errors'>
        {errors.username}
        {errors.email}
        {errors.civil}
      </div>
      {/* ////////// TEXT INPUTS ////////// */}
      <label>Username:&nbsp;
      <input
          value={values.username}
          onChange={onInputChange}
          name='username'
          type='text'
        /></label>
      <label>Email:&nbsp;
      <input
          value={values.email}
          onChange={onInputChange}
          name='email'
          type='text'
        /></label>

      {/* ////////// DROPDOWN ////////// */}
      <label>Civil Status:&nbsp;
      <select
          value={values.civil}
          onChange={onInputChange}
          name='civil'
        >
          <option defaultValue=''>Please choose</option>
          <option value='married'>married</option>
          <option value='single'>not married</option>
        </select></label>

      {/* ////////// CHECKBOXES ////////// */}
      <label><input
        checked={values.hobbies.hiking}
        onChange={onCheckboxChange}
        name='hiking'
        type="checkbox" /> Hiking</label>
      <label><input
        checked={values.hobbies.reading}
        onChange={onCheckboxChange}
        name='reading'
        type="checkbox" /> Reading</label>
      <label><input
        checked={values.hobbies.coding}
        onChange={onCheckboxChange}
        name='coding'
        type="checkbox" /> Coding</label>

      {/* ////////// DISABLED PROP NEW FOR TODAY ////////// */}
      <button onClick={onSubmit} disabled={disabled}>submit</button>
    </form>
  )
}

export default FriendForm
