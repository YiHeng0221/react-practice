import styled from 'styled-components'
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

const apiUrl = 'https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc'
const Page = styled.div`
  margin: 2% auto;
  max-width: 650px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const MessageTitle = styled.h1`
  align-self: center;
`


const MessageFrom = styled.form`
  padding: 20px 20px;
  background: white;
  width: 100%;
  box-shadow: 1px 1px 5px #e8e8e8;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 30px;
`
const MessageUsernameInput = styled.input`
  border: 1px solid #c2dffb;
  box-sizing: border-box; 
  border-radius: 5px;
  background: lightgrey;
  margin-bottom: 2em;
  height:2em;
  :focus {
    outline-style: none;
    background: white;
  }
`
const MessageTextArea = styled.textarea`
  width: 100%; 
  min-height: 10em;
  padding: 10px;
  border: 1px solid #c2dffb;
  box-sizing: border-box; 
  border-radius: 5px;
  background: lightgrey;
  :focus{
    outline-style: none;
    background: white;
  }
`

const MessageSubmitButton = styled.input`
  padding: 10px 30px;
  border: 1px solid #c2dffb;
  background: white;
  width: 100%;
  border-radius: 5px;
  color: black;
  font-size: 16px;
  transition: all 0.3s;
  text-decoration: none;
  margin-top: 2em;
  :hover {
    background: #c2dffb;
    cursor: pointer;
  }
`
const MessageWrapper = styled.div``
const Message = styled.div`
  position: relative;
  background: white;
  width: 100%;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 1px 1px 3px #e8e8e8;
  border-radius: 15px;
  min-height: 70px;
  display: flex;
  padding: 15px 15px;
  word-break: break-all;
  //justify-content: space-between;
`
// const MessageCard = styled.div`
//   display: flex;
// `
const MessageBody = styled.div`
  margin-left: 20px;
  overflow-wrap: anywhere;
  max-width: 500px;
`

const MessageAvatar = styled.div`
  min-width: 50px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: #e4f0fb;
`
const MessageUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 250px;
`
const MessageNickname = styled.span`
  color: black;
  font-weight: bold;
  overflow: hidden;
`

const MessageUsername  = styled.span`
  color: #a0a0a0;
`
const MessageInfo = styled.div`
  display: flex;
  width: 100%;
`

const MessageDate = styled.span`
  color: #a0a0a0;
  margin-left: 20px;
  line-height: 3;
`

const MessageContent = styled.p`
  margin-top: 20px;
  max-width: 100%;
  white-space: break-spaces;
`

// const MessageDelete = styled.div`
  
//   display: flex;
//   align-self: right;
//   margin-right: 2em;
//   color: grey;
//   font-size: 1em;
// `

const ErrorMessage = styled.div`
  margin: 2em;
  color: red;
`
const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  color: white;
  display: flex;
  align-item: center;
  justify-content: center;
`

function MessageList({
  username, timestamp, content, 
  //handleDelete
}) {
  // const handleDeleteMessage = () =>(
  //   handleDelete
  // )
  return(
    <Message> 
      {/* <MessageCard> */}
        <MessageAvatar>
        </MessageAvatar>
        <MessageBody>  
          <MessageInfo> 
            <MessageUserInfo>
              <MessageNickname>
                {username}
              </MessageNickname>
              <MessageUsername>
                {username}
              </MessageUsername>
            </MessageUserInfo>
            <MessageDate>
              {timestamp}
            </MessageDate>
          </MessageInfo>
          <MessageContent>
            {content}
          </MessageContent>
        </MessageBody>
      {/* </MessageCard> */}
      {/* <MessageDelete onClick={handleDeleteMessage} >X</MessageDelete> */}
    </Message>
  )
}

Message.propTypes = {
  username: PropTypes.string,
  timestamp: PropTypes.string,
  content: PropTypes.node
}
function App() {
  const [messages, setMessages] = useState(null)
  const [MessageApiErr, setMessageApiErr] = useState(null)
  const [value, setValue] = useState();
  const [username, setUsername] = useState();
  const [createMessageErr, setCreateMessageErr] = useState(null)
  // avoid the unlimited submit
  const [isLoading, setIsLoading] = useState(false)
  

  // comment value
  const handleTextAreaChange = e => {
    setValue(e.target.value)
  }

  // username value
  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handleInputFocus = (e) => {
    setCreateMessageErr(null)
  }

  // const handleDelete = () => {
  //   alert('s')
    // fetch('https://student-json-api.lidemy.me/comments', {
    //   method: 'DELETE',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     nickname: username,
    //     body: value
    //   })
    // })
    // .then(res => res.json())
    // .then(data => {
    //   setIsLoading(false)
    //   if(!data.ok) {
    //     setCreateMessageErr(data.message)
    //   }
    //   fetchMessages()
    // }).catch(err => {
    //   setIsLoading(false)
    // })
  //}
  


  // fetch message api
  const fetchMessages = () => {
    return fetch(apiUrl)
    .then(res=>res.json())
    .then((data)=>{
      setMessages(data)
    })
    .catch(err=>{
      setMessageApiErr(err.message)
    })
  }

  // send new comment submit
  const handleFormSubmit = e => {
    e.preventDefault();
    if (isLoading) {
      return
    }
    setIsLoading(true)
    fetch('https://student-json-api.lidemy.me/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        nickname: username,
        body: value
      })
    })
    .then(res => res.json())
    .then(data => {
      setIsLoading(false)
      if(!data.ok) {
        setCreateMessageErr(data.message)
      }
      setValue('')
      setUsername('')
      fetchMessages()
    }).catch(err => {
      setIsLoading(false)
    })
  }
  useEffect(()=>{
    fetchMessages()
  },[])
  return (
    <Page>
      {
        isLoading && <Loading><h1>Loading...</h1></Loading>
      }
      <MessageTitle>留言板</MessageTitle>
      <MessageFrom  onSubmit={handleFormSubmit}>
        Enter Your Name: <br />
        <MessageUsernameInput 
        value={username} 
        onChange={handleUsernameChange} 
        onFocus={handleInputFocus} />
        <br />
        Enter Your Comment: <br />
        <MessageTextArea
        value={value}
        onChange={handleTextAreaChange}
        onFocus={handleInputFocus}
        rows="10" />
        {createMessageErr && <ErrorMessage>Your username or comment is empty!</ErrorMessage>}
        <MessageSubmitButton type="submit"/>
      </MessageFrom>
      {MessageApiErr  && (
      <ErrorMessage>
        Something went wrong.<br />
        {MessageApiErr.toString()}
      </ErrorMessage>)}
      {messages && messages.length === 0 && <h1>目前沒有留言，快來新增吧！</h1>}
      <MessageWrapper>
        {
          messages && messages.map(message => (
            <MessageList 
            key={message.id} 
            username={message.nickname} 
            timestamp={new Date(message.createdAt).toLocaleString()} 
            content={message.body}
            >
            </MessageList>
          ))
        }
      </MessageWrapper>
      
    </Page>
  );
}

export default App;
