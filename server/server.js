var express             = require('express');
var multipart           = require('connect-multiparty');
var bodyParser          = require('body-parser');
var uploadMiddleware    = multipart({ uploadDir:'./assets/images' });
var cors                = require('cors');
var gm                  = require('gm');
var app                 = express();

function customMiddleware(req, res, next){
 
    // add customVar parameter to req 
    req.customVar = 'my var';
    
    next();
    
}

exports.init = function(){
  
    // middleware cross origin requests
    app.use(cors());
    // middleware for parsing request body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(customMiddleware);
    
    // define post route for /upload 
    app.post('/upload', uploadMiddleware, function(req, res){
       
        var file = req.files.file; 
        var imageSize = req.body.imageSize;
        
        console.log(imageSize);
        
        var fileNameParts = file.path.split('/');
        // [ 'assets', 'images', 'WkIRGjiZ5Jeohf95LW5spZN_.jpg' ]
        
        var uniqueFilename = fileNameParts[fileNameParts.length-1];
        
        var path = file.path;
        var conversionPath = './assets/conversions/'+uniqueFilename;
        
        gm(path)
            .resize(imageSize.width, imageSize.height)
            .autoOrient()
            .sepia()
            .write(conversionPath, function (err) {
                if (!err) {
                    
                    console.log(' hooray! ');
                    res.send({
                        thumbPath: '/assets/conversions/'+uniqueFilename,
                        imagePath: '/assets/images/'+uniqueFilename
                    });
                   
                }else{
                    
                    console.log(err);
                    res.sendStatus(400);
                    
                }
            });
        
    });
    
    app.listen(3000, function(){
       
        console.log('Server started');
        
    });
    
};