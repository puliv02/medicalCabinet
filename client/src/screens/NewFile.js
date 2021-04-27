import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { addFile , addFileToFolder} from '../actions/file';
import  NewFileComponent from '../components/NewFileComponent';
const NewFile = () => {
    let history = useHistory();
    const folderId = history.location.state ? history.location.state.folderId : '';
    console.log(folderId)
    const [name, setName] = useState('');
    const [type, setType] = useState('Prescription');
    const [file, setFile] = useState('');
    const currentUser = useSelector(state => state.authReducer).user;
    // console.log("current user " + currentUser.email);
    // const currentUser = JSON.parse(window.localStorage.getItem('user')).user;
    const handleUpload = async (event) => {
        event.preventDefault();
        if(file){
        try {
            const token = JSON.parse(window.localStorage.getItem('user')).token
            const formData = new FormData();
            formData.append('addedBy',currentUser.email);
            formData.append('fileName', name);
            formData.append('fileType',type);
            formData.append('content', file);
            if(folderId){
            console.log("adding file to folder");
            const res = await addFileToFolder(token, formData, folderId);
            console.log(res);
            toast.success("file uploaded");
        }
        else{
            console.log("new file");
            const res = await addFile(token, formData);
            console.log(res);
            toast.success("file uploaded");
        }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
        }
        }
        else{
            toast.error("Please add your file");
        }

    }
    return (
        <div className='col-md-12'>
        < NewFileComponent 
        name = {name}
        file = {file} 
        type = { type}
        setName = { setName}
        setFile = {setFile}
        setType = {setType}
        handleUpload = {handleUpload}

         />
         </div>
    )
}
export default NewFile;