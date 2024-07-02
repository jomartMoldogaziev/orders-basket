let menu_list = document.getElementById("menu-list");
let orders_list = document.getElementById("orders-list");
let sum = document.getElementById("sum");
let items_count = document.getElementById("items-count");

const orders_basket = [];

const menu_items = [
    {
        id: 1,
        title: "Limonade",
        price: 100,
        img: './images/limonade.webp'
    },
    {
        id: 2,
        title: "Hamburger",
        price: 100,
        img: './images/hamburger.png'
    },
    {
        id: 3,
        title: "Coffee",
        price: 80,
        img: './images/coffee.png'
    },
    {
        id: 4,
        title: "Pizza",
        price: 500,
        img: './images/pizza.png'
    },
    {
        id: 5,
        title: "Shaurma",
        price: 150,
        img: './images/shaurma.webp'
    },
    {
        id: 6,
        title: "Tea",
        price: 50,
        img: './images/tea.png'
    },
    {
        id: 7,
        title: "Sushi",
        price: 250,
        img: './images/sushi.png'
    },
    {
        id: 8,
        title: "kymyz",
        price: 300,
        img: './images/kumys.png'
    }
];

const renderMenuItem = (product) => {
    return `
        <div class="food-card" data-product='${JSON.stringify(product)}' onclick="onclickCard(event)">
            <img class="food-img" src="${product.img}" alt="">
            <div>
                <div class="title">${product.title}</div>
                <div class="style">${product.price} som</div>
            </div>
        </div>
    `;
};

const renderOrderItem = (orderItem) => {
    return `
        <li class="order-item">
            <div class="title1">${orderItem.title} 
            <img class="title-img" src="${orderItem.img}" alt=""></div>
            <span class="counter">саны: ${orderItem.count}</span>
            <span class="price">суммасы: ${orderItem.count * orderItem.price} som</span>
            <span class="delete" data-order='${JSON.stringify(orderItem)}' onclick="onDelete(event)">x</span>
        </li>`
};

const renderOrder = () => {
    let items = [];
    orders_basket.map((item, id) => {
        items.push(renderOrderItem(item));
    });

    orders_list.innerHTML = items.join('');
};

const renderMenuList = (List) => {
    let items = [];
    List.map((elem, id) => {
        items.push(renderMenuItem(elem));
    });
    menu_list.innerHTML = items.join('');
};

const onclickCard = (event) => {
    let card = JSON.parse(event.currentTarget.dataset.product);

    let currentIndex = orders_basket.findIndex(el => el.id == card.id);
    if (currentIndex == -1) {
        orders_basket.push({
            ...card,
            count: 1
        });
    } else {
        orders_basket[currentIndex].count++;
    }

    renderOrder();
    solvesSum();
    getCount();
};

const onDelete = (event) => {
    let current_order = JSON.parse(event.currentTarget.dataset.order);
    let currentIndex = orders_basket.findIndex(el => el.id == current_order.id);

    if (current_order.count > 1) {
        orders_basket[currentIndex].count--;
    } else {
        orders_basket.splice(currentIndex, 1);
    }
    renderOrder();
    solvesSum();
    getCount();
};

const solvesSum = () => {
    sum.innerHTML = orders_basket.reduce((el, { price, count }) => el + (price * count), 0);
};

const getCount = () => {
    items_count.innerHTML = orders_basket.reduce((el, { count }) => el + count, 0);
};

renderMenuList(menu_items);

const Clear =()=>{
    orders_basket.splice(0,orders_basket.length);

    renderOrder(orders_basket);
    solvesSum()
    getCount()
}