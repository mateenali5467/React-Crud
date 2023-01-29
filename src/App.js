
import { BrowserRouter,Routes,Route } from 'react-router-dom';


import CrudApp from './component/React-Crud';
import Main from './component/Main';
import ToolkitCrud from './component/toolkit-crud';

function App() {
  return (
   <>
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Main />} />
         <Route path="/react-crud" element={ <CrudApp />} />
         <Route path="/redux-crud" element={ <ToolkitCrud />} />
       </Routes>
     </BrowserRouter>
   </>
  );
}

export default App;
