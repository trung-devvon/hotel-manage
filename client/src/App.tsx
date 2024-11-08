import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import NotFound from '@pages/NotFound'
import { AdminLayout, Dashboard } from '@pages/admin'
import { ManageDestination, CreateDestination } from '@pages/admin/destination'
import { CreateHotel, CreateHotelType, ManageHotel, ManageHotelType } from '@pages/admin/hotel'
import { ManageUser } from '@pages/admin/user'
import { MemberLayout, Personal } from '@pages/member'
import { getCurrentThunk, getDestinationsThunk, getHotelTypesThunk, getRolesThunk } from '@redux/actions'
import { pathAdmin, pathMember, pathUser } from '@utils/path'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { Modal } from '@components/common'
import { Auth, Filter, Home, Layout, Test } from '@pages/public'

function App() {
  const { token } = useAppSelector((state) => state.user)
  const { modalContent, isShowModal } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getRolesThunk())
    dispatch(getDestinationsThunk())
    dispatch(getHotelTypesThunk())
  }, [])
  useEffect(() => {
    let clearTime: any
    if (token)
      clearTime = setTimeout(() => {
        dispatch(getCurrentThunk())
      }, 10)
    return () => clearTimeout(clearTime)
  }, [token])
  return (
    <>
      {isShowModal && modalContent && (
        <div className='fixed z-[999] glass-white max-h-screen overflow-y-auto inset-0'>
          <Modal>{modalContent}</Modal>
        </div>
      )}
      <Routes>
        {/* Public Route */}
        <Route path={pathUser.PUBLIC} element={<Layout />}>
          <Route path={pathUser.HOME} element={<Home />} />
          <Route path={pathUser.SEARCH} element={<Filter />} />
          {/* <Route path={'test'} element={<Test />} /> */}
        </Route>
        {/* page not found */}
        <Route path={pathUser.ALL} element={<NotFound />} />
        {/* login/register page */}
        <Route path={pathUser.AUTH} element={<Auth />} />
        {/* admin router */}
        <Route path={pathAdmin.ADMIN} element={<AdminLayout />}>
          <Route path={pathAdmin.DASHBOARD} element={<Dashboard />} />
          <Route path={pathAdmin.CREATE_DESTINATION} element={<CreateDestination />} />
          <Route path={pathAdmin.MANAGE_DESTINATION} element={<ManageDestination />} />
          <Route path={pathAdmin.MANAGE_HOTEL} element={<ManageHotel />} />
          <Route path={pathAdmin.CREATE_HOTEL} element={<CreateHotel />} />
          <Route path={pathAdmin.CREATE_HOTELTYPE} element={<CreateHotelType />} />
          <Route path={pathAdmin.MANAGE_HOTELTYPE} element={<ManageHotelType />} />
          <Route path={pathAdmin.MANAGE_MEMBER} element={<ManageUser />} />
        </Route>
        {/* member route */}
        <Route path={pathMember.MEMBER} element={<MemberLayout />}>
          <Route path={pathMember.PERSONAL} element={<Personal />} />
        </Route>
      </Routes>
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          duration: 4000
        }}
      />
    </>
  )
}

export default App
