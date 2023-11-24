import { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const[files,setFiles] = useState(null)
  const[progress,setProgress] = useState({started:false,pc:0})
  const[msg,setMsg] = useState(null)


  function onClickhandler(){
if(!files){
  setMsg("No File Selected")
  // console.log("No File Selected");
  return;
}
const fd=new FormData();
// fd.append('file',files)
for(let i=0;i<files.length;i++){
fd.append(`file${i+1}`, files[i])
}
setMsg("File is Been Uploading")
setProgress(prevState => {
return{...prevState,started:true}
})
// Fetch
fetch("http://httpbin.org/post",{
  method:"Post",
body:fd,
headers:{
  "Custom-Header":"value"
}
})
.then(res => {
if(!res.ok){
  throw new Error("Error")
}
setMsg("Uploaded Sucessfully")
return(res.json());
})
.then(data =>{
  console.log(data);
})
.catch(err =>{
  setMsg("Upload Fail")
  console.error(err)})
  }
// axios.post("http://httpbin.org/post",fd,{
//   onUploadProgress: (progressEvent) =>{setProgress(prevState =>{
//     return{...prevState,pc:progressEvent.progress*100}
//   });},
// headers:{
//   "Custom-Header":"value"
// }
// })
// .then(res => {
//   setMsg("Uploaded")
//   console.log(res.data,"data")})
// .catch(err =>{
//   setMsg("Upload Fail")
//   console.error(err)})
//   }
  return (
    <div className='App'>
      <h1>Uploading Files</h1>
<input onChange={(e) =>{setFiles(e.target.files[0])}} type='file' multiple/>

      <button onClick={onClickhandler}>upload</button>

      {/* progressbar */}
      {/* {progress.started &&<progress max={"100"} value={progress.pc}></progress>} */}
      {msg && <span>{msg}</span>}
    </div>
  )
}

export default App;
