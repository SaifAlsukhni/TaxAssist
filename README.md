## Project Summary 

### Application Name
TaxAssist

### Summary
TaxAssist is a MEN (MongoDB, Express, Node.js) stack web application that features a MongoDB database, Express JavaScript web application framework, and Node.js application runtime environment.  The front end of TaxAssist is built using HTML, CSS, and Bootstrap.  TaxAssist is deployed for public access using the cloud platform, Heroku.  The main purpose of TaxAssist is to provide small business owners a means to manage and provide sales tax data to their accountant for processing of their monthly returns.  The ability to add multiple sales tax returns will allow a business owner to store and directly send sales tax for multiple businesses and multiple months.  This will expedite the process of filing the Illinois sales tax return for both the user and the administrator.

### Motivation
I currently work for an accounting firm where I am responsible for completing and submitting sales tax figures for small businesses.  These tax returns usually have to be completed monthly for each business.  A majority of my clients send me their total receipts and deductions data via phone or email.  Keeping track of all this info can get hectic pretty quickly especially when working on deadlines.  They would be able to send me their sales tax numbers at anytime which is extremely useful when I am unable to take their calls.  I could also provide a way for them to track the progress of their return.  This web application makes the process a lot easier for both my clients and myself.  

### Server-Side Components
Tax data will be stored in a MongoDB database after submission by the user.  All data submitted by a specific user is tied to their account which is also stored in a database.  All user input goes through server-side validation via Express Validator.

### Future Work
TaxAssist is still a Minimum Viable Product at this stage in its development.  Currently, it fulfills the basic needs and requirements of its current userbase in terms of managing sales tax data and delivering said data to the administrator for processing.  Given sufficient development time, TaxAssist has the potential to be exponentially greater than its current form.  Future versions of TaxAssist could integrate specialized forms for different types of businesses, form calculations for tax payment estimation, and possibly a payment system.