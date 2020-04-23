import React, { useState, useEffect } from 'react'
import Friend from './Friend'
import FriendForm from './FriendForm'

////////// NEW DEPENDENCIES FOR TODAY //////////
import axios from 'axios'
import * as yup from 'yup'

// 👉 the URL for our [GET] and [POST] requests
const url = 'http://localhost:4000/friends'

// 👉 the shape of the state that drives the form
const initialFormValues = {
  ///// TEXT INPUTS /////
  username: '',
  email: '',
  ///// DROPDOWN /////
  civil: '',
  ///// CHECKBOXES /////
  hobbies: {
    hiking: false,
    reading: false,
    coding: false,
  },
}

// 👉 the shape of the validation errors object
const initialFormErrors = {
  username: '',
  email: '',
  civil: '',
}

// 🔥 STEP 7 - WE NEED TO BUILD A SCHEMA FOR VALIDATION
const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'username must have at least 3 characters!')
    .required('username is required!'),
  email: yup
    .string()
    .email('a VALID email is required')
    .required('email is required'),
  civil: yup
    .string()
    .matches(/(married|single)/, 'either single or married')
    .required('civil status is required'),
})

export default function App() {
  const [friends, setFriends] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  // 🔥 STEP 1 - WE NEED STATE TO KEEP TRACK OF WHETHER SUBMIT BUTTON IS DISABLED!
  const [formDisabled, setFormDisabled] = useState(true)

  // 🔥 STEP 2 - WE NEED STATE TO KEEP TRACK OF THE VALIDATION ERRORS!
  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const getFriends = () => {
    // 🔥 STEP 3 - WE NEED TO FETCH FRIENDS FROM THE API!
    // and set them in state
    axios.get(url)
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        debugger
      })
  }

  useEffect(() => {
    // 🔥 STEP 4 - AFTER THE FIRST DOM SURGERY WE NEED FRIENDS FROM API!
    getFriends()
  }, [])

  const postFriend = friend => { // minus id
    // 🔥 STEP 5 - WE NEED A FUNCTION TO POST A NEW FRIEND TO THE API!
    // and set the updated list of friends in state
    // the endpoint responds (on success) with the new friend (with id !!)
    axios.post(url, friend)
      .then(res => {
        setFriends([res.data, ...friends])
      })
      .catch(err => {
        debugger
      })

  }

  useEffect(() => {
    // 🔥 STEP 8 - IF THE FORM VALUES CHANGE, WE NEED TO RUN VALIDATION
    // and use them to enable/disable the submit button
    formSchema.isValid(formValues)
      .then(valid => { // either true or false
        setFormDisabled(!valid)
      })
  }, [formValues])

  const onSubmit = evt => {
    evt.preventDefault()

    const newFriend = {
      username: formValues.username,
      email: formValues.email,
      married: formValues.civil === 'single' ? false : true,
      hobbies: Object.keys(formValues.hobbies)
        .filter(hobby => formValues.hobbies[hobby] === true)
    }

    // 🔥 STEP 6 - WE NEED TO POST OUR NEW FRIEND TO THE API!
    postFriend(newFriend)
    setFormValues(initialFormValues)
  }

  const onInputChange = evt => {
    // PULL THESE OUT AHEAD OF TIME
    const name = evt.target.name
    const value = evt.target.value

    // 🔥 STEP 9 - IF THE FORM VALUES CHANGE, WE NEED TO RUN VALIDATION
    // and update the form errors slice of state (so the form can display errors)
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        // yoohoo, validates :)
        // CLEAR ERROR
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch(err => {
        // dangit, does not validate :(
        // SET THE ERROR IN THE RIGHT PLACE
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const onCheckboxChange = evt => {
    const { name } = evt.target
    const isChecked = evt.target.checked

    setFormValues({
      ...formValues,
      hobbies: {
        ...formValues.hobbies,
        [name]: isChecked,
      }
    })
  }

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <FriendForm
        values={formValues}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
        ////////// NEW PROPS FOR TODAY //////////
        disabled={formDisabled}
        errors={formErrors}
      />

      {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      }
    </div>
  )
}
