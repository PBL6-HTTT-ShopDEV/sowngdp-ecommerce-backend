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
            const folderPath = "Hodophile";
            const storageRef = ref(this.storage, `${folderPath}/${uniqueFileName}`);
            const metadata = {
                contentType: file.mimetype,
            };
            await uploadBytes(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(storageRef);
            console.log('File uploaded successfully:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    }

    async deleteImage(url) {
        const storageRef = ref(this.storage, url);
        console.log('Deleting file:', url);
        await deleteObject(storageRef);
        console.log('File deleted successfully');
    }

    async updateImage(url, file) {
        try {
            if (url) {
                await this.deleteImage(url);
            }
            const newUrl = await this.uploadImage(file);
            return newUrl;
        } catch (error) {
            console.error('Error updating image:', error);
            return null;
        }
    }
}

module.exports = FirebaseStorage;