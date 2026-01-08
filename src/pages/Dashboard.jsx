import { useEffect, useState } from 'react';
import API from '../api/axios';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const res = await API.get('/files');
    setFiles(res.data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const uploadFile = async (e) => {
    const fd = new FormData();
    fd.append('file', e.target.files[0]);
    await API.post('/files/upload', fd);
    loadFiles();
  };

  const deleteFile = async (id) => {
    await API.delete(`/files/${id}`);
    loadFiles();
  };

  const logout = () => {
    localStorage.clear();
    window.location = '/login';
  };

  return (
    <div className="dashboard">
      <div className="topbar">
        <h2>📁 My Drive</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="file-card">
        <input type="file" onChange={uploadFile} />
      </div>

      {files.map(file => (
        <div className="file-card" key={file._id}>
          <span>{file.filename}</span>
          <div>
            <a
              href={`http://localhost:5000/${file.path}`}
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>
            <button onClick={() => deleteFile(file._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
