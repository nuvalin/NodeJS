const http = require('http')
const fs = require('fs')
const homePage = fs.readFileSync('index.html')
const aboutPage = fs.readFileSync('about.html')
const contactPage = fs.readFileSync('contact.html')
const notFoundPage = fs.readFileSync('notfound.html')

const server = http.createServer((req, res) => {
    if (req.url === '/about')
        res.end('The about page')
    else if (req.url === '/contact')
        res.end('The contact page')
    else if (req.url === '/')
        res.end('The home page')
    else {
        res.writeHead(404)
        res.end('page not found')
    }
})
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))

app.get('/',(req,res)=>{ 
    res.sendFile(path.resolve(__dirname,'index.html'))
   })

   app.get('/about',(req,res)=>{ // called when request to /about comes in
    res.sendFile(path.resolve(__dirname,'about.html'))
   })
   app.get('/contact',(req,res)=>{ //called when request to /contact comes
    res.sendFile(path.resolve(__dirname,'contact.html'))
   })
   
app.use(express.static('public'))

app.listen(3000, () => {
    console.log("App listening on port 3000")
})
app.get('/', (req, res) => {
    res.json({
        name: 'Greg Lim'
    })
    
})

