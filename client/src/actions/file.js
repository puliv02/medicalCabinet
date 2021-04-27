import axios from 'axios'
export const addFile = async(token, data) =>{
    // console.log(data.getAll('addedBy'))
    const res = await axios.post(`http://localhost:5000/api/files/newFile`, data,
    {
        headers:{
            Authorization: `Bearer ${token}`        
        }
    });
    return res ;
}
export const addFileToFolder = async(token, data, params) =>{
    // console.log(data.getAll('addedBy'))
    const res = await axios.post(`http://localhost:5000/api/files/addFile/${params}`, data,
    {
        headers:{
            Authorization: `Bearer ${token}`        
        }
    });
    return res ;
}

export const addFolder = async(token, data) =>{
    // console.log(data)
    const res = await axios.post('http://localhost:5000/api/files/newFolder', data,
    {
        headers:{
            Authorization: `Bearer ${token}`        
        }
    });
    return res ;
}

export const getAllFiles = async(token, addedBy) =>{
    const res = await axios.get(`http://localhost:5000/api/files/getallfiles/${addedBy}`,
    {
        headers:{
            Authorization: `Bearer ${token}`        
        }

    });
    return res ;
}