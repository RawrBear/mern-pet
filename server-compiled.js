(()=>{var e={860:e=>{"use strict";e.exports=require("express")},470:e=>{"use strict";e.exports=require("fs-extra")},13:e=>{"use strict";e.exports=require("mongodb")},738:e=>{"use strict";e.exports=require("multer")},109:e=>{"use strict";e.exports=require("sanitize-html")},441:e=>{"use strict";e.exports=require("sharp")},17:e=>{"use strict";e.exports=require("path")}},t={};function a(i){var n=t[i];if(void 0!==n)return n.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,a),o.exports}(()=>{const{MongoClient:e,ObjectId:t}=a(13),i=a(860),n=a(738)(),o=a(109),s=a(470),r=a(441);let l;const c=a(17);s.ensureDirSync(c.join("public","uploads"));const d=i();function p(e,t,a){"string"!=typeof e.body.name&&(e.body.name=""),"string"!=typeof e.body.species&&(e.body.species=""),"string"!=typeof e.body._id&&(e.body._id=""),e.cleanData={name:o(e.body.name.trim(),{allowedTags:[],allowedAttributes:[]}),species:o(e.body.species.trim(),{allowedTags:[],allowedAttributes:[]})},a()}d.set("view engine","ejs"),d.set("views","./views"),d.use(i.static("public")),d.use(i.json()),d.use(i.urlencoded({extended:!1})),d.get("/",(async(e,t)=>{const a=await l.collection("animals").find().toArray();t.render("home",{allAnimals:a})})),d.use((function(e,t,a){t.set("WWW-Authenticate",'Basic realm="Mern Pet App"'),"Basic YWRtaW46YWRtaW4="===e.headers.authorization?a():(console.log(e.headers.authorization),t.status(401).send("Authentication required."))})),d.get("/admin",((e,t)=>{t.render("admin")})),d.get("/api/animals",(async(e,t)=>{const a=await l.collection("animals").find().toArray();t.json(a)})),d.post("/create-animal",n.single("photo"),p,(async(e,a)=>{if(e.file){const t=`${Date.now()}.jpg`;await r(e.file.buffer).resize(844,456).jpeg({quality:60}).toFile(c.join("public","uploads",t)),e.cleanData.photo=t}console.log("Data",e.body);const i=await l.collection("animals").insertOne(e.cleanData),n=await l.collection("animals").findOne({_id:new t(i.insertedId)});a.send(n)})),d.delete("/animal/:id",(async(e,a)=>{"string"!=typeof e.params.id&&(e.params.id="");const i=await l.collection("animals").findOne({_id:new t(e.params.id)});i.photo&&s.remove(c.join("public","uploads",i.photo)),l.collection("animals").deleteOne({_id:new t(e.params.id)}),a.send("Deleted")})),d.post("/update-animal",n.single("photo"),p,(async(e,a)=>{if(e.file){const i=`${Date.now()}.jpg`;await r(e.file.buffer).resize(844,456).jpeg({quality:60}).toFile(c.join("public","uploads",i)),e.cleanData.photo=i;const n=await l.collection("animals").findOneAndUpdate({_id:new t(e.body._id)},{$set:e.cleanData});n.value.photo&&s.remove(c.join("public","uploads",n.value.photo)),a.send(i)}else l.collection("animals").findOneAndUpdate({_id:new t(e.body._id)},{$set:e.cleanData}),a.send(!1)})),async function(){const t=new e("mongodb://root:root@localhost:27017/MernPetApp?authSource=admin");await t.connect(),l=t.db(),d.listen(3e3)}()})()})();