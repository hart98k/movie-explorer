import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app =express();
const port=4000;
const API_URL ="http://www.omdbapi.com/?i=tt3896198&apikey=b9cefec9";
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Search for a movie..." });
  });

app.get("/getmovie", async (req, res) => {
    const { id, movie } = req.query; // Access 'id' and 'movie' from the query string
   
  
    try {
      // Determine whether to search by ID or title
      const queryParam = id
        ? `i=${encodeURIComponent(id)}` // Search by ID
        : `s=${encodeURIComponent(movie)}`; // Search by movie name
  
      
      const url = `${API_URL}&${queryParam}`;
      const result = await axios.get(url);
      console.log(result);
      res.render("index.ejs", { content: JSON.stringify(result.data, null, 2) });
    } catch (error) {
     
      res.render("index.ejs", { content: JSON.stringify(error.response?.data || error.message) });
    }
  });
  
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});