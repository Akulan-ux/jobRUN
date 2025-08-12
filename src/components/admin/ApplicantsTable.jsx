import React from 'react'
import { useSelector } from 'react-redux';

import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constant';



const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application || { applicants: { applications: [] } });
  const statusHandler = async (status, id) => {
    console.log('called');
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      console.log(res);
      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <caption>A list of your recent Applicants</caption>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>FullName</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Contact</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Resume</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Date</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            applicants && applicants?.applications?.map((item) => (
              <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{item?.applicant?.fullname}</td>
                <td style={{ padding: '8px' }}>{item?.applicant?.email}</td>
                <td style={{ padding: '8px' }}>{item?.applicant?.phoneNumber}</td>
                <td style={{ padding: '8px' }}>
                  {
                    item.applicant?.profile?.resume ?
                      <a
                        style={{ color: '#2563eb', cursor: 'pointer' }}
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item?.applicant?.profile?.resumeOriginalName}
                      </a> :
                      <span>NA</span>
                  }
                </td>
                <td style={{ padding: '8px' }}>{item?.applicant.createdAt.split("T")[0]}</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      onClick={(e) => {
                        const menu = e.currentTarget.nextSibling;
                        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                      }}
                    >
                      ⋮
                    </button>
                    <div
                      style={{
                        display: 'none',
                        position: 'absolute',
                        right: 0,
                        backgroundColor: '#f9f9f9', 
                        color: '#333', 
                        minWidth: '120px',
                        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                        zIndex: 1,
                        borderRadius: '4px',
                        padding: '8px'
                      }}
                    >
                      {
                        shortlistingStatus.map((status, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '4px',
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                statusHandler(status, item?._id);
                                const menus = document.querySelectorAll('.dropdown-menu');
                                menus.forEach(menu => menu.style.display = 'none');
                              }}
                            >
                              <span>{status}</span>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ApplicantsTable;