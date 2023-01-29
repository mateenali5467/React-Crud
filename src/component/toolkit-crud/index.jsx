import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../slices/post";

const ToolkitCrud = () => {
  
  const dispatch = useDispatch();
  const { postSlice } = useSelector((response) => response);

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <>
      {postSlice.loading && (
        <div className="flex items-center justify-center bg-yellow-50 min-h-screen ">
          <h1>Loading....</h1>
        </div>
      )}
      {postSlice.loading === false && postSlice.data && (
        <div className="flex flex-col items-center gap-y-8 p-8 md:px-0 md:py-16 bg-yellow-50 min-h-screen ">
          <h1>
            Just Get Data use Redux Toolkit with HTTP Request Please check code{" "}
          </h1>
          {postSlice.data.users.map((item, index) => {
            return (
              <div
                key={index}
                className="p-5 bg-white rounded-lg shadow-lg w-full md:w-3/4"
              >
                <h1 className="text-2xl font-semibold ">{item.firstName}</h1>
                <h1 className="text-slate-500">{item.lastName}</h1>
              </div>
            );
          })}
        </div>
      )}

      {postSlice.loading === false && postSlice.error && (
        <div className="flex items-center justify-center bg-yellow-50 min-h-screen ">
          <h1>Error</h1>
        </div>
      )}
    </>
  );
};

export default ToolkitCrud;
