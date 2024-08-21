import logo from './logo.svg';
import './App.css';
import getData from './Services/GetQuestData';
import {useEffect, useState} from 'react'
import NodeMap from './Map/NodeMap';

function App() {


  const [quests,setQuests] = useState({})
  const [nodes,setNodes] = useState([{id:"Impressing the Locals"}])
  const [links,setLinks] = useState([])

  const loadInData = (data) =>{
    const tempNodes = [...nodes]
    const tempLinks = [...links]
    Object.keys(data).forEach(quest => {
      if(!tempNodes.some(i=>i.id === quest)){
        tempNodes.push({
          id:quest
        })
      }
      
      const questReqs = data[quest].Quests[0]
      questReqs.forEach(q=>{
        tempLinks.push({
          source:q,
          target:quest
        })
        if(!tempNodes.some(i=>i.id === q)){
          tempNodes.push({
            id:q
          })
        }
      })
      
    });
    setNodes(tempNodes)
    setLinks(tempLinks)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      console.log("My data is: ",data)
      setQuests(data);
      loadInData(data)
    };
    fetchData();
  }, []);

  /*
    const nodes = [
      { id: 'Quest1' },
      { id: 'Quest2' },
      { id: 'Quest3' }
    ];

  const links = [
      { source: 'Quest1', target: 'Quest2' },
      { source: 'Quest2', target: 'Quest3' }
  ];
  */
  return (
    <NodeMap nodes={nodes} links={links}/>
  )
}

export default App;
