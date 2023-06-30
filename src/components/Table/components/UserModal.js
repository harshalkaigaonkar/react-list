import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect } from 'react'
import { fetchUser, useTable } from '../../../context/table/TableState'

const UserModal = ({closeModal, isOpen, id}) => {
    const [{user}, dispatch] = useTable();
    useEffect(() => {
        if(id)
            fetchUser(dispatch, id)
    }, [dispatch, id]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
            {
				user ?
				<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-2xl font-bold text-gray-800"
                  >
                    {user.name} ({user.username})
                  </Dialog.Title>
                  <div className="mt-2">
					<div className='py-4'>
						<p className='text-sm font-medium'>email</p>
						<a className='flex flex-row group' target={"_blank"} rel={"noreferrer"} href={`mailto:${user.email}`}>
							<p className='font-bold group-hover:underline group-hover:text-blue-800'>{user.email}</p>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 translate duration-300 group-hover:rotate-[10deg] group-hover:-translate-y-1">
							<path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
							</svg>
						</a>
					</div>
					<div className='py-4'>
						<p className='text-sm font-medium'>adddress</p>
						<a className='font-bold hover:underline group flex gap-2' target={"_blank"} rel={"noreferrer"} href={`http://maps.google.com?q=${user.address.geo.lat},${user.address.geo.lng}`}>
							<p className='group-hover:text-blue-800'>{Object.values(user.address).filter((item) => typeof item !== "object").join(" ,")}</p>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 translate duration-300 group-hover:rotate-[10deg] group-hover:-translate-y-1">
							<path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
							</svg>
						</a>
					</div>
					<div className='py-4'>
						<p className='text-sm font-medium'>phone</p>
						<a className='flex flex-row group' target={"_blank"} rel={"noreferrer"} href={`phoneto:${user.phone}`}>
							<p className='font-bold group-hover:underline group-hover:text-blue-800'>{user.phone}</p>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 translate duration-300 group-hover:rotate-[10deg] group-hover:-translate-y-1">
							<path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
							</svg>
						</a>
					</div>
					<div className='py-4'>
						<p className='text-sm font-medium'>website</p>
						<a className='flex flex-row group' target={"_blank"} rel={"noreferrer"} href={`http://${user.website}`}>
							<p className='font-bold group-hover:underline group-hover:text-blue-800'>{user.website}</p>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 translate duration-300 group-hover:rotate-[10deg] group-hover:-translate-y-1">
							<path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
							</svg>
						</a>
					</div>
					<div className='py-4'>
						<p className='text-sm font-medium'>company</p>
						<p className='font-bold text-xl'>{user.company.name}, <span  className='font-normal text-xs'>{user.company.name}</span></p>
						<div className='py-1 flex flex-row gap-2'>
							{user.company.bs.split(" ").map((item, index) => (
								<div key={index} className="p-2 rounded-full bg-gray-100 w-fit">
									<p className='text-[10px]'>{item}</p>
								</div>
							))}
						</div>
					</div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className={` 
                      w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white transition duration-300 bg-black/50 border-none border-[#343434] hover:cursor-pointer hover:bg-[#343434] active:shadow active:bg-[#222222]`}
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
				:
				<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
				<>
                <div className='h-[90vh] w-10/12 flex justify-center items-center'>
                <div className='animate-spin'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
                </div>
            </>
                </Dialog.Panel>
			}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UserModal