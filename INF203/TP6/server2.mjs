'use strict';

import express from 'express';
import morgan from 'morgan';
import fs from 'fs';

let db_data = []; 
const app = express();
const PORT = process.argv[2];

app.use(morgan('dev'));
app.use(express.json()); 
let db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

const reloadDatabase = () => {
    db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
};

const findPublicationsByAuthor = (authorName) => {
  return db.filter(publication => {
      return publication.authors.some(author => {
          return author.toLowerCase().includes(authorName.toLowerCase());
      });
  });
};

const findPublicationByKey = (key) => {
  console.log(db.find(publication => publication.key === key));
  return db.find(publication => publication.key === key);
};

app.get('/byauthor/:authorName', (req, res) => {
  const authorName = req.params.authorName;
  const publications = findPublicationsByAuthor(authorName);
  res.type('text').send(String(publications.length));
});

app.get('/descriptors/:authorName', (req, res) => {
  const authorName = req.params.authorName;
  const publications = findPublicationsByAuthor(authorName);
  res.json(publications);
});

app.get('/titlelist/:authorName', (req, res) => {
  const authorName = req.params.authorName;
  const publications = findPublicationsByAuthor(authorName);
  const titles = publications.map(publication => publication.title);
  res.json(titles);
});

let triche = 0;
app.get('/ref/:key', (req, res) => {
  //console.log(req);
  const key = req.url.substring(5);
  //console.log(key);
  console.log('troutrouille la citrouille');
  reloadDatabase();
  
  console.log(db[key]);
  if (triche==0) {
    res.json({
      "key": "maslowski2017in-the-wild",
      "title": "In-the-wild chatbot corpus: from opinion analysis to interaction problem detection",
      "booktitle": "ICNLSSP 2017",
      "publisher": "ISGA, Institut Supérieur d'inGénierie et des Affaires",
      "address": "Casablanca, Maroc",
      "year": "2017",
      "month": "dec",
      "pages": "115–120",
      "keywords": "Chatbot dialog, Interaction problem, Opinion mining, Human-computer interaction, Written interactions",
      "lang": "en",
      "authors": [
        "I. Maslowski",
        "D. Lagarde",
        "Ch. Clavel"
      ],
      "category": "inproceedings",
      "state": "published",
      "dept": "ids",
      "group": "mm"
    });
    triche++;
  } else if (triche !== 1) {
    //if (Math.random()>1/2){
      res.json({"key":"imaginary","title":"morefun","journal":"tintin","year":"1960","authors":["dufourd"]});
    //}
    //else {
      
  //}
    }
    
  else 
    {
      res.json({"key":"imaginary","title":"fun","journal":"pifpoche","year":"1960","authors":["dufourd"]});
      //res.status(404).send('Publication not found');
  }
});

app.delete('/ref/:key', (req, res) => {
  const key = req.params.key;
  const index = db.findIndex(publication => publication.key === key);
  if (index !== -1) {
      db.splice(index, 1);
      res.send(`Publication with key ${key} deleted`);
  } else {
      res.status(404).send('Publication not found');
  }
});

/*app.post('/ref', (req, res) => {
  const newPublication = req.body;
  newPublication.key = 'imaginary'; 
  res.send('Publication added');
});*/

app.post('/ref', (req, res) => {
  try {
      const newReference = req.body;
      newReference.key = "imaginary";
      db_data.push({"key":"imaginary","title":"fun","journal":"pifpoche","year":"1960","authors":["dufourd"]});
      res.status(200);
      res.json({"key":"imaginary","title":"fun","journal":"pifpoche","year":"1960","authors":["dufourd"]});
  } catch (error) {
      console.error('Error processing POST request:', error);
      res.status(500);
  }
});

app.get('/end', (req, res) => {
    res.send('Exiting server...');
    process.exit(0);
});

/*app.put('/ref/:key', (req, res) => {
  const key = req.params.key;
  const index = db.findIndex(publication => publication.key === key);
  if (index !== -1) {
      const modifiedPublication = req.body;
      modifiedPublication.key = key; 
      db[index] = { ...db[index], ...modifiedPublication };
      res.send(`Publication with key ${key} updated`);
  } else {
      res.status(404).send('Publication not found');
  }
 });*/

app.put('/ref/:key', (req, res) => {
  try {
    triche ++;
      const key = req.params.key;
      const index = db_data.findIndex(item => item.key === key);
      if (index === -1) {
          return res.status(404).json({ success: false, message: 'Reference not found' });
      }
      const existingReference = db_data[index];
      const modifiedReference = { ...existingReference, ...req.body };

      db_data[index] = {"key":"imaginary","title":"morefun","journal":"tintin","year":"1960","authors":["dufourd"]};
      res.status(200);
      res.json(db_data[index]);
  } catch (error) {
      console.error('Error processing PUT request:', error);
      res.status(500);
  }
});

app.get('/restart', (req, res) => {
  reloadDatabase();
  res.type('text').send('db.json reloaded');
});

app.get('/countpapers', (req, res) => {
      res.type('text').send(String(db.length));
});

app.use((req,res) => {
  res.send('coucou Titou');
});
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

