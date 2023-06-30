import React, { useEffect, useState } from 'react'
import { fetchUsers, useTable } from '../../context/table/TableState'
import { 
	DELETE_USER,
	SORT_ASC_EMAIL, 
	SORT_ASC_NAME, 
	SORT_DSC_EMAIL, 
	SORT_DSC_NAME, 
	SORT_NONE_EMAIL, 
	SORT_NONE_NAME,
	UPDATE_ROWS
} from '../../context/types';
import UserModal from './components/UserModal';

const cell_width = "w-36";
  
const Table = () => {
    const [{users, loading, sort, entries}, dispatch] = useTable();
    const [page, setPages] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
   
     function closeModal(id) {
       setIsOpen(false);
	   dispatch({
			type: DELETE_USER,
			payload: id
	   })
     }
   
     function openModal(id) {
       setIsOpen(true);
	   setCurrentId(id);

     }

    const checkArrow = (type) => {
        switch(sort[`${type}`]) {
            case 0: {
                return "bg-none"
            } 
            case 1: {
                return "bg-white"
            } 
            case 2: {
                return "bg-white rotate-180"
            } 
            default: {
                
            }
        }
    }

    const onSortHandler = (type) => {
        if(sort[type] === 0) {
            type === "name" ? 
            dispatch({
                type: SORT_ASC_NAME
            })
            :
            dispatch({
                type: SORT_ASC_EMAIL
            })
        } else if(sort[type] === 1) {
            type === "name" ? 
            dispatch({
                type: SORT_DSC_NAME
            })
            :
            dispatch({
                type: SORT_DSC_EMAIL
            })
        } else {
            type === "name" ? 
            dispatch({
                type: SORT_NONE_NAME
            })
            :
            dispatch({
                type: SORT_NONE_EMAIL
            })

        }
    }

    const onDeleteHandler = (id) => {
        dispatch({
            type: DELETE_USER,
            payload: id
        })
    }

    const onRowsChange = (e) => {
		dispatch({
			type: UPDATE_ROWS,
			payload: e.target.value
		})
        setPages(1);
    }

    const onPrevPage = () => {
		if(page === 1) 
			return;
		setPages((page) => page-1);
    }
    
    const onNextPage = () => {
		if(page+1 <= Math.ceil(users.length/entries)) 
			setPages(page => page+1);
		else
			return;
    }

    useEffect(() => {
        fetchUsers(dispatch);
    }, [dispatch])
    
    if(loading) 
        return (
            <>
                <div className='h-[90vh] w-10/12 flex justify-center items-center'>
                <div className='animate-spin'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
                </div>
            </>
        )

    return (
    <div className='w-screen flex flex-col'>
        <div className='px-5 w-full flex flex-row items-center justify-between'>
            <div className='m-2 py-4 flex flex-row items-center gap-3'>
                <h1 className='font-bold text-xl'>Showing </h1>
                <select className='border p-1 rounded' value={entries} onChange={onRowsChange}>
                    {
                        users.map((_, index) => (
                            <option key={index}>{index+1}</option>
                        ))
                    }
                </select>
                <h1 className='font-bold text-xl'>out of {users.length} Users</h1>
            </div>
            <div className='flex flex-row gap-2'>
				<p className='font-bold text-md'>Showing Page</p>
				<button 
				title='Previous Page'
				className='rounded-full flex justify-center items-center w-6 h-6 transition duration-300 hover:-translate-x-1 hover:bg-black/10' 
				onClick={onPrevPage}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
					<path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
					</svg>
				</button>
                <p className='font-bold text-md'>{page}</p>
				<button 
				title='Next Page' 
				className='rounded-full flex justify-center items-center w-6 h-6 transition duration-300 hover:translate-x-1 hover:bg-black/10' 
				onClick={onNextPage}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
					<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
					</svg>
				</button>
            </div>
        </div>
        <div className='mx-2 realtive border w-fit overflow-auto max-h-[90vh]'>
            <div className='flex flex-row sticky top-0 bg-gray-200 z-10'>
                {users && Object.keys(users[0]).map((item, index) => (
                    item === "name"|| item === "email" ?
                    <div key={index} className={cell_width+" h-auto px-2 border flex flex-row justify-between"}>
                        <h2 className='font-bold'>{item === "id" ? "S no.": item}</h2>
                        <div onClick={() => onSortHandler(item)} className={`h-full flex items-center cursor-pointer rounded ${
                            checkArrow(item)
                        }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd" />
                            </svg>  
                        </div>
                    </div>
                    :
                    <div key={index} className={cell_width+" h-auto px-2 border"}>
                        <h2 className='font-bold'>{item === "id" ? "S no.": item}</h2>
                    </div>
                ))}
                <div key={"unknown"} className={cell_width+" h-auto px-2 border sticky right-0 top-0"}>
                    <h2 className='font-bold'>controls</h2>
                </div>
            </div>
            {users.slice(entries*(page-1), entries*page > users.length ? users.length: entries*page).map((item, index) => (
                <div className='flex flex-row w-inherit border'>
                    {
                        Object.values(item).map((value, index) => (
                            <div className={cell_width+' h-auto border px-2'}>
                                {
                                    typeof value === "object" ? 
                                        value.geo ? 
                                            <p className='break-words font-normal text-[14px]'>{Object.values(value).filter((item) => typeof item !== "object").flat().join(",") + `\n [${Object.values(value.geo).join(",")}]`}</p>
                                            : 
                                            <p className='break-words font-normal text-[14px]'>{Object.values(value).flat().join(",")}</p>
                                    :  
                                    typeof value === "number" ?
                                    <p className='break-words font-normal text-[14px]'>{`${value}.`}</p>
                                    :
                                    index === 3 || index === 6 ?
                                    <a 
                                        className='break-words font-normal text-[14px] underline hover:text-blue-900' 
                                        target="_blank"
                                        rel='noreferrer'
                                        href={index === 3 ? `mailto:${value}` : `https://${value}`}
                                    >{value}</a>
                                    :
                                    <p className='break-words font-normal text-[14px]'>{value}</p>
                                }
                            </div>
                        ))
                    }
                    <div key={"unknown"} className={cell_width+" h-auto px-2 border sticky right-0 top-0"}>
                        <button title="Open" onClick={() => openModal(item.id)} className='m-1 p-1 rounded border font-semibold hover:bg-gray-200 active:bg-gray-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                            </svg>
                        </button>
                        <button title="Delete" onClick={() => onDeleteHandler(item.id)} className='m-1 p-1 rounded border font-semibold hover:bg-gray-200 active:bg-gray-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <UserModal
            closeModal={closeModal}
            isOpen={isOpen}
			id={currentId}
        />
    </div>
  )
}

export default Table