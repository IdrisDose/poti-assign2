var categories = [];
var products = [];

function loadXML(){
    $('#loadButton').hide();
    $('#products').append('<ul id="productList"></ul>');
    $.ajax({
        type: 'GET',
        url: 'categories.xml',
        dataType: 'xml',
        success: function (data) {
            
            $(data).find('Categories').each(function () {
                if($(this).children().length)
                {
                    var categoryID = $(this).find('CategoryID').text();
                    var categoryName = $(this).find('CategoryName').text();
                    var description = $(this).find('Description').text();

                    var category = new Category(categoryID,categoryName,description);
                    categories[categoryID] = category;
                }
            });
        },
        error: function(){
            console.log('An error occurred while processing Categories XML file.');
        }
    }).done(function(){
        createList();
        getProducts();
        loadHidables();
    });
}

var createList = function(){
    var list = '#productList';
    for(var i = 1; i < categories.length; i++){
        var category = categories[i];
        var catID = category.ID;
        var elem = $('<ul/>',{
            id: 'cat-'+category.ID,
            class: 'category',
        });
        $(list).append('<li id='+category.ID+' class="HandCursorStyle"><span id="click-'+catID+'">'+category.Name+'</span></li>');
        $('#'+category.ID).append(elem);
        $('#click-'+category.ID).attr('onClick','catClick('+catID+',"'+category.Desc+'")');
    }
}
var hidden = true;

var catClick = function(id,data){
    if(hidden){
        $('.category').hide();
        $('#cat-'+id).show();
        showDesc(data);
        hidden=false;
    }else{
        $('.category').hide();
        hidden=true;
    }
}

var getProducts = function(){
    $.ajax({
        type: 'GET',
        url: 'products.xml',
        dataType: 'xml',
        success: function (data) {
            $(data).find('Products').each(function () {
                if($(this).children().length)
                {
                    var productID = $(this).find('ProductID').text();
                    var productName = $(this).find('ProductName').text();
                    var categoryID = $(this).find('CategoryID').text();
                    var qtyPerUnit = $(this).find('QuantityPerUnit').text();
                    var unitPrice = $(this).find('UnitPrice').text();
                    var product = new Product(productID,productName,categoryID,qtyPerUnit,unitPrice);
                    products[productID] = product;
                }
            });
        },
        error: function(){
            console.log('An error occurred while processing Products XML file.');
        }
    }).done(function(){
        createProducts();
    });
}


var createProducts = function(){
    for(var i = 1; i < products.length; i++){
        var product = products[i];
        var catID = product.Cat;
        var elemID = '#cat-'+catID;
        var prodNumId = product.ID;
        var prodID = 'prod'+prodNumId;
        var prodDesc = product.desc;

        var nElem = $('<li/>',{
            id: 'prod-'+prodNumId,
            class: 'product HandCursorStyle',
            text: product.Name            
        });
        $(elemID).append(nElem);
        $(nElem).attr('onClick', 'showDesc("'+prodDesc+'")')
        console.log(product.Name);
    }
}


var showDesc = function(data){
    alert(data);
    $('#elemdesc').empty();
    $('#elemdesc').append(data);
}

var loadHidables = function(){
    $('.category').hide();
}