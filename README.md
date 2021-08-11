# Bestore Ecommerce Web App

This project is an online shop with three category: laptop, mobile and camera.

I used material-UI for styling and react-toastify for showing notifications to user, also I used react-transition-group for making carousel in landing page.

For state management I used Redux and React Context and for API call I used Axios

This is a SPA project so I used React-Router for faking navigation between pages.

This project use json-server as fake server and use base64 for sending image to server.

It contain 2 part: Admin panel and Store itself.

For entering in admin part:

Username: eve.holt@reqres.in

Password: cityslicka

## Table of contents

- [Available Scripts](#available-scripts)
- [Login Page](#login-page)
- [Admin Panel](#admin-panel)
  * [Products Management Page](#products-management-page)
  * [Quantities Management Page](#quantities-management-page)
  * [Orders Management Page](#orders-management-page)
- [Store](#store)
  * [Landing Page](#landing-page)
  * [Products Page](#products-page)
  * [Product Page](#product-page)
  * [Basket Page](#basket-page)
  * [Checkout Page](#checkout-page)
  * [Payment Page](#payment-page)


## Available Scripts

In the project directory, you can run:

### `npm run server`

Please ensure that you run the server at first otherwise the project won't work properly. this project use json-server to fake the server functionality.


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Login page

Admin panel routes are protected and need login to the site before use.

I used [fake api](https://reqres.in/) for handling user login and save the result of api (token) on local storage and access to it with help of Redux.(this api just check if the Username is correct and don't check the password.)

For form validation I used a custom hook.

<p>&nbsp;</p>

---
<p>&nbsp;</p>

## Admin Panel

In this part I used Redux for state management and do each API call with help of Redux thunk. also for API call I used Axios instances, and I used interceptores for showing notifications to user.

<p>&nbsp;</p>

### Products Management Page

In this page admin can add, edit or delete a product and he can choose his favorite products for showing them in the store's landing page. (actully 6 last favorite products in each category will be showing in carousel)

<p>&nbsp;</p>

### Quantities Management Page

In this page admin can add or modify price and inventory, by double clicking on them, for each product .
(by double clicking on price or inventory it replace with an input.)
he can do it for several products simultaneously.

<p>&nbsp;</p>

### Orders Management Page

In this page admin can check customers orders.

<p>&nbsp;</p>

---
<p>&nbsp;</p>

## Store

In this part I used React Context instead of Redux.
I used a custome hook for handling API calls.

<p>&nbsp;</p>

### Landing Page

In this page by clicking on each right side photo you can change the content of carousel to that category and also navigate to each category page by cliking on button and see all the products.

<p>&nbsp;</p>

### Products Page

In this page you see all the products of each category and can filter them by the field on the top of the page.

<p>&nbsp;</p>

### Product Page

In this page you see properties of each product and can add it to your cart.

<p>&nbsp;</p>

### Basket Page

In this page you see all the things that ordered and you can increase or decrease their amounts or remove them from your cart.

for implementing basket I created a context and store the data in local storage so data won't lose with refreshing the page and can share across the app.

<p>&nbsp;</p>

### Checkout Page

after you finalized your purchase you will redirect to this page and you must fill the form and then you will redirect to payment page. 


<p>&nbsp;</p>

### Payment Page

This page is for faking payment action and it is just a photo but when you click on each button you will redirect to a new page and see the fake payment result.

