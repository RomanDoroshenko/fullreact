import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/storagedb');

const articleSchema = {
  articleTitle: String,
  articleContent: String
};
const Article = mongoose.model('Article', articleSchema, 'articles');

const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({extended: false}));
app.use(express.static('dist'));

app.get('/', (req,res) => {
  Article.find((err, articleDocs) => {
    const ourArticles = articleDocs.map((articleItem) => {
      return `<h2>${articleItem.articleTitle}</h2>
                  <p>${articleItem.articleContent}</p>`
    }).join('<br/>');
  res.send(`<h1>Publishing app initial Application</h1>
              ${ourArticles}`);
  });
});

app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);

export default app;
