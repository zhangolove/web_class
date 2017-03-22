
const repo = [{id: 1,author: 'a', text:"A post"},
                {id: 2, author: 'b',text:"A post1"},
                {id: 3, author: 'c', text:"A post2"}]

const addArticle = (req, res) => {
     const newArticle = {
     	  id: repo.length + 1,
          author: req.body["author"],
          text: req.body["text"],
     }  
     repo.push(newArticle)
     res.send({articles:[newArticle]})
}



const getArticles= (req,res)=>{
     const id = req.params.id
     if (!id) {
          res.send(articles)
     } else {
          res.send({articles: repo.filter(i => {i.id == id})})
     }
}

module.exports = app => {
     app.post('/article', addArticle)
     app.get('/articles/:id*?', getArticles)
}
