
import { Link } from "react-router-dom";


const Main = ()=>{
    return (
        <>
           <div className="bg-amber-50 min-h-screen flex items-center justify-center  gap-8">
             <div>
             <h1 className="text-5xl mb-4">React Crud Application </h1>
             <p>Use Dummy Json fake data according to given Apis</p>
             <p>You can use examples below to check how DummyJSON works.</p>
              <p>
            Adding a new user will not add it into the server./Updating a user
            will not update it into the server.
          </p>
          <p> Deleting a user will not delete it into the server.</p>
          
                <div className="mt-5 flex flex-row gap-8 justify-between">
                <div>
                    <button className="bg-purple-600 text-white rounded-lg shadow-lg p-3">
                        <Link to="/redux-crud">Redux Demo</Link>
                    </button>
                 </div>

               <div>
               <button className="bg-purple-600 text-white p-3 rounded-lg shadow-lg">
                    <Link to="/react-crud">Complete Crud Demo</Link>
                </button>
               </div>
                </div>
                </div>
           </div>
     
        </>
    );
}

export default Main;