function AbstractEntity(id, name, img) {
    this.id = id;
    this.name = name;
    this.img = img;
};

function Category(id, name, img) {
    AbstractEntity.call(this, id, name, img);
};


function Product(id, name, price, discount, img, cId) {
    AbstractEntity.call(this, id, name, img);
    this.price = price;
    this.discount = discount;
    this.cId = cId;
};


function Manager() {
    this.products = [];
    this.categories = [];

    this.getProducts = function () {
        if (this.products.length <= 0) {
            this.products = loadDefaultProducts();
        }
        return this.products;
    };

    this.getCategories = function () {
        if (this.categories.length <= 0) {
            this.categories = loadDefaultCategories();
        }
        return this.categories;
    };

    function loadDefaultProducts() {
        var list = [];
        list.push(new Product("P001", "Galaxy S6", 600, 1000, "p1", "C001"));
        list.push(new Product("P002", "IPhone 7", 800, 900, "p2", "C002"));
        list.push(new Product("P003", "Mackbook Pro", 1000, 1300, "macbookpro", "C002"));
        list.push(new Product("P004", "Note 5", 600, 700, "p3", "C001"));
        list.push(new Product("P005", "IPad Pro", 900, 1000, "p4", "C002"));
        list.push(new Product("P006", "Tablet Pro", 900, 1000, "p5", "C001"));
        list.push(new Product("P007", "Nexus 7", 800, 1200, "nexus7", "C004"));
        list.push(new Product("P008", "Lumia 520", 700, 900, "lumia520", "C003"));

        list.push(new Product("P009", "Galaxy S6 2", 600, 1000, "p1", "C001"));
        list.push(new Product("P010", "IPhone 7 2", 800, 900, "p2", "C002"));
        list.push(new Product("P011", "Mackbook Pro 2", 1000, 1300, "macbookpro", "C002"));
        list.push(new Product("P012", "Note 5 2", 600, 700, "p3", "C001"));
        list.push(new Product("P013", "IPad Pro 2", 900, 1000, "p4", "C002"));
        list.push(new Product("P014", "Tablet Pro 2", 900, 1000, "p5", "C001"));
        list.push(new Product("P015", "Nexus 7 2", 800, 1200, "nexus7", "C004"));
        list.push(new Product("P016", "Lumia 520 2", 700, 900, "lumia520", "C003"));
        list.push(new Product("P017", "Galaxy S6 3", 600, 1000, "p1", "C001"));
        list.push(new Product("P018", "IPhone 7 3", 800, 900, "p2", "C002"));
        list.push(new Product("P019", "Mackbook Pro 3", 1000, 1300, "macbookpro", "C002"));
        list.push(new Product("P020", "Note 5 3", 600, 700, "p3", "C001"));
        list.push(new Product("P021", "IPad Pro 2", 900, 1000, "p4", "C002"));
        list.push(new Product("P022", "Tablet Pro 3", 900, 1000, "p5", "C001"));
        return list;
    };

    function loadDefaultCategories() {
        var list = [];
        list.push(new Category("C001", "SamSung", "samsung"));
        list.push(new Category("C002", "Apple", "apple"));
        list.push(new Category("C003", "Microsoft", "microsoft"));
        list.push(new Category("C004", "Google", "google"));
        return list;
    };
};


var manager = new Manager();

// load default categories and products
var defaultCategories = manager.getCategories();
var defaultProducts = manager.getProducts();



function displayCategories(list) {
    $('.m-category').each(function (i) {
        var ca = list[i];

        var img = "img/" + ca.img + ".jpg";
        $(this).find('input').attr('data-id', ca.id);
        $(this).find('img').attr('src', img);
        $(this).find('h5').text(ca.name);
    });
};

function displayProducts(list) {
    $('.m-product').each(function (i) {
        var pr = list[i];
        $(this).find('.product-title').parent('a').attr('href', 'detail.html?p=' + pr.id);

        var img = "img/" + pr.img + ".jpg";
        $(this).find('img').attr('src', img);
        $(this).find('.product-title').text(pr.name);
        $(this).find('.green-text').html('$' + pr.price + ' <span class="discount light-300 black-text">$' + pr.discount + '</span>');
    });
};

function sortProductsByName(list) {
    list.sort(function (p1, p2) {
        return p1.name.localeCompare(p2.name);
    });
};

function sortProductsByPrice(list) {
    list.sort(function (p1, p2) {
        return p1.price - p2.price;
    });
};

function getProductsByCategoryID(id) {
    var products = [];
    for (var i = 0; i < defaultProducts.length; i++) {
        var p = defaultProducts[i];

        if (p.cId === id) {
            products.push(p);
        }
    }
    return products;
};

function getProductByID(id) {
    var index = binarySearch(defaultProducts, id);
    return defaultProducts[index];
};

// binarySearch products by id
function binarySearch(array, key) {
    var lo = 0,
        hi = array.length - 1,
        mid,
        element;
    while (lo <= hi) {
        mid = Math.floor((lo + hi) / 2, 10);
        element = array[mid];
        if (element.id < key) {
            lo = mid + 1;
        } else if (element.id > key) {
            hi = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
};



