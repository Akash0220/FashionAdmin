const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8000;
const db = require('./models/index');

app.use(express.json());
app.use('/static', express.static('static'));


app.get('/',(req,res)=>{
    db.Products.find()
        .then((products)=>{
            res.render("index.ejs",{productsArray:products});
        })
        .catch((err)=>{
            res.render("index.ejs",{errMsg:'Products Not Found!'});
        })
});

//***********PRODUCTS MANAGEMENT APIs***************/
app.get('/products',(req,res)=>{

    db.Products.find()
        .then((products)=>{
            res.send({productsArray:products});
        })
        .catch((err)=>{
            res.send({errMsg:'Products Not Found!'});
        })

})

app.get('/products/addproduct',(req,res)=>{
    res.render("addproduct.ejs");
})

app.post('/products/addproduct',(req,res)=>{
    const product = req.body.product;
    db.Products.insertMany(product)
    .then((productss)=>{
        res.json(productss);
    })
    .catch((err)=>{
        res.json({
            msg:err
        })
    })
}) 

app.put('/products/updateproduct',(req,res)=>{

    const id = req.body.pid;
    const updatedProduct = req.body.updatedProduct;
    db.Products.findByIdAndUpdate(id,updatedProduct)
    .then((product)=>{
        console.log(product);
        res.send({msg: product});
    }).catch((err)=>{
        console.log(product);
        res.send({msg: product});
    })
});

//***********USERS MANAGEMENT APIs***************/
app.get('/users',(req,res)=>{
    db.Users.find()
    .then((users)=>{
        res.send({UsersArray:users});
    })
    .catch((err)=>{
        res.send({errMsg:'Users Not Found!'});
    })
})

app.post('/users/adduser',(req,res)=>{
    const user = req.body.userInfo;
    console.log(user);
    db.Users.insertMany(user)
    .then((userInfo)=>{
        res.json(userInfo);
    })
    .catch((err)=>{
        res.json({
            msg:err
        })
    })
    
}) 

app.put('/users/updateuser',(req,res)=>{

    const id = req.body.uid;
    const userInfo = req.body.userInfo;
    db.Users.findByIdAndUpdate(id,userInfo)
    .then((user)=>{
        db.Users.find({_id:id})
        .then((userInfo)=>{
            console.log(userInfo);
            res.send({UsersInfo:userInfo});
        })
        .catch((err)=>{
            res.send({errMsg:'Users Not Found!'});
        })

    }).catch((err)=>{
        console.log(err);
        res.send({msg: err});
    })
});

//***********ORDERS MANAGEMENT APIs***************/
app.get('/orders',(req,res)=>{
    res.send('Orders mamagement page');
})

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
});