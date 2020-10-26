import React, { useContext } from 'react'
import { db } from '../firebase'
import { useFetch } from './useFetch'
import firebase from 'firebase'
import { UserContext } from '../Contexts/UserContext'

function SubmitNewPaper({doi, username, postID, researchGroupID, setSubmitNewPaperDisplay}) {

    const user = useContext(UserContext)

    const [description, setDescription] = useState('')

    const url = `http://api.crossref.org/works/${doi}`

    const data = useFetch(url)

    const submitPaper = (e) => {
        e.preventDefault();

        const regex = RegExp("10.\\d{4,9}/[-._;()/:a-z0-9A-Z]+")
        if(regex.test(doi.trim()) === true){
            
            if(title && doi && description){
    
              const paper = {
                title,
                doi,
                description, 
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              }  
    
              db.collection('researchgroups').doc(researchGroupID)
              .collection('posts')
              .doc(postID)
              .collection('papers')
              .add(paper)
              .then((docRef) => {
                  console.log(docRef.id)
                const paperID = docRef.id
                return paperID
              })
              .then((paperID) => {
                db.collection('users').doc(username)
                  .collection('posts')
                  .doc(postID)
                  .collection('papers')
                  .doc(paperID)
                  .set(paper)
              }).then(() => {
                setAddPaperDisplay(false)
              }).catch((err) => {
                  console.log('Document failed to upload:', err)
              })                    
            }
        }  
    }

    return (
        <div>
            <Card style={{backgroundColor: '#009DDC', marginBottom: '20px', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h5 style={{marginTop: '5px'}}>Add Paper</h5>
            <h5>{data.message.title}</h5>
            <form autoComplete='off' style={{display: 'flex', flexDirection: 'column', width: '100%'}}>

                <FormControl variant="outlined">
                    
                    <TextField value={ description } onChange={(e) => setDescription(e.target.value)} label="Description" style={inputStyle}/>
                </FormControl>
                <Button onClick={ submitPaper } style={{color: '#FFF', backgroundColor: '#0582b3', margin: '25px 0'}}>Submit</Button>
            </form>
            
            <button onClick={ handleClose } style={{marginBottom: '3px', outline: 'none', border: 'none', backgroundColor: '#009DDC', color: '#FFF', cursor: 'pointer'}}>close</button>
        </Card>
            
        </div>
    )
}

export default SubmitNewPaper
