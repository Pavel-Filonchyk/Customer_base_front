import React, { useState, useEffect, useContext } from 'react'
import Jdenticon from 'react-jdenticon'
import {MyContext} from './index'
 
const Customers = ({users}) => {
    const [customers, setCustomers] = useState(null)
    const {user, setUser} = useContext(MyContext)

    useEffect(() => {
        setCustomers(users)
    }, [users])
    
    const onDelete = async (id) => {
        const response = await fetch('http://localhost:3001/delete', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        })
        const result = await response.json()
        setCustomers(result)
    }
    const onEdit = async (id) => {
        const response = await fetch('http://localhost:3001/customer', {
            method: 'PUT',
            body: JSON.stringify({ id }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
        })
        const result = await response.json()
        setUser(result)
    }
  return (
   
    <div className='flex flex-col h-full px-10'>
        <p className='my-10 font-bold text-xl text-slate-900 font-sans'>Customers</p>
        <div className='flex flex-row h-6 mb-3'>
            <p className='font-medium text-base text-slate-400 font-sans w-80'>Name</p>
            <p className='font-medium text-base text-slate-400 font-sans w-80 ml-2.5'>Company</p>
            <p className='font-medium text-base text-slate-400 font-sans w-80 ml-2.5'>Email</p>
            <p className='font-medium text-base text-slate-400 font-sans  ml-2.5 mr-7'>Admin</p>
            <p className='font-medium text-base text-slate-400 font-sans'>Actions</p>
        </div>
        {
            customers?.map(item => {
                return (
                    <div className='flex flex-row' key={item.id}>
                        <div className='flex w-80 h-8 mb-5 items-center'>
                            <Jdenticon size="32" value={item.value}/>
                            <p className='font-medium text-base text-slate-900 font-sans ml-2'>{item.firstName} {item.lastName}</p>
                        </div>
                        <div className='flex w-80 ml-2.5 h-8 mb-5 items-center'>
                            <p className='font-medium text-base text-slate-900 font-sans'>{item.company}</p>
                        </div>
                        <div className='flex w-80 ml-2.5 h-8 mb-5 items-center'>
                            <p className='font-medium text-base text-slate-900 font-sans'>{item.email}</p> 
                        </div>    
                        <div className='flex w-12 ml-3 h-6 mb-5 items-center rounded mt-1' style={{backgroundColor: item.admin === 'Admin' ? '#0EA5E9' : '#E2E8F0'}}/> 
                        <div className='flex flex-row w-16 justify-between mt-1 ml-6'>
                        <img src={'https://cdn.discordapp.com/attachments/1008571211179118703/1096043712141856818/Edit.png'} alt="Edit" style={{width: 24, height: 24}}
                            onClick={() => onEdit(item.id)}
                        />
                        <img src={'https://cdn.discordapp.com/attachments/1008571211179118703/1096044206591594570/Trash.png'} alt="Trash" style={{width: 24, height: 24}}
                            onClick={() => onDelete(item.id)}
                        />
                        </div>
                    </div>
                )
            })
        }
    </div>
   
  )
}
export default Customers
// 'https://cdn.discordapp.com/attachments/1008571211179118703/1096044336300425216/Eye.png'

