import "./crud.css";

import { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

const CrudApp = () => {
  //Default States Data
  const sweetAlertStates = {
    show: false,
    title: "",
    icon: "success",
    message: "",
  };
  const userDetailStates = {
    lastName: "",
    firstName: "",
  };
  const newUserStates = {
    firstName: "",
    lastName: "",
    age: "",
  };

  //Component States
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [getEdit, setGetEdit] = useState(userDetailStates);
  const [showSweetAlert, setSweetAlert] = useState(sweetAlertStates);
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setuserInfo] = useState(newUserStates);
  const [addUerLoader, setAdduserLoader] = useState(false);
  const [editId, setEditId] = useState(0);
  const [SaveEditId, setSaveEditId] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);

  //axios Function use With All Request using Props
  // axios handle custom hook but this only function because simple crud
  const axiosRequest = async (request) => {
    try {
      const response = await axios(request);
      return response;
    } catch (error) {
      return error;
    }
  };

  //Get Data From Fake APi when component render
  const getData = async () => {
    const axiosRequestDetail = {
      method: "get",
      url: "https://dummyjson.com/users",
    };
    const res = await axiosRequest(axiosRequestDetail);
    setData(res.data.users);
  };

  //Delete Current USer Details
  const deleteUser = async (item) => {
    const id = item.id;
    setId(id);
    const axiosRequestDetail = {
      method: "delete",
      url: "https://dummyjson.com/users/" + id,
    };
    const res = await axiosRequest(axiosRequestDetail);
    if (res.status === 200) {
      let filterData = data.filter((item) => item.id !== res.data.id);
      setData(filterData);

      //Alert Show when Edit User Successful
      const setAlertState = {
        show: true,
        title: "Delete Data",
        icon: "success",
        message: id + " " + "id Data is Deleted...",
      };
      setSweetAlert(setAlertState);

      //Remove Alert After 2 second
      setTimeout(() => {
        const setAlertStateRemove = {
          show: false,
          title: "Delete Data",
          icon: "success",
          message: "Best of luck",
        };
        setSweetAlert(setAlertStateRemove);
      }, 2000);
    } else {
      setId(null);
      setSweetAlert({
        show: true,
        title: "Failed Delete Data",
        icon: "error",
        message: "Some thing Wrong",
      });
      setTimeout(() => {
        setSweetAlert({
          show: false,
          title: "Delete Data",
          icon: "success",
          message: "Best of luck",
        });
      }, 2000);
    }
  };

  //Current Value Get Onchanged Event
  const ChangeEditUser = (e) => {
    setGetEdit({ ...getEdit, [e.target.name]: e.target.value });
  };

  //Add New User and handle States
  const addNewUser = () => {
    setShowForm(!showForm);
    setShowEditForm(false);
    setSaveEditId(0);
    setEditId(0);
  };

  //Edit Button States Handle
  const editUser = (dataRes) => {
    setEditId(dataRes.id);
    setShowEditForm(true);
    setShowForm(false);
    setGetEdit({
      lastName: dataRes.lastName,
      firstName: dataRes.firstName,
    });
  };

  //Edit User Function using Fake Api
  const editUserFn = async (dataRes) => {
    setSaveEditId(dataRes.id);

    const axiosRequestDetail = {
      method: "put",
      url: "https://dummyjson.com/users/" + dataRes.id,
      data: {
        lastName: getEdit.lastName,
        firstName: getEdit.firstName,
      },
    };
    const res = await axiosRequest(axiosRequestDetail);

    if (res.status === 200) {
      data.map((item) => {
        if (item.id === res.data.id) {
          setData((oldData) => {
            return [...oldData, data.splice(dataRes.id - 1, 1, res.data)];
          });
          setSweetAlert({
            show: true,
            title: "Update  Data",
            icon: "success",
            message: res.data.id + " " + "id Last Name is Updated...",
          });

          setTimeout(() => {
            setSweetAlert({
              show: false,
              title: "Update  Data",
              icon: "success",
              message: "",
            });
          }, 2000);
        }
        setSaveEditId(0);
        setEditId(0);
      });
    } else {
      setSweetAlert({
        show: true,
        title: "No Update Data",
        icon: "error",
        message: "somthing is wrong",
      });

      setTimeout(() => {
        setSweetAlert({
          show: false,
          title: "Update  Data",
          icon: "success",
          message: "",
        });
      }, 2000);
    }
  };

  //Changed Value Get
  const getChangedValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuserInfo({ ...userInfo, [name]: value });
  };

  //OnSubmit Event
  const onSubmit = (e) => {
    e.preventDefault();
    submitNewForm();
  };

  //Submit Form
  const submitNewForm = async () => {
    setAdduserLoader(true);

    const axiosRequestDetail = {
      method: "post",
      url: "    https://dummyjson.com/users/add",
      data: userInfo,
    };
    const res = await axiosRequest(axiosRequestDetail);
    if (res.status === 200) {
      setShowForm(false);
      setSweetAlert({
        show: true,
        title: "Add User Done",
        icon: "success",
        message: "New User Id is " + res.data.id,
      });
      setAdduserLoader(false);
      setTimeout(() => {
        setSweetAlert({
          show: false,
          title: "Add User Done",
          icon: "success",
          message: "New User Id is ",
        });
      }, 2000);
    } else {
      setSweetAlert({
        show: true,
        title: "No Add User",
        icon: "error",
        message: "No Add User Please Check APi",
      });
      setTimeout(() => {
        setSweetAlert({
          show: false,
          title: "No Add User",
          icon: "error",
          message: "No Add User Please Check APi",
        });
      }, 2000);
    }
  };

  //Cancel Button States
  const cancelEdit = () => {
    setShowEditForm(false);
    setSaveEditId(0);
    setEditId(0);
  };

  //Data Get When Component Render
  useEffect(() => {
    getData();
  }, []);

  //SweetAlert PopUp
  const Alert = () => {
    return (
      <>
        <SweetAlert
          show={showSweetAlert.show}
          title={showSweetAlert.title}
          type={showSweetAlert.icon}
          onConfirm={() => {}}
          showConfirm={false}
        >
          {showSweetAlert.message}
        </SweetAlert>
      </>
    );
  };

  return (
    <>
      <Alert />
      {data === null ? (
        <div className="flex items-center justify-center bg-yellow-50 min-h-screen ">
          <h1 className="text-lg font-semibold">Loading....</h1>
        </div>
      ) : (
        <div className="flex items-center  bg-yellow-50 min-h-screen flex-col gap-y-8 p-5 md:px-0 md:py-16">
          <button
            onClick={addNewUser}
            className=" relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add User
            </span>
          </button>

          {showForm && (
            <div>
              <form onSubmit={onSubmit}>
                <div className="flex flex-col">
                  <input
                    type="text"
                    required
                    value={userInfo.firstName}
                    name="firstName"
                    onChange={(e) => getChangedValue(e)}
                    className="border  border-violet-600 rounded-lg w-96 p-2 mb-3"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    required
                    value={userInfo.lastName}
                    name="lastName"
                    onChange={(e) => getChangedValue(e)}
                    className="border  border-violet-600 rounded-lg w-96 p-2 mb-3"
                    placeholder="Last Name"
                  />
                  <input
                    type="number"
                    required
                    value={userInfo.age}
                    name="age"
                    onChange={(e) => getChangedValue(e)}
                    className="border  border-violet-600 rounded-lg w-96 p-2 mb-3"
                    placeholder="Age"
                  />
                </div>
                {addUerLoader ? (
                  <div className="loader float-right"></div>
                ) : (
                  <button
                    className="bg-violet-500 text-white p-2 float-right"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>
          )}
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="p-5 bg-white rounded-lg shadow-lg w-full md:w-3/4"
              >
                {showEditForm && editId === item.id ? (
                  <div className="mb-5">
                    <h1>First Name</h1>
                    <input
                      placeholder="Frist Name"
                      name="firstName"
                      value={getEdit.firstName}
                      onChange={(e) => ChangeEditUser(e)}
                      className="border  border-violet-600 rounded-lg w-full p-2 mb-3"
                    />
                    <h1>Last Name</h1>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      value={getEdit.lastName}
                      onChange={(e) => ChangeEditUser(e)}
                      className="border  border-violet-600 rounded-lg w-full p-2 mb-3"
                    />

                    {SaveEditId === item.id ? (
                      <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      <button
                        className="text-dark bg-cyan-200 hover:bg-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                        onClick={() => editUserFn(item)}
                      >
                        Save
                      </button>
                    )}
                  </div>
                ) : (
                  ""
                )}

                <div className="flex justify-between items-center">
                  <h1 className="text-green-300 text-2xl">User Detail</h1>

                  <div className="flex flex-row justify-center">
                    {editId === item.id ? (
                      <button
                        onClick={cancelEdit}
                        className=" text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        cancel
                      </button>
                    ) : (
                      <button
                        className=" text-white bg-lime-600 hover:bg-lime-700  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => editUser(item)}
                      >
                        Edit
                      </button>
                    )}

                    {item.id === id ? (
                      <div className="loader"></div>
                    ) : (
                      <button
                        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => deleteUser(item)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <hr />
                <div className="py-4">
                  <h1 className="text-1xl  text-slate-500">
                    First Name : {item.firstName}
                  </h1>
                  <h1 className="text-1xl  text-slate-500">
                    Last Name : {item.lastName}
                  </h1>
                  <p className="text-slate-500">Email : {item.email}</p>
                </div>

                <hr />
                <p className="text-blue-200">Mateen Ali React Js Engineer</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default CrudApp;
