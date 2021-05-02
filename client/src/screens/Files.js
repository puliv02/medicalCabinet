import React, { useState, useEffect } from 'react';
import { fetchFilesFromFolderId, deleteFile } from '../actions/file';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Layout, Menu, Button, List, Space, Tooltip, Modal } from 'antd';
import {
    DeleteOutlined,
    FileOutlined,
    DownloadOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Files = () => {

    let history = useHistory();
    const folderId = history.location.state ? history.location.state.folderId : '';

    const token = JSON.parse(window.localStorage.getItem('user')).token
    const [fileNamesList, setFileNamesList] = useState([]);
    const [render, setRender] = useState(false);

    const loadFiles = async () => {
        const files = await fetchFilesFromFolderId(folderId);
        const fileData = files.data[0].files;
        fileData.map((file, index) => {
            fileNamesList.push({
                title: file.name,
                fileid: file._id,
                fileCategory: file.fileType,
                fileData: file.file.data,
                contentType: file.file.Type
            })
        })
        setRender(true)
    }

    useEffect(() => {
        loadFiles();
    }, []);

    //view file
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
            const type = file.title + "." + temp[temp.length - 1]
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

    //delete file
    const deleteFileItem = async (file) => {
        try {
            setFileNamesList(fileNamesList.filter(item => item.fileid != file.fileid))
            const test = await deleteFile(folderId, file.fileid)
            console.log(test.data)
            toast.success("File has been deleted"); // toast messages can be commented out
        }
        catch (err) {
            console.log(err);
            toast.error("File was not deleted")
        }
    }

    return (

        <Layout>
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1" >Files</Menu.Item>

            </Menu>
            <Layout style={{ minHeight: '100vh' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                </Menu>
                <Layout style={{ padding: '0 24px 24px' }}>
                    < Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 600 }}>
                        {render && <List
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
                                            <Button type="primary" onClick={() => deleteFileItem(item)}>
                                                <DeleteOutlined />
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
    );
};

export default Files;

