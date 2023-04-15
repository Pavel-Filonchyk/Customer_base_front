import React, { useState, useEffect, useContext } from 'react'
import { Formik, Form, useField } from "formik"
import * as Yup from 'yup'
import uuid from 'react-uuid'
import _ from 'lodash'
import Customers from './Customers'
import { MyContext } from './index'

export default function Auth({users}) {
    const [status, setStatus] = useState('User')
    const [required, setRequired] = useState(false)
    const [customers, setCustomers] = useState(null)
    const { user } = useContext(MyContext)

    useEffect(() => {
        setCustomers(users)
    }, [users])
    useEffect(() => {
        setStatus(user?.[0].admin)
    }, [user])
    
    const submit = async (e) => {
        console.log(e)
        if(_.size(user[0]) > 1){
            const newObj = {
                id: user[0].id, 
                value: user[0
                ].value, 
                firstName: e.firstName,  
                lastName: e.lastName, 
                company: e.company, 
                email: e.email, 
                admin: status
            }
            const response = await fetch('http://localhost:3001/postCustomer', {
                method: 'POST',
                body: JSON.stringify(newObj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
            })
            const result = await response.json()
            setCustomers(result)
        }else{
            const newObj = {
                id: uuid(), 
                value: uuid(), 
                firstName: e.firstName,  
                lastName: e.lastName, 
                company: e.company, 
                email: e.email, 
                admin: status
            }
            const response = await fetch('http://localhost:3001/postCustomer', {
                method: 'POST',
                body: JSON.stringify(newObj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
            })
            const result = await response.json()
            setCustomers(result)
        }
    }

  return (
    <div className='flex flex-row'>
        <div className='flex flex-col h-full px-10 border-r-2' style={{width: 520}} >
            <Formik
                enableReinitialize={true}
                initialValues={user[0]}
                onSubmit={(e) => submit(e)}
                validationSchema={_.size(user[0]) <= 1 ? 
                    Yup.object({
                        firstName: Yup.string()
                            .required('Required'),
                        lastName: Yup.string()
                            .required('Required'),
                        company: Yup.string()
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .min(8, '8+ characters')
                            .required('Required')
                    })
                    : ''}
                >
                <Form>
                    <p className='my-10 font-bold text-xl text-slate-900 font-sans'>
                        {
                            _.size(user[0]) > 1 ? 'Edit customer' :  'Add Customer'
                        }
                    </p>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <p className='font-medium text-base text-slate-900 font-sans'>First Name</p>
                            <MyTextInput name="firstName" type="text" className='mt-2.5 w-52 h-10 border-2 border-slate-200 rounded-lg px-3'
                                
                            />
                        </div>
                        <div className='flex flex-col mx-5'>
                            <p className='font-medium text-base text-slate-900 font-sans'>Last Name</p>
                            <MyTextInput name="lastName" type="text" className='mt-2.5 w-52 h-10 border-2 border-slate-200 rounded-lg px-3'/> 
                        </div>
                    </div>
                    <div className='flex flex-col mt-6'>
                        <p className='font-medium text-base text-slate-900 font-sans'>Company</p>
                        <MyTextInput name="company" type="text" className='mt-2.5 w-full h-10 border-2 border-slate-200 rounded-lg px-3'/>
                    </div>
                    <div className='flex flex-col mt-6'>
                        <p className='font-medium text-base text-slate-900 font-sans'>Status</p>
                        <div className='flex mt-2.5 w-full h-10 rounded-lg bg-slate-100 p-1 '>
                            <div className='flex w-full justify-center items-center' 
                                onClick={() => setStatus('User')}
                            >
                                {
                                status === 'User' ? <div className='w-52 bg-white h-full rounded flex justify-center items-center'>
                                            <p>User</p>
                                        </div>
                                    : <p>User</p>
                                }  
                            </div>
                            <div className='flex justify-center items-center w-full'
                                onClick={() => setStatus('Admin')}
                            >
                                {
                                status === 'Admin' ? <div className='w-52 bg-white h-full rounded flex justify-center items-center'>
                                        <p>Administrator</p>
                                    </div>
                                    : <p>Administrator</p> 
                                }  
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mt-6'>
                        <p className='font-medium text-base text-slate-900 font-sans'>Email</p>
                        <MyTextInput name="email" type="email" className='mt-2.5 w-full h-10 border-2 border-slate-200 rounded-lg px-3'/>
                    </div>
                    {
                        _.size(user[0]) > 1 ? '' 
                        :  <div className='flex flex-col mt-6'>
                            <p className='font-medium text-base text-slate-900 font-sans'>Password</p>
                            <MyTextInput name='password' type='password' autoComplete='off' className='mt-2.5 w-full h-10 border-2 border-slate-200 rounded-lg px-3'
                                onClick={() => setRequired(true)}
                            />
                            {
                            required ? ''
                            : <p className='mt-2.5 font-normal text-sm font-sans text-slate-400'>8+ characters</p>
                            }
                        </div>
                        
                    }
                    <button type="submit" className='my-6 w-full h-10 rounded-lg bg-sky-500 text-white text-base font-bold font-sans'>Save</button>
                </Form>
            </Formik>
        </div>
        <Customers
          users={customers}
        />
    </div>
  )
}

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error text-red-400 mt-2.5 font-normal text-sm font-sans" >{meta.error}</div>
        ) : null}
      </>
    )
  }
