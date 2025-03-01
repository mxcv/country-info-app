# Country Info App

## Required Preinstalled Technologies
- Node.js
- MySQL

## Installation and Running
1. Clone the repository:
```bash
git clone https://github.com/mxcv/country-info-app
cd country-info-app
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables in `.env` file:
```plaintext
DATABASE_URL=mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE
DATABASE_SYNCHRONIZE=true
NAGERDATE_API_URL=https://date.nager.at/api/v3
COUNTRIESNOW_API_URL=https://countriesnow.space/api/v0.1
```
> [!NOTE]
> `DATABASE_URL` should be set properly. `DATABASE_SYNCHRONIZE` should be true at least once to create a database schema.
4. Run the application:
 ```bash
 npm start
 ```
## Documentation
The API is documented using **Swagger** and can be accessed at:

👉 **[http://localhost:3000/api](http://localhost:3000/api)**
