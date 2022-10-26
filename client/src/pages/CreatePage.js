import React, {useContext, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const CreatePage = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const {request} = useHttp()
  const [link, setLink] = useState('')

  const pressHandler = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        navigate(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            id="link"
            type="text"
            className="validate"
            onChange={e => setLink(e.target.value)}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Write the link</label>
        </div>
      </div>
    </div>
  )
}