import { Layout, Menu, Button, List, Space, Tooltip, Modal } from 'antd';
import { SnippetsOutlined, UserOutlined, NotificationOutlined, CloseOutlined, FileOutlined, DownloadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import NewFolder from '../components/NewFolder';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllFiles, deleteFile, deleteFolder } from '../actions/file';
import '../User.css';
import '../App.css';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const UserComponent = () => {

  let history = useHistory();
  const handleNewFile = (event) => {
    // setNewFile(event.target.value);
    history.push('/newFile')
  }
  const [state, setState] = useState(false)
  //const currentUser = useSelector(state => state.authReducer).user;
  const token = JSON.parse(window.localStorage.getItem('user')).token
  const email = JSON.parse(window.localStorage.getItem('user')).user.email

  const [folderNamesList, setFolderNamesList] = useState([]);
  const [fileNamesList, setFileNamesList] = useState([]);
  const [showFolder, setShowFolder] = useState(false);
  const [showFiles, setShowFiles] = useState(false);


  const loadFolders = async () => {
    const folderList = await getAllFiles(token, email);
    const folders = folderList.data;
    folders.map((folder, index) => {
      if (folder.folderName != undefined) {
        folderNamesList.push({ title: folder.folderName, description: folder.description, folderid: folder._id });
      }
    })
    console.log(folderNamesList)
  }

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFiles = async () => {
    const folderListTemp = await getAllFiles(token, email);
    const foldersTemp = folderListTemp.data;
    foldersTemp.map((folder, index) => {
      if (folder.files.length != 0) {
        const files = folder.files;
        files.map((file, index) => {
          fileNamesList.push({
            title: file.name,
            fileid: file._id,
            folderid: folder._id,
            fileCategory: file.fileType,
            fileData: file.file.data,
            contentType: file.file.Type
          })
        })
      }
    })
  }

  useEffect(() => {
    loadFiles();
  }, []);

  const openFile = (file) => {
    try {
      const buff = Buffer.from(file.fileData.data);
      const blob = new Blob([buff],
        { type: file.contentType });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank', 'location=yes,height=650,width=1000,scrollbars=yes,status=yes');
    }
    catch (err) {
      console.log(err);
    }
  }

  //download file
  const downloadFile = (file) => {
    try {
      const buff = Buffer.from(file.fileData.data);
      const temp = file.contentType.split('/')
      const type = file.title+"."+temp[temp.length-1]
      const blob = new Blob([buff],
        { type: file.contentType });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute(
        'download',
        `${type}`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
    catch (err) {
      console.log(err);
    }
  }

  const deleteFileItem = async (file) => {
    try {
      setFileNamesList(fileNamesList.filter(item => item.fileid != file.fileid))
      const test = await deleteFile(file.folderid, file.fileid)
      console.log(test.data)
      toast.success("File has been deleted"); // toast messages can be commented out
    }
    catch (err) {
      console.log(err);
      toast.error("File was not deleted")
    }
  }

  const deleteFolderItem = async (folder) => {

    try {
      setFolderNamesList(folderNamesList.filter(item => item.folderid != folder.folderid))
      const test = await deleteFolder(folder.folderid);
      console.log(test.data)
      setFileNamesList(fileNamesList.filter(item => item.folderid != folder.folderid))
      toast.success("Folder has been deleted"); // toast messages can be commented out
    }
    catch (err) {
      console.log(err);
      toast.error("Folder was not deleted")
    }
  }

  return (
    <>

      <Layout>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}>
          <Menu.Item key="1" onClick={() => { setShowFolder(false); setShowFiles(false) }}>My Profile</Menu.Item>
          <Menu.Item key="2" onClick={() => { setShowFolder(true); setShowFiles(false) }}>My Folders</Menu.Item>
          <Menu.Item key="3" onClick={() => { setShowFolder(false); setShowFiles(true) }}>My Files</Menu.Item>
        </Menu>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<SnippetsOutlined />} title="Add">
                <Menu.Item key="1">
                  < NewFolder />
                </Menu.Item>
                <Menu.Item key="2">
                  <Button type="primary" onClick={handleNewFile}>
                    New File
                </Button>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<UserOutlined />} title="My Account">
                <Menu.Item key="5">Profile</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="Notifications">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            < Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 600 }}>
              {showFolder && <List
                itemLayout="horizontal"
                dataSource={folderNamesList}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<a href="#">{item.title}</a>}
                      description={item.description}
                    />
                    <Tooltip title="Delete the folder">
                      <Button type="primary" onClick={()=>deleteFolderItem(item)}> 
                        <CloseOutlined />
                      </Button>
                    </Tooltip>
                  </List.Item>
                )}
              />}
              {showFiles && <List
                itemLayout="horizontal"
                dataSource={fileNamesList}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.fileCategory}
                    />
                    <Space>
                      <Tooltip title="Click to download the file">
                        <Button onClick={() => downloadFile(item)} >
                          <DownloadOutlined />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Click to view the file">
                        <Button onClick={() => openFile(item)}>
                          <FileOutlined />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete the file">
                        <Button type="primary" onClick={()=>deleteFileItem(item)}>
                          <CloseOutlined />
                        </Button>
                      </Tooltip>
                    </Space>
                  </List.Item>
                )}
              />}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default UserComponent;