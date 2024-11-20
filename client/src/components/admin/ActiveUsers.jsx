import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../BuildFunction/DeleteIcon";
import { EditIcon } from "../BuildFunction/EditIcon";

import Sidebar from '../Sidebar';
import { activeUser, adminUpdateCurrent_user } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const statusColorMap = {
  verified: "success",
  'Not verified': "danger",
  pending: "warning",
  confirm: "primary",
};

const role = {
  user:"primary",
  admin:"success"
}


const ActiveUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allRequest, setAllRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(null);
  const [inputValue, setInputValue] = useState(null)
  const dispatch = useDispatch();
  const usersPerPage = 10;
  
  const handleEdit = (userId) => {
    setShowInput(userId);
  }
  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value)
  }

  const handleUpdate = (userId) => {
    const data = {
      inputValue: inputValue,
      userId: userId
    }
    dispatch(adminUpdateCurrent_user(data))
    setShowInput(false);
  }
  useEffect(() => {
    const fetchKycDetails = async () => {
      try {
        const allUser = await dispatch(activeUser());
        setAllRequest(allUser);
      } catch (error) {
        console.error("Error fetching KYC details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKycDetails();
  }, [dispatch, showInput, inputValue]);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/admin/deleteUser/${userId}`);
      setAllRequest(allRequest.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }; 

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = allRequest.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(allRequest.length / usersPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
//console.log(currentUsers.length);
/* useEffect(() => {
  const checkUser =()=>{
    for(let i=0;i<currentUsers.length ;i++){
      for(let j=0;j<kycUsers.length;j++){
        if(currentUsers[i].id===kycUsers[j].user_id){
          return true;
        }
      }
     }
     return false;
  }
  const isUserMatched = checkUser();
  console.log(isUserMatched)
  
}, ) */
  
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    
    
    switch (columnKey) {
      case "id":
        
      return (
        <Chip
        className='cursor-pointer'
        color={user.id==user.kyc_usersuser_id || user.id==user.investor_usersuser_id || user.id==user.loan_usersuser_id?  'success':'danger'}
        
        title={user.id==user.kyc_usersuser_id || user.id==user.investor_usersuser_id || user.id==user.loan_usersuser_id? ('Active User'):'Passive User'}
        size='sm'
        variant='flat'
        >
          {user.id}
        </Chip>
      );
      case "name":
        return (
          <User
            avatarProps={{ radius: "md", src: user.avatar }}

            name={cellValue}
          >

          </User>
        );
      case "email":
        return <span>{user.email}</span>

      case "password":
        return user.password.length>20 ? user.password.substring(0,15)+'...':<span className='flex flex-col '>{user.password}</span>;
      case "role":
        return <Chip color={role[user.role]} size="sm" variant="flat">
        {user.role}
      </Chip>
      /* case "user_id":
        return showInput === user.id ? (<div className='flex flex-col justify-center gap-2'><input placeholder={user.user_id} className='w-14 border rounded p-1 border-solid-2 border-red-500' autoFocus onChange={handleInputChange} /> <div className='flex flex-row items-center justify-center gap-4'> <button className='border rounded p-1 max-w-fit text-white bg-slate-800 hover:bg-slate-400' onClick={() => setShowInput(false)}>Cancel</button> <button onClick={() => handleUpdate(user.id)} className={`border rounded p-1 max-w-fit text-white ${inputValue !== null ? 'bg-slate-800 hover:bg-slate-400' : 'bg-slate-200 cursor-not-allowed'}  `} disabled={inputValue === null}>Update</button></div></div>) : <span>{user.user_id}</span>; */
      /* case "verified":
        return <span>{user.is_verified }</span>; */
      case "message":
        return showInput === user.id ? (<div className='flex flex-col justify-center gap-2'><textarea placeholder={user.user_id} className='w-30  border rounded p-1 border-solid-2 border-red-500' autoFocus onChange={handleInputChange} rows='4'/> <div className='flex flex-row items-center justify-center gap-4'> <button className='border rounded p-1 max-w-fit text-white bg-slate-800 hover:bg-slate-400' onClick={() => setShowInput(false)}>Cancel</button> <button onClick={() => handleUpdate(user.id)} className={`border rounded p-1 max-w-fit text-white ${inputValue !== null ? 'bg-slate-800 hover:bg-slate-400' : 'bg-slate-200 cursor-not-allowed'}  `} disabled={inputValue === null}>Update</button></div></div>) : <span>{user.message}</span>;
     /*  case "ifsc_code":
        return <span>{user.ifsc_code}</span>; */
      case "status":
        return (
          <Chip color={statusColorMap[user.is_verified]} size="sm" variant="flat">
            {user.is_verified}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex  text-lg gap-4">
            {/* <Tooltip content="Details">
              <span className="cursor-pointer">
                <EyeIcon />
              </span>
            </Tooltip> */}
             <Tooltip content="Edit user" color="warning">
              <span className="cursor-pointer">
                <EditIcon className='text-yellow-300' onClick={() => handleEdit(user.id)} />
              </span>
            </Tooltip> 
             <Tooltip content="Delete user" color="danger">
              <span
                className="cursor-pointer text-danger"
                onClick={() => deleteUser(user.user_id)}
              >
                <DeleteIcon/>
              </span>
            </Tooltip> 
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 max-w-8xl mx-auto p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">KYC Details</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Table aria-label="KYC Details"  >

            <TableHeader columns={[
              { name: "ID", uid: "id" },
              { name: "Profile", uid: "name" },
              { name: "Email", uid: "email" },
              { name: "Password", uid: "password" },
              { name: "Role", uid: "role" },
              //{ name: "User ID", uid: "user_id" },
              //{ name: "Verified", uid: "verified" },
              //{ name: "Bank Account", uid: "bank_account_number" },
              { name: "Message", uid: "message" },
              { name: "KYC Status", uid: "status" },
              { name: "Actions", uid: "actions" }
            ]} >
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className='border-b-2  border-gray-600'>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody items={currentUsers} >
              {(user) => (
                <TableRow key={user.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(user, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}

            </TableBody>
          </Table>
        )}


        {/* Pagination */}
        <div className="flex justify-end mt-6 space-x-2">
          <button
            className={`px-4 py-2 rounded-full ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-slate-800 text-white'}`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? 'text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold' : 'bg-gray-300'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded-full ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white'}`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
