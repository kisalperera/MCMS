const router = require('express').Router();
let stock = require('../models/stock.model');


router.route('/addstock').post((req,res) => {
    const item_name = req.body.item_name;
    const stock_date = req.body.stock_date;
    const manufacture_date = req.body.manufacture_date;
    const expire_date = req.body.expire_date;
    const units = req.body.units;
    const supplier = req.body.supplier;


    const newstock = new stock({
        item_name,
        stock_date,
        manufacture_date,
        expire_date,
        units,
        supplier
    });
    newstock.save()
    .then(() => res.json(newstock._id))
    .catch(err => res.status(400).json('error:' + err));
});


router.route('/getstock/:value').get((req,res)=>{
    stock.find({item_name:req.params.value})
    .then(stock=>res.json(stock) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

// router.route('/getstockByDose').post((req,res)=>{
//     stock.find({item_name:req.params.item_name}&&{dose:req.params.dose})
//     .then(stock=>res.json(stock) )
//     .catch(err=>res.status(400).json('Error: '+err));
// })

router.route('/getstockunits').post((req,res)=>{
    stock.find({item_name:req.body.item_name})
    .then(stock=>{
        stock.map(item=>item.units)
        var x=0;
        for(let i=0;i<stock.length;i++){
            x=x+Number(stock[i].units);
        }        
        res.json(x) 
    })
    
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/orderStocks/:value').get((req,res)=>{
    stock.find({item_name:req.params.value}).sort(
        {stock_date:+1}
    )
    .then(stock=>res.json(stock) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/reduce/:id').post((req,res)=>{
    stock.findById(req.params.id)
    .then(stock=>{
        stock.units = 0;
        stock.save()
        .then(()=>res.json(stock))
        .catch(err=>res.status(400).json('Error:' +err)); 
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/reduceByNum/:id').post((req,res)=>{
    stock.findById(req.params.id)
    .then(stock=>{
        stock.units = Number(stock.units)-Number(req.body.units);
        stock.save()
        .then(()=>res.json(stock))
        .catch(err=>res.status(400).json('Error:' +err)); 
    })
    .catch(err=>res.status(400).json('Error: '+err));
})



module.exports = router;