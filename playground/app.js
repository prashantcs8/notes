const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const path = require('path');
const engines = require('consolidate');

firebase.initializeApp(functions.config().firebase);
const firestore = firebase.firestore();
const auth = firebase.auth();
// console.log(path.join('/track_json/track-2018-04-02.json'));
// const json = require(__dirname + '/track_json/track-2018-04-02.json');

const app = express();

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    res.render('index');
    /* firestore.collection("logs").get().then(function (querySnapshot) {
         setTimeout(() => {
             console.log(`logs ${querySnapshot.size}`);
         }, 2000);
     });*/
});

app.post("/track", (req, res) => {
    res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
    // res.send(req.body);
    var site_id = req.body.site_id;
    // console.log(`track ${site_id}`);
    if (typeof site_id != 'undefined') {
        let site_data = req.body;
        let trackRef = firestore.collection('track').doc(`${site_id}`);
        // var deleteDoc = firestore.collection('track').doc(`${site_id}`).delete();
        let upd = trackRef.set(site_data);
        upd.then(() => {
            console.log('added');
            res.send({ "status": "success", "msg": "update" });
        });
        upd.catch(() => {
            console.log('added');
            res.send({ "status": "success", "msg": "catched" });
        });
        /*trackRef.get().then((docs) => {
            if (docs.exists) {
                trackRef.onSnapshot((doc) => {
                    // console.log(`UPDATE - ${site_id}`);
                    let upd = trackRef.update(site_data);
                    upd.then(() => {
                        console.log('updated');
                        res.send({ "status": "success", "msg": "updated" });
                    });
                    upd.catch(() => {
                        console.log('catched');
                        res.send({ "status": "error", "msg": "catched" });
                    });
                });
            } else {
                // console.log(`NEW - ${site_id}`);
                let upd = trackRef.set(site_data); // create the document
                upd.then(() => {
                    console.log('added');
                    res.send({ "status": "success", "msg": "added" });
                });
                upd.catch(() => {
                    console.log('catched');
                    res.send({ "status": "error", "msg": "added catched" });
                });
            }
        }).catch(err => {
            console.log('Error getting documents', err);
        });*/
    }

});

app.post("/deactivations", (req, res) => {
    res.set('Cache-Control', 'public, max-age=0, s-maxage=0');

    var log_data = req.body;
    var site_id = log_data.site_id;
    // console.log(`logs ${site_id}`);

    if (site_id !== null) {
        let site_data = log_data.deactivate;
        let timestamp = Object.keys(site_data);
        let site_obj = Object.values(site_data);
        let trackRef = firestore.collection('deactivation').doc(`${site_id}`).collection("date").doc(timestamp[0]);
        let upd = trackRef.set(site_obj[0]); // create the document
        upd.then(() => {
            console.log('added');
            res.send({ "status": "success", "msg": "added" });
        });
        upd.catch(() => {
            console.log('added');
            res.send({ "status": "success", "msg": "catched" });
        });
    }
   /* var site_id = req.body.site_id;
    console.log(`deactivations ${site_id}`);
    if (site_id !== null) {
        let site_data = req.body.deactivate;
        let trackRef = firestore.collection('deactivations').doc(`${site_id}`);
        trackRef.get().then((docs) => {
            if (docs.exists) {
                trackRef.onSnapshot((doc) => {
                    // console.log('update - ' + site_id);
                    let upd = trackRef.update(site_data);
                    upd.then(() => {
                        console.log('updated');
                        res.send({ "status": "success", "msg": "updated" });
                    });
                    upd.catch(() => {
                        console.log('catched');
                        res.send({ "status": "success", "msg": "catched" });
                    });
                });
            } else {
                // console.log('New - ' + site_id);
                let upd = trackRef.set(site_data); // create the document
                upd.then(() => {
                    console.log('added');
                    res.send({ "status": "success", "msg": "added" });
                });
                upd.catch(() => {
                    console.log('added');
                    res.send({ "status": "success", "msg": "catched" });
                });
            }
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    } */
    /*res.send(req.body);
    // res.send('hi');
    let setData1 = firestore.collection('deactivations')
        .doc(`${Date.now()}`)
        .set(req.body);
    setData1.catch(() => {
        console.log('error');
    });*/


});

app.post("/logs", (req, res) => {
    res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
    // res.send(req.body);

    var log_data = req.body;
    var site_id = log_data.site_id;
    // console.log(`logs ${site_id}`);

    if (site_id !== null) {
        let site_data = log_data.logs;
        let timestamp = Object.keys(site_data);
        let site_obj = Object.values(site_data);
        let trackRef = firestore.collection('log').doc(`${site_id}`).collection("date").doc(timestamp[0]);
        let upd = trackRef.set(site_obj[0]); // create the document
        upd.then(() => {
            console.log('added');
            res.send({ "status": "success", "msg": "added1" });
        });
        upd.catch(() => {
            console.log('added');
            res.send({ "status": "success", "msg": "catched" });
        });
    }
});

app.get("/details", (req, res) => {
    res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
    res.send({
        "title": Date.now(),
        "page": "details"
    });
});

app.get("/search", (req, res) => {
    // console.log(req);
    res.send({
        "title": Date.now(),
        "page": "search"
    });
    /* var cityRef = firestore.collection('track').doc('f09592e876e15190bd5a0e7a7c8bb2e9');
     var getDoc = cityRef.get()
         .then(doc => {
             if (!doc.exists) {
                 console.log('No such document!');
             } else {
                 console.log('Document data:', doc.data());
                 fs.writeFileSync('log-search-data.json', JSON.stringify(doc.data()));
             }
         })
         .catch(err => {
             console.log('Error getting document', err);
         });*/
});
exports.app = functions.https.onRequest(app);
