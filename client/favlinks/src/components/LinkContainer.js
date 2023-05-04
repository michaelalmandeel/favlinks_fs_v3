import { useEffect, useState } from 'react'
import Table from './Table'
import Form from './Form'
// import Form from './Form';

const LinkContainer = (props) => {

  const [favLinks,setFavLinks] = useState([])

  const deleteItem = (del_index) => 
  {
    let temp = []
    favLinks.map((item, index) => { if(index === del_index){}else{temp.push(item)}})
    setFavLinks(temp)
  }

  useEffect(() => {fetchLinks()},[]);

  const fetchLinks = async () => {
    let response = await (
      await fetch("http://localhost:8000/links")
    ).json();
    setFavLinks(response);
  };

  async function postLink(url = "", data = {})
  {
    try{
        const response = await fetch(url, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",},
          body: JSON.stringify(data),
        });
        return response.json();
      }catch(err){console.log(err)}
  }

  async function deleteLink(url = "")
  {
    try{
        const response = await fetch(url, {method: "DELETE",});
        return response;
       }catch(err){console.log(err)}
  }

  const _removeLink = (index) => {
     deleteLink("http://localhost:8000/links/"+(favLinks[index].id))
    .then( deleteItem(index) )
    .catch((err) => console.log(err)) 
 }

  const _handleSubmit = (favLink) => {
    postLink("http://localhost:8000/links",favLink)
    .then((res) => {setFavLinks(favLinks.concat([{name: favLink.name,url: favLink.url,id: res.id}]))})
    .catch((err) => console.log(err))
  }

  return (
    <div className="container" style={{margin: '20px'}}>
      <h1>My Favorite Links</h1>
      <p>Add a new url with a name and link to the table.</p>
      <Table linkData={favLinks} removeLink={_removeLink} />

      <br />

      <h3>Add New</h3>
      <Form handleSubmit={_handleSubmit}/>
    </div>
  )
}

export default LinkContainer
