# JWT: 
JsonWebTokens:
- it's all encoded: 3 parts
1. [header]: *1. Algorithm* *2. tokenType=JWT*
2. [data]: you can have whatever you want here
3. [signature]: make sure the JWT was not altered or ...  in any way.

first letz create a userSchema => [userModel]

## BCRYPT: First youb have to hash the password
bcrypt => salt
bcrypt => hash

compare() => boolean.   

```javascript
const jwt = require('jsonwebtoken');

```
authMiddleware.js: 
const protect = tryCatch( async(req, res, next) => {
    try{
    }catch {

    }
})

[try]
1. extraigo el token del headers => req.headers.authorization => [.split(' ')] => 0 => 'Bearer ' 1 => token
2. verufy token => function nativa de JWT => [verify] indeed
3. req.user = User.findById(decoded/token.id) => tiene el id por que se lo pasaste como payload. `.select(--password)`=> de esta manera evitas que te devuelva el password. 