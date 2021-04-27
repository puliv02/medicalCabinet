import { Modal, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {  addFolder } from '../actions/file';
import { useSelector } from 'react-redux';
const NewFolder = () =>{
    const currentUser = useSelector(state => state.authReducer).user;
    const [folderName, setFolderName] = useState('Untitled Folder');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [description, setDescription] = useState('');
    let history = useHistory();
  
    const onChangeFolderName = (event) => {
      setFolderName(event.target.value);
    }
    const onChangeDescription = (event) => {
        setDescription(event.target.value);
      }
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = async() => {
      if (folderName) {
        setIsModalVisible(false);
        const token = JSON.parse(window.localStorage.getItem('user')).token;
        // const currentUser = JSON.parse(window.localStorage.getItem('user')).user;
        const res = await addFolder(token, {
          addedBy: currentUser.email,
          folderName: folderName,
          description: description
          // files: [{
          //     name: name,
          //     fileType: type,
          //     content: img.toString("base64")
          // }]
  
        });
        console.log(res);
        toast.success(`${folderName} created`);
        history.push({ pathname :'/newFile',
        state : {folderId : res.data}});
      }
      else {
        toast.error("Please enter folder name");
      }
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    return(
        <>
         <Button type="primary" onClick={showModal}>
                  New Folder
                </Button>
                <Modal title="Create Folder" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <div className='form-group' style={{ display: "flex"}}>
                    <label htmlFor="Folder Name">Folder Name</label>
                    <input
                      type='text'
                      className='form-control'
                      name='FolderName'
                      value={folderName}
                      onChange={onChangeFolderName}
                    />
                  </div>
                  <div className='form-group' style={{ display: "flex"}}>
                    <label htmlFor="Description">Folder Description</label>
                    <input
                      type='textarea'
                      className='form-control'
                      name='Description'
                      value={description}
                      onChange={onChangeDescription}
                    />
                  </div>
                </Modal>
        </>
    )
}

export default NewFolder ;