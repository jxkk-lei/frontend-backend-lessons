const express = require('express');
const app = express();
const port = 3000;
let products = [
    {id: 1, name: 'Фумо Рейму', price: 3000},
    {id: 2, name: 'Фумо Койши', price: 2700},
    {id: 3, name: 'Фумо Чирно', price: 9999},
]


app.use(express.json());

// Главная страница
app.get('/', (req, res) => {
    res.send('Главная страница');
});

// CRUD
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    const newProduct = {
        id: Date.now(),
        name,
        price
};

    products.push(newProduct);
    res.status(201).json(newProduct);
});

//Get-запрос для отображение товаров

app.get('/products', (req, res) => {
    res.send(JSON.stringify(products));
});

//Get-запрос для отображение товаров по id

app.get('/products/:id', (req, res) => {
    let product = products.find(u => u.id == req.params.id);
    res.send(JSON.stringify(product));
});

//Patсh-запрос для изменения параметра товара по айди добавленный в url
app.patch('/products/:id', (req, res) => {
    const product = products.find(u => u.id == req.params.id);
    const { name, price } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    res.json(product);
});

//Удаление товара по айди, анологочино patch, только в body ничего не передаём
app.delete('/products/:id', (req, res) => {
    products = products.filter(u => u.id != req.params.id);
    res.send('Ok');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});