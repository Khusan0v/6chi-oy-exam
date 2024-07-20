import { checkToken, redirect } from "./utils.js";

(async function () {
    const hasToken = await checkToken();
    if (!hasToken) {
        redirect("/login.html");
        return;
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formId');

    form.onsubmit = (e) => {
        e.preventDefault(); 

        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;

        const productItem = document.createElement('div');
        const productName = document.createElement('h4');
        const productPrice = document.createElement('h3');
        const productDescription = document.createElement('p');
        const deleteButton = document.createElement('button');
        
        productName.innerHTML = name;
        productPrice.innerHTML = ` ${price}00$`;
        productDescription.innerHTML = description;
        deleteButton.innerHTML = "Delete";

        productName.classList.add('name');
        deleteButton.classList.add('delete');

        productItem.append(productName, productPrice, productDescription, deleteButton);
        productItem.classList.add('product-item');

        const productList = document.querySelector('.productList');
        productList.append(productItem);

        const newProduct = {
            id: Date.now(),
            name,
            price,
            description
        };

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        form.reset();

        deleteButton.addEventListener('click', () => {
            deleteProduct(newProduct.id, productItem);
        });
    };

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
        const productItem = document.createElement('div');
        const productName = document.createElement('h4');
        const productPrice = document.createElement('h3');
        const productDescription = document.createElement('p');
        const deleteButton = document.createElement('button');

        productName.innerHTML = product.name;
        productPrice.innerHTML = ` ${product.price}$`;
        productDescription.innerHTML = product.description;
        deleteButton.innerHTML = "Delete";

        productName.classList.add('name');
        deleteButton.classList.add('delete');

        productItem.append(productName, productPrice, productDescription, deleteButton);
        productItem.classList.add('product-item');

        const productList = document.querySelector('.productList');
        productList.append(productItem);

        deleteButton.addEventListener('click', () => {
            deleteProduct(product.id, productItem);
        });
    });

    function deleteProduct(id, productElement) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        productElement.remove();
    }
});
