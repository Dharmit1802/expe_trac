import React from 'react';

export default function CategoryFilter({ CATEGORIES, handleFilterCategory ,setcategoryflag}) {

    function handleFilter(category) {
      return()=>{

     
              handleFilterCategory(category); // You might want to set the filter category here
          console.log(category);
      }
    };

    return (
        <aside>
            <ul className='fix sticky top-[160px]'>
                <li className="category">
                    <button className="btn btn-all-categories" onClick={handleFilter('')}>All</button>
                </li>

                {CATEGORIES.map((e) => (
                    <li key={e.name} className="category">
                        <button
                            className='btn btn-category rounded-full px-4 py-2'
                            style={{ backgroundColor: e.color }}
                            onClick={handleFilter(e.name)}
                        >
                            {e.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
