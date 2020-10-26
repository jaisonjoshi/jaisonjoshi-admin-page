let app = "";
let db = "";
document.addEventListener("DOMContentLoaded", (event) => {
    app = firebase.app();
    db = firebase.firestore();
    db.collection("images")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().name}`);
            });
        });
});

//form validator

//varibales come here
let submitBtn = document.getElementById("submit");
let resetBtn = document.getElementById("reset");
let imgUrl = "";

let status = "false";
function uplaodData(art, artist, url, email, tagname) {
    db.collection("img")
        .add({
            art: art,
            artist: artist,
            img: url,
            email: email,
            tag: tagname,
        })
        .then(function () {
            console.log("Document successfully written!");
            alert("iamge uplaoded successfully")
            
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}
const form = document.querySelector(".needs-validation");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

const UploadImg = () => {

    if (document.getElementById("invalidCheck").checked) {
        status = false;
        let artName = document.getElementById("validationCustom01").value;
        let artistName = document.getElementById("validationCustom02").value;
        let tagName = document.getElementById("validationCustom04").value;
        let Email = document.getElementById("email").value;

        const ref = firebase.storage().ref();
        const upImg = document.getElementById("exampleFormControlFile1");
        const fileImg = upImg.files[0];
        console.log(fileImg);
        const name = new Date() + "_img";
        const metadata = {
            contentType: fileImg.type,
        };
        console.log(metadata);
        const task = ref.child(name).put(fileImg, metadata);
        task
            .then((snapshot) => snapshot.ref.getDownloadURL())
            .then((url) => {
                imgUrl = url;
                console.log(url);
                status = true;
                status ? uplaodData(artName, artistName, imgUrl, Email, tagName) : null;
                console.log("image uploaded");
            })
            .catch(console.log("failed"));
    }
    else {
        alert("please agree the terms");
    }
};

submitBtn.addEventListener("click", UploadImg);


