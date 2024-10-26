# ecommerce-nodejs-backend

## Key Features
- Using S3 to storage Image and save link to mongodb
- Authentication and Authorization
  - Signup, Login and logout
- Tour
  - Manage booking, check tours map, check user's reviews and ratings
- User profile
  - Update username, profile photo, email, and password
- Payment using MOMO, VNPay, ZaloPay.

## How To Use

### Book a tour

- Login or Signup to the site
- Search for tours that you want to book
- Book a tour
- Proceed to the payment using VNPay, MOMO, ZaloPay

### Manage your booking

- Check the tour you have booked in "Manage Booking" page in your user settings. You'll be automatically redirected to this
  page after you have completed the booking.

### Update your profile

- You can update your own username, profile photo, email and password.

## API Usage

Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add:

```
- {{URL}} with your hostname as value (e.g. http://127.0.0.1:8000 or http://www.example.com)
- {{password}} with your user password as value.
```


## Deployment

The website is deployed using git on render.com. Below are the steps taken:

```
git init
git add -A
git commit -m "Commit message"
git push origin main

deploy on render > web service
```

Set environment variables to render:

```
go to dashboard > project > environment
```

## Build With

- [NodeJS](https://nodejs.org/en/) - JS runtime environment
- [Express](http://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
- [JSON Web Token](https://jwt.io/) - Security token
- [esbuild](https://esbuild.github.io/) - An extremely fast bundler for the web
- [Stripe](https://stripe.com/) - Online payment API
- [Postman](https://www.getpostman.com/) - API testing
- [Mailtrap](https://mailtrap.io/) & [Mailgun](https://www.mailgun.com/) - Email delivery platform
- [Render](https://render.com/) - Cloud platform

## To-do

- Review and rating
  - Allow user to add a review directly at the website after they have booked a tour
- Booking
  - Update all base API
  - Prevent duplicate bookings after user has booked that exact tour, implement favourite tours
- Advanced authentication features
  - Signup, confirm user email
- And More ! There's always room for improvement!

## Done
- Advanced authentication features
  - Login with refresh token, two-factor authentication


## Installation


$ npm i
set your env variables
$ npm run watch
$ npm run dev (for development)
$ npm run prod (for production)
$ npm run debug (for debug)
```

## Known Bugs

Feel free to create an issue for bugs or features if you run into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

## Future Updates

- Improve overall UX/UI and fix bugs
- Featured Tours
- Recently Viewed Tours
- And More ! There's always room for improvement!

## Acknowledgement

