var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    request = require('request'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    jeditor = require('gulp-json-editor'),
    yaml = require('js-yaml'),
    jsonfile = require('jsonfile'),
    download = require('gulp-download'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('gulp-pngquant'),
    fs = require('fs'),
    crypto = require('crypto');

require('dotenv').config()

let options = {
    trello: {
        apiBaseUrl: 'https://api.trello.com/1',
        listId: process.env.TRELLO_LIST_ID,
        auth: {
            key: process.env.TRELLO_API_KEY,
            token: process.env.TRELLO_API_TOKEN
        }
    },
    alinaelumr: {
        baseUrl: 'https://alinaelumr.de'
    }
}

// Compile SCSS files to CSS
gulp.task("scss", function () {
    gulp.src("themes/al-2018/static/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({
            // outputStyle : "compressed"
        }))
        // .pipe(autoprefixer({
        //     browsers : ["last 20 versions"]
        // }))
        .pipe(gulp.dest("themes/al-2018/static/css"))
});

gulp.task("getBandsHash", function() {
    request({
        url: options.trello.apiBaseUrl + '/lists/' + options.trello.listId + '/cards',
        qs: options.trello.auth
    }, function(err, response, body) {
        if (response.statusCode !== 200) {
            throw "getBandsHash: Invalid response from Trello API"
        }

        let hash = crypto.createHash('sha1');
        hash.update(body);
        hashString = hash.digest('hex');
        fs.writeFileSync('static/bands.hash', hashString);
    });
});

gulp.task("getBands", function() {
    request({
        url: options.trello.apiBaseUrl + '/lists/' + options.trello.listId + '/cards',
        qs: options.trello.auth
    }, function(err, response, body) {
        if (response.statusCode !== 200) {
            throw "getBands: Invalid response from Trello API"
        }

        let hashString = '';
        try {
            hashString = fs.readFileSync('static/bands.hash').toString;
            console.log('hashstring: ', hashString);
        } catch (e) {
            console.log("no bands hash found.");
        }
        
        let trelloBody = body;
        request({
            url: options.alinaelumr.baseUrl + '/bands.hash',
        }, function(err, response, body) {
            let updateBandMedia;
            console.log(body);
            if (body == hashString) {
                updateBandMedia = false;
                console.log("No updates for bands");
            } else {
                updateBandMedia = true;
            }
            parseTrelloResponseIntoBands(trelloBody, updateBandMedia);
        });
    });

    function parseTrelloResponseIntoBands(body, updateBandMedia) {
        let bands = JSON.parse(body);
        let bandsDataObject = bands.map(function(band) {
            let bandOptions = yaml.safeLoad(band.desc);
            bandOptions = bandOptions || { }; // make sure bandOptions exists
            return {
                name: band.name,
                slug: bandOptions.slug || '',
                link: bandOptions.link
            }
        });
        jsonfile.writeFile('data/bands.json', bandsDataObject);
        
        if (updateBandMedia) {
            bands.map(getAttachmentsForBandCard);
        }
    }

    function getAttachmentsForBandCard(band) {
        request({
            url: options.trello.apiBaseUrl + '/cards/'+band.id+'/attachments',
            qs: options.trello.auth
        }, function(err, response, body) {
            if (response.statusCode !== 200) {
                throw "getAttachmentsForBandCard: Invalid response from Trello API"
            }
            let attachments = JSON.parse(body);
            attachments.map(downloadAndOptimizeBandImages);
        });
    }
    
    function downloadAndOptimizeBandImages(attachment) {
        download(attachment.url)
            .pipe(pngquant({ '': '128' }))
            .pipe(imagemin())
            .pipe(gulp.dest('content/bands'));
    }
});

// Watch asset folder for changes
gulp.task("watch", ["scss"], function () {
    gulp.watch("themes/al-2018/static/scss/**/*", ["scss"])
})