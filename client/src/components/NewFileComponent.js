import '../App.css';
const NewFileComponent=(props) =>{
    const { name, type, file, setName, setType, setFile, handleUpload} = {...props};
    const onChangefile = (event) => {
        setFile(event.target.files[0]);
    }
    const onChangeName = (event) => {
        setName(event.target.value)
    }
    const onChangeFileType = (event) => {
        setType(event.target.value)
    }
return(
    <div className="col-md-12">
        <br/>
    <h2 style={{ display: "flex", justifyContent: "center" }}>Add your file</h2>
    <div className="card card-container">
        <form onSubmit={handleUpload}>
            <div className='form-group' style={{ display: "flex", justifyContent: "left" }}>
                <label htmlFor="name">File Name</label>
                <input
                    type='text'
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={onChangeName} />
            </div>

            <div className='form-group' style={{ display: "flex", justifyContent: "left" }}>
                <label htmlFor="Type">Choose File Type</label>
                <select name='fileType' defaultValue={type} className='form-control' onChange={onChangeFileType}>
                    <option value='Prescription'>Prescription</option>
                    <option value='Report' > Report</option>
                </select>
            </div>
            <div className='form-group' style={{ display: "flex", justifyContent: "center" }}>
                <input type="file" name="file"  onChange={onChangefile} accept="image/*, .doc, .pdf" />
            </div>
            <div className="form-group" style={{ display: "flex", justifyContent: "center" }}>
                <button className="btn-header">Upload</button>
            </div>
        </form>
    </div>
</div>
)
}

export default NewFileComponent ;