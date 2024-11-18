'use strict';

const firebaseConfig = require('../configs/config.firebase');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");


console.log(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

class FirebaseStorage {
    constructor() {
        this.app = firebaseApp;
        this.storage = storage;
    }

    static getInstance() {
        if (!FirebaseStorage.instance) {
            FirebaseStorage.instance = new FirebaseStorage();
        }
        return FirebaseStorage.instance;
    }

    async uploadImage(file) {
        try {
            const uniqueFileName = `${uuidv4()}-${file.originalname}`;

            // Specify the folder where you want to save the files
            const folderPath = "Hodophile";
            const storageRef = ref(storage, `${folderPath}/${uniqueFileName}`);
            // const storageRef = ref(this.storage, `Images/${Date.now()}_${file.originalname}`);
            console.log('Uploading file:', file.originalname);
            // const uploadTask = await uploadBytes(storageRef, file.buffer);
            // const downloadURL = await getDownloadURL(uploadTask.ref);

            // Upload each file to Firebase Storage
            const metadata = {
                contentType: file.mimetype,
            };
            await uploadBytes(storageRef, file.buffer, metadata);

            // Get the download URL for each uploaded file
            const downloadURL = await getDownloadURL(storageRef);
            console.log('File uploaded successfully:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    async deleteImage(url) {
        const storageRef = ref(storage, url);
        deleteObject(storageRef);
    }

    async updateImage(url, file) {
        this.deleteImage(url);
        return this.uploadImage(file);
    }
}

const firebaseStorage = FirebaseStorage.getInstance();

module.exports = firebaseStorage;