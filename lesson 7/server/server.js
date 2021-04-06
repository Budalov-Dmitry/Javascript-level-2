const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');


const app = express();

app.listen(3000, () => {
    console.log('server is running on port 3000');
});


app.use(express.static('../dist'));

app.get('/data', (req, res) => {
    fs.readFile('./goodslist.json', 'utf-8', (err, data) => {
        if(!err) {
            res.setHeader('Content-Type', 'Application/json');
            res.end(data);
        } else {
            console.log(err);
            end(JSON.stringify(err));
        }
    })
});

app.post('/data', bodyParser.json(), (req, res) => {
    fs.readFile('./goodslist.json', 'utf-8', (err, data) => {
       if(!err) {
           const goods = JSON.parse(data);

           const id = goods.reduce((acc, good) => acc > good.id ? acc : good.id, 0) + 1;

           goods.push({
             id: id,
             title: req.body.title,
             price: req.body.price
           });

           fs.writeFile('./goodslist.json', JSON.stringify(goods), (err) => {
                if(!err) {
                    res.end();
                }  else {
                    console.log(err);
                    end(JSON.stringify(err));
                }
           });

        } else {
            console.log(err);
            end(JSON.stringify(err));
        }
    })
});


app.get('/cart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if(!err) {
            res.setHeader('Content-Type', 'Application/json');
            res.end(data);
        } else {
            console.log(err);
            end(JSON.stringify(err));
        }
    })
});


app.post('/cart', bodyParser.json(), (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if(!err) {

            const goods = req.body;

           fs.writeFile('./cart.json', JSON.stringify(goods), (err) => {
                if(!err) {

                    res.end();
                }  else {
                    console.log(err);
                    end(JSON.stringify(err));
                }
           });

        } else {
             console.log(err);
             end(JSON.stringify(err));
         }
    })
});

app.post('/statistic', bodyParser.json(), (req, res) => {
    fs.readFile('./statistic.json', 'utf-8', (err, data) => {
        if(!err) {

            const stat = JSON.parse(data);
            
            stat.push(req.body);

           fs.writeFile('./statistic.json', JSON.stringify(stat), (err) => {
                if(!err) {
                    res.end();
                }  else {
                    console.log(err);
                    end(JSON.stringify(err));
                }
           });

        } else {
             console.log(err);
             end(JSON.stringify(err));
         }
    })
});
