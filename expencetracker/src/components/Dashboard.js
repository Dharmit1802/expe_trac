import React, { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ExpenseList from "./ExpenseList"

export default function Dashboard() {

  const [userData, setUserData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    title : "",
    amount : "",
    category : "",
    date : ""
   });

   

   function handleChange(event) {
    const { name, value, checked, type } = event.target;
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://localhost:3000/api/v1/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);

        const expensesResponse = await fetch('http://localhost:3000/api/v1/getexpense', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (!expensesResponse.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const expensesData = await expensesResponse.json();
        setExpenses(expensesData.expenses);
        setUserData(data.user.id);
        setFormData((prev)=>({...prev,user:userData}));
      } catch (error) {
        console.error(error.message);
        // Handle error, show error message, etc.
      }
    };

    

    fetchUserData();
  }, [expenses]);

  const data = [
    {
      title:'home expenses',amount:"20000",date:"04/03/2024",category:"technology"
    },
    {
      title:'home expenses',amount:"20000",date:"04/03/2024",category:"technology"
    },{
      title:'home expenses',amount:"20000",date:"04/03/2024",category:"technology"
    },{
      title:'home expenses',amount:"20000",date:"04/03/2024",category:"technology"
    },{
      title:'home expenses',amount:"20000",date:"04/03/2024",category:"technology"
    },{
      title:'home expenses',amount:"20000",date:"04/03/2024",category:"technology"
    },{
      title:'home expenses',amount:"20000",date:"04/03/2024",category:"technology"
    }
  ]

  const [showaddexpense, SetShowExpense] = useState(false);
  const [user,setUser] = useState("");

  

  console.log(formData);

  console.log(formData);

  const CATEGORIES = [
    { name: 'technology', color: '#3b82f6' },
    { name: 'science', color: '#16a34a' },
    { name: 'finance', color: '#ef4444' },
    { name: 'society', color: '#eab308' },
    { name: 'entertainment', color: '#db2777' },
    { name: 'health', color: '#14b8a6' },
    { name: 'history', color: '#f97316' },
    { name: 'news', color: '#8b5cf6' },
  ];

  const today = new Date().toISOString().split('T')[0];

  function handleaddexpense(e){
    e.preventDefault();
    showaddexpense ? SetShowExpense(false) : SetShowExpense(true);
  }

  async function handlesubmit(e){
    e.preventDefault();
    
  
    const res = await fetch("http://localhost:3000/api/v1/addexpense",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData)
    });

    

    console.log(res);
    console.log(formData);

  }

  return (
    <div className='w-[100%] flex flex-col'>
      <div className='text-white bg-black sticky top-0 w-[90%] mx-auto px-[70px] py-5 flex justify-between items-center'>
        <div className="flex gap-5 items-center">
          <img 
            src="logo.png"
            height="68"
            width="68"
            alt="short-fact logo"
          />
          <h1 className='font-bold text-[30px]'>Expense Tracker</h1>
        </div>

        <button onClick={handleaddexpense} className="bg-red-500 text-black px-5 py-2 font-semibold rounded-full text-[21px]">Add expense</button>
      </div>

      <form onSubmit={handlesubmit} className={`w-[85%] ${showaddexpense ? "block" : "hidden"} text-xl gap-y-3 rounded-3xl bg-gray-700 mx-auto flex flex-col justify-between  px-[70px] py-5 text-white`} >
        <div className='flex w-full flex-col md:gap-y-0 gap-y-3 md:flex-row md:gap-x-[120px]'> 
          <div className='flex gap-2 items-center'>
            <label for="title" className="capitalize">title:</label>
            <input id='title' name="title" value={formData.title} type="text" maxLength="50" placeholder="title here" onChange={handleChange} className='rounded-full border-gray-900 text-black outline-1 px-4 py-2 w-full md:w-[35rem] bg-gray-300'/>
          </div>

          <div className='flex gap-2 items-center'>
            <label for="amount" className="capitalize">amount:</label>
            <input id='amount' name="amount" value={formData.amount} type="text" maxlength="15" placeholder="amount here" onChange={handleChange} className='rounded-full border-gray-900 text-black outline-1 px-4 py-2 w-full md:w-[20rem] bg-gray-300'/>
          </div>
        </div>

        <div className='flex w-full flex-col md:gap-y-0 gap-y-3 md:flex-row md:gap-x-[430px]'> 
          <div className='flex gap-2 items-center'>
            <label for="category" className="capitalize">category:</label>
            <select id='category' onChange={handleChange} name="category" value={formData.category} className="rounded-full px-4 py-2 flex items-center bg-gray-300 text-gray-700">
              <option value="">Choose category:</option>
              {CATEGORIES.map((cat) => (<option key={cat.name} value={cat.name}> {cat.name.toUpperCase()}</option>))}

            </select>
          </div>

          <div className='flex gap-2 items-center'>
            <label for="date" className="capitalize">date:</label>
            <input type='date' name="date" value={formData.date} max={today} onChange={handleChange}  className="rounded-full px-4 py-2 flex items-center bg-gray-300 text-gray-400"></input>
          </div>
          

        </div>
        <div className='flex gap-x-2'>
          <button className="rounded-full  bg-green-500 text-black py-2 px-7 text-2xl">Post</button>
          <button onClick={handleaddexpense} className={`rounded-full ${showaddexpense ? "block" : "hidden"} bg-red-500 text-black py-2 px-7 text-2xl`}>Cancel</button>
        </div>


        
      </form>

      <div className='w-[90%] mx-auto px-[70px] pt-5 flex justify-between main'>
        <CategoryFilter CATEGORIES={CATEGORIES}></CategoryFilter>
        <ExpenseList expenses={expenses} setExpenses={setExpenses} CATEGORIES={CATEGORIES}></ExpenseList>
      </div>
    </div>

  )
}
