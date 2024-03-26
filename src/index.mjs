import express from 'express';

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;
const mockUsers = [{ id: 1, name: 'prateek' }, { id: 2, name: 'dimpy' }, { id: 3, name: 'aman' }]
const mockProducts = [{ id: 1, name: 'watch', price: 123 }, { id: 2, name: 'chicken', price: 200 }];


//GET req in node/express
app.get('/', (request, response) => {
    response.status(201).send({ msg: 'hello' })
})

app.get('/api/users', (request, response) => {
    response.status(201).send(mockUsers)
})

// query params like ?abc=123 can be destructed through query object in request

app.get('/api/products', (request, response) => {
    const { query } = request;
    const filterdData = mockProducts.find(i => i.id === parseInt(query.id)); 
    if(filterdData) return response.status(200).send(filterdData);

    response.status(201).send(mockProducts)
})


//route params

// dynamic params like :id can be destructed through params object in request
app.get('/api/users/:id', (request, response) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.status(400).send({ msg: 'Invalid Id Type Should be a number' })

    const filteredArr = mockUsers.find(i => i.id === parsedId);
     
    if(!filteredArr) return response.status(404).send({ msg: 'user not found' })

    response.status(201).send(filteredArr)
})

// POST Request
app.post('/api/users', (request, response) => {
   console.log(request.body, "body");
   const { body } = request;
   const newUser = { id: mockUsers[mockUsers.length - 1].id + 1,  ...body}
   mockUsers.push(newUser);
   return response.status(201).send(mockUsers)
}) 



app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});